# Upgrade playbook — engine/UI image, gated

Applies to a Compose-hosted instance whose engine image is built by an ops repo from a
**fork** of `akitaonrails/ai-memory` (custom UI bundled). Every step has a stop condition;
the rehearsal (gate 4) exists because a refused store in production costs an outage plus a
restore.

## Gate 0 — impact read (no host access needed)

```bash
cd <fork-checkout> && git fetch upstream --tags
git log --oneline <running-ref>..v<target> | wc -l
git show upstream/main:CHANGELOG.md | awk '/^## \[?<target>/,/^## \[?<running>/'
# schema: anything renumbered / inserted?
git ls-tree --name-only <running-ref> crates/ai-memory-store/migrations/ | tail -5
git ls-tree --name-only v<target>     crates/ai-memory-store/migrations/ | tail -8
# custom UI compatibility: routes present in running ref but missing in target?
for r in <running-ref> v<target>; do git grep -h -o -E '"/(admin|auth|api/v1|keys)[A-Za-z0-9/_{}.-]*"' $r -- crates | tr -d '"' | sort -u > /tmp/api-$r.txt; done
comm -23 /tmp/api-<running-ref>.txt /tmp/api-v<target>.txt      # must be empty
# config keys you set still exist?
for k in root_username root_subject secure_cookie trusted_proxy_cidrs mid_session hard_delete_after_days admission_webhooks auto_scope allowed_hosts; do git grep -c -w $k v<target> -- crates/ai-memory-cli/src/config.rs; done
```

**Identify what is actually running.** `docker inspect <container> --format '{{index .Config.Labels "org.opencontainers.image.revision"}}'`
gives the ops commit; the engine ref is in the build workflow run log (`ENGINE_REF:`). A
`--version` of `X.Y.Z` does **not** prove the image is the `vX.Y.Z` tag — it may be a branch
commit on top of it (`git describe --tags <sha>` → `vX.Y.Z-N-g…`). If N>0, go to the gotcha
"fork migration numbering" below **before** anything else.

Stop if: routes the custom UI uses are missing; a required config key vanished; the target
introduces a one-way migration you have not accepted.

## Gate 1 — refs

```bash
git push origin upstream/main:main        # fork main = clean upstream mirror
git push origin v<target>                 # tag must exist ON THE FORK (Dockerfile cache-busts against the fork commit API)
gh run list -R <fork> -L 3                # cancel the fork's release.yml if upstream already published binaries
```

## Gate 2 — build + verify

```bash
gh workflow run build-images.yml -R <ops-repo> -f image=ai-memory -f engine_ref=v<target> -f ui_ref=<ui-40-char-sha>
gh run watch <run-id> -R <ops-repo> --exit-status
# on the host:
docker pull ghcr.io/<ops-repo>/ai-memory:candidate-<run-id>-1
docker run --rm --entrypoint ai-memory <image> --version          # must equal <target>
docker inspect <image> --format '{{index .RepoDigests 0}}'          # pin THIS
docker run --rm --entrypoint sh <image> -c 'grep -o "index-[A-Za-z0-9_-]*\.js" /web-ui/index.html'   # bundled UI asset
```

## Gate 3 — backup off-volume

```bash
docker exec <engine-container> ai-memory backup --to /data/backup-pre-<target>-<ts>.tar.gz
mv data/backup-pre-<target>-<ts>.tar.gz ./       # OUT of data/ (the 2.0 walk archives data/ entirely)
tar -tzf backup-pre-<target>-<ts>.tar.gz | head -3 ; df -h /
cp compose.yml compose.yml.bak-<target>-<ts>; cp .env .env.bak-<target>-<ts>
```

Need ≥ 3× the data dir free: the tarball, the scratch clone, and 2.0's own archive.

## Gate 4 — rehearsal on a clone

`scripts/rehearse-upgrade.sh <compose-dir> <backup.tar.gz> <image@digest>` does, isolated:

1. extracts the backup into `<compose-dir>/scratch/data` (chown to the engine uid);
2. renders the engine env with `docker compose config --format json` (so `${VAR}` from `.env`
   resolve exactly as in prod) and overrides: `AI_MEMORY_EMBEDDING_PROVIDER=none`,
   `AI_MEMORY_LLM_PROVIDER=` (empty), `AI_MEMORY_ADMISSION_WEBHOOKS_JSON=[]`,
   `AI_MEMORY_AUTO_IMPROVE__SCHEDULER__ENABLED=false`, `AI_MEMORY_IN_CONTAINER=1`;
3. runs the candidate with `--network none` on a scratch port and tails the log until
   `starting wiki watcher` (success) or `Error` (stop);
4. prints the verdict, the migration lines, and `data/backups` contents.

Do **not** filter the rendered env by `KEY`/`TOKEN` when inspecting it — legit values can
contain those substrings (a `ROOT_ISSUER` of `…/keys-only` was hidden that way once).

Then, still on the clone: `docker exec -e AI_MEMORY_SERVER_URL=http://127.0.0.1:<port> -e AI_MEMORY_AUTH_TOKEN=… <scratch> ai-memory status`
and a `search`. Remove the scratch container and dir afterwards.

## Gate 5 — cutover

```bash
sed -i 's|ai-memory@sha256:<old>|ai-memory@sha256:<new>|' compose.yml     # + new env keys if any
docker compose up -d ai-memory
docker compose logs -f ai-memory | sed -E 's/\x1b\[[0-9;]*m//g' | grep -iE 'starting|migrat|backup|okf|error|watcher'
```

Do not interrupt a long migration; check the log instead. If the store is **refused at
open** (before any backup/migration lines), rolling back is just the old digest.

## Gate 6 — validate

MCP from a client (`memory_status`, `memory_query` with vector stream, `memory_explore` for
the LLM path); edge probes (`/`, `/login` 200; `/mcp` 401; `/api/v1/workspaces` 200 with a
read key); `docker compose logs --since 15m ai-memory | grep -iE ' WARN| ERROR'`; git-mirror
`push ok` after writing a test page; `docker ps` health. Then upgrade client CLIs and
re-apply hooks (`aim-init refresh`).

## Gate 7 — record

Runbook §state: digest, workflow run id, engine/ui refs, date, deviations, backups, new env.
Memory: a `registros/<date>-upgrade-<target>.md` page plus a `gotchas/` page for anything new.

## Rollback

`docker compose stop ai-memory` → restore `compose.yml.bak-*` (old digest) → replace `data/`
with the pre-upgrade tarball → `docker compose up -d ai-memory`. After a 2.0 OKF migration the
old binary refuses the migrated dir, so the tarball restore is mandatory, not optional.

## Gotchas (observed)

| Symptom | Cause | Fix |
|---|---|---|
| `applied migration V51__<a> is different than filesystem one V51__<b>` at open | Prod image was a **fork branch** commit whose own migrations (V51/V52) got **renumbered** when the PR merged upstream (→ V54/V55) with other migrations inserted before them. refinery compares name+checksum per version; there is no tolerance flag. | Confirm by `diff` that the renumbered SQL yields the same schema (only comments/guards differ). Get the target's expected `(version,name,checksum)` rows by booting the candidate on an **empty** data dir and reading `refinery_schema_history`. Run `scripts/fix-migration-history.py` on a clone first, then on prod with the engine stopped: it applies the missing migrations' SQL verbatim and rewrites the history rows. Prevention: deploy only official tags containing the merge. |
| Migration aborts: "no home directory found for the pre-migration backup" | 2.0 archives to `$HOME` unless it detects a container | `AI_MEMORY_IN_CONTAINER=1` (also detected via `/.dockerenv`); archive lands in `data/backups/` |
| `[auth].root_issuer and [auth].root_subject must be configured together` | validation in ≥1.37: OIDC subject is only unique within an issuer | set both or neither; in keys-only mode a synthetic issuer URL is fine |
| `api credentials exist but [auth].token_pepper is missing` | pepper not passed to the (scratch) run | pass the full rendered env (`docker compose config`) |
| Second engine container on the same volume fails | 2.0 `.serve.lock` single-instance lock | never run two engines on one data dir; rehearse on a clone |
| Watcher `reconcile reindex failed … does not belong to workspace` after upgrade | wiki dirs of purged projects; 2.0's OKF pass created bundle scaffolding in them | move those dirs out of `data/wiki` (keep a copy), restart |
| Hybrid search silently FTS-only after changing embeddings | vectors carry `(provider, model, dim)`; mismatched ones are ignored | keep the provider explicit; `ai-memory embed --force` or wait for the startup backfill |
| `_perftmp` workspace appears | ops `memcli` test suite scope | ignore / purge |
| git-mirror `git add … context canceled` | near-simultaneous writes race the mirror | re-write the missed page; check the mirror repo's latest commit |

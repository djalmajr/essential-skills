---
name: aim-ops
description: "Operate an ai-memory SERVER end to end: install a new instance (Docker Compose stack: engine + mcp-auth consumer keys + Caddy edge + admission webhooks + git-mirror, behind a tunnel), upgrade the engine/UI image safely (immutable refs, digest pin, backup, rehearsal on a data clone, one-way migrations), choose/switch LLM and embedding providers, manage consumer keys and auto-improve, back up/restore, and diagnose. Use when the user asks to deploy, host, self-host, upgrade, update, migrate, restore, or troubleshoot an ai-memory instance, change its LLM/embeddings, or issue API keys for it. Client-side wiring (repo marker, MCP entry, hooks, local CLI) is aim-init, not this skill."
metadata:
  short-description: Install, upgrade and operate an ai-memory server
---

# aim-ops

Server lifecycle for **ai-memory** (engine by `akitaonrails/ai-memory`, packaged and
extended by an **ops repo** that builds the images and holds the runbooks). This skill
is the reproducible procedure; the ops repo holds the real compose, images and
instance-specific runbooks. **Never** write secrets, digests or hostnames of a real
instance into this skill — they belong in the operator's private runbooks/memory.

Client-side wiring (marker, MCP entry, hooks, local CLI) → [aim-init](../aim-init/SKILL.md).

## Route intent

- "deploy / self-host / subir uma instância nova", "new environment" (PT: "instala o ai-memory num servidor", "sobe uma instância") → **install**.
- "upgrade / update the server", "saiu versão nova, qual o impacto?" (PT: "atualiza o engine", "faz upgrade") → **upgrade** ([references/upgrade-playbook.md](references/upgrade-playbook.md)).
- "change the LLM / embeddings", "too expensive", "run a local model?" (PT: "troca o modelo", "desliga o Cloudflare") → **providers** ([references/providers.md](references/providers.md)).
- "issue/revoke an API key for X", "hooks 401/403" → **keys**.
- "backup / restore / rollback" → **backup-restore**.
- "is it healthy?", "what's running?", "why is capture failing?" (PT: "como está o servidor?") → **doctor** (read-only).

Before any write: confirm **which instance** (there may be several), the host access path
(SSH user@host, compose dir), and that a backup exists or will be taken first. Use the
harness's structured-question tool for install-time choices (edge, providers, mirror).

## Anatomy (what an instance is)

One Docker Compose project on a single host, loopback-only, fronted by a tunnel/reverse proxy.
Full description, env-by-service and invariants in
[references/compose-stack.md](references/compose-stack.md); templates in [templates/](templates/).

| Service | Role | Must know |
|---|---|---|
| `ai-memory` (engine) | MCP + `/api/v1` + `/admin` + web UI; SQLite + wiki on `./data` | pinned **by digest**; `AI_MEMORY_IN_CONTAINER=1`; `user: 1000:1000` |
| `mcp-auth` | forward-auth sidecar: validates consumer keys (`amk_`, keys-only mode) or OIDC JWT; injects `X-Memory-Actor-*`; serves `/keys*` | proxy token **≠** root token; `PASSTHROUGH_UNKNOWN_BEARER=0` |
| `caddy` | edge on `127.0.0.1:8080`: public SPA + `/auth*`, `/keys*` → sidecar, everything else `forward_auth` → engine | strips client-supplied actor headers; tunnel points here |
| `scope-guard` | blocking admission webhook: per-actor write ACL | empty actor ⇒ needs `HOOK_AUTH_USERNAME` on mcp-auth |
| `contributors` | non-blocking webhook: stamps `contributors:` frontmatter | — |
| `git-mirror` | non-blocking webhook: pushes every write to a git backup repo | deploy key in `./git-ssh`; loses near-simultaneous writes (re-write to resync) |

Data dir layout: `data/db/memory.sqlite`, `data/wiki/<ws-uuid>/<proj-uuid>/…`, `data/backups/`
(2.0+ automatic pre-migration archives), `data/logs/`.

## install (new environment)

1. **Host prerequisites:** Linux x86_64/arm64, Docker + Compose v2, 4+ vCPU, 8+ GiB RAM
   (30 GiB comfortable if you plan local models), disk ≥ 5× the expected data dir (backups
   are full copies). Outbound access to the image registry and providers. No inbound ports:
   use a tunnel (Cloudflare Tunnel) or a TLS reverse proxy to `127.0.0.1:8080`.
2. **Images:** build via the ops repo `build-images.yml` (workflow_dispatch) with **immutable**
   refs — `engine_ref=<release tag>` and `ui_ref=<40-char SHA>` — never `main`/`latest`. The
   engine image bundles the custom UI. Record the resulting `candidate-<run>-<n>` tag and pull
   it on the host; **verify** before use:
   ```bash
   docker run --rm --entrypoint ai-memory <image> --version
   docker inspect <image> --format '{{index .RepoDigests 0}}'   # → pin this digest in compose
   ```
3. **Compose dir** (e.g. `/opt/ai-memory`): copy [templates/compose.yml.tmpl](templates/compose.yml.tmpl),
   [templates/Caddyfile.tmpl](templates/Caddyfile.tmpl), [templates/.env.example.tmpl](templates/.env.example.tmpl)
   → `compose.yml`, `Caddyfile`, `.env` (chmod 600). Fill placeholders: hostname, root
   username, providers, mirror repo. Generate secrets locally (`openssl rand -hex 32`):
   `AI_MEMORY_AUTH_TOKEN` (root), `ACTOR_PROXY_BEARER_TOKEN` (**distinct** from root),
   `HOOK_AUTH_TOKEN`, `AI_MEMORY_AUTH__TOKEN_PEPPER` (never rotate after first use — it seals
   native `aim_` credentials), `AI_MEMORY_AUTH__RECOVERY_TOKEN`.
   `AI_MEMORY_AUTH__TRUSTED_PROXY_CIDRS` = the Caddy container IP/32 on the compose network
   (read it after first `up`, then restart the engine).
4. **Providers:** decide LLM (consolidation/lint/auto-improve/explore) and embeddings per
   [references/providers.md](references/providers.md). Set the provider env **explicitly** —
   on 2.0+ an unset embedding provider silently enables the bundled English-only local model.
   Zero-LLM is valid (capture/search/handoff work); consolidation just won't run.
5. **First start:** `docker compose up -d`, then `docker compose logs -f ai-memory` until
   `ai-memory starting version=…`, `embedder enabled …`, `memory_consolidate … enabled` (if LLM),
   `starting wiki watcher`. Then `docker compose ps` → all `healthy`/`Up`.
6. **Root human bootstrap:** set `AI_MEMORY_AUTH__INITIAL_ROOT_PASSWORD` once, start, log in at
   `/login`, change the password, then **remove** the variable and recreate the engine. Keep
   the recovery token in a root-only file on the host, never in git.
7. **Consumer keys (mcp-auth keys-only):** bootstrap the first `admin`-scoped `amk_` key with
   SQL **inside** the sidecar container (see compose-stack.md → "Bootstrap admin key"), then
   issue one key per consumer through the API (owner is derived from the caller):
   ```bash
   curl -s -X POST https://<instance>/keys -H "Authorization: Bearer <admin-amk>" \
     -H 'Content-Type: application/json' \
     -d '{"id":"claude-code","actor_user":"<username>","scopes":["read","write"]}'
   # → plaintext key printed ONCE. Scopes: read | write | admin. Rotation = create + revoke (DELETE /keys/{id}).
   ```
   `/admin/*` answers **403** to a key without `admin` scope — expected, not an engine error.
8. **Wire clients** with `aim-init` (`install-mcp`/`install-hooks` with each consumer's own
   `amk_` key). Hooks use `HOOK_AUTH_TOKEN` **or** a consumer key; `HOOK_AUTH_USERNAME` must
   name an ACL-allowed user or scope-guard 403s every capture silently.
9. **Edge:** point the tunnel/proxy hostname at `http://127.0.0.1:8080`. Verify from outside:
   `/` and `/login` → 200 (public SPA), `/mcp` → 401 without bearer, `/api/v1/workspaces` → 200
   with a read key, `/keys/whoami` with the admin key → `can_issue:true`.
10. **Backups:** git-mirror pushing (`push ok` in its logs after a test write) and a periodic
    `ai-memory backup --to /data/backup-<ts>.tar.gz` copied **off the volume**. Record the
    instance facts (host, compose dir, digests, providers, key ids — no secrets) in the
    operator's runbook/memory.

## upgrade

Full gated procedure and gotcha table: [references/upgrade-playbook.md](references/upgrade-playbook.md).
Summary of the gates — do not skip any:

0. **Impact read:** release notes + `CHANGELOG` between the running version and the target;
   diff `crates/ai-memory-store/migrations/` and the HTTP route set (custom UI compatibility);
   check config keys you set still exist in `config.rs`. Note one-way migrations.
1. **Refs:** the engine image builds from a **fork**; sync `fork/main` from upstream and push
   the release **tag** to the fork (the Dockerfile cache-busts against the fork's commit API).
   Cancel the fork's redundant `release.yml` run if upstream already published binaries.
2. **Build + verify** the candidate (`--version` inside the image) and pin its digest.
3. **Backup off-volume** (`ai-memory backup` from inside the running engine, then move the
   tarball out of `data/`). Check free disk ≥ 3× data dir.
4. **Rehearse on a clone:** [scripts/rehearse-upgrade.sh](scripts/rehearse-upgrade.sh) extracts the
   backup to `scratch/`, boots the candidate against it with `--network none`, providers off,
   webhooks `[]`, using the env rendered by `docker compose config` — and reports whether the
   store opens, migrations apply, and the wiki migration completes. **A refused store here is a
   stop**, not a prod retry.
5. **Cutover:** `compose.yml` → new digest (+ any new required env), `docker compose up -d
   ai-memory`, follow logs to `starting wiki watcher`. Expect minutes of downtime for large
   stores (2.0's backup-gated OKF migration ≈ 4 min for ~3 GB).
6. **Validate:** MCP `memory_status` / `memory_query` (vector) / `memory_explore` (LLM) from a
   client; `/login`, `/api/v1/*`; engine log `WARN|ERROR` count; git-mirror `push ok` after a
   test write; container `healthy`.
7. **Clients:** upgrade the local CLI to the same release and re-run `install-hooks --apply`
   per agent (`aim-init refresh`).
8. **Record:** runbook §state (digest, workflow run, refs, date, deviations) + memory page.

Rollback = old digest in compose + restore the pre-upgrade tarball into `data/` (post-2.0
data dirs are refused by 1.x binaries; the tarball is the only way back).

## providers

See [references/providers.md](references/providers.md): env matrix, key resolution order,
cost model per consolidation, context requirements (≥64k input comfortable), reasoning
off, multilingual embeddings, when a local model is worth it, and auto-improve settings
(`AI_MEMORY_AUTO_IMPROVE__SCHEDULER__ENABLED`, `…__REQUIRE_APPROVAL`, `ai-memory pending-writes`).
Switching the **embedding** provider/model/dim invalidates existing vectors (hybrid search
ignores mismatched triples until `ai-memory embed --force` or the startup backfill re-embeds).

## keys

- List: `GET /keys` (admin key). Issue: `POST /keys {id, actor_user, scopes[], expires_at?}`.
  Revoke: `DELETE /keys/{id}` (soft). No rotate endpoint: issue new, switch consumer, revoke old.
- Hook token last: rotate `HOOK_AUTH_TOKEN` only after `POST /hook` with the current one
  returns 202; a 401 there fills every client's spool.
- Rotating `ACTOR_PROXY_BEARER_TOKEN` requires recreating engine **and** mcp-auth (same value
  in both; the token-check script in compose-stack.md prints MATCH/DIFFER without values).

## backup-restore

- **Take:** `docker exec <engine> ai-memory backup --to /data/backup-<ts>.tar.gz` → move out of
  `data/` (and off-host periodically). 2.0+ also leaves `data/backups/ai-memory-backup-okf-*.tar.gz`
  after its migration; the homepage shows a notice until you delete it.
- **Restore:** `docker compose stop ai-memory` → empty or move `data/` aside → extract the tarball
  into `data/` (or `ai-memory restore --from … --force` inside a one-off container) → fix
  ownership `1000:1000` → start with the **binary version that wrote the backup** (or newer).
- **git-mirror** is a second copy of the wiki markdown (not the SQLite): useful for history and
  diffing, not for a full restore.

## doctor (read-only)

Report, without writing: running image digest ↔ `--version` inside the container; upstream latest
release; `docker compose ps` health; engine log `WARN|ERROR` in the last 15 min (watcher
"does not belong to workspace" = orphan wiki dirs of purged projects → move them out);
providers announced in the startup log (embedder model/dim, LLM model); auto-improve scheduler
state; `PRAGMA foreign_key_check` on a read-only DB copy; `data/backups` and off-volume tarballs
with dates; git-mirror last `push ok`; edge probes (`/`, `/login`, `/mcp` 401, `/keys/whoami`);
token-invariant check (proxy ≠ root, engine == sidecar); disk free vs data dir size; consumer key
list with `last_used`; hook spool health on clients (`aim-init doctor`).

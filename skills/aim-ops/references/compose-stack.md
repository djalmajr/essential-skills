# Compose stack — services, env, invariants

Reference layout (see `templates/compose.yml.tmpl`). All listeners on `127.0.0.1`; the
tunnel/proxy is the only ingress and it targets Caddy on `:8080`.

```
tunnel/proxy ──► caddy:8080 ──► /  /login /assets… (public SPA, actor headers stripped)
                              ├─► /auth*            → engine (public; strips Authorization)
                              ├─► /keys*, /.well-known/oauth-protected-resource → mcp-auth:8081
                              └─► everything else   → forward_auth mcp-auth:8081/verify → engine:49374
engine ──admission webhooks──► scope-guard (blocking) · contributors · git-mirror
```

## Engine (`ai-memory`)

| Env | Value / rule |
|---|---|
| `AI_MEMORY_DATA_DIR` | `/data` (bind `./data`) |
| `AI_MEMORY_IN_CONTAINER` | `"1"` — backups to `/data/backups` |
| `AI_MEMORY_ALLOWED_HOSTS` | `<hostname>,localhost,127.0.0.1,::1` (must include the internal host mcp-auth uses) |
| `AI_MEMORY_WEB_SLUG` | `/` when the custom SPA is served at root |
| `AI_MEMORY_AUTH_TOKEN` | root bearer (machine admin); **never** sent by the edge |
| `AI_MEMORY_AUTH__ACTOR_PROXY_BEARER_TOKEN` | proxy rung; **must differ** from root or every proxied identity becomes root silently |
| `AI_MEMORY_AUTH__TRUSTED_PROXY_CIDRS` | Caddy container IP/32 |
| `AI_MEMORY_AUTH__ROOT_USERNAME` / `ROOT_ISSUER` + `ROOT_SUBJECT` | human root; issuer+subject are a pair (both or neither) |
| `AI_MEMORY_AUTH__SECURE_COOKIE` | `"true"` behind HTTPS |
| `AI_MEMORY_AUTH__TOKEN_PEPPER` | stable secret sealing native `aim_` credentials — never rotate |
| `AI_MEMORY_AUTH__RECOVERY_TOKEN` | root password recovery |
| `AI_MEMORY_AUTO_SCOPE__MODE` | `per_actor` (default ≥1.39) |
| `AI_MEMORY_ROUTING__MID_SESSION` | `sticky` (mitigates cross-project scope bleed) |
| `AI_MEMORY_DECAY__HARD_DELETE_AFTER_DAYS` | e.g. `365` |
| `AI_MEMORY_ADMISSION_WEBHOOKS_JSON` | array of `{name, blocking, url, events[]}` |
| providers | see `providers.md` |
| `command` | `serve --transport http --bind 0.0.0.0:49374 --workspace <ws> --project <default-project> --enable-web --web-ui-dir /web-ui` |

## mcp-auth (sidecar)

| Env | Rule |
|---|---|
| `KEYS_DB` | `/data/keys.db` on a named volume ⇒ **keys-only mode** when `OIDC_ISSUER` is empty; `amk_` keys resolved locally |
| `ACTOR_PROXY_BEARER_TOKEN` + `UPSTREAM_AUTH_TOKEN` | both = engine's proxy token |
| `HOOK_AUTH_TOKEN` / `HOOK_AUTH_USERNAME` | static hook credential and the username stamped on it (required by scope-guard) |
| `PASSTHROUGH_UNKNOWN_BEARER` | `"0"` — unknown bearers fail closed |
| `ENGINE_INTERNAL_URL` / `ENGINE_INTERNAL_HOST` | `http://ai-memory:49374` + a host in `ALLOWED_HOSTS`, for session introspection on `/keys*` |
| `OIDC_ISSUER`, `OAUTH_ENABLED`, `OAUTH_RESOURCE` | only for a Keycloak/OIDC instance |

Scopes: `read` (GET data), `write` (MCP writes, hooks), `admin` (`/admin/*`, `/keys*`).
A `read,write` key gets **403** on `/admin/*` — by design.

**Bootstrap admin key** (once, keys-only mode) — run inside the sidecar container, never
against the bind mount from the host:
```bash
docker compose exec mcp-auth sh -c 'mcp-auth keys bootstrap --id operator --actor <username> --scopes read,write,admin' 2>/dev/null \
  || docker compose exec mcp-auth sh   # fallback: insert the row per images/mcp-auth/README.md "Keys-only mode"
```
(Consult the ops repo's `images/mcp-auth/README.md` for the exact bootstrap statement of the
deployed sidecar version; the plaintext is shown once.)

## Caddy

- Strips **client-supplied** `Authorization` and `X-Memory-Actor-*` on public routes, and the
  actor headers before `forward_auth` on protected routes (the sidecar re-injects them —
  replace, never append, or the client's value wins).
- `/internal/*` → 404. Legacy `/web` → 308 to `/`.
- Runs on `127.0.0.1:8080`; the tunnel ingress rule targets it. Reverting the edge = point the
  tunnel back at `127.0.0.1:49374`.

## Admission webhooks

- **scope-guard** (blocking): `ACL_RULES` JSON `{ "<user>": [{workspace: regex, project: regex, ops?: [...]}] }`.
  Keep an `""` (empty actor) rule limited to `consolidate,delete` so engine-internal jobs pass.
- **contributors** (non-blocking): stamps `contributors:` frontmatter.
- **git-mirror** (non-blocking): `REPO_URL`, `REPO_BRANCH`, deploy key mounted read-only at
  `/etc/git-ssh`, `ENGINE_URL` + `ENGINE_AUTH_TOKEN` to read page bodies, `PUSH_DEBOUNCE`,
  `RECONCILE_INTERVAL`, `STALE_FAIL_THRESHOLD`.

## Token invariants check (prints verdicts only, never values)

```bash
docker compose config --format json | python3 -c '
import json,sys; s=json.load(sys.stdin)["services"]
e=lambda svc,k:(s.get(svc,{}).get("environment") or {}).get(k)
pe=e("ai-memory","AI_MEMORY_AUTH__ACTOR_PROXY_BEARER_TOKEN"); rt=e("ai-memory","AI_MEMORY_AUTH_TOKEN")
ps=e("mcp-auth","ACTOR_PROXY_BEARER_TOKEN"); us=e("mcp-auth","UPSTREAM_AUTH_TOKEN")
print("proxy != root      :", "DISTINCT" if pe and pe!=rt else "SAME/ABSENT")
print("engine == sidecar  :", "MATCH" if pe and pe==ps==us else "DIFFER")
print("pepper             :", "present" if e("ai-memory","AI_MEMORY_AUTH__TOKEN_PEPPER") else "ABSENT")
print("initial root pw    :", "ABSENT (ok)" if not e("ai-memory","AI_MEMORY_AUTH__INITIAL_ROOT_PASSWORD") else "PRESENT (remove after bootstrap)")
print("in_container       :", e("ai-memory","AI_MEMORY_IN_CONTAINER") or "ABSENT")'
```
`DIFFER` ⇒ every `amk_` key 401s. `SAME` ⇒ proxied identities become root without attribution.

## Storage & sizing

- `data/` grows with observations (millions of rows ≈ several GB SQLite). Keep 3× free for
  upgrade backups and rehearsal clones.
- Orphan `data/wiki/<ws>/<proj>` dirs (project purged from DB) only produce watcher warnings;
  move them out of the volume.

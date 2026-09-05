#!/usr/bin/env sh
# Rehearse an ai-memory engine upgrade on a CLONE of the data, fully isolated from production.
#
# Usage: rehearse-upgrade.sh <compose-dir> <backup.tar.gz> <image@digest> [scratch-port]
#   compose-dir   directory holding compose.yml + .env of the running instance (e.g. /opt/ai-memory)
#   backup.tar.gz tarball produced by `ai-memory backup` (contains db/ and wiki/)
#   image         candidate engine image, pinned by digest
#   scratch-port  loopback port inside the container (default 49399)
#   SKIP_EXTRACT=1 reuse an existing scratch/data (e.g. after fix-migration-history.py) instead of re-extracting
#
# What it does: extracts the backup to <compose-dir>/scratch/data, renders the engine env with
# `docker compose config` (so ${VARS} from .env resolve as in prod), overrides providers/webhooks
# off, runs the candidate with --network none, and reports the boot outcome. Nothing touches
# production: no network, separate data dir, separate container name.
set -eu
DIR=${1:?compose-dir}; BK=${2:?backup.tar.gz}; IMG=${3:?image@digest}; PORT=${4:-49399}
NAME=aim-rehearsal
cd "$DIR"
docker rm -f "$NAME" >/dev/null 2>&1 || true
if [ "${SKIP_EXTRACT:-0}" != 1 ]; then rm -rf scratch; fi; mkdir -p scratch/data
docker compose config --format json > scratch/compose.json     # resolved env (${VARS} from .env), no stdin juggling
UID_ENGINE=$(python3 -c 'import sys,json;print((json.load(open(sys.argv[1]))["services"]["ai-memory"].get("user") or "1000:1000").split(":")[0])' scratch/compose.json)
if [ "${SKIP_EXTRACT:-0}" != 1 ]; then echo "== extracting $BK"; tar -xzf "$BK" -C scratch/data; fi; chown -R "$UID_ENGINE:$UID_ENGINE" scratch
python3 - scratch/compose.json <<'PY' > scratch/engine.env
import sys,json
env=json.load(open(sys.argv[1]))["services"]["ai-memory"]["environment"]
env.update({"AI_MEMORY_EMBEDDING_PROVIDER":"none","AI_MEMORY_LLM_PROVIDER":"","AI_MEMORY_LLM_MODEL":"","AI_MEMORY_LLM_BASE_URL":"",
            "AI_MEMORY_ADMISSION_WEBHOOKS_JSON":"[]","AI_MEMORY_AUTO_IMPROVE__SCHEDULER__ENABLED":"false","AI_MEMORY_IN_CONTAINER":"1"})
sys.stdout.write("".join(f"{k}={v}\n" for k,v in env.items() if v is not None))
PY
chmod 600 scratch/engine.env scratch/compose.json
echo "== booting $IMG (network none, port $PORT)"
docker run -d --name "$NAME" --network none -u "$UID_ENGINE:$UID_ENGINE" -v "$DIR/scratch/data:/data" --env-file scratch/engine.env \
  "$IMG" serve --transport http --bind "127.0.0.1:$PORT" --workspace default --project notes >/dev/null
i=0; while [ $i -lt 180 ]; do
  L=$(docker logs "$NAME" 2>&1 | sed -E 's/\x1b\[[0-9;]*m//g')
  if printf '%s' "$L" | grep -q -E 'starting wiki watcher'; then V=OK; break; fi
  if printf '%s' "$L" | grep -q -E '^Error|Error: '; then V=FAILED; break; fi
  sleep 10; i=$((i+1))
done
echo "== verdict: ${V:-TIMEOUT}"
printf '%s\n' "$L" | grep -i -E 'starting|migrat|backup|okf|error|watcher|refinery' | tail -20
ls -lh scratch/data/backups 2>/dev/null || true
echo "== probe (inside the container):"
echo "   docker exec -e AI_MEMORY_SERVER_URL=http://127.0.0.1:$PORT -e AI_MEMORY_AUTH_TOKEN=\$(grep ^AI_MEMORY_AUTH_TOKEN= scratch/engine.env | cut -d= -f2-) $NAME ai-memory status"
echo "== cleanup when done: docker rm -f $NAME && rm -rf $DIR/scratch"
[ "${V:-}" = OK ]

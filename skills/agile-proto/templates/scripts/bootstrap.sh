#!/usr/bin/env bash
# Copies the proto glue (z-proto, scenes, Figma) and injects the canonical
# HTM UI @theme block from THEMING.md — so the proto tracks HTM UI
# evolution without a frozen copy inside this skill.
set -euo pipefail

DEST="${1:?pass the target directory, e.g. planning/<initiative>/proto}"
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HTM_UI_ORIGIN="${HTM_UI_ORIGIN:-https://cdn.jsdelivr.net/gh/djalmajr/htm-ui@main}"
THEMING_URL="${HTM_UI_THEMING:-$HTM_UI_ORIGIN/THEMING.md}"

mkdir -p "$DEST/routes"
cp "$SKILL_DIR/index.html" "$SKILL_DIR/index.css" "$SKILL_DIR/index.js" "$DEST/"
cp "$SKILL_DIR/routes/home.js" "$DEST/routes/"

export DEST THEMING_URL
python3 - <<'PY'
import os, pathlib, re, sys, urllib.request

dest = pathlib.Path(os.environ["DEST"])
url = os.environ["THEMING_URL"]
html_path = dest / "index.html"
html = html_path.read_text(encoding="utf-8")

try:
    with urllib.request.urlopen(url, timeout=20) as response:
        theming = response.read().decode("utf-8")
except Exception as error:
    sys.stderr.write(
        f"warning: could not download {url} ({error}).\n"
        "Paste the <style type=\"text/tailwindcss\"> block from the HTM UI THEMING.md "
        "between the htm-ui-theme markers in index.html.\n"
    )
    sys.exit(0)

block = None
for fence in re.finditer(r"```html\n(.*?)```", theming, flags=re.S):
    body = fence.group(1)
    if "@theme inline" in body and "@custom-variant dark" in body:
        style = re.search(
            r'<style type="text/tailwindcss">.*?</style>',
            body,
            flags=re.S,
        )
        if style:
            block = style.group(0)
            break
if not block:
    sys.stderr.write(
        f"warning: {url} has no HTML fence with @theme inline.\n"
        "Paste the canonical block from the HTM UI THEMING.md into index.html.\n"
    )
    sys.exit(0)
updated, count = re.subn(
    r"<!-- htm-ui-theme:start -->.*?<!-- htm-ui-theme:end -->",
    "<!-- htm-ui-theme:start -->\n    " + block + "\n    <!-- htm-ui-theme:end -->",
    html,
    count=1,
    flags=re.S,
)
if count != 1:
    sys.stderr.write("warning: htm-ui-theme markers missing in index.html.\n")
    sys.exit(0)

html_path.write_text(updated, encoding="utf-8")
print(f"HTM UI theme injected from {url}")
PY

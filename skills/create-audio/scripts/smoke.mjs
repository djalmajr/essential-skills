/**
 * Smoke for create-audio — no GPU weights.
 *
 *   node skills/create-audio/scripts/smoke.mjs
 */
import { execFileSync } from "node:child_process"
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const SKILL = join(__dirname, "..")
const REPO = join(SKILL, "..", "..")
const failed = []
const passed = []

function ok(name) {
  passed.push(name)
  console.log(`ok  ${name}`)
}

function fail(name, err) {
  failed.push(name)
  console.error(`FAIL  ${name}`)
  console.error(`      ${err instanceof Error ? err.message : err}`)
}

function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { encoding: "utf8", ...opts })
}

function checkPackage() {
  const skillMd = readFileSync(join(SKILL, "SKILL.md"), "utf8")
  if (!skillMd.startsWith("---\n")) throw new Error("SKILL.md missing YAML frontmatter")
  const end = skillMd.indexOf("\n---", 4)
  if (end < 0) throw new Error("SKILL.md frontmatter not closed")
  const fm = skillMd.slice(4, end)
  if (!/^name:\s*create-audio\s*$/m.test(fm)) throw new Error("frontmatter name must be create-audio")
  if (!/\/create-audio/.test(fm)) throw new Error("description must include /create-audio")
  ok("package: SKILL.md frontmatter")

  if (SKILL.split("/").pop() !== "create-audio") throw new Error("directory name")
  ok("package: directory name")

  const listed = JSON.parse(readFileSync(join(REPO, "skills.json"), "utf8")).skills?.[0]?.skills ?? []
  if (!listed.includes("create-audio")) throw new Error("skills.json missing create-audio")
  ok("package: skills.json")

  if (!existsSync(join(REPO, "docs/skills/create-audio.md"))) {
    throw new Error("missing docs/skills/create-audio.md")
  }
  ok("package: human doc")

  for (const rel of [
    "templates/generate-vo.py",
    "templates/assemble-audio.mjs",
    "templates/lines.json",
    "templates/DEFAULT.md",
    "references/engines.md",
    "references/gotchas.md",
  ]) {
    if (!existsSync(join(SKILL, rel))) throw new Error(`missing ${rel}`)
  }
  ok("package: templates + references")
}

function checkPrivacy() {
  const hits = []
  const re =
    /\/Users\/|\/home\/|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|Aurora@|marina\.duarte|studio-aurora/i

  function walk(dir, prefix = "") {
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${name.name}` : name.name
      if (name.isDirectory()) {
        if (name.name === "node_modules" || name.name === "__pycache__") continue
        walk(join(dir, name.name), rel)
        continue
      }
      if (rel === "scripts/smoke.mjs" || name.name.endsWith(".pyc")) continue
      if (re.test(readFileSync(join(dir, name.name), "utf8"))) hits.push(rel)
    }
  }
  walk(SKILL)
  if (hits.length) throw new Error(`possible secrets in: ${hits.join(", ")}`)
  ok("privacy: no home paths or credentials")
}

function checkSyntax() {
  run("node", ["--check", join(SKILL, "templates/assemble-audio.mjs")])
  run("python3", ["-m", "py_compile", join(SKILL, "templates/generate-vo.py")])
  JSON.parse(readFileSync(join(SKILL, "templates/lines.json"), "utf8"))
  ok("syntax: templates")
}

function checkAssemble() {
  const work = mkdtempSync(join(tmpdir(), "create-audio-"))
  try {
    copyFileSync(join(SKILL, "templates/assemble-audio.mjs"), join(work, "assemble-audio.mjs"))
    copyFileSync(join(SKILL, "templates/lines.json"), join(work, "lines.json"))
    const vo = join(work, "default-vo")
    mkdirSync(vo)
    const lines = JSON.parse(readFileSync(join(work, "lines.json"), "utf8")).lines
    for (const line of lines) {
      run("ffmpeg", [
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "lavfi",
        "-i",
        "sine=frequency=440:sample_rate=48000:duration=1",
        "-ac",
        "1",
        join(vo, `${line.id}.wav`),
      ])
    }
    run("node", ["assemble-audio.mjs"], { cwd: work, stdio: "inherit" })
    if (!existsSync(join(work, "episode.wav"))) throw new Error("missing episode.wav")
    ok("assemble-audio: episode.wav")
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
}

for (const [name, fn] of [
  ["package", checkPackage],
  ["privacy", checkPrivacy],
  ["syntax", checkSyntax],
  ["assemble", checkAssemble],
]) {
  try {
    fn()
  } catch (err) {
    fail(name, err)
  }
}

console.log(`\n${passed.length} passed, ${failed.length} failed`)
if (failed.length) process.exit(1)

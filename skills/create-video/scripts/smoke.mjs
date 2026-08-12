/**
 * Smoke for create-video — no GPU, no product app, no secrets.
 *
 *   node skills/create-video/scripts/smoke.mjs
 *   PLAYWRIGHT_REQUIRE=/path/to/app/package.json node skills/create-video/scripts/smoke.mjs
 *
 * Always: package lint, syntax, assemble with synthetic media.
 * If Playwright resolves: also record a tiny fixture site.
 */
import { execFileSync, spawn } from "node:child_process"
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { createRequire } from "node:module"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import http from "node:http"

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

function spawnWait(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", ...opts })
    child.on("error", reject)
    child.on("exit", (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${cmd} ${args.join(" ")} exited ${code}`))
    })
  })
}

function ffmpeg(...args) {
  run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args])
}

function probe(path, entries) {
  return run("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    entries,
    "-of",
    "default=noprint_wrappers=1",
    path,
  ]).trim()
}

// ── 1. Package ──────────────────────────────────────────────────────────
function checkPackage() {
  const skillMd = readFileSync(join(SKILL, "SKILL.md"), "utf8")
  if (!skillMd.startsWith("---\n")) throw new Error("SKILL.md missing YAML frontmatter")
  const end = skillMd.indexOf("\n---", 4)
  if (end < 0) throw new Error("SKILL.md frontmatter not closed")
  const fm = skillMd.slice(4, end)
  if (!/^name:\s*create-video\s*$/m.test(fm)) {
    throw new Error("frontmatter name must be create-video")
  }
  if (!/description:/.test(fm) || !/\/create-video/.test(fm)) {
    throw new Error("description must include /create-video trigger")
  }
  ok("package: SKILL.md frontmatter")

  const dirName = SKILL.split("/").pop()
  if (dirName !== "create-video") throw new Error(`dir is ${dirName}`)
  ok("package: directory name")

  const manifest = JSON.parse(readFileSync(join(REPO, "skills.json"), "utf8"))
  const listed = manifest.skills?.[0]?.skills ?? []
  if (!listed.includes("create-video")) {
    throw new Error("skills.json does not list create-video")
  }
  ok("package: skills.json")

  if (!existsSync(join(REPO, "docs/skills/create-video.md"))) {
    throw new Error("missing docs/skills/create-video.md")
  }
  ok("package: human doc")

  const required = [
    "templates/record.mjs",
    "templates/assemble.mjs",
    "templates/beats.json",
    "references/recording.md",
    "references/assembly.md",
    "references/gotchas.md",
    "references/remotion.md",
  ]
  for (const rel of required) {
    if (!existsSync(join(SKILL, rel))) throw new Error(`missing ${rel}`)
  }
  ok("package: templates + references")
}

function checkPrivacy() {
  const skip = new Set(["scripts/smoke.mjs"])
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
      if (
        skip.has(rel) ||
        name.name.endsWith(".mp4") ||
        name.name.endsWith(".webm") ||
        name.name.endsWith(".pyc")
      ) {
        continue
      }
      const text = readFileSync(join(dir, name.name), "utf8")
      if (re.test(text)) hits.push(rel)
    }
  }
  walk(SKILL)
  const doc = join(REPO, "docs/skills/create-video.md")
  if (existsSync(doc) && re.test(readFileSync(doc, "utf8"))) {
    hits.push("docs/skills/create-video.md")
  }
  if (hits.length) throw new Error(`possible secrets/absolute paths in: ${hits.join(", ")}`)
  ok("privacy: no home paths or credentials")
}

function checkSyntax() {
  run("node", ["--check", join(SKILL, "templates/record.mjs")])
  run("node", ["--check", join(SKILL, "templates/assemble.mjs")])
  run("node", ["--check", join(SKILL, "scripts/smoke.mjs")])
  ok("syntax: node templates")

  JSON.parse(readFileSync(join(SKILL, "templates/beats.json"), "utf8"))
  ok("syntax: beats.json")

  const assemble = readFileSync(join(SKILL, "templates/assemble.mjs"), "utf8")
  if (/setpts\s*=\s*0?\.\d+|setpts=PTS\//.test(assemble)) {
    throw new Error("assemble.mjs looks like it speeds up video")
  }
  ok("invariant: assemble never speeds up video")
}

// ── 2. Synthetic assemble ───────────────────────────────────────────────
function writeBeats(work) {
  copyFileSync(join(SKILL, "templates/assemble.mjs"), join(work, "assemble.mjs"))
  copyFileSync(join(SKILL, "templates/record.mjs"), join(work, "record.mjs"))
  copyFileSync(join(SKILL, "templates/beats.json"), join(work, "beats.json"))
}

function writeFakeVo(work) {
  const vo = join(work, "default-vo")
  mkdirSync(vo, { recursive: true })
  const beats = JSON.parse(readFileSync(join(work, "beats.json"), "utf8")).beats
  for (const beat of beats) {
    ffmpeg(
      "-f",
      "lavfi",
      "-i",
      "sine=frequency=440:sample_rate=48000:duration=2",
      "-ac",
      "1",
      join(vo, beat.wav)
    )
  }
}

function writeFakePicture(work, seconds) {
  const clips = join(work, "demo-record", "clips")
  mkdirSync(clips, { recursive: true })
  ffmpeg(
    "-f",
    "lavfi",
    "-i",
    `color=c=0x1e293b:s=1440x900:d=${seconds}:r=30`,
    "-c:v",
    "libvpx",
    "-b:v",
    "800k",
    join(clips, "continuous.webm")
  )
}

function writeFakeBgm(work) {
  const bgm = join(work, "bgm")
  mkdirSync(bgm, { recursive: true })
  ffmpeg(
    "-f",
    "lavfi",
    "-i",
    "sine=frequency=220:sample_rate=48000:duration=20",
    "-ac",
    "2",
    join(bgm, "soft-ambient-pad.wav")
  )
}

function assertMp4(path, { minSec, maxSec }) {
  if (!existsSync(path)) throw new Error(`missing ${path}`)
  const duration = Number.parseFloat(
    probe(path, "format=duration").replace(/^duration=/, "")
  )
  const streams = probe(path, "stream=codec_type")
  if (!streams.includes("codec_type=video")) throw new Error("no video stream")
  if (!streams.includes("codec_type=audio")) throw new Error("no audio stream")
  if (!(duration >= minSec && duration <= maxSec)) {
    throw new Error(`duration ${duration.toFixed(2)}s outside ${minSec}–${maxSec}`)
  }
  return duration
}

function checkAssemble() {
  const work = mkdtempSync(join(tmpdir(), "create-video-"))
  try {
    writeBeats(work)
    writeFakeVo(work)
    // Picture shorter than VO → must freeze, not speed up.
    writeFakePicture(work, 4)
    writeFakeBgm(work)
    run("node", ["assemble.mjs"], { cwd: work, stdio: "inherit" })
    const dur = assertMp4(join(work, "screencast.mp4"), { minSec: 8, maxSec: 16 })
    ok(`assemble+BGM: screencast.mp4 (${dur.toFixed(2)}s)`)

    run("node", ["assemble.mjs"], {
      cwd: work,
      stdio: "inherit",
      env: { ...process.env, NO_BGM: "1", OUT_SUFFIX: "-nobgm" },
    })
    assertMp4(join(work, "screencast-nobgm.mp4"), { minSec: 8, maxSec: 16 })
    ok("assemble: NO_BGM suffix")
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
}

// ── 3. Record (optional) ────────────────────────────────────────────────
function resolvePlaywright() {
  if (process.env.PLAYWRIGHT_REQUIRE && existsSync(process.env.PLAYWRIGHT_REQUIRE)) {
    return process.env.PLAYWRIGHT_REQUIRE
  }
  const guesses = [
    join(process.cwd(), "package.json"),
    join(process.cwd(), "node_modules/playwright/package.json"),
  ]
  for (const file of guesses) {
    if (!existsSync(file)) continue
    try {
      createRequire(file)("playwright")
      return file
    } catch {
      /* try next */
    }
  }
  return null
}

function startFixtureServer() {
  const html = (title, extra = "") => `<!doctype html>
<html data-hydrated="true" lang="en">
<head><meta charset="utf-8"><title>${title}</title>
<style>
  body { font-family: sans-serif; margin: 0; min-height: 1600px; background: #f8fafc; }
  header { padding: 24px; background: #0f172a; color: #fff; }
  main { padding: 32px; }
  button { font-size: 20px; padding: 12px 20px; }
</style></head>
<body>
<header><h1>${title}</h1></header>
<main>
  <p id="copy">Fixture page for create-video smoke.</p>
  ${extra}
</main>
</body></html>`

  const pages = {
    "/": html("Home", `<p>Scroll area</p>`),
    "/example": html(
      "Example",
      `<button type="button" id="start">Start</button>`
    ),
  }

  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://127.0.0.1")
    const body = pages[url.pathname]
    if (!body) {
      res.writeHead(404)
      res.end("not found")
      return
    }
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" })
    res.end(body)
  })

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address()
      resolve({ server, port })
    })
  })
}

async function checkRecord() {
  const parent = resolvePlaywright()
  if (!parent) {
    console.log("skip  record: Playwright not resolved (set PLAYWRIGHT_REQUIRE)")
    return
  }
  try {
    createRequire(parent)("playwright")
  } catch (err) {
    console.log(`skip  record: ${err.message}`)
    return
  }

  const work = mkdtempSync(join(tmpdir(), "create-video-rec-"))
  const { server, port } = await startFixtureServer()
  try {
    writeBeats(work)
    writeFakeVo(work)
    writeFakeBgm(work)
    const recEnv = {
      ...process.env,
      BASE_URL: `http://127.0.0.1:${port}`,
      PLAYWRIGHT_REQUIRE: parent,
    }
    try {
      const { chromium } = createRequire(parent)("playwright")
      const exe = chromium.executablePath()
      if (!existsSync(exe) && !process.env.PLAYWRIGHT_CHANNEL) {
        console.log("record: bundled Chromium missing, using channel=chrome")
        recEnv.PLAYWRIGHT_CHANNEL = "chrome"
      }
    } catch {
      /* launch will surface a real error */
    }
    await spawnWait("node", ["record.mjs"], { cwd: work, env: recEnv })
    const webm = join(work, "demo-record", "clips", "continuous.webm")
    if (!existsSync(webm)) throw new Error("record.mjs did not write continuous.webm")
    const shots = JSON.parse(
      readFileSync(join(work, "demo-record", "shots.json"), "utf8")
    )
    if (shots.mode !== "continuous") throw new Error("shots.mode != continuous")
    if (shots.narrativeOrder?.length !== 4) {
      throw new Error(`expected 4 beats, got ${shots.narrativeOrder}`)
    }
    ok("record: continuous.webm + shots.json")

    run("node", ["assemble.mjs"], { cwd: work, stdio: "inherit" })
    const dur = assertMp4(join(work, "screencast.mp4"), { minSec: 8, maxSec: 30 })
    ok(`record+assemble: screencast.mp4 (${dur.toFixed(2)}s)`)
  } finally {
    await new Promise((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve()))
    )
    rmSync(work, { recursive: true, force: true })
  }
}

async function main() {
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

  try {
    await checkRecord()
  } catch (err) {
    fail("record", err)
  }

  console.log("")
  console.log(`${passed.length} passed, ${failed.length} failed`)
  if (failed.length) process.exit(1)
}

await main()

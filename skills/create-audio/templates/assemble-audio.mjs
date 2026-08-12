/**
 * Concatenate default-vo/*.wav in lines.json order, with breaths.
 *
 *   node assemble-audio.mjs
 *   OUT_FORMAT=mp3 node assemble-audio.mjs
 */
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const cfg = JSON.parse(readFileSync(join(__dirname, "lines.json"), "utf8"))
const VO = join(__dirname, process.env.VO_DIR ?? "default-vo")
const WORK = join(__dirname, "muxed")
const FORMAT = (process.env.OUT_FORMAT ?? "wav").toLowerCase()
const STEM = process.env.OUT_STEM ?? "episode"
const OUT = join(__dirname, `${STEM}.${FORMAT === "mp3" ? "mp3" : "wav"}`)

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: "inherit" })
}

mkdirSync(WORK, { recursive: true })
const parts = []

for (const line of cfg.lines) {
  const wav = join(VO, `${line.id}.wav`)
  if (!existsSync(wav)) throw new Error(`missing ${wav}`)
  parts.push(wav)
  const breath = line.breath ?? 0.3
  if (breath > 0.05) {
    const sil = join(WORK, `breath-${line.id}.wav`)
    run("ffmpeg", [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-f",
      "lavfi",
      "-i",
      "anullsrc=r=24000:cl=mono",
      "-t",
      breath.toFixed(3),
      "-c:a",
      "pcm_s16le",
      sil,
    ])
    parts.push(sil)
  }
}

const norm = []
for (let i = 0; i < parts.length; i++) {
  const out = join(WORK, `part-${String(i).padStart(2, "0")}.wav`)
  run("ffmpeg", [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    parts[i],
    "-ar",
    "48000",
    "-ac",
    "2",
    "-c:a",
    "pcm_s16le",
    out,
  ])
  norm.push(out)
}

const list = join(WORK, "concat.txt")
writeFileSync(list, norm.map((p) => `file '${p}'`).join("\n") + "\n")

const args = [
  "-y",
  "-hide_banner",
  "-loglevel",
  "error",
  "-f",
  "concat",
  "-safe",
  "0",
  "-i",
  list,
]
if (FORMAT === "mp3") {
  args.push("-c:a", "libmp3lame", "-b:a", "192k", OUT)
} else {
  args.push("-c:a", "pcm_s16le", OUT)
}
run("ffmpeg", args)
console.log(`DONE ${OUT}`)

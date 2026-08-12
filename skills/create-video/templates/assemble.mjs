/**
 * Mux continuous.webm + narrative VO + optional BGM.
 * Never speeds up the picture.
 *
 *   node assemble.mjs
 *   BGM_VOLUME=0.28 node assemble.mjs
 *   NO_BGM=1 node assemble.mjs
 */
import { execFileSync } from "node:child_process"
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const cfg = JSON.parse(readFileSync(join(__dirname, "beats.json"), "utf8"))
const PILOT = __dirname
const REC = join(PILOT, cfg.outDir ?? "demo-record")
const VO = join(PILOT, cfg.voDir ?? "default-vo")
const MUX = join(REC, "muxed")
const STEM = process.env.OUT_STEM ?? "screencast"
const FINAL = join(PILOT, `${STEM}.mp4`)
const BGM = process.env.BGM_PATH ?? join(PILOT, "bgm", "soft-ambient-pad.wav")
const BGM_VOLUME = Number(process.env.BGM_VOLUME ?? "0.22")
const SUFFIX = process.env.OUT_SUFFIX ?? ""
const SIZE = cfg.viewport ?? { width: 1440, height: 900 }

function probeDuration(path) {
  const raw = execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      path,
    ],
    { encoding: "utf8" }
  ).trim()
  const n = Number.parseFloat(raw)
  if (Number.isFinite(n) && n > 0) return n
  return Number.NaN
}

/** Playwright/Chrome often writes WebM without a duration index. */
function ensureDuration(path) {
  if (Number.isFinite(probeDuration(path))) return path
  const fixed = path.replace(/(\.[^.]+)$/, ".fixed$1")
  run("ffmpeg", [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    path,
    "-c",
    "copy",
    fixed,
  ])
  if (!Number.isFinite(probeDuration(fixed))) {
    throw new Error(`could not read duration from ${path}`)
  }
  return fixed
}

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: "inherit" })
}

mkdirSync(MUX, { recursive: true })

const continuousRaw = join(REC, "clips", "continuous.webm")
if (!existsSync(continuousRaw)) {
  throw new Error(`missing ${continuousRaw} — run record.mjs first`)
}
const continuous = ensureDuration(continuousRaw)

const voParts = []
const silenceDir = join(MUX, "silence")
mkdirSync(silenceDir, { recursive: true })

for (const beat of cfg.beats) {
  const wav = join(VO, beat.wav)
  if (!existsSync(wav)) throw new Error(`missing ${wav}`)
  voParts.push(wav)
  const breath = beat.breath ?? 0.3
  if (breath > 0.05) {
    const sil = join(silenceDir, `breath-${beat.id}.wav`)
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
    voParts.push(sil)
  }
}

const voNorm = []
for (let i = 0; i < voParts.length; i++) {
  const out = join(MUX, `vo-part-${String(i).padStart(2, "0")}.wav`)
  run("ffmpeg", [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    voParts[i],
    "-ar",
    "48000",
    "-ac",
    "2",
    "-c:a",
    "pcm_s16le",
    out,
  ])
  voNorm.push(out)
}

const voList = join(MUX, "vo-concat.txt")
writeFileSync(voList, voNorm.map((p) => `file '${p}'`).join("\n") + "\n")
const voFull = join(MUX, "vo-full.wav")
run("ffmpeg", [
  "-y",
  "-hide_banner",
  "-loglevel",
  "error",
  "-f",
  "concat",
  "-safe",
  "0",
  "-i",
  voList,
  "-c",
  "copy",
  voFull,
])

const vdur = probeDuration(continuous)
const adur = probeDuration(voFull)
const total = Math.max(vdur, adur)
const videoPad = Math.max(0, total - vdur)
const audioPad = Math.max(0, total - adur)

console.log(
  `continuous v=${vdur.toFixed(2)}s  vo=${adur.toFixed(2)}s  total=${total.toFixed(2)}s`
)

const scale = `fps=30,scale=${SIZE.width}:${SIZE.height}:force_original_aspect_ratio=decrease,pad=${SIZE.width}:${SIZE.height}:(ow-iw)/2:(oh-ih)/2`
const vf =
  videoPad > 0.05
    ? `${scale},tpad=stop_mode=clone:stop_duration=${videoPad.toFixed(3)},format=yuv420p`
    : `${scale},format=yuv420p`

const af =
  audioPad > 0.05
    ? `apad=pad_dur=${audioPad.toFixed(3)},atrim=0:${total.toFixed(3)},asetpts=PTS-STARTPTS`
    : `atrim=0:${total.toFixed(3)},asetpts=PTS-STARTPTS`

const voOnly = join(MUX, "concat-vo-only.mp4")
run("ffmpeg", [
  "-y",
  "-hide_banner",
  "-loglevel",
  "error",
  "-i",
  continuous,
  "-i",
  voFull,
  "-filter_complex",
  `[0:v]${vf},trim=0:${total.toFixed(3)},setpts=PTS-STARTPTS[v];[1:a]${af}[a]`,
  "-map",
  "[v]",
  "-map",
  "[a]",
  "-c:v",
  "libx264",
  "-preset",
  "medium",
  "-crf",
  "18",
  "-c:a",
  "aac",
  "-b:a",
  "192k",
  "-ar",
  "48000",
  "-ac",
  "2",
  "-t",
  total.toFixed(3),
  "-movflags",
  "+faststart",
  voOnly,
])

const outPath = SUFFIX ? join(PILOT, `${STEM}${SUFFIX}.mp4`) : FINAL
const NO_BGM = process.env.NO_BGM === "1" || !existsSync(BGM)
if (NO_BGM) {
  run("cp", [voOnly, outPath])
  console.log(`DONE (no BGM) ${outPath}  ${probeDuration(outPath).toFixed(2)}s`)
  process.exit(0)
}

const dur = probeDuration(voOnly)
const fadeOutStart = Math.max(0, dur - 2.0)
console.log(`mixing BGM vol=${BGM_VOLUME} → ${outPath}`)

run("ffmpeg", [
  "-y",
  "-hide_banner",
  "-loglevel",
  "error",
  "-i",
  voOnly,
  "-stream_loop",
  "-1",
  "-i",
  BGM,
  "-filter_complex",
  [
    `[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=1.0[vo]`,
    `[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=${BGM_VOLUME},afade=t=in:st=0:d=1.2,afade=t=out:st=${fadeOutStart.toFixed(3)}:d=2.0[bg]`,
    `[bg][vo]sidechaincompress=threshold=0.035:ratio=4:attack=30:release=500:makeup=1.05:mix=0.85[bgd]`,
    `[vo][bgd]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[a]`,
  ].join(";"),
  "-map",
  "0:v",
  "-map",
  "[a]",
  "-c:v",
  "copy",
  "-c:a",
  "aac",
  "-b:a",
  "192k",
  "-ar",
  "48000",
  "-ac",
  "2",
  "-t",
  dur.toFixed(3),
  "-movflags",
  "+faststart",
  outPath,
])

try {
  const shots = JSON.parse(readFileSync(join(REC, "shots.json"), "utf8"))
  writeFileSync(
    join(MUX, "assemble-meta.json"),
    JSON.stringify(
      { narrative: cfg.beats.map((b) => b.id), bgmVolume: BGM_VOLUME, outPath, shots },
      null,
      2
    )
  )
} catch {
  /* ignore */
}

console.log(`DONE ${outPath}  duration=${probeDuration(outPath).toFixed(2)}s  BGM=${BGM_VOLUME}`)

/**
 * Continuous UI take for /create-video --type=screencast.
 *
 *   BASE_URL=http://localhost:3000 node record.mjs
 *   DEMO_EMAIL=… DEMO_PASSWORD=… node record.mjs
 *
 * Resolve Playwright from the app that already depends on it, e.g.
 *   NODE_PATH=../apps/web/node_modules node record.mjs
 */
import { createRequire } from "node:module"
import {
  mkdirSync,
  writeFileSync,
  existsSync,
  readdirSync,
  renameSync,
  readFileSync,
} from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(process.env.PLAYWRIGHT_REQUIRE ?? `${__dirname}/package.json`)
const { chromium } = require("playwright")

const cfg = JSON.parse(readFileSync(join(__dirname, "beats.json"), "utf8"))
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000"
const OUT_DIR = process.env.OUT_DIR ?? join(__dirname, cfg.outDir ?? "demo-record")
const VO_DIR = join(__dirname, cfg.voDir ?? "default-vo")
const VIEWPORT = cfg.viewport ?? { width: 1440, height: 900 }
const SLOW_MO = Number(process.env.SLOW_MO ?? "40")
const FORBIDDEN = new RegExp(cfg.forbiddenLabel || "notif|bell|account|profile|logout", "i")

function wavDuration(path) {
  return Number.parseFloat(
    execFileSync(
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
  )
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitHydrated(page) {
  if (!cfg.hydration) return
  await page.waitForSelector(cfg.hydration, { timeout: 30_000 })
}

async function moveCursor(page, x, y, steps = 18) {
  await page.mouse.move(x, y, { steps })
  await page
    .evaluate(([px, py]) => window.__demoSetCursor?.(px, py), [x, y])
    .catch(() => {})
}

async function moveToLocator(page, locator, steps = 20) {
  const box = await locator.boundingBox()
  if (!box) return null
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await moveCursor(page, x, y, steps)
  return { x, y, box }
}

async function clickAt(page, locator, { preMs = 380, postMs = 480 } = {}) {
  await locator.scrollIntoViewIfNeeded().catch(() => {})
  await sleep(100)
  const pos = await moveToLocator(page, locator)
  if (!pos) {
    await locator.click({ timeout: 5_000 }).catch(() => {})
    await sleep(postMs)
    return
  }
  await sleep(preMs)
  await page.mouse.down()
  await sleep(70)
  await page.mouse.up()
  await sleep(postMs)
}

async function typeInto(page, selector, text, delay = 75) {
  const loc = page.locator(selector).first()
  await loc.scrollIntoViewIfNeeded().catch(() => {})
  await moveToLocator(page, loc, 16)
  await sleep(280)
  await loc.click({ timeout: 5_000 })
  await sleep(200)
  await loc.fill("")
  await loc.pressSequentially(text, { delay })
  await sleep(280)
}

async function installCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById("demo-cursor")) return

    const style = document.createElement("style")
    style.id = "demo-cursor-style"
    style.textContent = `
      #demo-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        margin-left: -5px;
        margin-top: -3px;
        pointer-events: none;
        z-index: 2147483646;
        transition: transform 0.05s linear;
        filter: drop-shadow(0 2px 3px rgba(0,0,0,.4));
      }
      #demo-cursor svg { width: 100%; height: 100%; display: block; }
      #demo-cursor.is-down { transform: scale(0.85); }
      html.demo-hide-native, html.demo-hide-native * { cursor: none !important; }
    `
    document.documentElement.appendChild(style)
    document.documentElement.classList.add("demo-hide-native")

    const cursor = document.createElement("div")
    cursor.id = "demo-cursor"
    cursor.innerHTML = `
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2 L4 26 L11 19 L16 30 L20 28 L15 17 L26 17 Z"
          fill="#fff" stroke="#0f172a" stroke-width="1.8" stroke-linejoin="round"/>
      </svg>`
    document.documentElement.appendChild(cursor)

    const place = (x, y) => {
      cursor.style.left = `${x}px`
      cursor.style.top = `${y}px`
    }
    place(36, 36)
    window.__demoSetCursor = place

    document.addEventListener(
      "mousemove",
      (e) => place(e.clientX, e.clientY),
      true
    )
    document.addEventListener(
      "mousedown",
      () => cursor.classList.add("is-down"),
      true
    )
    document.addEventListener(
      "mouseup",
      () => cursor.classList.remove("is-down"),
      true
    )
  })
}

async function afterNav(page) {
  await waitHydrated(page)
  await installCursor(page)
  await sleep(250)
}

function isForbidden(text) {
  return FORBIDDEN.test(text || "")
}

/** Accept `/pattern/i` or a plain string. */
function asRegex(value, fallbackFlags = "i") {
  if (value instanceof RegExp) return value
  const raw = String(value ?? "")
  const wrapped = raw.match(/^\/(.+)\/([a-z]*)$/i)
  if (wrapped) return new RegExp(wrapped[1], wrapped[2] || fallbackFlags)
  return new RegExp(raw, fallbackFlags)
}

async function signIn(page) {
  const spec = cfg.signIn
  if (!spec || !process.env.DEMO_EMAIL || !process.env.DEMO_PASSWORD) return
  await page.goto(`${BASE_URL}${spec.path}`, { waitUntil: "domcontentloaded" })
  await afterNav(page)
  await typeInto(page, spec.emailSelector, process.env.DEMO_EMAIL, 65)
  await typeInto(page, spec.passwordSelector, process.env.DEMO_PASSWORD, 70)
  await clickAt(
    page,
    page.getByRole("button", { name: asRegex(spec.submitName || "sign in") })
  )
  await page.waitForLoadState("domcontentloaded")
  await afterNav(page)
}

async function goRoute(page, route) {
  const url = new URL(page.url())
  if (url.pathname !== route) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" })
  }
  await afterNav(page)
}

function locatorFor(page, action) {
  if (action.selector) return page.locator(action.selector).first()
  if (action.role && action.name) {
    return page.getByRole(action.role, { name: asRegex(action.name) }).first()
  }
  return null
}

async function runAction(page, action) {
  switch (action.type) {
    case "wait":
      await sleep(action.ms ?? 400)
      return
    case "scroll":
      await page.mouse.wheel(0, action.dy ?? 80)
      await sleep(400)
      return
    case "type":
      await typeInto(page, action.selector, action.text, action.delay ?? 75)
      return
    case "click": {
      const loc = locatorFor(page, action)
      if (!loc) return
      if (!(await loc.isVisible().catch(() => false))) return
      const label =
        ((await loc.getAttribute("aria-label")) || "") +
        ((await loc.innerText().catch(() => "")) || "")
      if (isForbidden(label)) return
      if (action.skipIf && asRegex(action.skipIf).test(label)) {
        return
      }
      const disabled = await loc.isDisabled().catch(() => false)
      if (disabled) return
      await clickAt(page, loc, { preMs: 400, postMs: 550 })
      await afterNav(page)
      return
    }
    default:
      return
  }
}

async function playBeat(page, beat) {
  await goRoute(page, beat.route)
  await sleep(500)
  for (const action of beat.actions ?? []) {
    await runAction(page, action)
  }
}

async function main() {
  const beats = cfg.beats
  for (const b of beats) {
    const wav = join(VO_DIR, b.wav)
    if (!existsSync(wav)) throw new Error(`missing VO: ${wav}`)
  }
  mkdirSync(OUT_DIR, { recursive: true })
  mkdirSync(join(OUT_DIR, "clips"), { recursive: true })

  const timeline = beats.map((b) => {
    const audio = wavDuration(join(VO_DIR, b.wav))
    const hold = audio + (b.breath ?? 0.3) + 0.9
    return { ...b, audio, holdMs: Math.ceil(hold * 1000) }
  })

  console.log(`BASE_URL=${BASE_URL}  continuous take`)
  for (const t of timeline) {
    console.log(
      `  ${t.id.padEnd(16)} ${t.route.padEnd(20)} vo=${t.audio.toFixed(2)}s hold=${(t.holdMs / 1000).toFixed(1)}s`
    )
  }

  const launchOpts = { headless: true, slowMo: SLOW_MO }
  if (process.env.PLAYWRIGHT_CHANNEL) {
    launchOpts.channel = process.env.PLAYWRIGHT_CHANNEL
  }
  const browser = await chromium.launch(launchOpts)

  const boot = await browser.newContext({ viewport: VIEWPORT })
  const bootPage = await boot.newPage()
  console.log("signing in…")
  await signIn(bootPage)
  const storageState = await boot.storageState()
  await boot.close()
  writeFileSync(join(OUT_DIR, "storage-state.json"), JSON.stringify(storageState, null, 2))

  const videoDir = join(OUT_DIR, "raw", "continuous")
  mkdirSync(videoDir, { recursive: true })
  const context = await browser.newContext({
    baseURL: BASE_URL,
    viewport: VIEWPORT,
    storageState,
    recordVideo: { dir: videoDir, size: VIEWPORT },
    reducedMotion: "no-preference",
  })
  const page = await context.newPage()
  page.on("framenavigated", async () => {
    try {
      await installCursor(page)
    } catch {
      /* ignore */
    }
  })

  const t0 = Date.now()
  const markers = []

  for (const beat of timeline) {
    const beatStart = Date.now() - t0
    console.log(`→ ${beat.id} @ ${(beatStart / 1000).toFixed(2)}s  [${beat.route}]`)
    const actionStart = Date.now()
    await playBeat(page, beat)
    const rest = beat.holdMs - (Date.now() - actionStart)
    if (rest > 50) await sleep(rest)
    markers.push({
      id: beat.id,
      route: beat.route,
      startMs: beatStart,
      endMs: Date.now() - t0,
      audio: beat.audio,
      breath: beat.breath,
    })
  }

  await sleep(800)
  await page.close()
  await context.close()
  await browser.close()

  const files = readdirSync(videoDir).filter((f) => f.endsWith(".webm"))
  if (!files[0]) throw new Error("no continuous webm")
  const dest = join(OUT_DIR, "clips", "continuous.webm")
  renameSync(join(videoDir, files[0]), dest)

  writeFileSync(
    join(OUT_DIR, "shots.json"),
    JSON.stringify(
      {
        mode: "continuous",
        video: dest,
        totalMs: Date.now() - t0,
        narrativeOrder: timeline.map((t) => t.id),
        markers,
      },
      null,
      2
    )
  )
  console.log("record done", dest)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

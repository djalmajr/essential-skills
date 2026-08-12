# Recording the UI

Playwright `recordVideo` on a **demo script**, not a test with asserts.

## Shape

1. Launch Chromium (`headless: true` is fine; `slowMo ≈ 40`).
2. Context A: sign in, write `storageState`, close. **No video.**
3. Context B: `storageState` + `recordVideo: { dir, size: viewport }`.
4. Play beats in **narrative** order. Per beat: go to the route, do 0–2 allowed actions, hold until VO+breath+slack elapses.
5. Close page/context so Playwright flushes the webm. Rename to `clips/continuous.webm`.
6. Write `shots.json` markers (start/end ms, beat id, route).

Template: [templates/record.mjs](../templates/record.mjs).

## Why continuous

BGM mixed onto concatenated clips clicks at every boundary. One take = one audio bed.

Per-beat files are acceptable only for VO-only rough cuts with `NO_BGM=1`.

## Cursor overlay

Inject after every navigation (including `framenavigated`):

- Hide the native cursor (`cursor: none` on `html` + descendants).
- Fixed 40×40 SVG pointer, drop shadow, `pointer-events: none`, z-index max.
- `window.__demoSetCursor(x, y)` driven from Playwright `mouse.move`.
- Scale down slightly on `mousedown`.

Do not draw extra rings. Native `:hover` / `:focus` / `:active` are the emphasis.

## Motion rules

| Do | Don't |
|---|---|
| Move to the control, pause 300–400 ms, click, pause 450–550 ms | Wander, then return |
| Type with 70–90 ms/char after focusing the field | `fill()` instantly (ok for login off-camera) |
| Wheel-scroll with the cursor parked | Drag the pointer just to "show" the page |
| Skip disabled / occupied / forbidden labels | Click notifications, account, logout |

Keep a `forbidden` regex for labels: notification, bell, account, profile, logout, inbox.

## Hydration

SPA/SSR apps click-before-hydrate. The template waits for `html[data-hydrated='true']` by default. Change `hydration` in `beats.json` to whatever the app exposes (`#root` ready, `data-app-ready`, etc.). Re-install the cursor after nav.

## Login

- Credentials only via `DEMO_EMAIL` / `DEMO_PASSWORD` (or a project-specific env name).
- Never commit them. Never bake them into the skill.
- If the app has an org picker after login, handle it in `signIn` — still off-camera.

## Viewport and video

- Default `1440×900`. Larger is slower and rarely more readable in a tutorial.
- `recordVideo.size` must match the viewport or Playwright letterboxes.
- `reducedMotion: "no-preference"` so the app looks like a normal user session.

## Beat timing

```text
holdMs = ceil((wavDuration + breath + 0.9) * 1000)
```

Play actions first; sleep the remainder. If actions overrun, the next beat starts late — shorten actions, do not speed the mux.

## Seed

The VO will name objects. Those objects must exist. Run the project's demo seed (or a dedicated screencast fixture) before recording. Empty states are only valid if the VO is about emptiness.

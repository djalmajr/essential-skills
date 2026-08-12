# create-video

Create a product video. The **type** picks the engine.

Spoken audio is **`/create-audio`**. This skill does not invent a voice.

## Types

| `--type` | Engine |
|---|---|
| `screencast` | Playwright — live UI |
| `motion` / `promo` / `intro` | [Remotion](https://www.remotion.dev/) — composed frames |

A product lesson stays a screencast. Remotion is titles, motion, promo, or a wrap around a real take — not Ken Burns on screenshots.

## How to use

```text
/create-video
/create-video --type=screencast BASE_URL=http://localhost:3000
/create-video --type=intro
```

## Verify (no GPU)

```bash
node skills/create-video/scripts/smoke.mjs
```

## Install

```bash
bunx skills add djalmajr/skills --skill create-video
```

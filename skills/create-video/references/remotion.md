# Remotion ([remotion.dev](https://www.remotion.dev/))

React → frames → MP4. Use it when the picture is **composed**, not **captured**.

Official start: [docs](https://www.remotion.dev/docs/). Scaffold: `npx create-video@latest` (or `bunx`). Render: `npx remotion render <composition-id>`.

Read the current CLI/docs in-session. Do not freeze stale slugs here.

## When Remotion is the type

| Goal | Why Remotion |
|---|---|
| Intro / end card / title card | Typography and timing are the product |
| Motion graphics, logo sting, lower-third | Needs a timeline, not a browser |
| Promo / changelog recap that is **not** teaching clicks | Designed frames, captions, charts |
| Data-driven or many locales of the same cut | Code + props, rerender |
| Wrap a **real** screencast with titles | `<OffthreadVideo>` / `<Video>` of the Playwright take |

## When Remotion is the wrong type

| Goal | Use instead |
|---|---|
| Teach a real product UI (clicks, typing, routes) | `--type=screencast` |
| One-off Loom / debug take | `--type=screencast` |
| Live third-party flow you cannot mock | `--type=screencast` |
| Audio-only | `/create-audio` |

Do **not** rebuild a product lesson as Ken Burns on screenshots inside Remotion. That is the same failure mode we already rejected. If the viewer must trust the app, capture the app, then optionally compose around that file.

## Hybrid (common)

1. `/create-audio --type=tutorial`
2. `/create-video --type=screencast` → `continuous` / muxed MP4
3. `/create-video --type=motion` (or `promo`) — Remotion composition that plays that MP4, plus titles / captions / end card

Audio still comes from `/create-audio`. In Remotion, import the WAVs or the muxed track; do not invent a second voice.

## Project shape

Keep the Remotion app next to the module, not in this skill:

```text
tmp/video/<module>/
  remotion/          # create-video@latest output (or a dedicated package)
  default-vo/        # from /create-audio
  footage/           # optional screencast MP4
```

Do not vendor a Remotion app inside `djalmajr/skills`. Scaffold when this type is chosen.

## Rules

1. Ask `--type` first. Remotion is a type, not a silent upgrade of screencast.
2. Composition is code: fps, duration, width, height on `<Composition>` (`src/Root.tsx` in the official template).
3. Duration follows the audio or the footage — do not speed the picture to fit.
4. License stock / fonts / music. Same BGM rule as screencast for anything that ships.
5. No API keys or home paths in the composition.

## Review

- For `motion` / `promo` / `intro`: does every frame look designed on purpose?
- If a screencast is embedded: do titles hide the click the VO is naming?
- If you used Remotion *instead* of a screencast: would a staff reviewer say “this is not the real app”? If yes, recut as `--type=screencast`.

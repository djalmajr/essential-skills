# Recording gotchas (do not rediscover)

Voice pitfalls live in `/create-audio`. This page is picture + mux only.

| Mistake | What happens | Do this instead |
|---|---|---|
| Stills + Ken Burns / zoom-pan (ffmpeg **or** Remotion) | Slide deck. Does not teach the product. | `--type=screencast`. Remotion may wrap that take, not replace it. |
| Per-scene clips + BGM | Bed clicks at every cut. | One continuous `recordVideo` take. |
| Speeding up video (`setpts < 1`) | Actions become unreadable. | Freeze last frame or recut. |
| VO names a screen that is not on camera | Viewer thinks the app jumped. | 1 beat = 1 route for the whole line. |
| Navigate away mid-beat then `goto` back | Same as above. | Map allowed actions before recording. |
| File-id order as story order | "List" appears before "create". | Narrative order is independent of `01-` names. |
| Cursor touring the chrome | Decorative / drunk. | Move only to click or type. |
| Fake zoom or drawn rings | Breaks "this is the real app". | Native hover / focus / active. Large cursor overlay. |
| Clicking chrome the VO never named | Noise, sometimes a different screen. | Forbidden-target filter. |
| Empty seed | VO describes objects that are not there. | Seed first. |
| Recording the login | Messy, leaks the flow. | Sign in → `storageState` → new context with video. |
| BGM bed 0.11 + duck ratio 8 | Bed inaudible, then vanishes. | Bed ~0.22, ratio ~4, mix ~0.85. |
| Acting before hydration | Missed clicks. | Wait for the app ready selector. Re-inject cursor on navigate. |

## Review rejects

- VO names a screen that is not visible for the whole line
- Cursor moves without a click or type
- Artificial zoom or drawn emphasis
- Long silence after a sentence while the UI idles
- Video was sped up
- BGM has a hard cut between scenes
- A control the VO never mentioned was clicked
- The story order needs the later beat to understand the earlier one

## Timing that worked

| Thing | Value |
|---|---|
| Breath between VO lines | 0.30–0.50 s |
| Extra hold after VO for the action | ≤ ~1 s (plus ~0.9 s in the recorder) |
| Hover pause before click | 300–400 ms |
| Pause after click | 450–550 ms |
| Type delay | 70–90 ms / char |
| Playwright `slowMo` | ~40 ms |
| Cursor overlay | ~40 px, drop shadow |
| Viewport | 1440×900 |
| Encode | H.264 CRF 18, AAC 192k, 48 kHz, `+faststart` |

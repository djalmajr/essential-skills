# Assembly (mux + BGM)

Template: [templates/assemble.mjs](../templates/assemble.mjs).

Requires `ffmpeg` and `ffprobe` on PATH.

## Pipeline

1. Concat VO WAVs in **narrative** order with short breath silences (0.30–0.50 s).
2. Resample every part to **48 kHz stereo** PCM, then concat.
3. Probe `continuous.webm` vs `vo-full.wav`.
4. `total = max(video, audio)`.
   - Video short → `tpad=stop_mode=clone` (freeze last frame).
   - Audio short → `apad`.
   - **Never** `setpts` < 1.
5. Scale/pad to 1440×900, 30 fps, yuv420p, H.264 CRF 18, AAC 192k, `+faststart`.
6. Mix BGM unless `NO_BGM=1`.

## BGM

| Knob | Default | Why |
|---|---|---|
| Bed volume | **0.22** | 0.11 was inaudible under VO |
| Duck | `sidechaincompress` threshold 0.035, **ratio 4**, attack 30, release 500, makeup 1.05, mix 0.85 | Ratio 8 made the bed vanish |
| Fade in | 1.2 s | Soft start |
| Fade out | 2.0 s at `dur - 2` | Soft end |
| Loop | `-stream_loop -1` | Bed shorter than the video |

Pilot beds can be a generated ambient pad (no vocals). **Shipping** videos need a licensed bed (stock library or original).

```bash
node assemble.mjs
NO_BGM=1 node assemble.mjs
BGM_PATH=./bgm/bed.wav BGM_VOLUME=0.22 node assemble.mjs
BGM_VOLUME=0.28 node assemble.mjs   # more presence; drop if it fights the VO
```

## Env

| Var | Meaning |
|---|---|
| `BGM_PATH` | Audio file for the bed |
| `BGM_VOLUME` | Linear gain on the bed before duck |
| `NO_BGM` | `1` skips the mix |
| `OUT_SUFFIX` | Appended to the output stem (`-bgm028`) |

## What to keep for debug

`demo-record/muxed/assemble-meta.json` — narrative list, BGM volume, shot markers. Useful when a review note says "the cut at 8s is wrong".

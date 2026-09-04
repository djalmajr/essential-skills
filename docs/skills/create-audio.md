# create-audio

Create spoken audio: podcast, tutorial, or voiceover. The skill **asks how** the voice is made (local clone, Grok Voice, OpenAI, …).

## When to use

- Narration for a later video
- Audio-only lesson
- Podcast / spoken newsletter

## How to use

```text
/create-audio
/create-audio --type=podcast
/create-audio --type=tutorial local clone
```

`--type`: `tutorial` · `voiceover` · `podcast`

Need a picture? `/create-video --type=screencast` after `default-vo/` exists.

## Verify (no GPU)

```bash
node skills/create-audio/scripts/smoke.mjs
```

## Install

```bash
bunx skills add djalmajr/skills --skill create-audio
```

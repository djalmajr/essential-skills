# How to create the voice

Ask which row to use. Do not default in silence.

The A/B's two strongest **engines** were **VoxCPM2** and **CosyVoice3**, cloning an approved reference. A set that sounded like a duck was the **reference**, not VoxCPM — clone inherits the ref. Qwen3-TTS was useful as a way to *make* a ref, not as the shipped voice.

## Methods

| Method | When to pick | Ship? | How |
|---|---|---|---|
| **VoxCPM2** (local clone) | Brand VO / tutorial / podcast, offline | Yes — Apache-2.0 | Approve `ref.wav`, then ultimate clone of the set. A bad ref → bad set. |
| **CosyVoice3** (local clone) | Same job, other engine that also passed the ear | Check CosyVoice weights' license | Zero-shot clone of an approved ref. 24 kHz. ModelScope downloads flake (`BlankEN`) — retry. |
| **Grok / xAI Voice** | User wants hosted Grok voice, no local GPU | Vendor ToS | Current xAI Voice API, **one** voice for the whole set. Key in env only (`XAI_API_KEY` or whatever the current SDK uses). Still lock identity + listen to the proof line first. |
| **OpenAI TTS** | User wants OpenAI | Vendor ToS | Current OpenAI audio/speech endpoint, **one** `voice` id. Key in `OPENAI_API_KEY`. Same listen-then-full-set rule. |
| Other hosted (ElevenLabs, …) | User names the vendor | Vendor ToS | One voice id, key in env, never in git. |
| Local Qwen3 CustomVoice **only** | Fast A/B of preset speakers | Yes — Apache-2.0 | Fine for a draft. Residual accent is why the default **clones** it. |
| Local VoxCPM **design** only | Hunting a timbre | Yes — Apache-2.0 | Generate **refs** only; listen to the ref before cloning. An unlucky design take can be thin/nasal — throw the ref away, not the engine. |
| macOS `say` | Time a line, fixture, review of *picture* | — | Not a product voice. |
| Chatterbox | First smoke historically | Check license | `language_id=pt`, calm `exaggeration=0.3` / `cfg=0.6` / `temp=0.6`. |
| Fish Speech S2 | — | **No** (research / non-commercial) | Do not spend setup if it might ship. |
| Orpheus | — | — | English-first. Skip for non-EN. |

Cloud vendors were evaluated and **not** used as the default because local clone allowed A/B, a fixed identity, and no per-second lock-in. Use them when the user asks.

## Local clone (VoxCPM2 or CosyVoice3)

Separate venvs. Do not mix torch stacks.

```text
tmp/tts-qwen3-venv      # pip install qwen-tts soundfile
tmp/tts-voxcpm-venv     # pip install voxcpm soundfile
```

Python 3.12. Apple Silicon: `torch.backends.mps.is_available()` before blaming the model. VoxCPM on MPS: `device="mps"`, `optimize=False`, `load_denoiser=False`, `PYTORCH_ENABLE_MPS_FALLBACK=1` if needed.

### 1. Reference — Qwen3-TTS CustomVoice

```python
from qwen_tts import Qwen3TTSModel
import torch, soundfile as sf

model = Qwen3TTSModel.from_pretrained(
    "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",
    device_map="mps",  # or "cuda" / "cpu"
    dtype=torch.float16,
)
wavs, sr = model.generate_custom_voice(
    text="PROOF SENTENCE IN THE TARGET LANGUAGE.",
    language="Portuguese",
    speaker="Serena",  # listen first; other presets exist
    instruct=(
        "Speak calmly and clearly, like a professional product tutorial narrator. "
        "Soft, steady pace, warm and reassuring, no exaggeration, "
        "no laughter, no extra sounds."
    ),
)
sf.write("ref.wav", wavs[0], sr)
```

Listen to `ref.wav` alone. If the timbre is wrong, do not clone it.

A laugh at end-of-line is a common expressive artifact. Fix: anti-paralinguistic instruct, `temperature≈0.55`, `top_p≈0.8`, regenerate that line.

### 2. Clone the set — VoxCPM2 ultimate

[templates/generate-vo.py](../templates/generate-vo.py):

```python
from voxcpm import VoxCPM
import soundfile as sf

model = VoxCPM.from_pretrained(
    "openbmb/VoxCPM2",
    load_denoiser=False,
    optimize=False,
    device="mps",
)
wav = model.generate(
    text=line_text,
    prompt_wav_path=ref,
    prompt_text=ref_text,
    reference_wav_path=ref,  # ultimate = prompt + reference
    cfg_value=2.0,
    inference_timesteps=10,
)
sf.write(f"{line_id}.wav", wav, model.tts_model.sample_rate)
```

`voxcpm` 2.0.3 `generate()` has **no seed**. 48 kHz.

Validate: ref vs clone of the proof line, then the full set in order.

### What the A/B actually showed

| Tried | Result |
|---|---|
| Qwen3 Serena alone | Consistent, residual non-native accent — usable as a **ref**, not the favorite engine |
| VoxCPM design with a thin/nasal ref | Whole set sounded like a duck — **the ref**, not VoxCPM |
| **VoxCPM2 cloning an approved ref** | One of the two best. Same person on every line |
| **CosyVoice3** zero-shot of the same approved ref | The other best. 24 kHz |

VoiceDesign **reinvents the person every call**. Use it only to hunt a ref: 3–5 refs, listen to refs, lock one, then clone. Short refs (~3–4 s) make clones more nasal — prefer 4–6 s.

## Hosted (Grok / OpenAI / other)

1. Confirm the user wants that vendor (cost + ToS).
2. Read the **current** API docs in-session. Do not hardcode stale URLs or model slugs from this page.
3. One voice / speaker id for the whole script.
4. Key in the environment, never in the repo.
5. Render the proof line, listen, then the set.
6. Write vendor + voice id into `DEFAULT.md`.

Same identity rules as local. Hosted does not excuse a different person per line.

## Listen rejects

Language wrong, not the same person, laugh/squeak, residual accent you did not choose, robotic cadence you can still hear on the proof line.

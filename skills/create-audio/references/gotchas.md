# Audio gotchas (do not rediscover)

Always **ask how** the audio will be created (VoxCPM2, CosyVoice3, Grok Voice, OpenAI, …). The two local engines that won the ear test are **VoxCPM2** and **CosyVoice3**, cloning an approved ref.

| Mistake | What happens | Do this instead |
|---|---|---|
| Ranking VoiceDesign folders of N independent takes | Each line is a different person. You pick takes, not a voice. | Lock one identity, then generate the set. |
| Blaming VoxCPM/CosyVoice for a "duck" set | You ship a cartoon voice and drop a good engine. | Listen to the **ref** alone. If the ref is thin/nasal, replace the ref and clone again. |
| Mixing two refs in one set | Identity drifts line to line. | If the ref changes, regenerate **all** lines. |
| Expressive TTS without a "no laugh" instruction | End-of-line chuckle. | Anti-paralinguistic instruct, `temperature≈0.55`, `top_p≈0.8`, regenerate that line. |
| Short ref (~3–4 s) into a clone | Clone exaggerates nasality. | Prefer a clean 4–6 s proof sentence. |
| Research / non-commercial weights in shippable audio | License problem after you already like the voice. | Apache-2.0 (VoxCPM2, Qwen3-TTS) for anything that might ship. |
| Mixing torch stacks in one venv | Import/runtime hell. | Separate venvs per engine. |
| Using macOS `say` as the brand voice | Sounds like a system prompt. | Timing / placeholder only. |

## Voice-selection method

1. One identity (preset speaker **or** approved take → clone).
2. One proof sentence, same text on every candidate.
3. Rank: language → calm → clear → brand.
4. Only then render the full line set.

## Listen rejects

- Proof line and line 4 are not the same person
- Residual accent you did not choose
- Laugh, squeak, swallow, or double-spoken word
- Wrong language or code-switch mid-line

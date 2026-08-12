#!/usr/bin/env python3
"""Clone a locked reference take across every VO line with VoxCPM2 ultimate.

Usage (from the module folder, venv with voxcpm + soundfile):

    python generate-vo.py --ref ref.wav --ref-text "PROOF SENTENCE." \\
        --lines lines.json --out voxcpm-from-ref-ultimate

lines.json:
    [{ "id": "01-open", "text": "This is the product." }, ...]

Env:
    VOXCPM_DEVICE=mps|cuda|cpu   (default: mps)
"""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ref", required=True, help="Approved reference WAV")
    parser.add_argument("--ref-text", required=True, help="Transcript of the reference")
    parser.add_argument("--lines", required=True, help="JSON list of {id, text}")
    parser.add_argument("--out", required=True, help="Output directory")
    parser.add_argument(
        "--device",
        default=os.environ.get("VOXCPM_DEVICE", "mps"),
    )
    args = parser.parse_args()

    from voxcpm import VoxCPM
    import soundfile as sf

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    lines = json.loads(Path(args.lines).read_text())

    model = VoxCPM.from_pretrained(
        "openbmb/VoxCPM2",
        load_denoiser=False,
        optimize=False,
        device=args.device,
    )

    ref = str(Path(args.ref).resolve())
    for item in lines:
        line_id = item["id"]
        text = item["text"]
        wav = model.generate(
            text=text,
            prompt_wav_path=ref,
            prompt_text=args.ref_text,
            reference_wav_path=ref,
            cfg_value=2.0,
            inference_timesteps=10,
        )
        dest = out / f"{line_id}.wav"
        sf.write(str(dest), wav, model.tts_model.sample_rate)
        print(f"wrote {dest}")


if __name__ == "__main__":
    main()

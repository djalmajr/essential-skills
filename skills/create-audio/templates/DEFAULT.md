# VO default

**Status:** fill this in when a set wins.

| Field | Value |
|---|---|
| **Folder** | `voxcpm-from-ref-ultimate/` |
| **Model** | `openbmb/VoxCPM2` |
| **Mode** | Ultimate clone (prompt audio + transcript + reference) |
| **Reference** | `ref.wav` (approved take of the proof sentence) |
| **Language** | (target language) |
| **Sample rate** | 48 kHz |

`default-vo/` should be a symlink to this folder.

If the reference changes, regenerate every line. Do not mix refs.

# design-workflow

Production-code side of the root `DESIGN.md` (Google DESIGN.md format).
Process-only and project-agnostic: token values, visual priorities, exceptions,
and anti-patterns live in each consumer project's `DESIGN.md` — never in this
skill. `agile-design` reads the same file as the identity source on the prototype side.

## Modes

| Mode | When | What it does |
|---|---|---|
| `contract` (default) | Any UI implementation/review | Conflict precedence (user instruction > DESIGN.md > local patterns > defaults), closed vocabulary (declared tokens/exceptions only), mandatory pre-handoff review (real render, every theme the project declares, reflow, a11y, measurements) |
| `audit` | Local gate or CI | `check-classes.ts` (forbidden classes outside the allowlist) + `check-tokens.ts` (exact YAML↔CSS-var parity), both configured only by the project's DESIGN.md `x-parity` block — deterministic, zero LLM |
| `bootstrap` | New or adopting project | Repeatable convergence: DESIGN.md from the template (a synthesized draft is allowed but human-reviewed before it becomes canonical), agent rule, `x-parity`, vendored scripts, and CI |

## Bootstrap and CI

Bootstrap detects already-versioned config: `.gitlab-ci.yml` selects GitLab CI;
`.github/workflows/` selects GitHub Actions. The skill has no provider preference.
If both exist, the owner chooses which one gets the required gate; if neither
exists, the local gate stays available and CI integration is reported as pending
without inventing infrastructure.

Separate templates live in `templates/ci/gitlab-ci.yml` and
`templates/ci/github-actions.yml`. Both run the same contract with Bun >= 1.2.21:
Google DESIGN.md lint and the two vendored checks in `scripts/design/`.

Re-running bootstrap preserves the project's `DESIGN.md`, equivalent rule, and
pipeline; it only fills missing pieces and compares/refreshes the vendored
scripts. Finish by reporting the status of the contract, rule, `x-parity`,
scripts, CI provider/job, and local run.

## Origin

Distilled from an internal low-code app-builder dashboard redesign (2026-08):
visual-correction rounds converged on three invariants — explicit precedence,
a closed vocabulary with owner-indicated exceptions, and measured browser
verification. The deterministic gate replaces the earlier idea of LLM extraction
(subjective synthesis is not fit for CI).

## Golden rule

An owner visual correction is a new indication: apply it AND record it in the
project DESIGN.md in the same change. That is what stops regression across sessions.

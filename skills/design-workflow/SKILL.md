---
name: design-workflow
description: >
  Production-code side of a project's root DESIGN.md (Google DESIGN.md
  format): process contract for any UI implementation or review, deterministic
  code-vs-tokens parity audit, and per-project bootstrap. Modes:
  --mode=contract (default; load before implementing, restyling, or reviewing
  production UI), --mode=audit (run the parity gate), --mode=bootstrap (set up
  DESIGN.md + rule + CI in a project). Triggers: "contrato de design",
  "auditoria de design", "paridade de tokens", "bootstrap do design workflow",
  /design-workflow. Prototype-side DESIGN.md work (Pen.dev) belongs to
  agile-pen; browser prototypes to agile-proto.
argument-hint: "[--mode=contract|audit|bootstrap] [--project <path>]"
user-invocable: true
metadata:
  short-description: Contrato de UI, paridade código↔DESIGN.md e bootstrap
---

# /design-workflow

The project's root `DESIGN.md` is the single canonical design source
(front-matter tokens are normative; prose sections explain application). This
skill is **process-only and project-agnostic**: every token value, visual
priority, exception, and anti-pattern lives in the consumer project's
`DESIGN.md`, never here. `agile-pen` consumes the same file on the prototype
side; this skill owns the production-code side.

## Project root

All paths are relative to the project being worked on, not the agent's CWD.
The governing `DESIGN.md` is the one at that project's root. Never create or
treat a secondary design file (`.stitch/DESIGN.md`, subfolder copies) as
canonical. With `--project <path>`, prepend it.

## Install, adopt, update

**Install the skill** (per machine/agent, repo-standard mechanism):

```bash
bunx skills add djalmajr/skills --skill design-workflow
```

**Adopt in a project** — new or existing, the path is the same:
`--mode=bootstrap`. The difference is only the starting material:

- *New project*: fill the template from the owner's decisions; `forbidden`/
  `allowed` start empty and grow as the owner sets policy.
- *Existing project*: a synthesized `DESIGN.md` draft from the codebase is
  allowed but MUST be human-reviewed before becoming canonical; seed the
  `allowed` list from what the codebase legitimately uses (owner approves
  each entry), then run the gate and triage findings (fix vs allowlist)
  BEFORE enabling CI — never turn a red gate on.

**Update**:

- Skill itself: `bunx skills add djalmajr/skills --skill design-workflow`
  again (re-installs the current version).
- Consumers: the gate scripts are VENDORED (`scripts/design/`), so consumer
  repos do not auto-update. After a skill update, re-run bootstrap step 4
  (re-copy both scripts) in each consumer; drift check:
  `diff <this-skill-dir>/scripts/check-tokens.ts scripts/design/check-tokens.ts`.
  Re-run both checks green before committing the refresh.
- `DESIGN.md` itself never "updates" from the skill — it is owned by the
  project and evolves only through owner indications.

## Mode: contract (default)

Rules of engagement for any production UI change.

**Precedence when rules conflict** (cite the winner when deciding):

1. Current explicit user instruction in this conversation.
2. Project `DESIGN.md` — tokens, declared exceptions, visual priorities, and
   Do's & Don'ts are project policy.
3. Existing local patterns — the shared component's own variants and the
   nearest real screen.
4. Generic defaults. Never let one override 1–3.

A user correction on a visual detail is a **new indication**: apply it AND
record it in the project `DESIGN.md` (exceptions or Do's & Don'ts) in the same
change, so the next session cannot regress it.

**Closed vocabulary:** only values reachable from the `DESIGN.md` front matter
(directly or via the project's mapped CSS variables) and existing component
variants. Never invent a one-off value, utility, or synonym; a vocabulary gap
is a proposed `DESIGN.md` change, never an inline literal. Exception lists are
exhaustive — ask instead of extrapolating.

**Mandatory pre-handoff review** — render the real result (browser/runtime)
and check, in order: (1) first-read hierarchy; (2) peers share role, size,
weight, alignment; (3) EVERY theme the project declares (light+dark when
both exist; a single-theme project reviews its one theme); (4) reflow at narrow and
wide widths without overflow; (5) focus, accessible names, keyboard path;
(6) every geometry/size claim measured (computed style / bounding box), not
eyeballed. Never mark UI work complete with a failing step.

## Mode: audit

Deterministic parity gate between code and `DESIGN.md`. No LLM judgment in
the gate. Scripts require **Bun >= 1.2** (they use `Bun.YAML`).

Run the bundled scripts **relative to this SKILL.md's own directory** (the
skill may be installed under any harness/user skill root — never assume they
exist inside the consumer repo):

```bash
bun <this-skill-dir>/scripts/check-classes.ts --project <root>
bun <this-skill-dir>/scripts/check-tokens.ts --project <root>
```

In a bootstrapped consumer, prefer the vendored copies at
`scripts/design/` (see bootstrap step 4) — that is what CI runs.

- `check-classes.ts` — scans source for utility classes forbidden by the
  project's `x-parity` front-matter block (e.g. font-size utilities outside
  the declared allowlist). Exits non-zero listing `file:line:token`.
- `check-tokens.ts` — asserts each front-matter token mapped in
  `x-parity.cssVars` is declared with the exact value **in the exact CSS
  scope** (`{selector, var}`; `.dark` mappings for `darkColors`). Semantics:
  top-level selector blocks only; duplicate declarations resolve by CSS
  last-wins (only the effective value is compared); comments/strings are
  masked for structure and declaration lookup while values are extracted
  quote-aware from the original CSS (quoted values with `;`/`{` inside work);
  comparison is lexically EXACT beyond trim/case/whitespace — CSS quotes are
  semantic (`serif` ≠ `"serif"`), so a quoted CSS value must be quoted inside
  the YAML token value (`fontFamily: '"Inter"'`); a target selector nested in
  `@layer`/`@media` is **rejected with an explicit error** — this scanner
  does not resolve at-rule context (move the mapped vars to top level, or
  swap in a real CSS parser).
- Both read configuration ONLY from the project `DESIGN.md` front matter
  (`x-parity`); nothing project-specific lives in this skill. See
  [references/x-parity.md](references/x-parity.md) for the block format.

LLM-based extraction (e.g. Stitch `extract-design-md`) is a bootstrap/audit
*drafting* aid only — subjective and non-deterministic — never part of this
gate.

## Mode: bootstrap

Set a project up as a consumer:

1. `DESIGN.md` at the root from
   [templates/DESIGN.template.md](templates/DESIGN.template.md) — Google
   DESIGN.md format. For an existing codebase, a synthesized draft is allowed
   as a starting point but MUST be human-reviewed before becoming canonical.
   Seed the project-specific sections: visual priorities, exception lists,
   and Do's & Don'ts (this is where product aesthetics live).
2. Agent rule from [templates/rule-snippet.md](templates/rule-snippet.md)
   into the project's rules dir (`.agents/rules/design-workflow.md` or the
   project's canonical location) — unless an equivalent "read root DESIGN.md
   before UI work" rule already exists (do not duplicate).
3. `x-parity` block in the `DESIGN.md` front matter (allowlist starts from
   what the codebase legitimately uses; owner approves).
4. **Vendor the gate**: copy `scripts/check-classes.ts` and
   `scripts/check-tokens.ts` from this skill into the consumer repo at
   `scripts/design/` (versioned — CI runners have no access to the private
   skills checkout) and add the CI job from
   [templates/design-gate.yml](templates/design-gate.yml) (it installs Bun
   via `oven-sh/setup-bun`). Run both once and fix or allowlist findings
   with the owner before enabling the gate. Re-running bootstrap refreshes
   the vendored copies.
5. Optional: serve `DESIGN.md` at a dev-server route (e.g. `/design.md`) so
   external tools fetch the live contract.

## Prompting

Use the harness's structured-question tool when: the governing `DESIGN.md` is
ambiguous between candidates; a vocabulary gap needs a new token/exception
(offer 2–3 concrete options); bootstrap must choose where rules live or
whether to enable CI; audit findings need owner triage (fix vs allowlist).
Free-form for paths and names. In no-pause mode, record these as open
questions and proceed conservatively.

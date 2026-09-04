# plan-goal

Write **one** implementation plan (with a sequential checklist) under
`.agents/plans/`, copy that plan to the clipboard, then return a paste-ready
prompt to execute the goal. The skill does **not** implement and does **not**
start execution.

## When to use

- Non-trivial work that can become a goal: multi-phase, MCP, migration, verifiable acceptance.
- The user runs `/plan-goal`, or asks for "plan and goal" / "prepare the goal" / paste-ready goal text (also PT: "plano e goal").

## How to use

```text
/plan-goal <objective>
```

Example:

```text
/plan-goal close the apigate readiness gap with verifiable acceptance
```

If the objective is omitted, the skill asks once and waits.

## Deliverables

One gitignored markdown, `.agents/plans/<slug>.md`. Create that directory if
needed and add `.agents/plans/` to the repo `.gitignore` when missing (do not
ignore the rest of `.agents/`).

The file holds context, decisions, AS-IS/TO-BE, files, phases, acceptance,
verification, non-goals, and the `Task checklist`. Do not write a second
`*.goal.md`.

Copy the plan file to the system clipboard after writing it (`pbcopy` /
`wl-copy` / `clip`). Then print one self-contained fence citing that path,
branch, deliverable, non-goals, and acceptance. If the product has a goal
runner (`/goal` or equivalent), the user may prefix the fence; `/plan-goal`
never starts that run.

One goal per objective. Phases are ordered checklist items; the implementer
marks `[x]` and continues.

## Install

```bash
bunx skills add djalmajr/skills --skill plan-goal --agent claude-code --agent codex --agent antigravity -g
```

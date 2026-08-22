# plan-goal

Write a long implementation plan plus a Grok `/goal` harness file, then return a
paste-ready `/goal` command. The skill does **not** implement and does **not**
fire `/goal` — the user pastes the text into the TUI.

## When to use

- Non-trivial work that can become a `/goal`: multi-phase, MCP, migration, verifiable acceptance.
- The user runs `/plan-goal`, or asks for "plano e goal" / "prepara o /goal" / "texto para colar no TUI".

## How to use

```text
/plan-goal <objetivo>
```

Example:

```text
/plan-goal fechar o gap de readiness do apigate com aceite verificável
```

If the objective is omitted, the skill asks once and waits.

## Deliverables

Two gitignored markdowns, named from a stable slug of the objective, usually under `plans/sketches/`:

1. Long plan — context, decisions, AS-IS/TO-BE, files, phases, tests, acceptance.
2. `*.goal.md` — Goal kind, numbered acceptance criteria, verification plan, non-goals, assumed scope, approach, checklist, risks.

Closing message: one fence starting with `/goal`, citing both paths, branch, deliverable, non-goals, and acceptance. Do not ask the user to rewrite the objective.

## Install

```bash
bunx skills add djalmajr/skills --skill plan-goal --agent claude-code --agent codex --agent antigravity -g
```

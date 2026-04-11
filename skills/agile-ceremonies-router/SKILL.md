---
name: agile-ceremonies-router
description: Orchestrates light Scrum ceremonies. Use when you need to decide between refinement, sprint planning, or retrospective, or when you need guidance on which ceremony to conduct.
compatibility: opencode
metadata:
  audience: engineering
  workflow: scrum-ceremonies
---

# Scrum Ceremonies (Orchestrator)

Use this skill to decide which Scrum ceremony is appropriate and direct to the correct skill.

Initial context received via slash: $ARGUMENTS

## Scope

This skill organizes three ceremonies, each with a dedicated skill:

| Ceremony | When to use | Skill |
|---|---|---|
| Refinement | Clarify scope, break large items, map dependencies | `/refinement` |
| Sprint Planning | Select items, order execution, record capacity | `/sprint-planning` |
| Retrospective | Consolidate learnings, define improvement actions | `/retro` |

## How to decide

- **Have a large or ambiguous item in the backlog?** → `/refinement`
- **Starting a work cycle?** → `/sprint-planning`
- **Finished a cycle or delivery?** → `/retro`
- **Don't know where to start?** Ask the user for context and direct them.

## Operating rules

- Every ceremony must generate a clear, reusable artifact.
- Avoid vague minutes; prioritize decisions, pending items, owners, and next steps.
- Always convert discussion into verifiable backlog or actions.
- Use concrete language and avoid ambiguous terms like "improve later".

## Process

1. Identify which ceremony the user needs.
2. Direct to the dedicated skill: `/refinement`, `/sprint-planning`, or `/retro`.
3. If the user doesn't know which ceremony, ask for context and suggest.

## Templates

- Refinement: `~/.agents/templates/refinement.md`
- Sprint Planning: `~/.agents/templates/sprint-planning.md`
- Retro: `~/.agents/templates/retro.md`

## Relationship with the flow

```
/refinement → /epic or /story
/sprint-planning → /story or /plan → execution
/retro → improvement actions → next cycle
```

This skill is a router for ceremonies. For the specific ceremony, use `/refinement`, `/sprint-planning`, or `/retro`.

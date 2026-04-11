---
name: agile-retro
description: Conducts retrospective with learnings and improvement actions. Use when a cycle, sprint, or delivery has ended and the team needs to reflect on what worked and what needs to change.
compatibility: opencode
metadata:
  audience: engineering
  workflow: ceremonies
---

# Retrospective

Use this skill to conduct a retrospective that transforms reflection into concrete improvement actions.

Initial context received via slash: $ARGUMENTS

If `$ARGUMENTS` is filled, use as reference (e.g., period, sprint, initiative).
If empty, ask which period or delivery will be analyzed.

## Objective

- Separate facts from opinions
- Identify what worked and what didn't (and why)
- Generate few clear actions with owner and deadline
- Feed process improvement, not just historical memory

## Process

### 1. Collect inputs

Consult:
- Post-implementation reports from the period
- Dailies and status reports
- Sprint review (if it exists)
- Sprint metrics (if it exists)
- User or stakeholder feedback

### 2. Separate facts from opinions

- **Facts:** what happened (deliveries, blockers, deviations, metrics)
- **Perceptions:** how the team/individual felt about the process

### 3. Analyze

- **What worked well:** practices, tools, decisions that yielded results
- **What didn't work:** what caused friction, delay, or rework
- **Why:** root cause, not just symptom

### 4. Define actions

- Limit to 2-3 actions per retro (focus > quantity)
- Each action must have:
  - Specific description
  - Responsible owner
  - Deadline
  - How to verify the improvement happened

### 5. Connect to next cycle

- How will these actions be observed in the next sprint/delivery?
- Does any action become a backlog item?

## Where to save

- `planning/<initiative>/retro.md` if it's a retro for an initiative
- `planning/retros/retro-YYYY-MM-DD.md` if it's a sprint/period retro

## Chaining

- If actions generate new stories: suggest `/story` or `/plan`
- If actions change process: suggest updating rules or skills
- If the cycle restarts: suggest `/sprint-planning`

## Reference template

Use `~/.agents/templates/retro.md` as base.

## Rules

- Retro is not venting or meeting minutes. It's an improvement tool.
- Actions must be specific and executable, not vague ("improve communication" is not an action).
- Each action must have an owner. Action without owner won't happen.
- Limit actions to 2-3 per retro. Many actions = none executed.
- If the same action appears in consecutive retros, the problem is deeper — discuss root cause.

## Relationship with the flow

```
/post-impl → /retro → improvement actions → next cycle
```

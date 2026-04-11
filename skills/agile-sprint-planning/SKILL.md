---
name: agile-sprint-planning
description: Plans sprint by selecting items from backlog, defining objective, capacity, and execution order. Use at the beginning of a work cycle to align what will be done.
compatibility: opencode
metadata:
  audience: engineering
  workflow: ceremonies
---

# Sprint Planning

Use this skill to plan a work cycle (sprint) with clear objective, selected items, and execution order.

Initial context received via slash: $ARGUMENTS

If `$ARGUMENTS` is filled, use as reference (e.g., epic, backlog, period).
If empty, ask which backlog or initiative will be planned.

## Objective

- Declare the sprint objective
- Select backlog items based on value, risk, and dependency
- Record capacity and constraints
- Define execution order and highlight blockers
- Validate that each item has Definition of Ready

## Process

### 1. Declare objective

- What should the sprint deliver as an observable result?
- One phrase that guides trade-off decisions during the sprint

### 2. Review backlog

Consult:
- Epic with pending stories
- Refinement with proposed items
- Retro with pending improvement actions

### 3. Select items

For each selected item, register:
- Name and objective
- Estimated size
- Value (why now?)
- Dependencies and blockers

### 4. Validate DoR

Each item must have:
- Clear problem and objective
- Scope and out of scope recorded
- Files/areas mapped
- Verifiable acceptance criteria

If an item doesn't have DoR, it doesn't enter the sprint — goes back to refinement.

### 5. Order execution

- What must be done first (unblocks the rest)?
- What can run in parallel?
- What is the critical path?

### 6. Register commitments

- Available capacity (days, constraints)
- Sprint commitment (selected items)
- What is left out (postponed items)

## Where to save

- `planning/sprints/sprint-YYYY-MM-DD.md`
- Or `planning/<initiative>/sprint.md` if the sprint is dedicated to an initiative

## Chaining

- To detail the first story: suggest `/story` or `/plan`
- For items that need refinement: suggest `/refinement`

## Reference template

Use `~/.agents/templates/sprint-planning.md` as base.

## Rules

- Don't select more items than capacity allows. Over-commitment generates frustration and inconsistency.
- Each item must have DoR. Without DoR, it doesn't enter the sprint.
- The sprint objective must be observable, not vague.
- Dependencies must be explicit — don't assume "it will fit".
- Sprint planning feeds execution. If planning doesn't generate clarity, execution will suffer.

## Relationship with the flow

```
/retro → /sprint-planning → /story or /plan → execution → /daily → /post-impl
```

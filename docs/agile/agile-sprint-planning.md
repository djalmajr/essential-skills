# Sprint Planning

Plans a work cycle with clear objective, selected items, and execution order.

## When to use

- At the start of a sprint or cycle
- To select items from the backlog
- To declare capacity and constraints

## When NOT to use

- Problem not defined → `/intake`
- Large item needing to break → `/refinement`
- Strategic direction → `/roadmap`

## How to use

```
/sprint-planning
```

With context (epic, backlog, period):

```
/sprint-planning Sprint 23 - based on epic-payment.md
/sprint-planning Q2 2026 - 2 weeks
```

## What sprint planning includes

1. **Sprint objective** — observable result in one sentence
2. **Selected items** — with size, value, and dependencies
3. **DoR validation** — each item has everything needed to be executed
4. **Execution order** — blockers and dependencies mapped
5. **Capacity** — constraints, vacations, holidays

## Tip

If an item doesn't have Definition of Ready, **it doesn't enter the sprint** — goes back to refinement.

## Chaining

- Sprint items → `/story` or `/plan` for detailing
- During sprint → `/daily` for tracking
- End of sprint → `/sprint-review` and `/retro`

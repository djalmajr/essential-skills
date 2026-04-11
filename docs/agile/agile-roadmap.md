# Roadmap Planning

Transforms broad objectives into clear, prioritized roadmaps connected to the backlog.

## When to use

- Quarterly direction alignment
- Large initiative with phases and dependencies
- Need to organize macro priorities

## When NOT to use

- Problem not yet defined → use `/intake` first
- Small and localized item → use `/plan`
- Already have epic with defined roadmap → use `/refinement`

## How to use

```
/roadmap-planning
```

With context (period objective, initiative list):

```
/roadmap-planning Q2 2026 - Payments Platform
```

## Roadmap types

### Quarterly roadmap
- 2-5 main initiatives
- Ordered by value and dependency
- Explicit risks and constraints

### Epic roadmap
- Delivery phases/waves
- Stories related by phase
- Intermediate unblocks and validations

## Tip

Roadmap should focus on **results and capabilities**, not technical lists. Each item should indicate expected value and progress signal.

## Chaining

- First initiative of roadmap → `/refinement`
- Want to create epic? → `/epic`

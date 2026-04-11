# Retrospective

Leads a retrospective that transforms reflection into concrete improvement actions.

## When to use

- Cycle or sprint ended
- Important delivery was closed
- Team identifies recurring problems
- After `/sprint-review`

## When NOT to use

- Sprint still in progress
- Need for quick status → `/daily`
- Consolidation for stakeholders → `/sprint-review`

## How to use

```
/retro
```

With context (period, sprint, delivery):

```
/retro Sprint 23
/retro payment-gateway concluded
```

## What the retro includes

1. **Input collection** — dailies, post-impls, metrics, feedback
2. **Facts vs Opinions** — what happened vs how the team felt
3. **Analysis** — what worked, what didn't, and why
4. **Actions** — 2-3 actions with owner, deadline, and how to verify
5. **Connection to next cycle** — how actions will be observed

## Tip

Limit to **2-3 actions per retro**. Focus > quantity. Each action must have owner and deadline.

## Chaining

- Retro actions → feed `/sprint-planning` of next sprint
- Metrics → `/sprint-metrics`

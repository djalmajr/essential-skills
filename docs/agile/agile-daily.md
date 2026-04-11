# Daily Delivery

Generates daily status with progress, blockers, and next steps.

## When to use

- Every day, to maintain traceability
- When you need to record progress
- To communicate progress to the team

## When NOT to use

- Period consolidation → `/status-report`
- Delivery closure → `/post-impl`
- Sprint ended → `/sprint-review`

## How to use

```
/daily
```

With context (initiative, issue, active plan):

```
/daily payment-gateway
/daily sprint-23
```

## What the daily includes

1. **In progress** — what's being done now
2. **Completed** — progress since last cycle
3. **Blockers** — with impact, owner, and next action
4. **Risks** — signs of something that may cause delays
5. **Next step** — observable and verifiable

## Tip

Blockers must always have: **impact + owner + next action**. "It's blocked" without this is not actionable.

## Chaining

- Critical blocker → suggest escalating or adjusting the plan
- Delivery close to finishing → `/post-impl`
- Period needs consolidation → `/status-report`

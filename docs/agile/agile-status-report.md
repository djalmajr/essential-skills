# Status Report

Consolidates status of a period or milestone with deliveries, deviations, risks, and next steps.

## When to use

- Consolidate progress of a period
- Report to stakeholders
- Important delivery milestone
- Alignment meeting

## When NOT to use

- Quick daily status → `/daily`
- Formal delivery closure → `/post-impl`
- Sprint ended → `/sprint-review`

## How to use

```
/status-report
```

With context (initiative, period, milestone):

```
/status-report Sprint 23 - Week 1
/status-report payment-gateway - milestone Q2
```

## What the status report includes

1. **Completed** — deliveries finalized in the period
2. **In progress** — with expectation of when it ends
3. **Deviations** — scope changes, delays, cuts
4. **Risks and blockers** — with impact and owner
5. **Decisions needed** — what needs alignment
6. **Next steps** — with responsible party

## Tip

Distinguish **completed** from **in progress**. "We finished 80%" is not status — either it ended or it didn't.

## Chaining

- Next step is closing delivery → `/post-impl`
- Sprint period ended → `/sprint-review`
- Need quick status → `/daily`

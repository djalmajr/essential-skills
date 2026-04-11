# Sprint Metrics

Extracts objective metrics from a sprint to feed retro and decisions.

## When to use

- End of sprint, before review or retro
- When the team needs data to discuss performance
- To compare sprints and identify trends
- To calibrate planning capacity

## When NOT to use

- Sprint in progress → wait for end
- Quick status → `/daily`
- Consolidation for stakeholders → `/sprint-review`

## How to use

```
/sprint-metrics
```

With context (sprint, period):

```
/sprint-metrics Sprint 23
/sprint-metrics Q2 2026
```

## Metrics that sprint metrics includes

### Delivery
- Planned vs delivered stories
- Completion rate (%)
- Scope creep (items added)
- Items removed or deferred

### Quality
- Bugs found during sprint
- Post-delivery bugs
- Lint/typecheck/tests at closing

### Flow
- Registered blockers
- Average story time (start → done)
- Stories that came back from done

### Process
- Dailies performed vs expected
- Post-impls generated

## Tip

Data > impressions. Metrics feed discussion but don't replace conversation.

## Chaining

- Generated metrics → feed `/retro`
- Next sprint → calibrate `/sprint-planning`

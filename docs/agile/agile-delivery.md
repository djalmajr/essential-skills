# Delivery Management (Router)

Decides which type of tracking is appropriate for the situation.

## When to use

When you need tracking but don't know which type to use.

## How to use

```
/delivery-management
```

With context:

```
/delivery-management Sprint 23 in progress
/delivery-management We closed feature X
```

## Tracking types

| Type | When to use | Skill |
|------|-------------|-------|
| Daily Delivery | Quick daily status | `/daily` |
| Status Report | Period or milestone consolidation | `/status-report` |
| Post-Implementation | Formal delivery closure | `/post-impl` |

## Decision tree

| Situation | What to use |
|----------|------------|
| Day-to-day status | `/daily` |
| Consolidate week/sprint | `/status-report` |
| Delivery ended and needs closure | `/post-impl` |
| Don't know where to start | Describe the context |

## Tip

Every update should reflect **real state**, not optimistic intent. "I will do" is not status.

## Flow relationship

```
/plan → execution → /daily → ... → /status-report → /post-impl → /retro
```

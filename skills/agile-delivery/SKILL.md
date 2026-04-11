---
name: agile-delivery
description: Orchestrates delivery tracking. Use when you need to decide between daily, status report, or post-implementation report, or when you need guidance on how to track a delivery.
compatibility: opencode
metadata:
  audience: engineering
  workflow: delivery-management
---

# Delivery Management (Orchestrator)

Use this skill to decide which type of tracking is appropriate and direct to the correct skill.

Initial context received via slash: $ARGUMENTS

## Scope

This skill organizes three types of tracking, each with a dedicated skill:

| Type | When to use | Skill |
|---|---|---|
| Daily Delivery | Daily status, progress, and blockers | `/daily` |
| Status Report | Period or milestone consolidation | `/status-report` |
| Post-Implementation Report | Delivery closure with verification | `/post-impl` |

## How to decide

- **Need a quick daily status?** → `/daily`
- **Need to consolidate a period or milestone?** → `/status-report`
- **Delivery finished and needs to be closed?** → `/post-impl`
- **Don't know where to start?** Ask the user for context and direct them.

## Operating rules

- Every update must reflect real state, not optimistic intention.
- Blockers must always have impact, owner, and next action.
- Tracking execution does not replace the plan; it shows progress against the plan.

## Process

1. Identify which type of tracking the user needs.
2. Direct to the dedicated skill: `/daily`, `/status-report`, or `/post-impl`.
3. If the user doesn't know which type, ask for context and suggest.

## Templates

- Daily: `~/.agents/templates/daily-delivery.md`
- Status Report: `~/.agents/templates/status-report.md`
- Post-Implementation: `~/.agents/templates/post-implementation-report.md`

## Relationship with the flow

```mermaid
flowchart LR
    A[plan] --> B[execution]
    B --> C[daily]
    C --> D[...]
    D --> E[status-report]
    E --> F[post-impl]
    F --> G[retro]
```

This skill is a router for tracking. For the specific type, use `/daily`, `/status-report`, or `/post-impl`.

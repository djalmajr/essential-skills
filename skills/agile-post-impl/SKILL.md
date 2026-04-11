---
name: agile-post-impl
description: Generates post-implementation report with result, executed verifications, risks, and next steps. Use when a delivery (plan, story, or epic) has been completed and needs to be formally closed.
compatibility: opencode
metadata:
  audience: engineering
  workflow: delivery
---

# Post-Implementation Report

Use this skill to close a delivery with objective verification, remaining risks, and next steps.

Initial context received via slash: $ARGUMENTS

If `$ARGUMENTS` is filled, use as reference (e.g., plan, story, issue).
If empty, try to identify the active plan or ask.

## Objective

- Consolidate what was delivered against the original plan
- Record executed verifications and actual results
- Make remaining risks and pending items explicit
- Close the delivery with clear handoff

## Process

### 1. Identify the delivery

- Which plan, story, or epic is being closed?
- Read the plan and compare with current state

### 2. Compare plan vs result

- **What was delivered:** completed tasks (reference the checklist)
- **What was left pending:** incomplete tasks and reason
- **Scope changes:** what changed during implementation

### 3. Execute verifications

Run and record actual results:

- `bun run lint` — result
- `bun run typecheck` or `tsc --noEmit` — result
- `bun test` — result (if tests exist)
- Manual validation — what was verified and how

### 4. Record risks and next steps

- Remaining risks (what could go wrong)
- Next steps (what still needs to be done)
- Handoff (who needs to know about this delivery)

## Where to save

- `planning/<initiative>/post-impl.md` or `planning/<initiative>/post-impl-YYYY-MM-DD.md`
- If it's a standalone plan: present inline

## Chaining

- If there are next steps that become new stories: suggest `/story` or `/plan`
- If the period ended: suggest `/retro`
- If part of an epic: update story status in the epic

## Reference template

Use `~/.agents/templates/post-implementation-report.md` as base.

## Rules

- **Always run** lint, typecheck, and tests. Don't assume they pass.
- Report actual results, not intention. If lint failed, say it failed.
- If tasks were left pending, explain why.
- The report must allow another person to understand the delivery state without additional context.

## Relationship with the flow

```
/plan → execution → /post-impl → /retro
```

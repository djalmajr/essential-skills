# Post-Implementation Report

Closes a delivery with objective verification, remaining risks, and next steps.

## When to use

- When a plan, story, or epic was completed
- To formally close a delivery
- Before marking something as "done"

## When NOT to use

- Quick daily status → `/daily`
- Period consolidation → `/status-report`
- Sprint still in progress → wait for end

## How to use

```
/post-impl
```

With context (plan, story, issue):

```
/post-impl plan-payment-gateway.md
/post-impl story-123.md
```

## What post-impl includes

1. **Delivery vs Plan** — what was delivered vs what was expected
2. **Verifications executed** — with real results (not just "passed")
3. **Pending items** — what was not completed and why
4. **Scope changes** — what changed during implementation
5. **Remaining risks** — what could go wrong
6. **Next steps** — clear handoff

## Typical verifications

```bash
bun run lint
bun run typecheck
bun test
# Manual validation...
```

## Tip

Record **real results**, not just "passed". "lint: 0 errors, 0 warnings" is better than "lint passed".

## Chaining

- After post-impl → `/sprint-review` (if end of sprint)
- Next cycle → `/retro`

# Epic

Structures large initiatives into story backlogs with roadmap, dependencies, and verification.

## When to use

- After `/refinement` that generated multiple stories
- Initiative with size L or XL
- There are dependencies between deliveries
- Need a roadmap to guide sequence

## When NOT to use

- Work fits in one story → use `/story`
- Small and localized work → use `/plan`
- Problem not yet analyzed → use `/intake` or `/refinement` first

## How to use

```
/epic
```

With context (refinement, intake, description):

```
/epic plugins/payment/refinement.md
/epic Implement JWT authentication on the API
```

## What the epic includes

1. **Context** — AS-IS, TO-BE, out of scope
2. **Story backlog** — with size and dependencies
3. **Roadmap** — phases, unblocks, validations
4. **Risks** — what could go wrong and mitigation
5. **Epic acceptance criteria** — how to know it's complete

## Tip

Epic doesn't replace plan — it guides execution. Each story within the epic still needs `/plan` or `/story` before implementation.

## Chaining

- Epic stories → `/refinement` to detail
- Want to break into stories → `/story` for each one

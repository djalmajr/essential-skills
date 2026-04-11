# Refinement

Transforms large intakes or backlogs into executable stories with clear dependencies.

## When to use

- After `/intake` that recommended refinement
- Backlog item too large (L or XL)
- There's ambiguity about scope or order
- Before creating `/epic` with multiple stories

## When NOT to use

- Item already clear and executable → use `/story`
- Small and localized work → use `/plan`
- Problem not yet captured → use `/intake`

## How to use

```
/refinement
```

With context (intake path, backlog, description):

```
/refinement planning/payment-intake.md
/refinement backlog.md
```

## What refinement includes

1. **Analysis** — macro problem, impacted areas, constraints
2. **Decomposition axes** — vertical value slice (not by layer)
3. **Story backlog** — each with:
   - Objective
   - Estimated size
   - Dependencies
   - Acceptance criteria

## Tip

Break by **observable value**, not by technology. Each story should deliver something someone can see working.

## Chaining

- Stories result in `/story` or `/plan` depending on size
- Large initiative with multiple stories → `/epic`

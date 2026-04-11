# Plan

Creates a simple execution plan for localized changes.

## When to use

- Small work (XS, S)
- Few files impacted
- Delivery fits in a single cycle
- Already detailed story that needs an operational plan

## When NOT to use

- Medium or large work → `/story` or `/epic`
- Problem not yet clear → `/intake`
- Multiple dependent deliveries → `/epic`

## How to use

```
/plan
```

With context (story, issue, description):

```
/plan story-123.md
/plan Add email validation on the registration form
```

## What the plan includes

1. **Context** — problem, objective, constraints
2. **Files** — exact paths with action (read/alter/create)
3. **Details** — AS-IS, TO-BE, scope, approach
4. **Tasks** — verifiable checklist
5. **Verification** — commands and validations

## Tip

Plan should be **proportional to size**. For XS/S, keep it simple. Don't over-engineer.

## Chaining

- After plan → `/scan-review` before committing
- Critical blocker → suggest escalating
- Delivery close to finishing → `/post-impl`

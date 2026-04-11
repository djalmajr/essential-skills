# Story

Details a vertical delivery with acceptance criteria, tasks, and verification.

## When to use

- Work with size M (multiple files)
- Delivery that needs richer acceptance criteria
- Story from an epic detailed before execution
- Bug fix with regression risk

## When NOT to use

- Small work (XS, S) → `/plan`
- Initiative with multiple stories → `/epic`
- Problem not yet analyzed → `/intake` or `/refinement`

## How to use

```
/story
```

With context (epic, description, issue):

```
/story epic-payment.md
/story Implement logout with token invalidation
```

## What the story includes

1. **Context** — where it comes from, objective within the epic
2. **Scope** — in scope and out of scope
3. **Impacted files** — with action (read/alter/create)
4. **Acceptance criteria** — observable and verifiable
5. **Tasks** — verifiable in vertical slices
6. **Verification strategy** — how to validate it works

## Tip

Each acceptance criterion must be **observable** — "it must work" is not a criterion. "User can log in with valid email" is.

## Chaining

- Before implementing → `/plan` for operational plan
- After implementing → `/scan-review` and `/post-impl`

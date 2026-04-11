# Scan Review

Reviews changed code applying a checklist of security, coherence, over-engineering, scope, and quality.

## When to use

- Before committing
- When opening Pull Request
- When reviewing AI-generated code
- When doing code review of colleagues

## When NOT to use

- Code was not changed
- It's just formatting/cosmetic
- Changes are trivial (typos, comments)

## How to use

```
/scan-review
```

With scope (branch, files, diff):

```
/scan-review feature-payment
/scan-review src/api/payment.ts src/utils/validator.ts
```

Without argument, analyzes the current working tree.

## Checklist

### Security
- [ ] Inputs validated and sanitized
- [ ] No SQL injection, XSS, command injection
- [ ] No hardcoded secrets
- [ ] Correct auth and authorization

### Coherence with project
- [ ] Follows repository patterns
- [ ] Uses existing components/utilities
- [ ] Consistent naming
- [ ] Imports follow conventions

### Over-engineering
- [ ] No premature abstractions
- [ ] No handling for impossible cases
- [ ] No generalization for hypothetical requirements

### Scope
- [ ] Only does what was requested
- [ ] No unrelated refactoring
- [ ] No unsolicited features

### Quality
- [ ] Tests cover acceptance scenarios
- [ ] Readable code
- [ ] Small functions with single responsibility
- [ ] No duplication

## Tip

Read the diff **completely** before issuing any results. Security or scope issues justify rejection.

## Mandatory verifications

```bash
bun run lint
bun run typecheck
bun test
```

---
name: agile-tdd
description: Guide TDD workflow and testing strategy. Use when implementing features with tests, writing new tests, or establishing test coverage. Triggers on "TDD", "write tests", "test coverage", "red-green-refactor".
compatibility: opencode
metadata:
  audience: engineering
  workflow: testing
---

# TDD (Test-Driven Development)

Guide the Red-Green-Refactor cycle and pragmatic testing strategy. "Write tests. Not too many. Mostly integration."

Initial context received via slash: $ARGUMENTS

If `$ARGUMENTS` is filled (e.g., module name, feature description), use as starting point.
If empty, ask what will be tested.

## Language

Write artifacts and test descriptions in the user's language. When in doubt, ask. Test code itself (function names, assertions) stays in English.

## When to use

- Starting a new feature with TDD
- Adding tests to existing code
- Establishing test coverage for a module
- Unclear whether something needs unit, integration, or E2E tests

## When NOT to use

- Quick prototypes where tests add no value -- use `/agile-proto`
- Throwaway scripts
- Pure documentation changes

## TDD cycle

1. **Red** -- write a failing test that describes the desired behavior
2. **Green** -- write the minimum code to make it pass
3. **Refactor** -- improve structure without changing behavior
4. Repeat

Present each step explicitly. Do not skip Red -- the test must fail first.

## Test pyramid (pragmatic)

| Layer | Target | Focus |
|---|---|---|
| Unit | 60% | Pure functions, transformers, utils |
| Integration | 30% | Services, DB interactions, API routes |
| E2E | 10% | Critical user flows |

Overall coverage target: 75%+.

## File structure

- **Unit:** co-located with source (`foo.test.ts` beside `foo.ts`)
- **Integration/E2E:** `tests/` with `integration/`, `e2e/`, `helpers/`, `fixtures/`, `mocks/`
- **Naming:** `.test.ts` (unit/integration), `.e2e.test.ts` (E2E)
- **Never** `.spec.ts`

## Rules

- AAA pattern (Arrange / Act / Assert)
- One concept per test
- Descriptive names that read as sentences
- **Always** use factories (e.g., `faker`) over hardcoded data
- Isolate with `beforeEach` -- no shared state between tests
- Test behavior, not implementation details

## Anti-patterns (avoid)

- Interdependent tests (test A depends on test B running first)
- Arbitrary `sleep(ms)` -- use proper waits
- Testing private methods -- test through public API
- `console.log` in tests -- use proper assertions
- Order-dependent tests
- Mocking what you own (mock external dependencies, not your own code)

## Coverage targets (granular)

| Area | Target |
|---|---|
| Transformers / pure functions | 90%+ |
| Utils | 85%+ |
| Services | 80%+ |
| Routes / handlers | 70%+ |

## Commands (Bun)

```
bun test
bun test --watch
bun test --coverage
bun test --filter "name"
bun test src/dir/
```

Adjust for other runtimes (vitest, jest) as needed. Detect the project's test runner from `package.json` or config files before suggesting commands.

## Process

### 1. Understand what to test

Explore the code to understand:
- What module or feature needs tests
- What behaviors are critical
- What is already covered (check existing tests)

### 2. Choose the right test type

Use the test pyramid as guide:
- Pure function with no side effects? Unit test.
- Service that talks to DB or external API? Integration test.
- Critical user flow that spans multiple systems? E2E test.

### 3. Execute the TDD cycle

For each behavior:
1. Write the failing test (Red)
2. Implement the minimum code (Green)
3. Refactor if needed
4. Verify the test still passes

### 4. Verify coverage

Run coverage and check against targets. Fill gaps in critical areas first.

## Chaining

- During feature implementation: work inside the `/agile-story` checklist
- After implementation: `/agile-refinement` to review test quality
- Before closing: ensure tests are part of `/agile-status` (closure mode) verification

## Relationship with the flow

```mermaid
flowchart LR
    A["/agile-story"] --> B[TDD cycle]
    B --> C[Red: failing test]
    C --> D[Green: minimum code]
    D --> E[Refactor]
    E --> F{More?}
    F -->|Yes| C
    F -->|No| G["/agile-refinement"]
```

This skill operates during execution. It pairs with `/agile-story` (which defines what to build) and feeds into `/agile-refinement` (which validates the result).

# agile-scan-review

Reviews changed code against a structured checklist covering security, coherence, over-engineering, scope, and quality. Use before committing, when opening a PR, or when reviewing AI-generated code — it catches issues that automated linters miss by evaluating intent and project fit, not just syntax.

## When to use

- Before committing code to a branch
- When opening a pull request
- After AI-generated code needs human-equivalent review
- When you want a quick quality gate before marking a task as done
- Before running `/agile-post-impl` (close a delivery with clean code)

## When NOT to use

- Tracking delivery progress — use `/agile-daily` instead
- Planning new work — use `/agile-plan` or `/agile-story` instead
- Writing code — this is a review skill, not a coding skill
- Creating documentation — use the wiki or README skills

## End-to-end examples

### Example 1: Reviewing code before committing the rate limiter

You've just implemented rate limiting on the API and want a quality gate before committing:

1. Start by invoking: `/agile-scan-review rate-limiting`
2. The skill identifies the changed files in the working tree (or uses the scope you provided).
3. It reads the complete diff and applies the checklist:

   **Security:**
   - [x] Inputs validated (rate limit config is type-checked)
   - [x] No injection vectors
   - [x] No hardcoded secrets
   - [x] Auth/authorization correct (middleware applied after auth)
   - [x] No sensitive data in logs

   **Project Coherence:**
   - [x] Follows existing middleware pattern
   - [x] Uses existing config module instead of creating a new one
   - [x] Naming consistent with codebase
   - ❌ Imports sorted incorrectly — flagged

   **Over-engineering:**
   - [x] No premature abstractions
   - ❌ Custom RateLimitError class created when existing HttpError suffices — flagged

   **Scope:**
   - [x] Code does only what was requested (rate limiting)
   - ❌ Added a `/health` endpoint refactor in the same PR — flagged as scope creep

   **Quality:**
   - [x] Tests cover rate-limited and unrestricted scenarios
   - [x] Functions are small and focused
   - ❌ Duplicated timestamp comparison logic in two places — flagged

4. The skill produces a report with issues grouped by category, red flags highlighted, and actionable suggestions:
   - **Red flag:** Scope creep — remove the `/health` refactor from this PR
   - **Fix:** Replace `RateLimitError` with `HttpError`
   - **Fix:** Deduplicate timestamp comparison into a shared utility
   - **Fix:** Fix import ordering (auto-fix with Biome)
5. You address the issues and re-run the review.

### Example 2: Reviewing AI-generated code for a notification system

You used AI to generate a notification module and want to verify it before committing:

1. Start by invoking: `/agile-scan-review notification module`
2. The skill reads all changed files in the notification feature.
3. It flags:
   - **Security:** SQL injection risk in the notification query (raw string interpolation instead of parameterized)
   - **Coherence:** Uses `axios` when the project standard is `fetch`
   - **Over-engineering:** Created abstract `NotificationChannel` interface with 4 implementations when only email is needed now
   - **Scope:** Added user preference management beyond what was requested
4. You fix the issues before committing.

## Checklist summary

| Category | What to check |
|---|---|
| Security | Input validation, no injection, no hardcoded secrets, correct auth, no data leaks |
| Coherence | Follows patterns, uses existing utilities, consistent naming, correct imports |
| Over-engineering | No premature abstractions, no impossible error handling, no hypothetical generalizations |
| Scope | Only what was requested, no unrelated refactors, no extra features |
| Quality | Tests cover acceptance, readable code, small functions, no logic duplication, errors at boundaries |
| Completeness | Lint passes, typecheck passes, tests pass, full diff reviewed |

## Tips & pitfalls

- Read the complete diff before issuing any output. Skimming leads to missed issues.
- Focus on security and scope first — these are the categories most likely to cause real problems.
- "AI code review does not replace human code review" — this is an additional gate, not a replacement.
- If the review finds red flags (security issues, scope creep), address those before anything else.
- The review must be clear and actionable. "Code looks bad" is not actionable. "Replace `RateLimitError` with `HttpError` on line 42" is.

## Chaining

- **Before:** `/agile-plan` or `/agile-story` (implement the plan first)
- **After:** If all checks pass → commit and then `/agile-post-impl` to close. If issues found → fix and re-review.
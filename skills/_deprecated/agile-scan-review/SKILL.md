---
name: agile-scan-review
description: Review changed code applying security, coherence, over-engineering, scope and quality checklists. Use before committing, when opening a PR, or when reviewing AI-generated code.
---

# Scan Review

Use this skill to review changed code with focus on quality, risk, and project coherence.

Initial context received via slash: $ARGUMENTS

If `$ARGUMENTS` is filled, treat that text as the branch, files, or scope of the review.
If `$ARGUMENTS` is empty, analyze the changed files in the current working tree.

## Mandatory Checklist

Apply the `code-review` rule checklist from `~/.agents/rules/code-review.md`:

### Security
- [ ] Inputs validated and sanitized
- [ ] No SQL injection, XSS, command injection, or SSRF
- [ ] No hardcoded secrets
- [ ] Authentication and authorization correct when applicable
- [ ] Sensitive data not exposed in logs or responses

### Project Coherence
- [ ] Follows repository patterns and conventions
- [ ] Uses existing components, utilities, and helpers
- [ ] Did not reinvent the wheel
- [ ] Naming consistent with codebase
- [ ] Imports follow project conventions

### Over-engineering
- [ ] No premature abstractions
- [ ] No error handling for impossible scenarios
- [ ] No generalization for hypothetical requirements

### Scope
- [ ] Code does only what was requested
- [ ] No refactoring of unrelated code
- [ ] No additional features not requested

### Quality
- [ ] Tests cover acceptance scenarios
- [ ] Code readable without explanatory comments
- [ ] Small functions with single responsibility
- [ ] No logic duplication
- [ ] Errors handled at system boundaries

### Completeness
- [ ] Lint passes
- [ ] Typecheck passes
- [ ] Tests pass
- [ ] Diff read in full

## Rules
- Read the complete diff before issuing any output.
- Report issues by category (security, coherence, over-engineering, scope, quality).
- Highlight red flags that justify immediate rejection.
- The review result must be clear and actionable, not generic.
- AI code review does not replace human code review.

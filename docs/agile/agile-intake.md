# Intake

Transforms vague problems into clear and actionable intake documents.

## When to use

- Someone brings an idea without scope
- The request is too vague to become a story
- There's uncertainty about size, priority, or approach
- It's the first contact with a new problem

## When NOT to use

- Problem already clear → use `/plan` or `/story`
- Work already refined → use `/story` or `/plan`
- Trivial fix → use `/plan`

## How to use

```
/intake
```

If you already have context (URL, text, issue):

```
/intake https://github.com/org/repo/issues/123
/intake path/to/file.md
```

## What to do during intake

1. **Listen and record** — the problem, who's affected, urgency
2. **Structure** — context, scope, constraints, open questions
3. **Decide next step** — `/roadmap`, `/refinement`, `/story` or `/plan`

## Tip

Don't assume answers. If the user doesn't know something, record it as an open question — this is more useful than inventing an answer.

## Chaining

- Large problem with multiple deliveries → `/refinement`
- Strategic initiative → `/roadmap`
- Item already clear and executable → `/story` or `/plan`

---
name: wiki-lint
description: "Health check and maintenance of the wiki. Activates when the user asks to audit, verify, clean up, or organize the knowledge base."
---

# Lint — Wiki health check

Follow `wiki/CONVENTIONS.md` for format conventions, frontmatter, and links.

## Language

Write the artifact in the user's language. If the user communicates in Portuguese, write in Portuguese with correct grammar and accents. If in English, write in English. When in doubt, ask the user which language to use.

## Checklist

Go through the items in order. If the user asked for something specific (e.g., "just the links"), focus on that part.

### 1. Broken cross-refs
- Relative links `[text](./path.md)` that point to nonexistent pages.
- Fix the link OR create the missing page.

### 2. Orphan pages
- Wiki pages (except `CONVENTIONS.md`, `index.md`, `log.md`) with no inbound link in `wiki/index.md`.
- If it has valid content → add it to `index.md`.
- If irrelevant → suggest deletion to the human.

### 3. Frontmatter
All wiki pages must have:

| Field | Required | Validation |
|---|---|---|
| `title` | yes | Present and not empty |
| `audience` | yes | One of: `business`, `dev`, `ops`, `mixed` |
| `sources` | yes | Non-empty list |
| `updated` | yes | ISO date. Flag if > 90 days |
| `tags` | yes | Non-empty list |
| `status` | yes | One of: `draft`, `stable`, `stale` |

### 4. raw/ ↔ wiki/sources/ consistency
Cross-reference `raw/index.md` with `wiki/sources/`:
- **Sources without summary** — referenced in `raw/index.md` as ingested but missing `<slug>.md`.
- **Summaries without source** — `wiki/sources/<slug>.md` whose `sources:` points to a nonexistent file.

### 5. Missing cross-refs
- Terms/concepts mentioned in the text that already have a wiki page but are not linked.
- Suggest to the human (do not fix automatically — it may introduce noise).

### 6. Contradictions
- Compare pages about the same topic.
- If there are contradictory statements → flag with a note on the page.

### 7. Outdated status
- `draft` that could be `stable` (complete and validated content).
- `stable` with `updated` > 90 days → consider marking as `stale`.

### 8. index.md statistics
- Does the page count match reality?
- Are page descriptions up to date?

## Behavior

- **Simple fixes** (frontmatter, links, `updated`) → do them automatically.
- **Content changes** → ask the human first.
- **Response to the human**: focus on the actionable:
  1. Pending items that need a human decision
  2. Improvement opportunities
  3. Numerical summary (total issues / automatic fixes)
- **Do not list** all automatic fixes in the response — the detail goes into `log.md`.

## Logging

Update `wiki/log.md` (insert **at the top**, after the header):

```
## [YYYY-MM-DD] lint | health check

### Automatic fixes
- ...

### Pending (human decision)
- ...

### Suggestions
- ...
```

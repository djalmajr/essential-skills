**CRITICAL**: These instructions are MANDATORY. Read all *.md files inside .agents/rules and its subfolders as well as ~/.agents/rules to get context and rules.

## LLM-Maintained Wiki (`wiki/`)

Before answering questions about the domain or delivery process, **consult the wiki first** at [`wiki/`](./wiki/):

1. [`wiki/index.md`](./wiki/index.md) — navigable catalog (by audience, topic, and source).
2. [`wiki/CONVENTIONS.md`](./wiki/CONVENTIONS.md) — wiki schema, frontmatter, named operations (`wiki-ingest`, `wiki-query`, `wiki-lint`).
3. [`wiki/log.md`](./wiki/log.md) — append-only history of ingest/query/lint operations.

The wiki is the **canonical source of truth** for domain and process knowledge. Do not re-synthesize from scratch based on code or Notion when the answer already exists in the wiki — follow the workflow described in `CONVENTIONS.md` (search first, update after, log the operation).

Inspired by [LLM Wiki — Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

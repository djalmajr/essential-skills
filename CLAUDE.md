**CRITICAL**: These instructions are MANDATORY. Read all *.md files inside .agents/rules and its subfolders as well as ~/.agents/rules to get context and rules.

## Wiki LLM-mantida (`wiki/`)

Antes de responder perguntas sobre o domínio ou processo de delivery, **consulte primeiro a wiki** em [`wiki/`](./wiki/):

1. [`wiki/index.md`](./wiki/index.md) — catálogo navegável (por audiência, tópico e fonte).
2. [`wiki/CONVENTIONS.md`](./wiki/CONVENTIONS.md) — schema da wiki, frontmatter, operações nomeadas (`wiki-ingest`, `wiki-query`, `wiki-lint`).
3. [`wiki/log.md`](./wiki/log.md) — histórico append-only de ingest/query/lint.

A wiki é a **fonte de verdade canônica** para conhecimento do domínio e processos. Não re-sintetizar do zero a partir de código ou Notion quando a resposta já existe na wiki — siga o workflow descrito em `CONVENTIONS.md` (busca primeiro, atualiza depois, registra no log).

Inspirado em [LLM Wiki — Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

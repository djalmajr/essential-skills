---
name: wiki-query
description: "Answers questions about the wiki knowledge base. Activates when the user asks about concepts, processes, entities, or any wiki content."
---

# Query — Ask about the wiki

Follow `wiki/CONVENTIONS.md` for format conventions, links, and language.

## Language

Write the artifact in the user's language. If the user communicates in Portuguese, write in Portuguese with correct grammar and accents. If in English, write in English. When in doubt, ask the user which language to use.

## Steps

1. **Consult `wiki/index.md`** to locate pages relevant to the question.
   - Use the "By topic" table to quickly find where the content lives.
   - If needed, search with grep for specific terms in the wiki pages.

2. **Read the identified pages** and follow related links for context.

3. **Synthesize the answer**:
   - Direct answer to the question.
   - Cite the wiki pages used with links: `[page](wiki/path.md)`.
   - If there are contradictions between sources, present the different viewpoints.
   - If the information **does not exist** in the wiki, say so explicitly and suggest sources that could be ingested.

4. **Assess whether the answer has lasting value:**
   - If the answer synthesizes multiple pages in a new and useful way → offer to save it as a page in `wiki/sources/` (cross-cutting summary) or as a new section in an existing page.
   - If it is a simple one-off answer → no need to save.

5. **Log** (only if the query resulted in a wiki update):
   ```
   ## [YYYY-MM-DD] query | <question summary>
   - Pages consulted: ...
   - Result saved: yes/no (which page, if yes)
   ```

## Rules

- Answer **first based on the wiki** — do not re-synthesize from scratch using code or external sources when the answer already exists.
- If you cannot find the information, suggest which sources could be ingested to cover the gap.
- Always cite the wiki pages used.
- If the question reveals a gap, suggest pages that could be created (but do not create them automatically — leave that for ingest).

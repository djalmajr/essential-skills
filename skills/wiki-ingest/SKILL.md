---
name: wiki-ingest
description: "Processes a new source from raw/ into the wiki. Activates when the user asks to ingest, process, add, or incorporate a source into the knowledge base."
---

# Ingest — Process source into the wiki

Follow `wiki/CONVENTIONS.md` for format conventions, frontmatter, naming, and language.

## Language

Write the artifact in the user's language. If the user communicates in Portuguese, write in Portuguese with correct grammar and accents. If in English, write in English. When in doubt, ask the user which language to use.

## Steps

1. **Identify the source** the user asked to process (comes from the conversation context or the provided path).

2. **Check if it has already been ingested** by consulting `raw/index.md`:
   - If already ingested (has a summary in `wiki/sources/`) → follow the **Re-ingest** flow (section below).
   - If not → proceed with normal ingest.

3. **Read the source** in `raw/` completely (in parts if needed due to context limits).
   - `.txt` or `.md` transcripts → read directly.
   - If MCP `video-whisper` is available → transcribe video/audio directly.
   - If MCP `pdf-docling` is available → convert PDF to markdown.

4. **Present to the human and search existing pages in parallel:**
   - Present the **3-5 most important points** extracted.
   - Search (grep/glob) existing wiki pages about the identified topics.
   - Ask if the user wants to **emphasize or skip** anything.
   - **Wait for confirmation** before proceeding.

5. **Create/update wiki pages** based on confirmation:
   - If the page already exists → **update** (add source in `sources:`, revise content, flag contradictions).
   - If it does not exist → **create** a new page following `wiki/CONVENTIONS.md`.
   - Respect the folder structure by audience/domain:
      - `wiki/business/` — business rules (audience: business)
      - `wiki/apps/` — app documentation (audience: dev)
      - `wiki/ops/` — operational procedures (audience: ops)
      - `wiki/data/` — data models and schemas (audience: dev)
   - Use standard markdown links: `[text](./path.md)` (not wikilinks).
   - Do NOT duplicate content across pages — use cross-refs.

6. **Create the source summary** in `wiki/sources/<slug>.md`:
   ```yaml
   ---
   title: "Summary — <Source Title>"
   audience: mixed
   sources:
     - raw/<subdir>/<filename>
   updated: YYYY-MM-DD
   tags: [source, <relevant-tags>]
   status: stable
   ---
   ```
   Summary content:
   - Metadata (date, participants, duration if applicable)
   - Key points summary
   - Wiki pages created/updated with links
   - Insights not captured in other pages (if any)

7. **Update indexes in parallel:**
   - `raw/index.md` — mark the source as ✅ Ingested with a link to the summary.
   - `wiki/index.md` — add new pages to the corresponding table, update descriptions of modified pages.
   - `wiki/log.md` — log the operation **at the top** (after the header, before existing entries):
     ```
     ## [YYYY-MM-DD] ingest | <Source Title>
     - Pages created: ...
     - Pages updated: ...
     - Summary: wiki/sources/<slug>.md
     ```

8. **Focused post-ingest lint:**
   - Verify cross-refs of created/updated pages (do links point to real targets?).
   - Compare with referenced pages — flag contradictions with an explicit section.
   - Do NOT run a full lint (orphans, global frontmatter, etc.) — that is for `/wiki-lint`.

## Re-ingest (already cataloged source)

When the source already has `wiki/sources/<slug>.md`:

1. Read the source and the existing summary.
2. Compare and identify gaps:
   - Concepts/information in the source that are not in the wiki
   - Pages that can be expanded
   - Contradictions with existing content
3. Present the diagnosis to the human:
   ```
   ## Re-ingest: <Title>
   ### Identified gaps
   - ...
   ### Pages that can be expanded
   - ...
   ```
4. Wait for approval and execute.
5. Update the summary, `raw/index.md`, and `wiki/log.md`.

## Rules

- **Never** modify files in `raw/`.
- One source at a time (unless the user explicitly asks for batch).
- Always use complete YAML frontmatter (see `wiki/CONVENTIONS.md`).
- If you find a contradiction with existing pages, flag it explicitly.
- Always update `raw/index.md`, `wiki/index.md`, and `wiki/log.md`.

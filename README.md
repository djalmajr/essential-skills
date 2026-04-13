# Essential Skills — Zomme Delivery Framework

Skills for agile delivery management powered by AI agents.

## Installing

```bash
# All skills
npx skills add zomme/essential-skills --all

# Specific skills
npx skills add zomme/essential-skills --skill agile-epic --skill agile-task
```

## Skills (17)

### Agile (14)

| Skill | Purpose |
|-------|---------|
| agile-intake | Capture vague problems into structured intake documents |
| agile-roadmap | Quarterly or initiative roadmap |
| agile-epic | Decompose initiative into stories with tasks |
| agile-task | Detail a task with context and execution checklist |
| agile-refinement | Validate planning artifacts + review code |
| agile-status | Track progress: checkpoint, consolidation, or closure |
| agile-planning | Plan a sprint: objective, items, capacity |
| agile-review | Sprint review and demo for stakeholders |
| agile-metrics | Objective sprint metrics |
| agile-retro | Retrospective with improvement actions |
| agile-router | Guidance on which skill to use |
| agile-onboarding | New member onboarding guide |
| agile-proto | Interactive UI prototypes |
| agile-tdd | TDD cycle + pragmatic testing strategy |

### Wiki (3)

| Skill | Purpose |
|-------|---------|
| wiki-ingest | Ingest new source into wiki (documents, notes, decisions) |
| wiki-query | Ask about something in the wiki |
| wiki-lint | Audit and organize the wiki |

## Flow

```
intake → roadmap → epic → task → execution → status → retro
                    ↑                           ↑
                refinement                  refinement
```

## Wiki (Karpathy Pattern)

This project uses the **LLM Wiki** pattern to maintain versioned, AI-consultable organizational knowledge.

### How it works

Each project that installs these skills creates its own local `wiki/`. Skills ingest sources (notes, decisions, documents) and the AI consults the wiki before answering domain questions.

### Structure created by the project

```
wiki/
├── CONVENTIONS.md   # Schema, frontmatter, operations
├── index.md         # Navigable catalog
├── log.md           # Operation history
├── sources/         # Source summaries
├── business/        # Business rules (audience: business)
├── ops/             # Operational procedures (audience: ops)
└── patterns/        # Patterns identified in practice
raw/                 # Original sources (before ingestion)
```

### Wiki Skills

| Skill | When to use |
|-------|-------------|
| `/wiki-ingest` | Ingest new source into wiki (documents, notes, decisions) |
| `/wiki-query` | Ask about something in the wiki |
| `/wiki-lint` | Audit and organize the wiki |

### Project setup

When installing in a new project, create the initial structure:

```bash
mkdir -p wiki/sources raw
touch wiki/CONVENTIONS.md wiki/index.md wiki/log.md
```

The project's AGENTS.md instructs the AI to consult the wiki before answering domain questions.

Inspired by [LLM Wiki — Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

## Documentation

[`docs/`](docs/) — usage guides organized by category. Workflow diagram in [`docs/agile/`](docs/agile/README.md).

## How to use

Each skill is invoked with `/skill-name`:

```
/agile-intake
/agile-epic
/agile-task
/agile-refinement
/agile-status
/wiki-query
```

Not sure which skill to use? Try `/agile-router`.

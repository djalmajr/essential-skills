# Agile Workflow

Skills for agile delivery management powered by AI agents.

## Workflow

```mermaid
flowchart TD
    A["/agile-intake"] --> B["/agile-roadmap"]
    B --> C["/agile-epic"]
    C --> D["/agile-task"]
    D --> E[execution]
    E --> F["/agile-status<br>(checkpoint)"]
    F --> G["/agile-status<br>(consolidation)"]
    G --> H["/agile-status<br>(closure)"]
    H --> I["/agile-metrics"]
    I --> J["/agile-review"]
    J --> K["/agile-retro"]
    K --> L["/agile-planning"]
    L --> D

    M["/agile-refinement"] -.-> C
    M -.-> E

    style M fill:#f9f,stroke:#333,stroke-width:2px
    style F fill:#bbf,stroke:#333,stroke-width:2px
    style G fill:#bbf,stroke:#333,stroke-width:2px
    style H fill:#bbf,stroke:#333,stroke-width:2px
```

## Guides

Scenario-based guides showing how skills chain together in real situations.

| Guide                                                              | What you'll learn                                                 |
| ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| [From Idea to Delivery](guides/from-idea-to-delivery.md)           | End-to-end: intake -> epic/task -> refinement -> status           |
| [Managing Large Initiatives](guides/managing-large-initiatives.md) | Epic-scale: roadmap -> epic -> task -> status                     |
| [Sprint Lifecycle](guides/sprint-lifecycle.md)                     | Ceremonies: planning -> status -> review -> metrics -> retro      |
| [Getting Started](guides/getting-started.md)                       | Onboarding, prototyping, decision trees, and cheat sheet          |

## Skills

Each skill README contains full documentation with examples, tips, and chaining info.

### Intake & Planning

| Skill | Usage |
|-------|-------|
| [intake](../../skills/agile-intake/README.md) | Vague problems -> structured intake document |
| [roadmap](../../skills/agile-roadmap/README.md) | Quarterly or initiative roadmap |
| [epic](../../skills/agile-epic/README.md) | Large initiative -> story backlog + roadmap |
| [task](../../skills/agile-task/README.md) | Small, localized change -> execution plan |

### Validation & Review

| Skill | Usage |
|-------|-------|
| [refinement](../../skills/agile-refinement/README.md) | Validate planning artifacts + review code |
| [tdd](../../skills/agile-tdd/README.md) | TDD cycle + pragmatic testing strategy |

### Delivery & Tracking

| Skill | Usage |
|-------|-------|
| [status](../../skills/agile-status/README.md) | Progress tracking: checkpoint, consolidation, closure |

### Sprint Ceremonies

| Skill | Usage |
|-------|-------|
| [planning](../../skills/agile-planning/README.md) | Plan cycle: objective, items, capacity |
| [review](../../skills/agile-review/README.md) | Review + demo for stakeholders |
| [metrics](../../skills/agile-metrics/README.md) | Objective sprint metrics |
| [retro](../../skills/agile-retro/README.md) | Retrospective with improvement actions |

### Routing & Prototyping

| Skill | Usage |
|-------|-------|
| [router](../../skills/agile-router/README.md) | Guidance on which skill to use |
| [proto](../../skills/agile-proto/README.md) | Interactive UI prototypes |

### Onboarding

| Skill | Usage |
|-------|-------|
| [onboarding](../../skills/agile-onboarding/README.md) | New member onboarding guide |

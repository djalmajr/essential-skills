# Agile Workflow

Skills for agile delivery management powered by AI agents.

## Workflow

```mermaid
flowchart TD
    A[intake] --> B[roadmap]
    B --> C[refinement]
    C --> D[epic]
    C --> E[story]
    C --> F[plan]
    D -.-> G[scan-review]
    E -.-> G
    F -.-> G
    G --> H[daily]
    G --> I[status-report]
    H -.-> J[post-impl]
    I -.-> J
    J --> K[sprint-review]
    K --> L[retro]
    L --> M[sprint-metrics]
    M --> next[Next Cycle]

    style G fill:#f9f,stroke:#333,stroke-width:2px
    style H fill:#bbf,stroke:#333,stroke-width:2px
    style I fill:#bbf,stroke:#333,stroke-width:2px
```

## Guides

Scenario-based guides showing how skills chain together in real situations.

| Guide | What you'll learn |
|-------|-------------------|
| [From Idea to Delivery](guides/from-idea-to-delivery.md) | End-to-end: intake → plan/story → scan-review → daily → post-impl |
| [Managing Large Initiatives](guides/managing-large-initiatives.md) | Epic-scale: roadmap → refinement → epic → stories → status-report |
| [Sprint Lifecycle](guides/sprint-lifecycle.md) | Ceremonies: planning → daily → review → metrics → retro |
| [Getting Started](guides/getting-started.md) | Onboarding, prototyping, decision trees, and cheat sheet |

## Skills

Each skill README contains full documentation with examples, tips, and chaining info.

### Intake & Planning

| Skill | Usage |
|-------|-------|
| [intake](../../skills/agile-intake/README.md) | Vague problems → structured intake document |
| [planning-router](../../skills/agile-planning-router/README.md) | Router: plan vs story vs epic |
| [plan](../../skills/agile-plan/README.md) | Small change (XS/S) → execution plan |
| [story](../../skills/agile-story/README.md) | Medium delivery (M) → story with acceptance criteria |
| [epic](../../skills/agile-epic/README.md) | Large initiative (L/XL) → story backlog + roadmap |
| [refinement](../../skills/agile-refinement/README.md) | Large backlog → executable stories |
| [roadmap](../../skills/agile-roadmap/README.md) | Quarterly or epic roadmap |

### Delivery & Tracking

| Skill | Usage |
|-------|-------|
| [daily](../../skills/agile-daily/README.md) | Daily status: progress, blockers, next step |
| [status-report](../../skills/agile-status-report/README.md) | Period/milestone consolidated status |
| [post-impl](../../skills/agile-post-impl/README.md) | Delivery closure with verification |
| [delivery](../../skills/agile-delivery/README.md) | Router: daily vs status-report vs post-impl |

### Sprint Ceremonies

| Skill | Usage |
|-------|-------|
| [ceremonies-router](../../skills/agile-ceremonies-router/README.md) | Router: which ceremony to run |
| [sprint-planning](../../skills/agile-sprint-planning/README.md) | Plan cycle: objective, items, capacity |
| [sprint-review](../../skills/agile-sprint-review/README.md) | Review + demo for stakeholders |
| [sprint-metrics](../../skills/agile-sprint-metrics/README.md) | Objective sprint metrics |
| [retro](../../skills/agile-retro/README.md) | Retrospective with improvement actions |

### Quality & Prototyping

| Skill | Usage |
|-------|-------|
| [scan-review](../../skills/agile-scan-review/README.md) | Review code before commit/PR |
| [proto](../../skills/agile-proto/README.md) | Interactive UI prototypes |

### Onboarding

| Skill | Usage |
|-------|-------|
| [onboarding](../../skills/agile-onboarding/README.md) | New member onboarding guide |

# Scrum Planning (Router)

Decides which planning artifact is appropriate for the demand.

## When to use

When you have a demand and don't know where to start planning.

## How to use

```
/scrum-planning
```

Or simply describe the demand:

```
/scrum-planning I need to add authentication to login
/scrum-planning Database migration to PostgreSQL
```

## Decision tree

| Size | What to use | Skill |
|------|------------|-------|
| XS/S | Localized change, few files | `/plan` |
| M | Vertical delivery, multiple files | `/story` |
| L/XL | Multiple dependent deliveries | `/epic` |

| Situation | What to do |
|----------|-------------|
| Problem not defined | `/intake` |
| Large with ambiguity | `/refinement` |
| Strategic direction | `/roadmap` |

## Tip

If you don't know the size, describe what needs to be done and the skill helps classify it.

## Light sizing

- **XS** — localized adjustment, 1 file, low risk
- **S** — small delivery, few files
- **M** — vertical delivery, multiple files, moderate validation
- **L** — large story, needs breaking
- **XL** — multi-story initiative, coordination needed

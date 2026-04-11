# Essential Skills — Zomme Delivery Framework

Coleção de skills para acompanhamento de entregas ágeis com agentes de IA (opencode).

## Installing

```bash
# Todas as skills
npx skills add zomme/essential-skills --all

# Skills específicas
npx skills add zomme/essential-skills --skill daily --skill plan
```

## Skills (19)

| # | Skill | Categoria |
|---|-------|-----------|
| 1 | daily | Delivery |
| 2 | status-report | Delivery |
| 3 | post-impl | Delivery |
| 4 | delivery-management | Delivery |
| 5 | plan | Planning |
| 6 | story | Planning |
| 7 | epic | Planning |
| 8 | refinement | Planning |
| 9 | roadmap-planning | Planning |
| 10 | scrum-planning | Planning |
| 11 | scrum-ceremonies | Ceremonies |
| 12 | sprint-planning | Ceremonies |
| 13 | sprint-review | Ceremonies |
| 14 | sprint-metrics | Ceremonies |
| 15 | retro | Ceremonies |
| 16 | scan-review | Quality |
| 17 | proto-ui | Quality |
| 18 | intake | Intake |
| 19 | onboarding | Intake |

## Documentação

[`docs/`](docs/) — guias de uso organizados por categoria.

## Fluxo

```
intake → roadmap → refinement → epic/story/plan
                                      ↓
                              scan-review (opcional)
                                      ↓
                              daily / status-report
                                      ↓
                              post-impl → sprint-review
                                      ↓
                                  retro
                                      ↓
                          sprint-metrics → próximo ciclo
```

## Stack

- opencode como agente de IA
- Bun como runtime
- Scrum leve + IA como par

## Como usar

Cada skill é ativada com `/skill-name`:

```
/intake
/refinement
/plan
/story
/daily
```

Para saber qual skill usar:
- `/delivery-management` — qual acompanhamento
- `/scrum-planning` — qual artefato de planejamento
- `/scrum-ceremonies` — qual cerimônia

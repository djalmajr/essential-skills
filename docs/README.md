# Essential Skills — Documentation

Guias de uso organizados por categoria.

## Delivery

| Skill | Uso |
|-------|-----|
| [delivery-daily](delivery/delivery-daily.md) | Status diário: progresso, bloqueios, próximo passo |
| [delivery-status-report](delivery/delivery-status-report.md) | Consolidado de período/marcos |
| [delivery-post-impl](delivery/delivery-post-impl.md) | Fechamento de entrega com verificação |
| [delivery-delivery](delivery/delivery-delivery.md) | Roteador: qual acompanhamento usar |

## Scrum

| Skill | Uso |
|-------|-----|
| [scrum-plan](scrum/scrum-plan.md) | Mudança pequena (XS/S) → plano de execução |
| [scrum-story](scrum/scrum-story.md) | Entrega média (M) → story com critérios de aceite |
| [scrum-epic](scrum/scrum-epic.md) | Iniciativa grande → backlog de stories + roadmap |
| [scrum-refinement](scrum/scrum-refinement.md) | Backlog grande → stories executáveis |
| [scrum-roadmap](scrum/scrum-roadmap.md) | Roadmap trimestral ou por epic |
| [scrum-planning-router](scrum/scrum-planning-router.md) | Roteador: qual artefato de planejamento usar |
| [scrum-ceremonies-router](scrum/scrum-ceremonies-router.md) | Roteador: qual cerimônia Scrum usar |
| [scrum-sprint-planning](scrum/scrum-sprint-planning.md) | Planejar ciclo: objetivo, itens, capacidade |
| [scrum-sprint-review](scrum/scrum-sprint-review.md) | Review + demo para stakeholders |
| [scrum-sprint-metrics](scrum/scrum-sprint-metrics.md) | Métricas objetivas da sprint |
| [scrum-retro](scrum/scrum-retro.md) | Retrospectiva com ações de melhoria |

## Quality

| Skill | Uso |
|-------|-----|
| [quality-scan-review](quality/quality-scan-review.md) | Revisar código antes de commit/PR |
| [quality-proto-ui](quality/quality-proto-ui.md) | Protótipos UI interativos |

## Intake

| Skill | Uso |
|-------|-----|
| [intake](intake/intake.md) | Problemas vagos → documento de intake |
| [onboarding](intake/onboarding.md) | Onboarding de novos membros |

## Wiki (Padrão Karpathy)

Sistema de conhecimento organizacional mantido pela IA.

| Skill | Uso |
|-------|-----|
| `wiki-ingest` | Ingerir nova fonte na wiki |
| `wiki-query` | Perguntar sobre algo na wiki |
| `wiki-lint` | Auditar e organizar a wiki |

**Nota:** As skills wiki operam na pasta `wiki/` do projeto. Cada projeto cria sua própria wiki local.

## Fluxo Completo

```
intake → scrum-roadmap → scrum-refinement → scrum-epic/scrum-story/scrum-plan
                                                              ↓
                                                    quality-scan-review (opcional)
                                                              ↓
                                              delivery-daily / delivery-status-report
                                                              ↓
                                              delivery-post-impl → scrum-sprint-review
                                                              ↓
                                                          scrum-retro
                                                              ↓
                                                scrum-sprint-metrics → próximo ciclo
```

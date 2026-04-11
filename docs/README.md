# Essential Skills — Documentation

Guias de uso organizados por categoria.

## Delivery

| Skill | Uso |
|-------|-----|
| [daily](delivery/daily.md) | Status diário: progresso, bloqueios, próximo passo |
| [status-report](delivery/status-report.md) | Consolidado de período/marcos |
| [post-impl](delivery/post-impl.md) | Fechamento de entrega com verificação |
| [delivery-management](delivery/delivery-management.md) | Roteador: qual acompanhamento usar |

## Planning

| Skill | Uso |
|-------|-----|
| [plan](planning/plan.md) | Mudança pequena (XS/S) → plano de execução |
| [story](planning/story.md) | Entrega média (M) → story com critérios de aceite |
| [epic](planning/epic.md) | Iniciativa grande → backlog de stories + roadmap |
| [refinement](planning/refinement.md) | Backlog grande → stories executáveis |
| [roadmap-planning](planning/roadmap-planning.md) | Roadmap trimestral ou por epic |
| [scrum-planning](planning/scrum-planning.md) | Roteador: qual artefato de planejamento usar |

## Ceremonies

| Skill | Uso |
|-------|-----|
| [scrum-ceremonies](ceremonies/scrum-ceremonies.md) | Roteador: qual cerimônia Scrum usar |
| [sprint-planning](ceremonies/sprint-planning.md) | Planejar ciclo: objetivo, itens, capacidade |
| [sprint-review](ceremonies/sprint-review.md) | Review + demo para stakeholders |
| [sprint-metrics](ceremonies/sprint-metrics.md) | Métricas objetivas da sprint |
| [retro](ceremonies/retro.md) | Retrospectiva com ações de melhoria |

## Quality

| Skill | Uso |
|-------|-----|
| [scan-review](quality/scan-review.md) | Revisar código antes de commit/PR |
| [proto-ui](quality/proto-ui.md) | Protótipos UI interativos |

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

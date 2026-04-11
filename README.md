# Essential Skills — Zomme Delivery Framework

Coleção de skills para acompanhamento de entregas ágeis com agentes de IA (opencode).

## Installing

### Install all skills

```bash
npx skills add zomme/essential-skills --all
```

### Install specific skills

```bash
npx skills add zomme/essential-skills --skill daily --skill plan
```

## Available Skills

### Estratégia & Início

| Skill | Descrição |
|-------|-----------|
| `intake` | Transforma problemas vagos em documentos de intake |
| `roadmap-planning` | Transforma objetivos em roadmaps trimestrais ou por epic |
| `epic` | Estrutura iniciativas grandes em backlog de stories |

### Planejamento

| Skill | Descrição |
|-------|-----------|
| `refinement` | Transforma backlog grande em stories executáveis |
| `scrum-planning` | Roteador: qual artefato de planejamento usar |
| `plan` | Plano para mudanças pequenas (XS/S) |
| `story` | Story para entregas médias (M) |
| `scrum-ceremonies` | Roteador: qual cerimônia Scrum usar |

### Execução

| Skill | Descrição |
|-------|-----------|
| `scan-review` | Revisa código antes de commit/PR |
| `proto-ui` | Protótipos UI interativos |

### Acompanhamento

| Skill | Descrição |
|-------|-----------|
| `daily` | Status diário |
| `status-report` | Consolidado de período/marcos |
| `post-impl` | Fechamento de entrega |
| `delivery-management` | Roteador: qual acompanhamento usar |

### Retrospectiva & Métricas

| Skill | Descrição |
|-------|-----------|
| `sprint-planning` | Planeja ciclo de trabalho |
| `sprint-review` | Review + demo para stakeholders |
| `sprint-metrics` | Métricas objetivas da sprint |
| `retro` | Retrospectiva com ações de melhoria |

### Suporte

| Skill | Descrição |
|-------|-----------|
| `onboarding` | Onboarding de novos membros |

## Fluxo

```
intake → roadmap → refinement → epic/story/plan
                                      ↓
                              scan-review
                                      ↓
                              daily / status-report
                                      ↓
                              post-impl → sprint-review
                                      ↓
                                  retro
                                      ↓
                          sprint-metrics → próximo ciclo
```

## Estrutura do Repo

```
essential-skills/
├── skills/           # Skills (cada uma com SKILL.md)
│   ├── daily/
│   ├── epic/
│   └── ...
├── docs/             # Documentação de uso
│   ├── daily.md
│   └── ...
├── skills.json       # Manifesto para npx skills add
└── README.md
```

## Stack

- opencode como agente de IA
- Bun como runtime
- Scrum leve + IA como par

## Usando no opencode

Cada skill é ativada com `/skill-name`:

```
/intake
/refinement
/plan
/story
/daily
```

Para saber qual usar:
- `/delivery-management` — qual acompanhamento
- `/scrum-planning` — qual artefato de planejamento
- `/scrum-ceremonies` — qual cerimônia

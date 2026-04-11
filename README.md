# Essential Skills — Zomme Delivery Framework

Coleção de skills para acompanhamento de entregas ágeis com agentes de IA (opencode).

## Installing

```bash
# Todas as skills
npx skills add zomme/essential-skills --all

# Skills específicas
npx skills add zomme/essential-skills --skill delivery-daily --skill scrum-plan
```

## Skills (22)

| # | Skill | Categoria |
|---|-------|-----------|
| 1 | delivery-daily | Delivery |
| 2 | delivery-status-report | Delivery |
| 3 | delivery-post-impl | Delivery |
| 4 | delivery-delivery | Delivery |
| 5 | scrum-plan | Scrum |
| 6 | scrum-story | Scrum |
| 7 | scrum-epic | Scrum |
| 8 | scrum-refinement | Scrum |
| 9 | scrum-roadmap | Scrum |
| 10 | scrum-planning-router | Scrum |
| 11 | scrum-ceremonies-router | Scrum |
| 12 | scrum-sprint-planning | Scrum |
| 13 | scrum-sprint-review | Scrum |
| 14 | scrum-sprint-metrics | Scrum |
| 15 | scrum-retro | Scrum |
| 16 | quality-scan-review | Quality |
| 17 | quality-proto-ui | Quality |
| 18 | intake | Intake |
| 19 | onboarding | Intake |
| 20 | wiki-ingest | Wiki |
| 21 | wiki-lint | Wiki |
| 22 | wiki-query | Wiki |

## Wiki (Padrão Karpathy)

Este projeto usa o padrão **LLM Wiki** para manter conhecimento organizacional versionado e consultável por IA.

### Como funciona

Cada projeto que instala essas skills cria sua própria `wiki/` local. As skills ingiram fontes (notas, decisões, documentos) e a IA consulta a wiki antes de responder sobre o domínio.

### Estrutura criada pelo projeto

```
wiki/
├── CONVENTIONS.md   # Schema, frontmatter, operações
├── index.md         # Catálogo navegável
├── log.md           # Histórico de operações
├── sources/         # Sumários de fontes ingeridas
├── business/        # Regras de negócio (audience: business)
├── ops/             # Procedimentos operacionais (audience: ops)
└── patterns/       # Padrões identificados na prática
raw/                 # Fontes originais (antes de ingestão)
```

### Skills Wiki

| Skill | Quando usar |
|-------|-------------|
| `/wiki-ingest` | Ingerir nova fonte na wiki (documentos, notas, decisões) |
| `/wiki-query` | Perguntar sobre algo que está na wiki |
| `/wiki-lint` | Auditar e manter a wiki organizada |

### Setup no projeto

Ao instalar em um novo projeto, crie a estrutura inicial:

```bash
mkdir -p wiki/sources raw
touch wiki/CONVENTIONS.md wiki/index.md wiki/log.md
```

O AGENTS.md do projeto instrui a IA a consultar a wiki antes de responder sobre o domínio.

Inspirado em [LLM Wiki — Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

## Documentação

[`docs/`](docs/) — guias de uso organizados por categoria.

## Fluxo

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

## Stack

- opencode como agente de IA
- Bun como runtime
- Scrum leve + IA como par

## Como usar

Cada skill é ativada com `/skill-name`:

```
/delivery-daily
/scrum-refinement
/scrum-plan
/scrum-story
/wiki-query
/wiki-ingest
```

Para saber qual skill usar:
- `/delivery-delivery` — qual acompanhamento
- `/scrum-planning-router` — qual artefato de planejamento
- `/scrum-ceremonies-router` — qual cerimônia

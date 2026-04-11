# Essential Skills — Zomme Delivery Framework

Coleção de skills para acompanhamento de entregas ágeis com agentes de IA (opencode).

## Installing

```bash
# Todas as skills
npx skills add zomme/essential-skills --all

# Skills específicas
npx skills add zomme/essential-skills --skill daily --skill plan
```

## Skills (22)

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
└── patterns/        # Padrões identificados na prática
raw/                 # Fontes originais (antes de ingerir)
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
/wiki-query
/wiki-ingest
```

Para saber qual skill usar:
- `/delivery-management` — qual acompanhamento
- `/scrum-planning` — qual artefato de planejamento
- `/scrum-ceremonies` — qual cerimônia

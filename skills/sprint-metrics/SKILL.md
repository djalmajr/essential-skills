---
name: sprint-metrics
description: Consolida metricas objetivas de uma sprint. Use quando precisar de dados quantitativos sobre entregas, bloqueios, desvios e velocidade para alimentar retro, sprint review ou decisoes de capacidade.
compatibility: opencode
metadata:
  audience: engineering
  workflow: sprint-metrics
---

# Sprint Metrics

Use esta skill para extrair metricas objetivas dos artefatos de uma sprint e gerar um sumario quantitativo.

## Objetivo

- Consolidar dados da sprint em numeros concretos
- Alimentar retro e sprint review com fatos, nao impressoes
- Identificar padroes entre sprints (melhoria ou degradacao)
- Apoiar decisoes de capacidade e planejamento

## Quando usar

- No final da sprint, antes da review ou retro
- Quando o time precisa de dados para discutir performance
- Para comparar sprints e identificar tendencias
- Quando ha duvida se a capacidade declarada esta calibrada

## Metricas coletadas

### Entrega
- Total de stories/itens planejados
- Total entregue vs nao entregue
- Taxa de conclusao (%)
- Itens adicionados durante a sprint (scope creep)
- Itens removidos ou adiados

### Qualidade
- Bugs encontrados durante a sprint
- Bugs encontrados apos a entrega
- Cobertura de testes (se mensuravel)
- Falhas de lint, typecheck ou testes no fechamento

### Fluxo
- Bloqueios registrados (quantidade e duracao media)
- Tempo medio entre inicio e conclusao de story
- Stories que voltaram de "done" para "in progress"

### Processo
- Dailies realizados vs esperados
- Post-implementation reports gerados
- Issues abertas vs fechadas

## Processo

### 1. Coletar dados

Consulte os artefatos da sprint:
- Sprint planning (itens comprometidos)
- Issues (abertas, fechadas, bloqueadas)
- Dailies (bloqueios, progresso)
- Post-implementation reports (verificacoes executadas)
- Commits e PRs (volume de mudancas)

### 2. Calcular metricas

Preencha o template com os numeros reais. Nao arredonde para parecer melhor — precisao importa mais que aparencia.

### 3. Analisar tendencias

Se houver dados de sprints anteriores, compare:
- A taxa de conclusao esta melhorando?
- Os bloqueios estao diminuindo?
- O scope creep esta controlado?

### 4. Gerar sumario

Use o template abaixo. O sumario deve ser curto o bastante para ler em 2 minutos.

## Template

[source,markdown]
----
# Sprint Metrics: <Sprint>

## Contexto
- Projeto/time:
- Periodo:
- Capacidade declarada:

## Entrega
- Planejado: X itens
- Entregue: Y itens (Z%)
- Adicionado durante a sprint: W itens
- Removido/adiado: V itens

## Qualidade
- Bugs durante a sprint: N
- Bugs pos-entrega: N
- Lint/typecheck/testes: passou / falhou (detalhe)

## Fluxo
- Bloqueios: N (duracao media: X dias)
- Tempo medio por story: X dias
- Reaberturas: N stories

## Processo
- Dailies: X de Y esperados
- Post-implementation reports: X de Y entregas
- Issues fechadas: X de Y

## Tendencia vs sprint anterior
- Taxa de conclusao: subiu/desceu/estavel (X% vs Y%)
- Bloqueios: mais/menos/igual
- Scope creep: mais/menos/igual

## Destaques para retro
- Ponto positivo:
- Ponto de atencao:
- Sugestao de acao:
----

## Regras

- Metricas sao ferramentas de reflexao, nao de cobranca. O objetivo e melhorar o processo, nao julgar pessoas.
- Nunca manipule numeros para parecer melhor. Se a sprint foi ruim, os numeros devem refletir isso — e a retro deve discutir por que.
- Compare sprints com cuidado. Contextos diferentes (ferias, bloqueios externos, mudanca de time) invalidam comparacoes diretas.
- Metricas sem discussao sao inuteis. Sempre apresente dentro de uma retro ou review, nunca como relatorio autonomo.

## Relacao com o fluxo

Sprint metrics alimenta `sprint-review` e `retro`. Use `delivery-management` para acompanhamento durante a sprint e `scrum-ceremonies` para conduzir a retro com os dados.

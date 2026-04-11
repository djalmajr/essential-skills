---
name: sprint-review
description: Prepara sprint review e demo de entregas para stakeholders. Use quando a sprint terminar e for preciso apresentar o que foi entregue, o que mudou de escopo, o que ficou pendente e quais decisoes sao necessarias.
compatibility: opencode
metadata:
  audience: engineering
  workflow: sprint-review
---

# Sprint Review

Use esta skill para consolidar as entregas de uma sprint em formato de review/demo claro e objetivo para stakeholders.

## Objetivo

- Consolidar o que foi entregue na sprint
- Comparar entregas contra o compromisso do sprint planning
- Destacar mudancas de escopo, desvios e decisoes tomadas
- Preparar demonstracao objetiva do valor entregue
- Coletar feedback dos stakeholders para alimentar o proximo ciclo

## Quando usar

- No final de uma sprint, antes da retro
- Quando stakeholders precisam ver o resultado das entregas
- Quando e necessario validar que o produto esta no caminho certo
- Para fechar o ciclo entre sprint planning e retrospective

## Processo

### 1. Consolidar entregas

Reuna as informacoes de:

- Issues concluidas na sprint
- Post-implementation reports gerados
- Dailies e status reports do periodo
- Mudancas de escopo registradas

Para cada item entregue, registre:
- O que era esperado (do sprint planning)
- O que foi realmente entregue
- Desvios relevantes (se houver)

### 2. Preparar demonstracao

Organize a demo por valor de negocio, nao por ordem tecnica:

- Comece pelo impacto: "agora o time pode fazer X"
- Mostre o fluxo funcionando, nao slides
- Se houver parte tecnica relevante (performance, seguranca), inclua como contexto

### 3. Identificar itens nao entregues

Para cada item planejado que nao foi entregue:
- Motivo: bloqueio, mudanca de prioridade, escopo maior que o esperado
- Destino: volta ao backlog, entra na proxima sprint, foi descartado

### 4. Coletar feedback

Registre perguntas e feedback dos stakeholders:
- Ajustes necessarios
- Novas necessidades identificadas
- Mudancas de prioridade

### 5. Gerar artefato

Use o template abaixo para documentar a review.

## Template

Use [templates/sprint-review.md](templates/sprint-review.md).

## Regras

- A review mostra o que *foi entregue*, nao o que *esta em andamento*. Para status de trabalho em progresso, use `delivery-management`.
- Seja honesto sobre o que nao foi entregue e por que. Esconder itens cortados quebra a confianca.
- A demo deve ser verificavel — stakeholders devem poder confirmar que o resultado e real.
- Feedback coletado deve virar item de backlog ou acao, nunca ficar apenas em ata.
- A sprint review alimenta a retro. Se a review nao acontecer, a retro perde insumos importantes.

## Relacao com o fluxo

No fluxo stitched, a sprint review conecta a execucao ao feedback:

`sprint planning -> execucao -> post-implementation reports -> sprint review -> retro`

Para cerimonias de planejamento e retro, use `scrum-ceremonies`. Para status durante a sprint, use `delivery-management`.

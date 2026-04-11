---
name: delivery-status-report
description: Consolida status de um periodo ou marco com entregas, desvios, riscos e proximos passos. Use quando precisar de visao consolidada do progresso de uma iniciativa.
compatibility: opencode
metadata:
  audience: engineering
  workflow: delivery
---

# Status Report

Use esta skill para consolidar o progresso de um periodo ou marco em um relatorio objetivo.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido, use como referencia (ex: iniciativa, periodo, epic).
Se vier vazio, pergunte qual periodo ou iniciativa sera consolidada.

## Objetivo

- Consolidar entregas, desvios e riscos de um periodo
- Distinguir claramente concluido, em andamento e risco
- Registrar decisoes necessarias e proximos passos
- Manter rastreabilidade com o epic, roadmap ou sprint

## Processo

### 1. Definir escopo do report

- Qual periodo ou marco?
- Qual iniciativa, epic ou sprint?

### 2. Coletar dados

Consulte:
- Dailies do periodo (se existirem)
- Planos ativos e seus checklists
- Epic/stories e status das tarefas
- Git log para evidencias de progresso

### 3. Consolidar

- **Concluido:** entregas finalizadas no periodo
- **Em andamento:** o que esta em progresso com expectativa
- **Desvios:** o que mudou de escopo, atrasou ou foi cortado
- **Riscos e bloqueios:** o que pode impactar o proximo periodo
- **Decisoes necessarias:** o que precisa de alinhamento

### 4. Proximos passos

- O que sera feito no proximo periodo
- Quem e responsavel por cada acao

## Onde salvar

- `planning/<iniciativa>/status-report-YYYY-MM-DD.md`
- Ou apresentar inline se for um report curto

## Encadeamento

- Se o periodo fechou uma entrega: sugerir `/post-impl`
- Se a sprint terminou: sugerir `/sprint-review` ou `/retro`
- Se ha decisoes pendentes: destacar para o usuario

## Template de referencia

Use `~/.agents/templates/status-report.md` como base.

## Regras

- O report deve ser honesto. Nao esconda desvios ou atrasos.
- Distinga fatos de expectativas ("foi entregue" vs "deve ser entregue").
- Bloqueios devem ter dono e proxima acao.
- Mantenha proporcional — report de 1 semana nao precisa de 5 paginas.

## Relacao com o fluxo

```
/daily → ... → /status-report → /post-impl ou /sprint-review
```

---
name: delivery-daily
description: Gera status diario de andamento com progresso, bloqueios e proximo passo. Use quando precisar registrar o que avancou, o que esta bloqueado e qual o proximo passo observavel.
compatibility: opencode
metadata:
  audience: engineering
  workflow: delivery
---

# Daily Delivery

Use esta skill para gerar um status diario claro, objetivo e acionavel.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido, use como referencia (ex: nome da iniciativa, issue, plano ativo).
Se vier vazio, tente identificar o trabalho em andamento pelo contexto da conversa ou pergunte.

## Objetivo

- Registrar progresso real desde o ultimo ciclo
- Explicitar bloqueios com impacto, dono e proxima acao
- Definir proximo passo observavel
- Manter rastreabilidade com o plano ou issue em andamento

## Processo

### 1. Identificar contexto

- Qual plano, story ou issue esta em andamento?
- Qual era o proximo passo declarado no daily anterior (se existir)?

### 2. Registrar status

- **Em andamento:** o que esta sendo feito agora
- **Concluido:** o que avancou desde o ultimo ciclo (referencia tarefas do plano)
- **Bloqueios:** impedimentos com impacto, dono e proxima acao
- **Riscos:** sinais de que algo pode atrasar ou mudar

### 3. Definir proximo passo

- Deve ser observavel e verificavel
- Deve ter relacao clara com o plano ativo

## Onde salvar

- Apresentar inline por padrao (o daily e curto)
- Se o usuario pedir para salvar: `planning/<iniciativa>/daily/YYYY-MM-DD.md`

## Encadeamento

- Se ha bloqueio critico: sugerir escalar ou ajustar plano
- Se a entrega esta proxima de fechar: sugerir `/post-impl`
- Se o periodo precisa de consolidacao: sugerir `/status-report`

## Template de referencia

Use `~/.agents/templates/daily-delivery.md` como base.

## Regras

- O daily deve refletir estado real, nao intencao otimista.
- Bloqueios devem ter dono e proxima acao, nao apenas descricao.
- Proximo passo deve ser observavel ("implementar X" nao e; "criar teste para Button fixture" e).
- Mantenha curto — se levar mais de 5 minutos, o status provavelmente precisa de um `/status-report`.

## Relacao com o fluxo

```
/plan → execucao → /daily → /daily → ... → /post-impl → /retro
```

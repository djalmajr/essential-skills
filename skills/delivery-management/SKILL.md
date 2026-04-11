---
name: delivery-management
description: Orquestra acompanhamento de entregas. Use quando precisar decidir entre daily, status report ou post-implementation report, ou quando precisar de orientacao sobre como acompanhar uma entrega.
compatibility: opencode
metadata:
  audience: engineering
  workflow: delivery-management
---

# Delivery Management (Orquestrador)

Use esta skill para decidir qual tipo de acompanhamento e adequado e direcionar para a skill correta.

Contexto inicial recebido via slash: $ARGUMENTS

## Escopo

Esta skill organiza tres tipos de acompanhamento, cada um com skill dedicada:

| Tipo | Quando usar | Skill |
|---|---|---|
| Daily Delivery | Status diario, progresso e bloqueios | `/daily` |
| Status Report | Consolidacao de periodo ou marco | `/status-report` |
| Post-Implementation Report | Fechamento de entrega com verificacao | `/post-impl` |

## Como decidir

- **Precisa de status rapido do dia?** → `/daily`
- **Precisa consolidar um periodo ou marco?** → `/status-report`
- **A entrega terminou e precisa ser fechada?** → `/post-impl`
- **Nao sabe por onde comecar?** Pergunte ao usuario o contexto e direcione.

## Regras de funcionamento

- Toda atualizacao deve refletir estado real, nao intencao otimista.
- Bloqueios devem sempre ter impacto, dono e proxima acao.
- Acompanhar execucao nao substitui plano; ele mostra progresso contra o plano.

## Processo

1. Identificar qual tipo de acompanhamento o usuario precisa.
2. Direcionar para a skill dedicada: `/daily`, `/status-report` ou `/post-impl`.
3. Se o usuario nao souber qual tipo, pergunte o contexto e sugira.

## Templates

- Daily: `~/.agents/templates/daily-delivery.md`
- Status Report: `~/.agents/templates/status-report.md`
- Post-Implementation: `~/.agents/templates/post-implementation-report.md`

## Relacao com o fluxo

```
/plan → execucao → /daily → ... → /status-report → /post-impl → /retro
```

Esta skill e um roteador para acompanhamento. Para o tipo especifico, use `/daily`, `/status-report` ou `/post-impl`.

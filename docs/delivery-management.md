# Delivery Management (Roteador)

Decide qual tipo de acompanhamento é adequado para a situação.

## Quando usar

Quando você precisa de acompanhamento mas não sabe qual tipo usar.

## Como usar

```
/delivery-management
```

Com contexto:

```
/delivery-management Sprint 23 em andamento
/delivery-management Fechamos a feature X
```

## Tipos de acompanhamento

| Tipo | Quando usar | Skill |
|------|-------------|-------|
| Daily Delivery | Status rápido do dia | `/daily` |
| Status Report | Consolidado de período ou marco | `/status-report` |
| Post-Implementation | Fechamento formal de entrega | `/post-impl` |

## Árvore de decisão

| Situação | O que usar |
|----------|------------|
| Status do dia a dia | `/daily` |
| Consolidar semana/sprint | `/status-report` |
| Entrega terminou e precisa fechar | `/post-impl` |
| Não sabe por onde começar | Descreva o contexto |

## Dica

Toda atualização deve refletir **estado real**, não intenção otimista. "Vou fazer" não é status.

## Relação com o fluxo

```
/plan → execução → /daily → ... → /status-report → /post-impl → /retro
```

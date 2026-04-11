# Status Report

Consolida status de um período ou marco com entregas, desvios, riscos e próximos passos.

## Quando usar

- Consolidar progresso de um período
- Reportar para stakeholders
- Marco de entrega importante
- Reunião de alinhamento

## Quando NÃO usar

- Status rápido do dia → `/daily`
- Fechamento formal de entrega → `/post-impl`
- Sprint terminou → `/sprint-review`

## Como usar

```
/status-report
```

Com contexto (iniciativa, período, marco):

```
/status-report Sprint 23 - Week 1
/status-report payment-gateway - milestone Q2
```

## O que o status report inclui

1. **Concluído** — entregas finalizadas no período
2. **Em andamento** — com expectativa de quando termina
3. **Desvios** — mudanças de escopo, atrasos, cortes
4. **Riscos e bloqueios** — com impacto e dono
5. **Decisões necessárias** — o que precisa de alinhamento
6. **Próximos passos** — com responsável

## Dica

Distinga **concluído** de **em andamento**. "Terminamos 80%" não é status — ou terminou ou não.

## Encadeamento

- Próximo passo é fechar entrega → `/post-impl`
- Período da sprint acabou → `/sprint-review`
- Precisando de status rápido → `/daily`

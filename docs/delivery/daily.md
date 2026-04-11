# Daily Delivery

Gera status diário com progresso, bloqueios e próximo passo.

## Quando usar

- Todo dia, para manter rastreabilidade
- Quando precisar registrar andamento
- Para comunicar progresso à equipe

## Quando NÃO usar

- Consolidado de período → `/status-report`
- Fechamento de entrega → `/post-impl`
- Sprint terminou → `/sprint-review`

## Como usar

```
/daily
```

Com contexto (iniciativa, issue, plano ativo):

```
/daily payment-gateway
/daily sprint-23
```

## O que o daily inclui

1. **Em andamento** — o que está sendo feito agora
2. **Concluído** — progresso desde o último ciclo
3. **Bloqueios** — com impacto, dono e próxima ação
4. **Riscos** — sinais de algo que pode atrasar
5. **Próximo passo** — observável e verificável

## Dica

Bloqueios devem sempre ter: **impacto + dono + próxima ação**. "Está bloqueado" sem isso não é acionável.

## Encadeamento

- Bloqueio crítico → sugerir escalar ou ajustar plano
- Entrega próxima de fechar → `/post-impl`
- Período precisa de consolidação → `/status-report`

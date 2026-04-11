# Retrospective

Conduz retrospectiva que transforma reflexão em ações concretas de melhoria.

## Quando usar

- Ciclo ou sprint terminou
- Entrega importante foi fechada
- Time identifica problemas recorrentes
- Após `/sprint-review`

## Quando NÃO usar

- Sprint ainda em andamento
- Necessidade de status rápido → `/daily`
- Consolidado para stakeholders → `/sprint-review`

## Como usar

```
/retro
```

Com contexto (período, sprint, entrega):

```
/retro Sprint 23
/retro payment-gateway concluded
```

## O que a retro inclui

1. **Coleta de insumos** — dailies, post-impls, métricas, feedback
2. **Fatos vs Opiniões** — o que aconteceu vs como o time sentiu
3. **Análise** — o que funcionou, o que não funcionou, e por quê
4. **Ações** — 2-3 ações com dono, prazo e forma de verificar
5. **Conexão com próximo ciclo** — como as ações serão observadas

## Dica

Limite a **2-3 ações por retro**. Foco > quantidade. Cada ação deve ter dono e prazo.

## Encadeamento

- Ações da retro → alimentar `/sprint-planning` da próxima sprint
- Métricas → `/sprint-metrics`

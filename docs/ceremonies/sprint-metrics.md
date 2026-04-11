# Sprint Metrics

Extrai métricas objetivas de uma sprint para alimentar retro e decisões.

## Quando usar

- Final da sprint, antes da review ou retro
- Quando o time precisa de dados para discutir performance
- Para comparar sprints e identificar tendências
- Calibrar capacidade de planejamento

## Quando NÃO usar

- Sprint em andamento → aguarde fim
- Status rápido → `/daily`
- Consolidado para stakeholders → `/sprint-review`

## Como usar

```
/sprint-metrics
```

Com contexto (sprint, período):

```
/sprint-metrics Sprint 23
/sprint-metrics Q2 2026
```

## Métricas que o sprint metrics inclui

### Entrega
- Stories planejadas vs entregues
- Taxa de conclusão (%)
- Scope creep (itens adicionados)
- Itens removidos ou adiados

### Qualidade
- Bugs encontrados durante sprint
- Bugs pós-entrega
- Lint/typecheck/testes no fechamento

### Fluxo
- Bloqueios registrados
- Tempo médio de story (start → done)
- Stories que voltaram de done

### Processo
- Dailies realizados vs esperados
- Post-impls gerados

## Dica

Dados > impressões. Métricas alimentam discussão, mas não substituem conversa.

## Encadeamento

- Métricas geradas → alimentar `/retro`
- Próxima sprint → calibrar `/sprint-planning`

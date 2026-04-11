# Sprint Planning

Planeja um ciclo de trabalho com objetivo claro, itens selecionados e ordem de execução.

## Quando usar

- No início de uma sprint ou ciclo
- Para selecionar itens do backlog
- Para declarar capacidade e restrições

## Quando NÃO usar

- Problema não definido → `/intake`
- Item grande precisando quebrar → `/refinement`
- Direção estratégica → `/roadmap`

## Como usar

```
/sprint-planning
```

Com contexto (epic, backlog, período):

```
/sprint-planning Sprint 23 - based on epic-payment.md
/sprint-planning Q2 2026 - 2 weeks
```

## O que o sprint planning inclui

1. **Objetivo da sprint** — resultado observável em uma frase
2. **Itens selecionados** — com tamanho, valor e dependências
3. **Validação de DoR** — cada item tem tudo que precisa para ser executado
4. **Ordem de execução** — bloqueios e dependências mapeados
5. **Capacidade** — restrições, férias, feriados

## Dica

Se um item não tem Definition of Ready, **não entra na sprint** — volta para refinement.

## Encadeamento

- Items da sprint → `/story` ou `/plan` para detalhamento
- Durante sprint → `/daily` para acompanhamento
- Fim de sprint → `/sprint-review` e `/retro`

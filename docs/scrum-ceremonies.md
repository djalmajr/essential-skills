# Scrum Ceremonies (Roteador)

Decide qual cerimônia Scrum é adequada e direciona para a skill correta.

## Quando usar

Quando precisa conduzir uma cerimônia mas não sabe qual usar.

## Como usar

```
/scrum-ceremonies
```

Com contexto:

```
/scrum-ceremonies Sprint 23 vai começar
/scrum-ceremonies Terminaram a sprint 22
```

## Árvore de decisão

| Situação | Cerimônia | Skill |
|----------|-----------|-------|
| Item grande ou ambíguo no backlog | Refinement | `/refinement` |
| Vai começar um ciclo de trabalho | Sprint Planning | `/sprint-planning` |
| Terminou um ciclo ou entrega | Retrospective | `/retro` |

## Dica

Toda cerimônia deve gerar **artefato claro e reutilizável**. Se a discussão não virar backlog ou ações, não terminou.

## Relação com o fluxo

```
/refinement → /epic ou /story
/sprint-planning → /story ou /plan → execução
/retro → ações de melhoria → próximo ciclo
```

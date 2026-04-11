---
name: scrum-ceremonies
description: Orquestra cerimonias Scrum leves. Use quando precisar decidir entre refinement, sprint planning ou retrospective, ou quando precisar de orientacao sobre qual cerimonia conduzir.
compatibility: opencode
metadata:
  audience: engineering
  workflow: scrum-ceremonies
---

# Scrum Ceremonies (Orquestrador)

Use esta skill para decidir qual cerimonia Scrum e adequada e direcionar para a skill correta.

Contexto inicial recebido via slash: $ARGUMENTS

## Escopo

Esta skill organiza tres cerimonias, cada uma com skill dedicada:

| Cerimonia | Quando usar | Skill |
|---|---|---|
| Refinement | Esclarecer escopo, quebrar itens grandes, mapear dependencias | `/refinement` |
| Sprint Planning | Selecionar itens, ordenar execucao, registrar capacidade | `/sprint-planning` |
| Retrospective | Consolidar aprendizados, definir acoes de melhoria | `/retro` |

## Como decidir

- **Tem item grande ou ambiguo no backlog?** → `/refinement`
- **Vai comecar um ciclo de trabalho?** → `/sprint-planning`
- **Terminou um ciclo ou entrega?** → `/retro`
- **Nao sabe por onde comecar?** Pergunte ao usuario o contexto e direcione.

## Regras de funcionamento

- Toda cerimonia deve gerar artefato claro e reutilizavel.
- Evite atas vagas; priorize decisoes, pendencias, donos e proximos passos.
- Sempre converta discussao em backlog ou acoes verificaveis.
- Use linguagem concreta e evite termos ambigos como "melhorar depois".

## Processo

1. Identificar qual cerimonia o usuario precisa.
2. Direcionar para a skill dedicada: `/refinement`, `/sprint-planning` ou `/retro`.
3. Se o usuario nao souber qual cerimonia, pergunte o contexto e sugira.

## Templates

- Refinement: `~/.agents/templates/refinement.md`
- Sprint Planning: `~/.agents/templates/sprint-planning.md`
- Retro: `~/.agents/templates/retro.md`

## Relacao com o fluxo

```
/refinement → /epic ou /story
/sprint-planning → /story ou /plan → execucao
/retro → acoes de melhoria → proximo ciclo
```

Esta skill e um roteador para cerimonias. Para a cerimonia especifica, use `/refinement`, `/sprint-planning` ou `/retro`.

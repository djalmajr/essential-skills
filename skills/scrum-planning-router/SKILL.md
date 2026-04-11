---
name: scrum-planning-router
description: Orquestra decisao entre plano simples, story ou epic. Use quando precisar decidir qual artefato de planejamento e adequado para uma demanda, ou quando precisar de orientacao sobre o fluxo de planejamento.
compatibility: opencode
metadata:
  audience: engineering
  workflow: scrum-light
---

# Scrum Planning (Orquestrador)

Use esta skill para decidir qual artefato de planejamento e adequado e direcionar para a skill correta.

Contexto inicial recebido via slash: $ARGUMENTS

## Objetivo

- Avaliar o tamanho e a clareza da demanda
- Direcionar para a skill de planejamento correta: `/plan`, `/story` ou `/epic`
- Garantir que o artefato escolhido e proporcional ao tamanho da entrega

Esta skill complementa as regras globais em `~/.agents/rules/methodology.md`, `~/.agents/rules/workflow.md` e `~/.agents/rules/plans.md`.

## Arvore de decisao

### Use `/plan` quando
- A mudanca for localizada (XS ou S)
- Houver poucos arquivos
- A entrega couber em um unico ciclo de implementacao

### Use `/story` quando
- Existir entrega vertical com varios arquivos (M)
- Houver criterio de aceite mais rico
- A validacao exigir testes e revisao mais fortes

### Use `/epic` quando
- Houver varias entregas dependentes (L ou XL)
- A iniciativa precisar de roadmap
- Diferentes stories puderem ser planejadas e executadas separadamente

### Ainda nao esta claro?
- Se o problema nao esta definido → use `/intake`
- Se ha ambiguidade sobre escopo → use `/refinement`
- Se precisa de direcao estrategica → use `/roadmap`

## Sizing leve

| Tamanho | Descricao | Artefato | Skill |
|---|---|---|---|
| XS | Ajuste localizado, 1 arquivo, baixo risco | Plano simples | `/plan` |
| S | Pequena entrega, poucos arquivos, validacao simples | Plano simples | `/plan` |
| M | Entrega vertical, varios arquivos, validacao moderada | Story | `/story` |
| L | Story grande, precisa ser quebrada | Epic | `/epic` |
| XL | Iniciativa multi-story, coordenacao necessaria | Epic | `/epic` |

## Regras obrigatorias

Todo artefato gerado pelas skills deve conter:
1. **Contexto** (problema, objetivo, restricoes)
2. **Arquivos** (caminhos exatos, acao)
3. **Detalhamento** (AS-IS, TO-BE, escopo)
4. **Tarefas** (checklist verificavel)
5. **Verificacao** (comandos, validacoes, aceite)

## Processo

1. Avaliar o tamanho da demanda com sizing leve.
2. Se o problema nao esta claro, sugerir `/intake` ou `/refinement`.
3. Direcionar para a skill correta: `/plan`, `/story` ou `/epic`.
4. Confirmar com o usuario antes de prosseguir.

## Convencao de localizacao

- Planos simples: `.agents/plans/<nome>.md`
- Stories e epics de iniciativas: `planning/<iniciativa>/`
- Stories avulsas: `.agents/plans/<nome>.md`

## Relacao com o fluxo

```
/intake → /scrum-planning → /plan ou /story ou /epic
```

Esta skill e um roteador. Ela avalia e direciona, mas nao produz o artefato final. Para produzir artefatos, use `/plan`, `/story` ou `/epic`.

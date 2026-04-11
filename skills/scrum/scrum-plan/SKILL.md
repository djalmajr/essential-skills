---
name: scrum-plan
description: Cria plano simples de execucao para mudancas localizadas. Use quando o trabalho e pequeno (XS ou S), envolve poucos arquivos e pode ser executado em um unico ciclo de implementacao.
compatibility: opencode
metadata:
  audience: engineering
  workflow: plan
---

# Plan

Use esta skill para criar um plano simples de execucao, pronto para implementar.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido (ex: referencia a story, descricao, issue), use como ponto de partida.
Se vier vazio, pergunte o que sera planejado.

## Objetivo

- Criar plano de execucao claro e proporcionalmente simples
- Mapear arquivos impactados
- Definir tarefas verificaveis
- Produzir artefato pronto para implementacao imediata

## Quando usar

- Trabalho pequeno e localizado (XS, S)
- Poucos arquivos impactados
- Pode ser executado em um unico ciclo
- Story ja detalhada que precisa de plano operacional

## Quando NAO usar

- Trabalho medio ou grande — use `/story` ou `/epic`
- Problema ainda nao claro — use `/intake`
- Multiplas entregas dependentes — use `/epic`

## Processo

### 1. Entender o que sera feito

Se vem de uma story, leia a story e extraia:
- Objetivo
- Arquivos impactados
- Criterios de aceite

Se e avulso, pergunte ao usuario e explore o codigo para entender o contexto.

### 2. Montar o plano

Preencha as secoes obrigatorias:

- **Contexto:** problema, objetivo, restricoes
- **Arquivos:** caminhos exatos com acao (ler/alterar/criar)
- **Detalhamento:** AS-IS, TO-BE, escopo, abordagem
- **Tarefas:** checklist verificavel
- **Verificacao:** comandos e validacoes

### 3. Apresentar e aguardar confirmacao

Use ExitPlanMode para apresentar o plano. Aguarde confirmacao explicita antes de implementar.

## Onde salvar

- Salvar em `.agents/plans/<nome>.md`
- Se faz parte de uma iniciativa e a story esta em `planning/`: referenciar a story no contexto

## Cross-referencia

Se o plano vem de uma story ou epic, incluir no topo:

```
**Origem:** `planning/<iniciativa>/stories/<nome>.md` ou `planning/<iniciativa>/epic.md`
```

## Encadeamento

Apos confirmacao do plano:
- Implementar seguindo o checklist
- Ao final, sugerir `/post-impl` para fechar a entrega

## Template de referencia

Use `~/.agents/templates/plan.md` como base.

## Secoes obrigatorias

Todo plano deve conter:

1. **Contexto** (problema, objetivo, restricoes, referencias)
2. **Arquivos** (caminhos exatos, acao, motivo)
3. **Detalhamento** (AS-IS, TO-BE, escopo, abordagem, riscos)
4. **Tarefas** (checklist verificavel)
5. **Verificacao** (lint, typecheck, testes, validacao manual, aceite)

## Regras

- Todo plano deve ser apresentado antes da implementacao (ExitPlanMode).
- So implementar apos confirmacao explicita do usuario.
- Nao criar plano para trabalho que precisa de story (tamanho M+).
- Arquivos devem ter caminhos exatos.
- Tarefas devem ser verificaveis, nao vagas.
- Ao concluir, atualizar `[ ]` para `[x]` conforme progresso real.

## Relacao com o fluxo

```
/intake → /refinement → /epic → /story → /plan → execucao → /post-impl
```

Esta skill e o ultimo passo antes da execucao. Para problemas maiores, use `/story` ou `/epic`. Para fechar a entrega, use `/post-impl`.

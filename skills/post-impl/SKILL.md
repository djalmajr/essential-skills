---
name: post-impl
description: Gera relatorio pos-implementacao com resultado, verificacoes executadas, riscos e proximos passos. Use quando uma entrega (plano, story ou epic) foi concluida e precisa ser fechada formalmente.
compatibility: opencode
metadata:
  audience: engineering
  workflow: delivery
---

# Post-Implementation Report

Use esta skill para fechar uma entrega com verificacao objetiva, riscos remanescentes e proximos passos.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido, use como referencia (ex: plano, story, issue).
Se vier vazio, tente identificar o plano ativo ou pergunte.

## Objetivo

- Consolidar o que foi entregue contra o plano original
- Registrar verificacoes executadas e resultados reais
- Explicitar riscos remanescentes e pendencias
- Fechar a entrega com handoff claro

## Processo

### 1. Identificar a entrega

- Qual plano, story ou epic esta sendo fechado?
- Leia o plano e compare com o estado atual

### 2. Comparar plano vs resultado

- **O que foi entregue:** tarefas concluidas (referencia o checklist)
- **O que ficou pendente:** tarefas nao concluidas e motivo
- **Mudancas de escopo:** o que mudou durante a implementacao

### 3. Executar verificacoes

Rode e registre resultados reais:

- `bun run lint` — resultado
- `bun run typecheck` ou `tsc --noEmit` — resultado
- `bun test` — resultado (se testes existirem)
- Validacao manual — o que foi verificado e como

### 4. Registrar riscos e proximos passos

- Riscos remanescentes (o que pode dar errado)
- Proximos passos (o que ainda precisa ser feito)
- Handoff (quem precisa saber sobre esta entrega)

## Onde salvar

- `planning/<iniciativa>/post-impl.md` ou `planning/<iniciativa>/post-impl-YYYY-MM-DD.md`
- Se e um plano avulso: apresentar inline

## Encadeamento

- Se ha proximos passos que viram novas stories: sugerir `/story` ou `/plan`
- Se o periodo terminou: sugerir `/retro`
- Se faz parte de um epic: atualizar status da story no epic

## Template de referencia

Use `~/.agents/templates/post-implementation-report.md` como base.

## Regras

- **Sempre execute** lint, typecheck e testes. Nao assuma que passam.
- Reporte resultados reais, nao intencao. Se o lint falhou, diga que falhou.
- Se tarefas ficaram pendentes, explique por que.
- O report deve permitir que outra pessoa entenda o estado da entrega sem contexto adicional.

## Relacao com o fluxo

```
/plan → execucao → /post-impl → /retro
```

---
name: sprint-planning
description: Planeja sprint selecionando itens do backlog, definindo objetivo, capacidade e ordem de execucao. Use no inicio de um ciclo de trabalho para alinhar o que sera feito.
compatibility: opencode
metadata:
  audience: engineering
  workflow: ceremonies
---

# Sprint Planning

Use esta skill para planejar um ciclo de trabalho (sprint) com objetivo claro, itens selecionados e ordem de execucao.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido, use como referencia (ex: epic, backlog, periodo).
Se vier vazio, pergunte qual backlog ou iniciativa sera planejada.

## Objetivo

- Declarar objetivo da sprint
- Selecionar itens do backlog com base em valor, risco e dependencia
- Registrar capacidade e restricoes
- Definir ordem de execucao e destacar bloqueios
- Validar que cada item tem Definition of Ready

## Processo

### 1. Declarar objetivo

- O que a sprint deve entregar como resultado observavel?
- Uma frase que guia decisoes de trade-off durante a sprint

### 2. Revisar backlog

Consulte:
- Epic com stories pendentes
- Refinement com itens propostos
- Retro com acoes de melhoria pendentes

### 3. Selecionar itens

Para cada item selecionado, registrar:
- Nome e objetivo
- Tamanho estimado
- Valor (por que agora?)
- Dependencias e bloqueios

### 4. Validar DoR

Cada item deve ter:
- Problema e objetivo claros
- Escopo e fora de escopo registrados
- Arquivos/areas mapeados
- Criterio de aceite verificavel

Se um item nao tem DoR, nao entra na sprint — volta para refinement.

### 5. Ordenar execucao

- O que deve ser feito primeiro (desbloqueia o resto)?
- O que pode rodar em paralelo?
- Qual o caminho critico?

### 6. Registrar compromissos

- Capacidade disponivel (dias, restricoes)
- Compromisso da sprint (itens selecionados)
- O que fica fora (itens adiados)

## Onde salvar

- `planning/sprints/sprint-YYYY-MM-DD.md`
- Ou `planning/<iniciativa>/sprint.md` se a sprint e dedicada a uma iniciativa

## Encadeamento

- Para detalhar a primeira story: sugerir `/story` ou `/plan`
- Para itens que precisam de refinement: sugerir `/refinement`

## Template de referencia

Use `~/.agents/templates/sprint-planning.md` como base.

## Regras

- Nao selecione mais itens do que a capacidade permite. Excesso de compromisso gera frustacao e inconsistencia.
- Cada item deve ter DoR. Sem DoR, nao entra na sprint.
- O objetivo da sprint deve ser observavel, nao vago.
- Dependencias devem ser explicitas — nao assuma que "vai dar tempo".
- A sprint planning alimenta a execucao. Se o planning nao gerar clareza, a execucao vai sofrer.

## Relacao com o fluxo

```
/retro → /sprint-planning → /story ou /plan → execucao → /daily → /post-impl
```

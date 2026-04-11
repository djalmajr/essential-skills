---
name: scrum-story
description: Detalha uma entrega vertical com criterios de aceite, tarefas e verificacao. Use quando o trabalho tem tamanho M, envolve varios arquivos, e precisa de aceite e verificacao mais ricos que um plano simples.
compatibility: opencode
metadata:
  audience: engineering
  workflow: story
---

# Story

Use esta skill para detalhar uma entrega vertical em story com criterios de aceite, tarefas verificaveis e estrategia de verificacao.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido (ex: referencia a epic, descricao, issue), use como ponto de partida.
Se vier vazio, pergunte o que sera detalhado.

## Objetivo

- Detalhar uma entrega vertical com escopo, aceite e verificacao claros
- Mapear arquivos impactados com acoes concretas
- Produzir tarefas verificaveis em fatias verticais
- Garantir que a story pode ser implementada sem inferencia adicional

## Quando usar

- Trabalho com tamanho M (varios arquivos, validacao moderada)
- Entrega vertical que precisa de criterio de aceite mais rico
- Story de um epic que precisa ser detalhada antes da execucao
- Correcao de bug com risco de regressao

## Quando NAO usar

- Trabalho pequeno e localizado (XS, S) — use `/plan`
- Iniciativa com varias stories — use `/epic` primeiro
- Problema ainda nao analisado — use `/intake` ou `/refinement`

## Processo

### 1. Entender o contexto

Se a story vem de um epic, leia o epic e identifique:
- Objetivo da story dentro do epic
- Dependencias com outras stories
- Restricoes ja conhecidas

Se e uma story avulsa, pergunte ao usuario o contexto.

### 2. Mapear escopo

- O que esta dentro do escopo
- O que esta fora do escopo
- Quais arquivos serao impactados (com acao: ler/alterar/criar)

### 3. Definir criterios de aceite

Cada criterio deve ser:
- Observavel (pode ser verificado)
- Especifico (sem ambiguidade)
- Independente (nao depende de outra story)

### 4. Detalhar tarefas

- Organizar em fases (preparacao, implementacao, fechamento)
- Cada tarefa deve ser verificavel
- Priorizar fatias verticais (end-to-end), nao camadas horizontais

### 5. Definir verificacao

- Comandos de lint, typecheck, testes
- Validacoes manuais necessarias
- Evidencias esperadas

## Onde salvar

- Se faz parte de uma iniciativa: `planning/<iniciativa>/stories/<nome>.md`
- Se e uma story avulsa: `.agents/plans/<nome>.md`
- Pergunte ao usuario se houver duvida

## Cross-referencia

Sempre incluir no topo:

```
**Origem:** `planning/<iniciativa>/epic.md` (ou referencia de onde veio)
```

## Encadeamento

Ao final da story, oferecer:

- "Quer que eu crie o plano de execucao com `/plan`?"
- "Quer que eu crie a issue no GitHub?"

## Template de referencia

Use `~/.agents/templates/story.md` como base para o artefato.

## Secoes obrigatorias

Toda story deve conter:

1. **Contexto** (problema, objetivo, valor, restricoes, issue/epic relacionado)
2. **Arquivos** (caminhos exatos, acao, motivo)
3. **Detalhamento** (AS-IS, TO-BE, escopo, criterios de aceite, dependencias, abordagem, riscos)
4. **Tarefas** (checklist em fases verticais)
5. **Verificacao** (comandos, validacoes, evidencias)

## Regras

- Nunca crie story sem contexto. Se o problema nao esta claro, use `/intake` primeiro.
- Criterios de aceite devem ser verificaveis, nao vagos ("deve funcionar" nao e aceite).
- Arquivos devem ter caminhos exatos, nao areas vagas.
- Tarefas devem ser verticais (end-to-end), nao horizontais (toda a UI, depois todo o backend).
- A story deve ser executavel sem precisar de informacao adicional.

## Relacao com o fluxo

```
/intake → /refinement → /epic → /story → /plan → execucao
```

Esta skill atua apos epic (ou direto apos intake para itens M). Para plano de execucao, use `/plan`. Para itens pequenos, use `/plan` direto.

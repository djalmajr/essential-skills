---
name: plan-goal
description: >
  Write a long implementation plan plus a Grok /goal harness file, then give a
  paste-ready /goal command. Use when the user runs /plan-goal, or asks for
  "plano e goal", "prepara o /goal", or "texto para colar no TUI".
argument-hint: "<objetivo>"
user-invocable: true
metadata:
  short-description: Plano + arquivo de /goal + texto para colar
---

# /plan-goal

Prepara o par de arquivos e o texto do `/goal`. Não implementa. Não dispara `/goal` (só o usuário cola no TUI).

`$ARGUMENTS` é o objetivo. Se vier vazio, pergunta em uma frase o que planejar e espera.

## Project root

Write artifacts in the repo where the work will happen, not the agent's current
working directory if they differ. Paths below are relative to that project root.
If the root is ambiguous, ask before writing.

## Arquivos

Dois markdowns, nomes estáveis a partir do slug do objetivo:

1. **Plano longo** — contexto, decisões, AS-IS/TO-BE, arquivos, fases, testes, aceite.
2. **Plano de goal** (`*.goal.md`) — `Goal kind`, `Acceptance criteria` numerados, `Verification plan` (gating/evidence), `Non-goals`, `Assumed scope`, `Implementation approach`, `Task checklist`, `Risks`.

Pasta **já no .gitignore** do repo. Preferência:

1. `plans/sketches/` se o ignore cobrir
2. senão outro path ignorado (`tmp/`, `plans/local/`)
3. senão cria `plans/sketches/` **e** adiciona essa linha no `.gitignore` do repo

Não commitar esses arquivos a menos que o usuário peça.

## Prompting

- Objetivo vazio: pergunta em texto livre (uma frase) e espera. Não use a ferramenta
  estruturada — o objetivo é livre.
- Path de pasta ignorada vs criar `plans/sketches/`: só pergunta se o ignore não cobrir
  nenhum candidato óbvio.

## Conteúdo

- Idioma do usuário. Identificadores de código em inglês.
- Critérios de aceite verificáveis pelo agente no ambiente local (testes, curl, browser já logado). Não depender de clique humano se der para evitar.
- Git só o que esta conversa autorizou. Sem merge em `main` a menos que peçam.
- Fases curtas (≤5 arquivos de código, fora locales/CHANGELOG/migration gerada).

## Fecho obrigatório

Um único fence, pronto para colar, começando com `/goal` e citando os dois paths, a branch, o entregável, os non-goals e o aceite. Sem pedir ao usuário para reescrever o objetivo.

O `/goal` do TUI o agente **não** dispara — só devolve o texto. Em harnesses sem TUI `/goal`, os dois markdowns continuam sendo o entregável.

Standing preference: ai-memory `default` / `_global` → `_rules/grok-tui-goal.md`.

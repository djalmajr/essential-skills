---
name: epic
description: Estrutura iniciativas grandes em backlog de stories com roadmap, dependencias e verificacao. Use quando o trabalho exige varias stories coordenadas, tem dependencias entre entregas ou precisa de roadmap.
compatibility: opencode
metadata:
  audience: engineering
  workflow: epic
---

# Epic

Use esta skill para transformar um refinement ou iniciativa grande em um epic estruturado com backlog de stories, roadmap e criterios de aceite.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido (ex: caminho de refinement, intake, ou descricao), use como ponto de partida.
Se vier vazio, pergunte qual iniciativa sera estruturada.

## Objetivo

- Estruturar backlog de stories com dependencias e ordem
- Definir roadmap do epic (fases, desbloqueios, validacoes intermediarias)
- Garantir que cada story pode ser planejada e executada separadamente
- Produzir artefato que orienta a execucao sem substituir os planos individuais

## Quando usar

- Apos um `/refinement` que gerou varias stories
- Quando a iniciativa tem tamanho L ou XL
- Quando ha dependencias entre entregas que precisam de coordenacao
- Quando e necessario um roadmap para orientar a sequencia

## Quando NAO usar

- O trabalho cabe em uma unica story — use `/story`
- O trabalho e localizado e pequeno — use `/plan`
- O problema ainda nao foi analisado — use `/intake` ou `/refinement` primeiro

## Processo

### 1. Analisar contexto

Leia o refinement, intake ou material fornecido. Identifique:

- Problema macro e objetivo
- Stories ja identificadas (do refinement)
- Restricoes e premissas

### 2. Estruturar o epic

Preencha as secoes obrigatorias:

- **Contexto:** problema, AS-IS, TO-BE, fora de escopo
- **Backlog de stories:** lista com objetivo, tamanho e dependencia de cada
- **Roadmap:** fases/sprints, o que desbloqueia o que, validacoes intermediarias
- **Riscos:** o que pode dar errado e como mitigar
- **Criterio de aceite do epic:** como saber que a iniciativa esta completa

### 3. Detalhar cada story (resumo)

Para cada story no backlog, registrar:

- Nome e objetivo (1 linha)
- Tamanho estimado (XS a XL)
- Depende de (quais stories)
- Status (nao iniciada, em andamento, concluida)

O detalhamento completo de cada story sera feito com `/story`.

### 4. Definir roadmap

- Agrupar stories por fase/sprint
- Mostrar o que pode rodar em paralelo
- Destacar o caminho critico
- Incluir validacoes intermediarias (marcos)

## Onde salvar

- Salvar em `planning/<iniciativa>/epic.md`
- Se a iniciativa nao tem pasta em `planning/`, perguntar ao usuario o nome

## Cross-referencia

Sempre incluir no topo do artefato:

```
**Origem:** `planning/<iniciativa>/intake.md`
**Refinement:** `planning/<iniciativa>/refinement.md`
```

## Encadeamento

Ao final do epic, oferecer:

- "Quer que eu detalhe alguma story com `/story`?"
- "Quer comecar pela Story 1 com `/plan`?"

Pergunte ao usuario qual story quer detalhar primeiro.

## Template de referencia

Use `~/.agents/templates/epic.md` como base para o artefato.

## Regras

- O epic nao substitui stories nem planos. Ele organiza o backlog e orienta a sequencia.
- Cada story no backlog deve ter objetivo claro e ser executavel separadamente.
- O roadmap deve mostrar dependencias, nao apenas ordem cronologica.
- Criterio de aceite do epic deve ser verificavel.
- Atualize o status das stories conforme o epic progride.

## Secoes obrigatorias

Todo epic deve conter:

1. **Contexto** (problema, AS-IS, TO-BE, fora de escopo)
2. **Backlog de stories** (lista com objetivo, tamanho, dependencia, status)
3. **Roadmap** (fases, paralelismo, caminho critico)
4. **Criterio de aceite do epic**
5. **Riscos**

## Relacao com o fluxo

```
/intake → /refinement → /epic → /story → /plan → execucao
```

Esta skill atua apos refinement e antes de detalhar stories individuais. Para refinement, use `/refinement`. Para detalhar uma story, use `/story`.

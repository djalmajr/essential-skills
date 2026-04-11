---
name: refinement
description: Quebra intakes ou backlogs grandes em stories executaveis com dependencias claras. Use quando um problema ja foi capturado (intake) mas ainda precisa ser decomposto antes da execucao.
compatibility: opencode
metadata:
  audience: engineering
  workflow: refinement
---

# Refinement

Use esta skill para transformar um intake, backlog ou iniciativa grande em stories executaveis com dependencias, ordem e criterios de aceite claros.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido (ex: caminho de arquivo, texto, referencia), use como ponto de partida.
Se vier vazio, pergunte qual iniciativa ou intake sera refinado.

## Objetivo

- Quebrar itens grandes em stories proporcionais e executaveis
- Explicitar dependencias, desbloqueios e riscos
- Definir ordem de implementacao
- Produzir backlog pronto para execucao (cada story com objetivo, tamanho e dependencia)

## Quando usar

- Apos um `/intake` que recomendou refinement
- Quando um item de backlog e grande demais (L ou XL) para executar direto
- Quando ha ambiguidade sobre escopo, dependencias ou ordem
- Antes de criar um epic com varias stories

## Quando NAO usar

- O item ja esta claro e cabe em uma story — use `/story` direto
- O item e pequeno e localizado — use `/plan` direto
- O problema ainda nao foi capturado — use `/intake` primeiro

## Processo

### 1. Analisar o material de entrada

Leia o intake, backlog ou descricao fornecida. Identifique:

- Qual o problema/objetivo macro
- Quais areas sao impactadas
- Quais restricoes ja sao conhecidas
- Qual o tamanho estimado (L? XL?)

### 2. Identificar eixos de decomposicao

Quebre por **fatia vertical de valor**, nao por camada tecnica:

- Cada story deve entregar algo observavel
- Prefira stories independentes quando possivel
- Identifique dependencias entre stories (o que desbloqueia o que)

### 3. Propor backlog de stories

Para cada story, registre:

- Nome e objetivo
- Tamanho estimado (XS, S, M, L)
- Dependencias (de quais stories depende)
- O que valida (criterio de aceite resumido)

### 4. Definir ordem de implementacao

- Agrupe por sprint ou fase
- Identifique o que pode rodar em paralelo
- Destaque o caminho critico

### 5. Registrar decisoes e pendencias

- Decisoes tomadas durante o refinement
- Perguntas que ficaram em aberto
- Riscos identificados

## Onde salvar

- Se faz parte de uma iniciativa com pasta em `planning/`: salvar em `planning/<iniciativa>/refinement.md`
- Se e um refinement avulso: apresentar inline e confirmar com o usuario

## Cross-referencia

Sempre incluir no topo do artefato:

```
**Origem:** `planning/<iniciativa>/intake.md` (ou referencia de onde veio)
```

## Encadeamento

Ao final do refinement, oferecer o proximo passo:

- Se o refinement gerou varias stories → sugerir `/epic` para estruturar o backlog
- Se gerou 1-2 stories simples → sugerir `/story` para detalhar
- Se gerou apenas 1 item pequeno → sugerir `/plan`

Pergunte ao usuario qual caminho seguir.

## Template de referencia

Use `~/.agents/templates/refinement.md` como base para o artefato.

## Regras

- Nunca pule direto para implementacao a partir de um refinement. O refinement gera stories ou epic, nao codigo.
- Quebre por comportamento/entrega, nao por camada tecnica.
- Cada story deve ter objetivo claro e tamanho estimado.
- Dependencias devem ser explicitas, nao implicitas.
- Se um item nao pode ser quebrado, registre como risco (story muito grande).

## Relacao com o fluxo

```
/intake → /refinement → /epic ou /story → /plan → execucao
```

Esta skill atua entre o intake e a criacao de epics/stories. Para captura de problemas, use `/intake`. Para detalhamento de stories, use `/story`. Para epics, use `/epic`.

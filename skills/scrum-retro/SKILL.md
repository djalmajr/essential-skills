---
name: scrum-retro
description: Conduz retrospectiva com aprendizados e acoes de melhoria. Use quando um ciclo, sprint ou entrega terminou e o time precisa refletir sobre o que funcionou e o que precisa mudar.
compatibility: opencode
metadata:
  audience: engineering
  workflow: ceremonies
---

# Retrospective

Use esta skill para conduzir uma retrospectiva que transforma reflexao em acoes concretas de melhoria.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido, use como referencia (ex: periodo, sprint, iniciativa).
Se vier vazio, pergunte qual periodo ou entrega sera analisada.

## Objetivo

- Separar fatos de opinioes
- Identificar o que funcionou e o que nao funcionou (e por que)
- Gerar poucas acoes claras com dono e prazo
- Alimentar melhoria de processo, nao apenas memoria historica

## Processo

### 1. Coletar insumos

Consulte:
- Post-implementation reports do periodo
- Dailies e status reports
- Sprint review (se existir)
- Sprint metrics (se existir)
- Feedback do usuario ou stakeholders

### 2. Separar fatos de opinioes

- **Fatos:** o que aconteceu (entregas, bloqueios, desvios, metricas)
- **Percepcoes:** como o time/individuo sentiu o processo

### 3. Analisar

- **O que funcionou bem:** praticas, ferramentas, decisoes que deram resultado
- **O que nao funcionou:** o que causou atrito, atraso ou retrabalho
- **Por que:** causa raiz, nao apenas sintoma

### 4. Definir acoes

- Limitar a 2-3 acoes por retro (foco > quantidade)
- Cada acao deve ter:
  - Descricao especifica
  - Dono responsavel
  - Prazo
  - Como verificar que a melhoria aconteceu

### 5. Conectar ao proximo ciclo

- Como essas acoes serao observadas na proxima sprint/entrega?
- Alguma acao vira item de backlog?

## Onde salvar

- `planning/<iniciativa>/retro.md` se for retro de uma iniciativa
- `planning/retros/retro-YYYY-MM-DD.md` se for retro de sprint/periodo

## Encadeamento

- Se acoes geram novas stories: sugerir `/story` ou `/plan`
- Se acoes mudam processo: sugerir atualizar rules ou skills
- Se o ciclo reinicia: sugerir `/sprint-planning`

## Template de referencia

Use `~/.agents/templates/retro.md` como base.

## Regras

- Retro nao e desabafo nem ata de reuniao. E ferramenta de melhoria.
- Acoes devem ser especificas e executaveis, nao vagas ("melhorar comunicacao" nao e acao).
- Cada acao deve ter dono. Acao sem dono nao vai acontecer.
- Limitar acoes a 2-3 por retro. Muitas acoes = nenhuma executada.
- Se a mesma acao aparece em retros consecutivas, o problema e mais profundo — discuta causa raiz.

## Relacao com o fluxo

```
/post-impl → /retro → acoes de melhoria → proximo ciclo
```

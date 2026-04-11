---
name: scrum-roadmap
description: Estrutura roadmaps trimestrais e roadmaps por epic. Use quando precisar organizar direcao, prioridades, fases, dependencias e ligacao entre roadmap, epics e stories.
compatibility: opencode
metadata:
  audience: engineering
  workflow: roadmap-planning
---

# Roadmap Planning

Use esta skill para transformar objetivos amplos em roadmaps claros, priorizados e conectados ao backlog executavel.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido, use como ponto de partida (ex: intake, lista de iniciativas, periodo).
Se vier vazio, pergunte o objetivo do roadmap.

## Escopo
- `roadmap trimestral`: alinhamento de direcao, objetivos do periodo e prioridades macro
- `roadmap por epic`: fases, stories, desbloqueios e ordem de entrega de uma iniciativa

## Regras de funcionamento
- Roadmap deve focar em resultados e capacidades, nao em listas tecnicas extensas.
- Todo item de roadmap deve indicar valor esperado, dependencias e sinal de progresso.
- O roadmap deve mostrar o que e compromisso, o que e risco e o que fica fora do periodo.
- Sempre que possivel, cada iniciativa deve apontar para um epic ou story correspondente.

## Como montar roadmap trimestral
1. Declarar objetivo do periodo.
2. Listar 2-5 iniciativas principais.
3. Ordenar as iniciativas por dependencia e valor.
4. Registrar riscos, restricoes e itens fora de compromisso.
5. Validar se a narrativa do trimestre e observavel.

## Como montar roadmap por epic
1. Declarar objetivo do epic.
2. Definir fases ou ondas de entrega.
3. Relacionar stories por fase.
4. Explicitar desbloqueios, riscos e validacoes intermediarias.
5. Confirmar que o roadmap orienta a execucao sem substituir os planos.

## Onde salvar

- Roadmap trimestral: `planning/roadmaps/Q<N>-YYYY.md`
- Roadmap de iniciativa: `planning/<iniciativa>/roadmap.md`

## Encadeamento

Ao final do roadmap, oferecer:
- "Quer que eu rode `/refinement` para a primeira iniciativa?"
- "Quer que eu crie o `/epic`?"

## Template

Use `~/.agents/templates/roadmap.md` como base.

## Relacao com o fluxo

```
/intake → /roadmap → /refinement → /epic → /story → /plan
```

Esta skill conecta estrategia e execucao. Para refinement, use `/refinement`. Para epics, use `/epic`.

---
name: onboarding
description: Guia de onboarding para novos membros do time no fluxo agil com IA. Use quando alguem novo entrar no time e precisar entender como funciona o fluxo de planejamento, execucao e acompanhamento com agentes de IA.
compatibility: opencode
metadata:
  audience: engineering
  workflow: onboarding
---

# Onboarding

Use esta skill para guiar novos membros do time pelo fluxo agil com IA, de forma pratica e progressiva.

## Objetivo

- Dar contexto sobre o modelo operacional (Scrum leve + IA como par)
- Ensinar o fluxo de artefatos na pratica, nao na teoria
- Garantir que o novo membro consiga operar com autonomia em 1-2 sprints
- Evitar que o onboarding seja apenas documentacao — deve incluir pratica

## Quando usar

- Novo dev ou gestor entra no time
- Alguem muda de papel (dev vira tech lead, por exemplo)
- O time adota o fluxo pela primeira vez
- Alguem precisa de reciclagem apos tempo fora

## Trilha de onboarding

### Dia 1: Entender o modelo

**Objetivo:** saber o que existe e por que.

1. Apresentar o fluxo completo:
   `intake -> roadmap -> refinement -> epic/story -> plan -> issue -> daily -> status -> report -> retro`

2. Explicar a divisao de papeis:
   - Humano: decide, valida, controla git, comunica
   - IA: estrutura, implementa, verifica, reporta

3. Mostrar a arvore de decisao:
   - Quando usar plano simples vs story vs epic
   - Sizing leve (XS a XL)

4. Mostrar as skills disponiveis e como acionar cada uma.

### Dia 2: Exercicio pratico — intake e planejamento

**Objetivo:** criar um intake e um plano simples com apoio da IA.

Exercicio sugerido:

1. O novo membro escolhe um problema pequeno e real (bug, melhoria, task)
2. Usa a skill `intake` para estruturar o problema
3. Decide o artefato correto com a arvore de decisao
4. Usa `scrum-planning` para criar o plano ou story
5. O mentor/tech lead revisa e da feedback

### Dia 3: Exercicio pratico — execucao com TDD

**Objetivo:** implementar algo usando o fluxo plan -> TDD -> verificacao.

Exercicio sugerido:

1. Pegar o plano criado no dia 2
2. Implementar usando TDD com a IA como par:
   - Descrever o comportamento esperado
   - IA escreve o teste (red)
   - IA implementa (green)
   - Dev pede refactoring se necessario
3. Rodar verificacoes (lint, tipos, testes)
4. Revisar o diff antes de commitar

### Dia 4: Exercicio pratico — acompanhamento

**Objetivo:** gerar daily e fechar com post-implementation report.

1. Usar `delivery-management` para gerar o daily delivery
2. Simular um status report
3. Fechar a entrega com post-implementation report
4. Revisar a cadeia completa: plan -> execucao -> daily -> report

### Dia 5: Reflexao e autonomia

**Objetivo:** avaliar se o novo membro esta pronto para operar com autonomia.

1. O novo membro conduz um intake sozinho
2. Cria plan ou story sem ajuda do mentor
3. Implementa com TDD
4. Fecha com report
5. Mentor valida e da feedback final

## Checklist de onboarding

- [ ] Entende o fluxo completo (intake a retro)
- [ ] Sabe escolher o artefato certo (arvore de decisao)
- [ ] Consegue criar plan ou story com apoio da IA
- [ ] Sabe usar TDD com a IA como par
- [ ] Sabe gerar daily e post-implementation report
- [ ] Entende a divisao de responsabilidades (humano vs IA)
- [ ] Sabe quais skills estao disponiveis e quando usar cada uma
- [ ] Fez pelo menos um ciclo completo (intake -> report) com supervisao

## Adaptacao por perfil

### Para devs
- Foco em: TDD, pair programming com IA, quality gates, git workflow
- Exercicio extra: implementar uma feature pequena do zero usando o fluxo

### Para gestores / scrum masters
- Foco em: roadmap, refinement, sprint planning, retro, status reports
- Exercicio extra: conduzir um refinement e sprint planning com apoio da IA

### Para tech leads
- Ambos os focos: planejamento e execucao
- Exercicio extra: revisar codigo gerado por IA e dar feedback construtivo

## Regras

- O onboarding nao e passivo. O novo membro deve praticar, nao apenas ler.
- O mentor nao faz pelo novo membro — orienta e revisa.
- Erros no onboarding sao oportunidades, nao falhas. O ambiente deve ser seguro para experimentar.
- Se o novo membro nao conseguir completar o checklist em 5 dias uteis, o problema pode ser o processo, nao a pessoa. Discuta na retro.

## Relacao com o fluxo

Esta skill atua como porta de entrada para todas as outras. Depois do onboarding, o membro deve conseguir acionar `scrum-planning`, `tdd`, `delivery-management` e `scrum-ceremonies` com autonomia.

---
name: intake
description: Estrutura problemas novos e vagos em documentos de intake claros. Use quando o problema ainda nao esta maduro o bastante para virar backlog, quando alguem traz uma ideia ou necessidade sem escopo definido, ou quando e preciso decidir qual o proximo artefato do fluxo.
compatibility: opencode
metadata:
  audience: engineering
  workflow: intake
---

# Intake

Use esta skill para transformar problemas vagos, ideias iniciais ou pedidos nao estruturados em documentos de intake claros e acionaveis.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido (ex: caminho de arquivo, texto, referencia de issue, URL), use como ponto de partida do intake.
Se vier vazio, comece pedindo uma descricao curta do problema.

## Objetivo

- Explicitar o problema ou oportunidade antes de planejar
- Identificar restricoes, premissas e perguntas em aberto
- Definir o proximo passo do fluxo: `/roadmap`, `/refinement`, `/story` ou `/plan`
- Evitar que trabalho comece sem clareza sobre o que esta sendo resolvido

## Quando usar

- Alguem traz uma ideia, necessidade ou problema sem escopo definido
- O pedido e vago demais para virar story ou plano diretamente
- Ha incerteza sobre o tamanho, a prioridade ou a abordagem
- E o primeiro contato com um problema novo

## Quando NAO usar

- O problema ja esta claro e o escopo definido — use `/story` ou `/plan` direto
- O trabalho ja foi refinado — va para `/story` ou `/plan`
- E uma correcao trivial — use `/plan` direto

## Processo de intake

### 1. Ouvir e registrar

Pergunte ao usuario:

- Qual e o problema ou oportunidade?
- Quem e afetado e como?
- Existe urgencia ou prazo?
- Quais restricoes ja sao conhecidas?

Nao assuma respostas. Se o usuario nao souber, registre como pergunta em aberto.

### 2. Estruturar o intake

Preencha o template com as informacoes coletadas:

- Contexto: problema, objetivo inicial, sinal de valor, restricoes
- Escopo inicial: o que inclui e o que nao inclui (mesmo que provisorio)
- Entradas e referencias: stakeholders, documentos, contexto tecnico
- Perguntas em aberto: tudo que ainda nao tem resposta

### 3. Definir proximo passo

Com base no tamanho e na clareza:

- Problema grande e estrategico → `/roadmap`
- Problema grande mas operacional (L/XL) → `/refinement`
- Problema medio com escopo razoavel (M) → `/story`
- Problema pequeno e claro (XS/S) → `/plan`

Registre a recomendacao no intake e confirme com o usuario.

### 4. Salvar o intake

- Pergunte o nome da iniciativa (ex: "component-tests", "auth-refactor")
- Salve em `planning/<iniciativa>/intake.md`
- Se o usuario preferir nao salvar, apresente inline

### 5. Encadear

Apos confirmacao do usuario, oferecer gerar o proximo artefato:

- "Quer que eu rode `/refinement` para quebrar em stories?"
- "Quer que eu crie o `/epic` direto?"
- "Quer que eu crie a `/story`?"
- "Quer que eu crie o `/plan`?"

### 6. Validar

Antes de fechar o intake, confirme:

- [ ] O problema esta claro o bastante para o proximo passo
- [ ] Restricoes e premissas foram explicitadas
- [ ] O proximo artefato do fluxo foi definido

## Regras

- Nunca pule direto para implementacao a partir de um intake. O intake gera o proximo artefato, nao codigo.
- Se o usuario insistir em comecar sem clareza, registre os riscos e pergunte se quer prosseguir mesmo assim.
- O intake deve ser curto — 10 a 15 minutos de conversa no maximo. Se levar mais, o problema provavelmente precisa de `/refinement`.
- Mantenha o tom de discovery, nao de planejamento detalhado.

## Template

Use `~/.agents/templates/intake.md` como base para o artefato.

## Relacao com o fluxo

```
/intake → /roadmap ou /refinement ou /epic ou /story ou /plan
```

Esta skill e o ponto de entrada do fluxo. Ela captura o problema e direciona para a skill correta. Para decisao entre artefatos, tambem pode usar `/scrum-planning`. Para cerimonias, use `/scrum-ceremonies`.

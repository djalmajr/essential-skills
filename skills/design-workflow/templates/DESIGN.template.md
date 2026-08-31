---
name: <Nome do produto>
description: Identidade visual de <produto>; tokens normativos no front matter.
colors:
  primary: "#000000"
  neutral: "#ffffff"
typography:
  body-md:
    fontFamily: <Fonte>
    fontSize: 1rem
rounded:
  md: 8px
spacing:
  md: 16px

# Gate determinístico (skill design-workflow) — ver references/x-parity.md
x-parity:
  include: ["src"]
  exclude: []
  # Vocabulário proibido é POLÍTICA DO PROJETO — comece vazio e adicione
  # regex conforme o dono decidir (ver presets/typography-default-everywhere.md
  # para um exemplo opt-in de política "tamanho herdado em tudo").
  forbidden: []
  allowed: []
  cssFile: "src/index.css"
  # valor exato NO escopo exato; atalho string = ":root"
  cssVars: {}
  # cssVars:
  #   colors.primary: { selector: ":root", var: "--primary" }
  #   darkColors.primary: { selector: ".dark", var: "--primary" }
---

## Overview

<Direção estética em 2–4 frases: o que o produto deve evocar.>

## Colors

<Papel de cada token de cor; quando usar; o que é proibido (hex inline etc.).>

## Typography

<OBRIGATÓRIO — política de tamanhos DESTE produto: escala livre por token?
tamanho herdado com exceções? Defina aqui e espelhe em `x-parity.forbidden`/
`allowed`. Um preset opt-in de "texto padrão em tudo" existe em
`presets/typography-default-everywhere.md` — só adote se for a política do
dono, nunca por default.>

## Layout

<Ritmo de espaçamento, gutters padrão, geometria do shell.>

### Prioridades visuais em conflito

<Ordene as preferências DESTE produto, ex.: espaçamento antes de borda;
borda antes de sombra; geometria por conteúdo antes de altura fixa.>

## Elevation & Depth

<Quando sombra/borda/superfície são permitidas.>

## Shapes

<Escala de radius e onde cada nível se aplica.>

## Components

<Contratos por componente quando divergirem do kit base.>

## Do's and Don'ts

<Anti-padrões DESTE produto — inclua os "reflexos de design gerado" que o
dono já rejeitou em revisões (cada correção visual do dono vira uma linha
aqui, na mesma mudança que a aplica).>
- Do ...
- Don't ...

---
name: <Product name>
description: Visual identity of <product>; normative tokens in the front matter.
colors:
  primary: "#000000"
  neutral: "#ffffff"
typography:
  body-md:
    fontFamily: <Font>
    fontSize: 1rem
rounded:
  md: 8px
spacing:
  md: 16px

# Deterministic gate (design-workflow skill) — see references/x-parity.md
x-parity:
  include: ["src"]
  exclude: []
  # Forbidden vocabulary is PROJECT POLICY — start empty and add regex as
  # the owner decides (see presets/typography-default-everywhere.md for an
  # opt-in "inherited size everywhere" example).
  forbidden: []
  allowed: []
  cssFile: "src/index.css"
  # exact value IN the exact scope; string shortcut = ":root"
  cssVars: {}
  # cssVars:
  #   colors.primary: { selector: ":root", var: "--primary" }
  #   darkColors.primary: { selector: ".dark", var: "--primary" }
---

## Overview

<Aesthetic direction in 2–4 sentences: what the product should evoke.>

## Colors

<Role of each color token; when to use it; what is forbidden (inline hex, etc.).>

## Typography

<REQUIRED — size policy for THIS product: free scale per token? inherited size
with exceptions? Define it here and mirror it in `x-parity.forbidden` /
`allowed`. An opt-in "inherited size everywhere" preset lives in
`presets/typography-default-everywhere.md` — adopt it only if it is the owner's
policy, never by default.>

## Layout

<Spacing rhythm, default gutters, shell geometry.>

### Conflicting visual priorities

<Order THIS product's preferences, e.g. spacing before border; border before
shadow; content-driven geometry before fixed height.>

## Elevation & Depth

<When shadow/border/surface are allowed.>

## Shapes

<Radius scale and where each level applies.>

## Components

<Per-component contracts when they diverge from the base kit.>

## Do's and Don'ts

<Anti-patterns for THIS product — include the "generated-design reflexes" the
owner already rejected in reviews (each owner visual correction becomes a line
here, in the same change that applies it).>
- Do ...
- Don't ...

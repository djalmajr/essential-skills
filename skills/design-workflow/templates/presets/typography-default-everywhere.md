# Opt-in preset: "inherited size everywhere"

OPTIONAL typography policy — adopt it only if the product owner chooses it
explicitly. Bootstrap NEVER applies it by default; each product's identity
lives in its DESIGN.md, not in this skill.

## Prose (paste into the DESIGN.md Typography section, adjusting exceptions)

- **Inherited size everywhere:** the UI uses the inherited size; no size
  utility class outside the exceptions below.
- **Owner-indicated exceptions:** <list each approved exception, e.g.
  `text-xs` for hints/metadata; 11px caps for section labels>. Every
  `x-parity.allowed` entry corresponds to an item on this list.

## Matching `x-parity` block

```yaml
forbidden:
  - "text-(sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)(?![-\\w])"
  - "text-\\[[0-9.]+(px|rem)\\]"
allowed: [] # fill with owner-approved exceptions
```

Origin: policy adopted by the first consumer (dense internal-tool UI); kept
here as a ready example because it is common in dense tool UIs — but it is a
product aesthetic choice, not part of the process.

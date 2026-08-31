# Preset opt-in: "texto padrão em tudo"

Política de tipografia OPCIONAL — só adote se o dono do produto decidir por
ela explicitamente. Bootstrap NUNCA a aplica por default; a identidade de
cada produto vive no DESIGN.md dele, não nesta skill.

## Prosa (colar na seção Typography do DESIGN.md, ajustando exceções)

- **Texto padrão em tudo:** a UI usa o tamanho herdado; nenhuma classe
  utilitária de tamanho fora das exceções abaixo.
- **Exceções indicadas pelo dono:** <liste cada exceção aprovada, ex.:
  `text-xs` para hints/metadados; caps 11px para labels de seção>. Toda
  entrada em `x-parity.allowed` corresponde a um item desta lista.

## Bloco `x-parity` correspondente

```yaml
forbidden:
  - "text-(sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)(?![-\\w])"
  - "text-\\[[0-9.]+(px|rem)\\]"
allowed: [] # preencha com as exceções aprovadas pelo dono
```

Origem: política adotada pelo primeiro consumidor (UI densa de ferramenta interna); mantida aqui
como exemplo pronto porque é comum em UIs densas de ferramenta — mas é uma
escolha estética do produto, não parte do processo.

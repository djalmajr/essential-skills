# `x-parity` — configuração do gate de paridade

Bloco opcional no front matter do `DESIGN.md` raiz do projeto (chave
estendida; consumidores do formato Google DESIGN.md ignoram chaves
desconhecidas). É a ÚNICA fonte de configuração dos scripts — nada
específico de projeto vive na skill.

```yaml
x-parity:
  # check-classes.ts
  include: ["src"]                # dirs varridos, relativos à raiz
  exclude:                        # padrões de caminho ignorados
    - "**/renderer/**"            # ex.: saída de app do usuário
    - "src/locales/**"            # strings traduzidas
  forbidden:                      # regex (flag g) de utilitários proibidos
    - "text-(sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)(?![-\\w])"
    - "text-\\[[0-9.]+(px|rem)\\]"
  allowed:                        # matches exatos liberados (exceções do dono)
    - "text-xs"
    - "text-[11px]"
    - "text-[0.625rem]"
    - "text-[0.5625rem]"

  # check-tokens.ts — valor exato NO escopo exato (atalho string = ":root")
  cssFile: "src/index.css"
  cssVars:
    colors.primary: { selector: ":root", var: "--primary" }
    colors.border: "--border"
    darkColors.primary: { selector: ".dark", var: "--primary" }
```

Regras:

- Cada entrada de `include` deve ser um diretório existente relativo à raiz;
  caminho ausente ou arquivo é erro de configuração (exit 2), nunca gate verde.
- Higiene fixa do scanner (não configurável): `node_modules`, diretórios
  iniciados por ponto e arquivos `*.test.*` / `*.spec.*` não são varridos.
- `forbidden`/`allowed` codificam o vocabulário fechado do projeto; toda
  entrada em `allowed` corresponde a uma exceção indicada pelo dono na prosa
  do `DESIGN.md` (seção de exceções / Do's & Don'ts).
- `cssVars` compara o valor EXATO (normalizado por espaços/caixa) da ÚLTIMA
  declaração da var dentro do bloco de NÍVEL SUPERIOR do seletor indicado
  (semântica CSS de last-wins) — nunca "em qualquer lugar do arquivo": um
  tema alternativo com o mesmo valor não mascara um `:root` quebrado.
- Seletor-alvo aninhado em `@layer`/`@media` é REJEITADO com erro explícito:
  o scanner não resolve contexto de at-rules. Mova as vars mapeadas para o
  nível superior ou troque o gate por um parser CSS real.
- Comentários e strings são neutralizados só para a varredura ESTRUTURAL e a
  localização de declarações; o VALOR é extraído do CSS original com leitura
  quote-aware (valores com `;`/`{` dentro de aspas não cortam cedo). A
  comparação é LÉXICA EXATA após trim/caixa/espaços: `serif` (família
  genérica) ≠ `"serif"` (nome literal). Se o CSS declara aspas, o valor do
  token as inclui — em YAML: `fontFamily: '"Inter"'` (os delimitadores YAML
  não contam; as aspas internas sim).
- O nome da var é ancorado em fronteira de declaração (início de bloco ou
  `;`/`{`/`}`): `--alias--primary:` NUNCA satisfaz um mapeamento de
  `--primary`. E só profundidade relativa 0 conta: `--primary` dentro de
  regra aninhada (`:root { .child { … } }`) não é declaração do escopo-alvo.
- Divergiu → ou o CSS ou o token está errado; decida com o dono e alinhe.
- Requisito de runtime: **Bun >= 1.2.21** (`Bun.YAML` nativo). No consumidor, os
  scripts são VENDORIZADOS em `scripts/design/` pelo bootstrap; CI usa essas
  cópias (runner não acessa o checkout privado de skills).

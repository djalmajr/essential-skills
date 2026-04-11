---
name: wiki-lint
description: "Verificação de saúde e manutenção da wiki. Ativa quando o usuário pede para auditar, verificar, limpar ou organizar a base de conhecimento."
---

# Lint — Verificação de saúde da wiki

Siga `wiki/CONVENTIONS.md` para convenções de formato, frontmatter e links.

## Checklist

Percorra os itens em ordem. Se o usuário pediu algo específico (ex.: "só os links"), foque naquela parte.

### 1. Cross-refs quebradas
- Links relativos `[texto](./path.md)` que apontam para páginas inexistentes.
- Corrija o link OU crie a página faltante.

### 2. Páginas órfãs
- Páginas wiki (exceto `CONVENTIONS.md`, `index.md`, `log.md`) sem inbound link no `wiki/index.md`.
- Se tem conteúdo válido → adicione ao `index.md`.
- Se irrelevante → sugira exclusão ao humano.

### 3. Frontmatter
Todas as páginas wiki devem ter:

| Campo | Obrigatório | Validação |
|---|---|---|
| `title` | sim | Presente e não vazio |
| `audience` | sim | Um de: `business`, `dev`, `ops`, `mixed` |
| `sources` | sim | Lista não vazia |
| `updated` | sim | Data ISO. Flag se > 90 dias |
| `tags` | sim | Lista não vazia |
| `status` | sim | Um de: `draft`, `stable`, `stale` |

### 4. Consistência raw/ ↔ wiki/sources/
Cruze `raw/index.md` com `wiki/sources/`:
- **Fontes sem sumário** — referenciadas em `raw/index.md` como ingeridas mas sem `<slug>.md`.
- **Sumários sem fonte** — `wiki/sources/<slug>.md` cujo `sources:` aponta para arquivo inexistente.

### 5. Cross-refs faltando
- Termos/conceitos mencionados no texto que já têm página wiki mas não estão linkados.
- Sugira ao humano (não corrija automaticamente — pode gerar ruído).

### 6. Contradições
- Compare páginas sobre o mesmo tema.
- Se houver afirmações contraditórias → sinalize com nota na página.

### 7. Status desatualizado
- `draft` que poderia ser `stable` (conteúdo completo e validado).
- `stable` com `updated` > 90 dias → considerar marcar como `stale`.

### 8. Estatísticas do index.md
- Contagem de páginas condiz com a realidade?
- Descrições das páginas estão atualizadas?

## Comportamento

- **Correções simples** (frontmatter, links, `updated`) → faça automaticamente.
- **Mudanças de conteúdo** → pergunte ao humano antes.
- **Resposta ao humano**: foque no acionável:
  1. Pendentes que precisam de decisão humana
  2. Oportunidades de melhoria
  3. Resumo numérico (total problemas / correções automáticas)
- **Não liste** todas as correções automáticas na resposta — o detalhe vai para o `log.md`.

## Registro

Atualize `wiki/log.md` (inserir **no topo**, após o header):

```
## [YYYY-MM-DD] lint | verificação de saúde

### Correções automáticas
- ...

### Pendentes (decisão humana)
- ...

### Sugestões
- ...
```

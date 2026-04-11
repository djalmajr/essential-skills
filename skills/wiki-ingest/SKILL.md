---
name: wiki-ingest
description: "Processa uma nova fonte de raw/ para a wiki. Ativa quando o usuário pede para ingerir, processar, adicionar ou incorporar uma fonte na base de conhecimento."
---

# Ingest — Processar fonte na wiki

Siga `wiki/CONVENTIONS.md` para convenções de formato, frontmatter, nomenclatura e idioma.

## Passos

1. **Identifique a fonte** que o usuário pediu para processar (vem do contexto da conversa ou do path informado).

2. **Verifique se já foi ingerida** consultando `raw/index.md`:
   - Se já foi ingerida (tem sumário em `wiki/sources/`) → siga o fluxo de **Re-ingest** (seção abaixo).
   - Se não → prossiga com o ingest normal.

3. **Leia a fonte** em `raw/` completamente (em partes se necessário por limite de contexto).
   - Transcrições `.txt` ou `.md` → leia diretamente.
   - Se disponível MCP `video-whisper` → transcreva vídeo/áudio direto.
   - Se disponível MCP `pdf-docling` → converta PDF para markdown.

4. **Apresente ao humano e busque páginas existentes em paralelo:**
   - Apresente os **3-5 pontos mais importantes** extraídos.
   - Busque (grep/glob) páginas wiki existentes sobre os temas identificados.
   - Pergunte se quer **enfatizar ou ignorar** algo.
   - **Aguarde confirmação** antes de prosseguir.

5. **Crie/atualize páginas wiki** com base na confirmação:
   - Se a página já existe → **atualize** (adicione fonte em `sources:`, revise conteúdo, sinalize contradições).
   - Se não existe → **crie** nova página seguindo `wiki/CONVENTIONS.md`.
   - Respeite a estrutura de pastas por audiência/domínio:
      - `wiki/business/` — regras de negócio (audience: business)
      - `wiki/apps/` — documentação de apps (audience: dev)
      - `wiki/ops/` — procedimentos operacionais (audience: ops)
      - `wiki/data/` — modelos de dados e schemas (audience: dev)
   - Use links markdown padrão: `[texto](./path.md)` (não wikilinks).
   - NÃO duplique conteúdo entre páginas — use cross-refs.

6. **Crie o sumário da fonte** em `wiki/sources/<slug>.md`:
   ```yaml
   ---
   title: "Sumário — <Título da Fonte>"
   audience: mixed
   sources:
     - raw/<subdir>/<nome-do-arquivo>
   updated: YYYY-MM-DD
   tags: [source, <tags-relevantes>]
   status: stable
   ---
   ```
   Conteúdo do sumário:
   - Metadados (data, participantes, duração se aplicável)
   - Resumo dos pontos-chave
   - Páginas wiki criadas/atualizadas com links
   - Insights não capturados em outras páginas (se houver)

7. **Atualize índices em paralelo:**
   - `raw/index.md` — marque a fonte como ✅ Ingerida com link para o sumário.
   - `wiki/index.md` — adicione novas páginas na tabela correspondente, atualize descrições de páginas modificadas.
   - `wiki/log.md` — registre a operação **no topo** (após o header, antes das entradas existentes):
     ```
     ## [YYYY-MM-DD] ingest | <Título da Fonte>
     - Páginas criadas: ...
     - Páginas atualizadas: ...
     - Sumário: wiki/sources/<slug>.md
     ```

8. **Lint pós-ingest focado:**
   - Verifique cross-refs das páginas criadas/atualizadas (links apontam para targets reais?).
   - Compare com páginas referenciadas — sinalize contradições com seção explícita.
   - NÃO rode lint completo (órfãs, frontmatter global, etc.) — isso fica para `/wiki-lint`.

## Re-ingest (fonte já catalogada)

Quando a fonte já tem `wiki/sources/<slug>.md`:

1. Leia a fonte e o sumário existente.
2. Compare e identifique lacunas:
   - Conceitos/informações na fonte que não estão na wiki
   - Páginas que podem ser expandidas
   - Contradições com conteúdo existente
3. Apresente diagnóstico ao humano:
   ```
   ## Re-ingest: <Título>
   ### Lacunas identificadas
   - ...
   ### Páginas que podem ser expandidas
   - ...
   ```
4. Aguarde aprovação e execute.
5. Atualize sumário, `raw/index.md` e `wiki/log.md`.

## Regras

- **Nunca** modifique arquivos em `raw/`.
- Uma fonte por vez (a menos que o usuário peça batch explicitamente).
- Sempre use frontmatter YAML completo (ver `wiki/CONVENTIONS.md`).
- Se encontrar contradição com páginas existentes, sinalize explicitamente.
- Sempre atualize `raw/index.md`, `wiki/index.md` e `wiki/log.md`.

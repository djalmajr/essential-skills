---
name: wiki-query
description: "Responde perguntas sobre a base de conhecimento da wiki. Ativa quando o usuário pergunta sobre conceitos, processos, entidades ou qualquer conteúdo da wiki."
---

# Query — Perguntar sobre a wiki

Siga `wiki/CONVENTIONS.md` para convenções de formato, links e idioma.

## Passos

1. **Consulte `wiki/index.md`** para localizar páginas relevantes à pergunta.
   - Use a tabela "Por tópico" para encontrar rapidamente onde está o conteúdo.
   - Se necessário, busque com grep por termos específicos nas páginas wiki.

2. **Leia as páginas identificadas** e siga links relacionados para contexto.

3. **Sintetize a resposta** em pt-BR:
   - Resposta direta à pergunta.
   - Cite as páginas wiki usadas com links: `[página](wiki/path.md)`.
   - Se houver contradições entre fontes, apresente os pontos de vista.
   - Se a informação **não existir** na wiki, diga explicitamente e sugira fontes que poderiam ser ingeridas.

4. **Avalie se a resposta tem valor duradouro:**
   - Se a resposta sintetiza múltiplas páginas de forma nova e útil → ofereça salvar como página em `wiki/sources/` (sumário transversal) ou como nova seção em página existente.
   - Se é uma resposta simples pontual → não precisa salvar.

5. **Registre no log** (apenas se a query gerou atualização na wiki):
   ```
   ## [YYYY-MM-DD] query | <resumo da pergunta>
   - Páginas consultadas: ...
   - Resultado salvo: sim/não (qual página, se sim)
   ```

## Regras

- Responda **primeiro com base na wiki** — não re-sintetize do zero a partir de código ou fontes externas quando a resposta já existe.
- Se não encontrar a informação, sugira quais fontes poderiam ser ingeridas para cobrir a lacuna.
- Sempre cite as páginas wiki usadas.
- Se a pergunta revelar uma lacuna, sugira páginas que poderiam ser criadas (mas não crie automaticamente — deixe para o ingest).

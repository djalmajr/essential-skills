# Story

Detalha uma entrega vertical com critérios de aceite, tarefas e verificação.

## Quando usar

- Trabalho com tamanho M (vários arquivos)
- Entrega que precisa de critério de aceite mais rico
- Story de um epic detalhada antes da execução
- Correção de bug com risco de regressão

## Quando NÃO usar

- Trabalho pequeno (XS, S) → `/plan`
- Iniciativa com várias stories → `/epic`
- Problema ainda não analisado → `/intake` ou `/refinement`

## Como usar

```
/story
```

Com contexto (epic, descrição, issue):

```
/story epic-payment.md
/ story Implementar logout com invalidação de token
```

## O que a story inclui

1. **Contexto** — de onde vem, objetivo dentro do epic
2. **Escopo** — dentro e fora do escopo
3. **Arquivos impactados** — com ação (ler/alterar/criar)
4. **Critérios de aceite** — observáveis e verificáveis
5. **Tarefas** — verificáveis em fatias verticais
6. **Estratégia de verificação** — como validar que funciona

## Dica

Cada critério de aceite deve ser **observável** — "deve funcionar" não é critério. "Usuário consegue fazer login com email válido" é.

## Encadeamento

- Antes de implementar → `/plan` para plano operacional
- Depois de implementar → `/scan-review` e `/post-impl`

# Plan

Cria plano simples de execução para mudanças localizadas.

## Quando usar

- Trabalho pequeno (XS, S)
- Poucos arquivos impactados
- Entrega cabe em um único ciclo
- Story já detailhada que precisa de plano operacional

## Quando NÃO usar

- Trabalho médio ou grande → `/story` ou `/epic`
- Problema ainda não claro → `/intake`
- Múltiplas entregas dependentes → `/epic`

## Como usar

```
/plan
```

Com contexto (story, issue, descrição):

```
/plan story-123.md
/plan Adicionar validação de email no formulário de cadastro
```

## O que o plano inclui

1. **Contexto** — problema, objetivo, restrições
2. **Arquivos** — caminhos exatos com ação (ler/alterar/criar)
3. **Detalhamento** — AS-IS, TO-BE, escopo, abordagem
4. **Tarefas** — checklist verificável
5. **Verificação** — comandos e validações

## Dica

Plano deve ser **proporcional ao tamanho**. Para XS/S, mantenha simples. Não faça over-engineering.

## Encadeamento

- Depois do plano → `/scan-review` antes de commitar
- Bloqueio crítico → sugerir escalar
- Entrega próxima de fechar → `/post-impl`

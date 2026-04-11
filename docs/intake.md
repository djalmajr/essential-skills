# Intake

Transforma problemas vagos em documentos de intake claros e acionáveis.

## Quando usar

- Alguém traz uma ideia sem escopo
- O pedido é vago demais para virar story
- Há incerteza sobre tamanho, prioridade ou abordagem
- É o primeiro contato com um problema novo

## Quando NÃO usar

- Problema já claro → use `/plan` ou `/story`
- Trabalho já refinado → use `/story` ou `/plan`
- Correção trivial → use `/plan`

## Como usar

```
/intake
```

Se já tem contexto (URL, texto, issue):

```
/intake https://github.com/org/repo/issues/123
/intake caminho/para/arquivo.md
```

## O que fazer durante o intake

1. **Ouvir e registrar** — o problema, quem é afetado, urgência
2. **Estruturar** — contexto, escopo, restrições, perguntas em aberto
3. **Decidir o próximo passo** — `/roadmap`, `/refinement`, `/story` ou `/plan`

## Dica

Não assuma respostas. Se o usuário não souber algo, registre como pergunta em aberto — isso é mais útil do que inventar uma resposta.

## Encadeamento

- Problema grande com várias entregas → `/refinement`
- Iniciativa estratégica → `/roadmap`
- Item já claro e executável → `/story` ou `/plan`

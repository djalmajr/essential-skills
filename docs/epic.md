# Epic

Estrutura iniciativas grandes em backlog de stories com roadmap, dependências e verificação.

## Quando usar

- Após `/refinement` que gerou várias stories
- Iniciativa com tamanho L ou XL
- Há dependências entre entregas
- Precisar de roadmap para orientar sequência

## Quando NÃO usar

- Trabalho cabe em uma story → use `/story`
- Trabalho pequeno e localizado → use `/plan`
- Problema ainda não analisado → use `/intake` ou `/refinement` primeiro

## Como usar

```
/epic
```

Com contexto (refinement, intake, descrição):

```
/epic plugins/payment/refinement.md
/epic Implementar autenticação JWT na API
```

## O que o epic inclui

1. **Contexto** — AS-IS, TO-BE, fora de escopo
2. **Backlog de stories** — com tamanho e dependência
3. **Roadmap** — fases, desbloqueios, validações
4. **Riscos** — o que pode dar errado e mitigação
5. **Critério de aceite do epic** — como saber que está completo

## Dica

Epic não substitui plano — ele orienta a execução. Cada story dentro do epic ainda precisa de `/plan` ou `/story` antes de implementar.

## Encadeamento

- Stories do epic → `/refinement` para detalhar
- Quer quebrar em stories → `/story` para cada uma

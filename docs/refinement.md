# Refinement

Transforma intakes ou backlogs grandes em stories executáveis com dependências claras.

## Quando usar

- Após `/intake` que recomendou refinement
- Item de backlog muito grande (L ou XL)
- Há ambiguidade sobre escopo ou ordem
- Antes de criar `/epic` com várias stories

## Quando NÃO usar

- Item já claro e executável → use `/story`
- Trabalho pequeno e localizado → use `/plan`
- Problema ainda não capturado → use `/intake`

## Como usar

```
/refinement
```

Com contexto (caminho de intake, backlog, descrição):

```
/refinement planning/payment-intake.md
/refinement backlog.md
```

## O que o refinement inclui

1. **Análise** — problema macro, áreas impactadas, restrições
2. **Eixos de decomposição** — fatia vertical de valor (não por camada)
3. **Backlog de stories** — cada uma com:
   - Objetivo
   - Tamanho estimado
   - Dependências
   - Critério de aceite

## Dica

Quebre por **valor observável**, não por tecnologia. Cada story deve entregar algo que alguém consiga ver funcionando.

## Encadeamento

- Stories resultam em `/story` ou `/plan` dependendo do tamanho
- Iniciativa grande com várias stories → `/epic`

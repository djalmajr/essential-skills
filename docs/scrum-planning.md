# Scrum Planning (Roteador)

Decide qual artefato de planejamento é adequado para a demanda.

## Quando usar

Quando você tem uma demanda e não sabe por onde começar a planejar.

## Como usar

```
/scrum-planning
```

Ou simplesmente descreva a demanda:

```
/scrum-planning Preciso adicionar autenticação ao login
/scrum-planning Migração de banco de dados para PostgreSQL
```

## Árvore de decisão

| Tamanho | O que usar | Skill |
|---------|------------|-------|
| XS/S | Mudança localizada, poucos arquivos | `/plan` |
| M | Entrega vertical, vários arquivos | `/story` |
| L/XL | Várias entregas dependentes | `/epic` |

| Situação | O que fazer |
|----------|-------------|
| Problema não definido | `/intake` |
| Grande com ambiguity | `/refinement` |
| Direção estratégica | `/roadmap` |

## Dica

Se não sabe o tamanho, descreva o que precisa ser feito e a skill ajuda a classificar.

## Sizing leve

- **XS** — ajuste localizado, 1 arquivo, baixo risco
- **S** — pequena entrega, poucos arquivos
- **M** — entrega vertical, vários arquivos, validação moderada
- **L** — story grande, precisa quebrar
- **XL** — iniciativa multi-story, coordenação necessária

# Roadmap Planning

Transforma objetivos amplos em roadmaps claros, priorizados e conectados ao backlog.

## Quando usar

- Alinhamento trimestral de direção
- Iniciativa grande com fases e dependências
- Precisar organizar prioridades macro

## Quando NÃO usar

- Problema ainda não definido → use `/intake` primeiro
- Item pequeno e localizado → use `/plan`
- Já tem epic com roadmap definido → use `/refinement`

## Como usar

```
/roadmap-planning
```

Com contexto (objetivo do período, lista de iniciativas):

```
/roadmap-planning Q2 2026 - Plataforma de Payments
```

## Tipos de roadmap

### Roadmap trimestral
- 2-5 iniciativas principais
- Ordenadas por valor e dependência
- Riscos e restrições explícitos

### Roadmap por epic
- Fases/ondas de entrega
- Stories relacionadas por fase
- Desbloqueios e validações intermediárias

## Dica

Roadmap deve focar em **resultados e capacidades**, não em listas técnicas. Cada item deve indicar valor esperado e sinal de progresso.

## Encadeamento

- Primeira iniciativa do roadmap → `/refinement`
- Quer criar epic? → `/epic`

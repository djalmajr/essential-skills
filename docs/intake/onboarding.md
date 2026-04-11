# Onboarding

Guia novos membros pelo fluxo ágil com IA, de forma prática e progressiva.

## Quando usar

- Novo dev ou gestor entra no time
- Alguém muda de papel (dev → tech lead)
- Time adota o fluxo pela primeira vez
- Necessidade de reciclagem após tempo fora

## Duração recomendada

**3 dias** para operacionalização completa.

## Trilha de Onboarding

### Dia 1: Entender o Modelo

**Objetivo:** saber o que existe e por quê.

1. Apresente o fluxo completo:
   ```
   intake → roadmap → refinement → epic/story/plan
                                        ↓
                                  scan-review
                                        ↓
                                  daily/status/post-impl
                                        ↓
                                    retro
   ```

2. Explique a divisão de papéis:
   - **Humano:** decide, valida, controla git, comunica
   - **IA:** estrutura, implementa, verifica, reporta

3. Mostre a árvore de decisão:
   - Quando usar plano simples vs story vs epic
   - Sizing leve (XS a XL)

4. Apresente as skills disponíveis.

### Dia 2: Exercício Prático — Intake e Planejamento

**Objetivo:** criar um intake e um plano com apoio da IA.

1. Novo membro escolhe um problema pequeno e real
2. Usa `/intake` para estruturar
3. Decide o artefato correto com `/scrum-planning`
4. Usa `/plan` para criar plano
5. Mentor revisa e dá feedback

### Dia 3: Exercício Prático — Execução com TDD

**Objetivo:** implementar com apoio de IA seguindo o fluxo.

1. Usa o plano criado no dia 2
2. Executa com TDD (red-green-refactor)
3. Usa `/scan-review` antes de commitar
4. Mentor revisa código e fluxo

## Entregáveis do Onboarding

Ao final, o novo membro deve saber:
- [ ] Quando usar cada skill
- [ ] Como criar intake, plano e story
- [ ] Como acompanhar entregas com daily/status
- [ ] Como fechar entregas com post-impl
- [ ] Como usar scan-review antes de commitar

## Dica

Onboarding não é só documentação — deve incluir **prática**. Teoria sem execução não stick.

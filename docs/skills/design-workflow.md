# design-workflow

Lado código-de-produção do `DESIGN.md` raiz (formato Google DESIGN.md).
Processo puro e agnóstico de projeto: valores, prioridades visuais, exceções
e anti-padrões vivem no `DESIGN.md` de cada projeto consumidor — nunca na
skill. `agile-pen` cobre o lado protótipo (Pen.dev) do mesmo arquivo.

## Modos

| Modo | Quando | O que faz |
|---|---|---|
| `contract` (default) | Qualquer implementação/revisão de UI | Precedência em conflitos (instrução do usuário > DESIGN.md > padrões locais > defaults), vocabulário fechado (só tokens/exceções declarados), revisão pré-handoff obrigatória (render real, todos os temas declarados pelo projeto, reflow, a11y, medidas) |
| `audit` | Gate local ou CI | `check-classes.ts` (classes proibidas fora do allowlist) + `check-tokens.ts` (paridade exata YAML↔CSS var), ambos configurados só pelo bloco `x-parity` do DESIGN.md do projeto — determinísticos, zero LLM |
| `bootstrap` | Projeto novo/adotante | Convergência reexecutável: DESIGN.md do template (rascunho sintetizado é permitido, mas revisado por humano antes de virar canônico), regra de agente, `x-parity`, scripts vendorizados e CI |

## Bootstrap e CI

O bootstrap detecta a configuração já versionada: `.gitlab-ci.yml` seleciona
GitLab CI; `.github/workflows/` seleciona GitHub Actions. A skill não prefere
um provedor. Se ambos existirem, o dono escolhe qual recebe o gate obrigatório;
se nenhum existir, o gate local continua disponível e a integração de CI é
reportada como pendente, sem inventar infraestrutura.

Templates separados vivem em `templates/ci/gitlab-ci.yml` e
`templates/ci/github-actions.yml`. Ambos executam o mesmo contrato com
Bun >= 1.2.21: lint do Google DESIGN.md e os dois checks vendorizados em
`scripts/design/`.

Reexecutar bootstrap preserva o `DESIGN.md`, a regra equivalente e o pipeline
do projeto; apenas completa peças ausentes e compara/atualiza os scripts
vendorizados. Ao final, reporta o estado de contrato, regra, `x-parity`,
scripts, provedor/job de CI e execução local.

## Origem

Destilado do redesign do dashboard de um app-builder low-code interno (2026-08): as rodadas de
correção visual convergiram para três invariantes — precedência explícita,
vocabulário fechado com exceções indicadas pelo dono, e verificação medida no
browser. O gate determinístico substitui a ideia inicial de extração via LLM
(síntese subjetiva não serve para CI).

## Regra de ouro

Correção visual do dono = nova indicação: aplica E registra no DESIGN.md do
projeto na mesma mudança. É o que impede regressão entre sessões.

---
name: scan-review
description: Revisa codigo alterado aplicando checklist de seguranca, coerencia, over-engineering, escopo e qualidade. Use antes de commitar, ao abrir PR ou ao revisar codigo gerado por IA.
---

# Scan Review

Use esta skill para revisar codigo alterado com foco em qualidade, risco e coerencia com o projeto.

Contexto inicial recebido via slash: $ARGUMENTS

Se `$ARGUMENTS` vier preenchido, trate esse texto como a branch, arquivos ou escopo da revisao.
Se `$ARGUMENTS` vier vazio, analise os arquivos alterados no working tree atual.

## Checklist obrigatorio

Aplique o checklist da rule `code-review` em `~/.agents/rules/code-review.md`:

### Seguranca
- [ ] Inputs validados e sanitizados
- [ ] Sem SQL injection, XSS, command injection ou SSRF
- [ ] Sem secrets hardcoded
- [ ] Autenticacao e autorizacao corretas quando aplicavel
- [ ] Dados sensiveis nao expostos em logs ou respostas

### Coerencia com o projeto
- [ ] Segue padroes e convencoes do repositorio
- [ ] Usa componentes, utilities e helpers existentes
- [ ] Nao reinventou a roda
- [ ] Naming consistente com o codebase
- [ ] Imports seguem convencoes do projeto

### Over-engineering
- [ ] Sem abstracoes prematuras
- [ ] Sem tratamento de erro para cenarios impossiveis
- [ ] Sem generalizacao para requisitos hipoteticos

### Escopo
- [ ] Codigo faz apenas o que foi pedido
- [ ] Sem refactoring de codigo nao relacionado
- [ ] Sem features adicionais nao solicitadas

### Qualidade
- [ ] Testes cobrem cenarios de aceite
- [ ] Codigo legivel sem comentarios explicativos
- [ ] Funcoes pequenas e com responsabilidade unica
- [ ] Sem duplicacao de logica
- [ ] Erros tratados nos limites do sistema

### Completude
- [ ] Lint passa
- [ ] Typecheck passa
- [ ] Testes passam
- [ ] Diff lido integralmente

## Regras
- Leia o diff completo antes de emitir qualquer resultado.
- Reporte problemas por categoria (seguranca, coerencia, over-engineering, escopo, qualidade).
- Destaque red flags que justificam rejeicao imediata.
- O resultado da revisao deve ser claro e acionavel, nao generico.
- Code review de IA nao substitui code review humano.

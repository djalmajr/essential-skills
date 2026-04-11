# Scan Review

Revisa código alterado aplicando checklist de segurança, coerência, over-engineering, escopo e qualidade.

## Quando usar

- Antes de commitar
- Ao abrir Pull Request
- Ao revisar código gerado por IA
- Ao fazer code review de colegas

## Quando NÃO usar

- Código não foi alterado
- É apenas formatação/cosmética
- Changes são triviais ( typos, comments )

## Como usar

```
/scan-review
```

Com escopo (branch, arquivos, diff):

```
/scan-review feature-payment
/scan-review src/api/payment.ts src/utils/validator.ts
```

Sem argumento, analisa o working tree atual.

## Checklist

### Segurança
- [ ] Inputs validados e sanitizados
- [ ] Sem SQL injection, XSS, command injection
- [ ] Sem secrets hardcoded
- [ ] Auth e authorization corretas

### Coerência com o projeto
- [ ] Segue padrões do repositório
- [ ] Usa componentes/utilities existentes
- [ ] Naming consistente
- [ ] Imports seguem convenções

### Over-engineering
- [ ] Sem abstrações prematuras
- [ ] Sem tratamento para casos impossíveis
- [ ] Sem generalização para requisitos hipotéticos

### Escopo
- [ ] Faz apenas o que foi pedido
- [ ] Sem refactoring não relacionado
- [ ] Sem features não solicitadas

### Qualidade
- [ ] Testes cobrem cenários de aceite
- [ ] Código legível
- [ ] Funções pequenas e com responsabilidade única
- [ ] Sem duplicação

## Dica

Leia o diff **integralmente** antes de emitir qualquer resultado. Problemas de segurança ou escopo justificam rejeição.

## Verificações obrigatórias

```bash
bun run lint
bun run typecheck
bun test
```

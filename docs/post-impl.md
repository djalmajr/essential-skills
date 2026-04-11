# Post-Implementation Report

Fecha uma entrega com verificação objetiva, riscos remanescentes e próximos passos.

## Quando usar

- Quando um plano, story ou epic foi concluído
- Para fechar formalmente uma entrega
- Antes de marcar something como "done"

## Quando NÃO usar

- Status rápido do dia → `/daily`
- Consolidado de período → `/status-report`
- Sprint ainda em andamento → aguarde fim

## Como usar

```
/post-impl
```

Com contexto (plano, story, issue):

```
/post-impl plan-payment-gateway.md
/post-impl story-123.md
```

## O que o post-impl inclui

1. **Entrega vs Plano** — o que foi entregue vs o que era esperado
2. **Verificações executadas** — com resultados reais (não apenas "passou")
3. **Pendências** — o que não foi concluído e motivo
4. **Mudanças de escopo** — o que mudou durante a implementação
5. **Riscos remanescentes** — o que pode dar errado
6. **Próximos passos** — handoff claro

## Verificações típicas

```bash
bun run lint
bun run typecheck
bun test
# Validação manual...
```

## Dica

Registre **resultados reais**, não apenas "passou". "lint: 0 errors, 0 warnings" é melhor que "lint passou".

## Encadeamento

- Após post-impl → `/sprint-review` (se fim de sprint)
- Próximo ciclo → `/retro`

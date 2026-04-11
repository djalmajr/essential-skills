# Proto UI

Cria protótipos UI interativos com Bun + React + shadcn/ui + Tailwind v4.

## Quando usar

- "Criar protótipo", "mockup de telas"
- Explorar fluxos de UI antes de implementar
- Validar ideias com stakeholders
- Testar componentes shadcn

## Quando NÃO usar

- Implementação em produção
- Projeto que precisa de backend complexo
- Protótipo estático (sem interatividade)

## Stack

- **Bun** — dev server com HMR, JSX/TSX nativo
- **React 19** — componentes
- **shadcn/ui** — biblioteca de componentes
- **Tailwind CSS v4** — estilização
- **wouter** — roteamento client-side
- **Biome** — linting e formatação

## Como usar

```bash
# 1. Criar diretório do projeto
mkdir -p my-proto/client-proto && cd my-proto/client-proto

# 2. Bootstrap
npx proto-ui

# 3. Rodar
bun src/index.html
```

## Estrutura

```
client-proto/
├── src/
│   ├── index.html      # Entry point
│   ├── index.tsx       # createRoot + Router
│   ├── index.css       # Tailwind + design tokens
│   ├── components/ui/  # shadcn components
│   └── routes/         # Páginas
├── components.json     # shadcn config
└── biome.json          # Biome config
```

## Dica

Proto é para **validar UX**, não para produção. Mantenha simples e focado no fluxo que está testando.

## Componentes disponíveis

57+ componentes shadcn/ui: Button, Dialog, DropdownMenu, Form, Input, Select, Table, Tabs, etc.

Consulte `client-proto/src/components/ui/` para a lista completa.

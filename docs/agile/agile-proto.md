# Proto UI

Creates interactive UI prototypes with Bun + React + shadcn/ui + Tailwind v4.

## When to use

- "Create prototype", "mockup screens"
- Explore UI flows before implementing
- Validate ideas with stakeholders
- Test shadcn components

## When NOT to use

- Production implementation
- Project needing complex backend
- Static prototype (without interactivity)

## Stack

- **Bun** — dev server with HMR, native JSX/TSX
- **React 19** — components
- **shadcn/ui** — component library
- **Tailwind CSS v4** — styling
- **wouter** — client-side routing
- **Biome** — linting and formatting

## How to use

```bash
# 1. Create project directory
mkdir -p my-proto/client-proto && cd my-proto/client-proto

# 2. Bootstrap
npx proto-ui

# 3. Run
bun src/index.html
```

## Structure

```
client-proto/
├── src/
│   ├── index.html      # Entry point
│   ├── index.tsx       # createRoot + Router
│   ├── index.css       # Tailwind + design tokens
│   ├── components/ui/  # shadcn components
│   └── routes/         # Pages
├── components.json     # shadcn config
└── biome.json          # Biome config
```

## Tip

Proto is for **UX validation**, not for production. Keep it simple and focused on the flow you're testing.

## Available components

57+ shadcn/ui components: Button, Dialog, DropdownMenu, Form, Input, Select, Table, Tabs, etc.

See `client-proto/src/components/ui/` for the complete list.

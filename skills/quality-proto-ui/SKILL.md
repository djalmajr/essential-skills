---
name: proto-ui
description: Create interactive UI prototypes with Bun + React + shadcn/ui + Tailwind v4. Use when asked to "prototype", "create proto", "mockup screens", "interactive prototype", or when exploring UI flows before implementation.
---

# Interactive UI Prototyping

Create standalone interactive prototypes to validate UI flows before implementation.

## Stack

- **Bun fullstack** (`bun src/index.html`) — dev server with HMR, JSX/TSX native
- **React 19** — standard JSX components
- **shadcn/ui** — full component library installed via CLI
- **Tailwind CSS v4** — via `bun-plugin-tailwind`
- **wouter** — lightweight client-side routing
- **@zomme/bun-plugin-iconify** — build-time icon collection from `@iconify/json`
- **Icon component** (`@/components/icon`) — renders SVG icons from `virtual:icons` registry
- **Biome** (pinned version) — linting, formatting, import sorting

## Directory structure

```
{app}/client-proto/
├── biome.json
├── bunfig.toml
├── components.json
├── package.json
├── tsconfig.json
├── .vscode/settings.json
└── src/
    ├── @types/virtual.d.ts  # virtual:icons type declaration
    ├── index.html           # HTML entry (links index.css + index.tsx)
    ├── index.tsx             # createRoot + IconProvider + Router + render
    ├── index.css             # @import "tailwindcss" + design tokens
    ├── utils/cn.ts           # cn() = twMerge(clsx(...))
    ├── hooks/                # Custom hooks (use-mobile.ts, etc.)
    ├── components/
    │   ├── app-shell.tsx     # Layout shell (sidebar, nav, etc.)
    │   ├── icon.tsx          # Icon + IconProvider (virtual:icons registry)
    │   └── ui/               # shadcn components (57+)
    └── routes/
        ├── auth/login.tsx
        ├── auth/register.tsx
        ├── templates/list.tsx
        └── ...
```

## Bootstrapping

```bash
mkdir -p my-app/client-proto && cd my-app/client-proto

# 1. Init project
bun init -y

# 2. Install deps
bun add react react-dom wouter tailwindcss bun-plugin-tailwind \
  clsx tailwind-merge class-variance-authority radix-ui
bun add -d @biomejs/biome@2.4.10 @types/react @types/react-dom \
  @zomme/bun-plugin-iconify @iconify/json

# 3. Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src/**/*"]
}
EOF

# 4. Create bunfig.toml
cat > bunfig.toml << 'EOF'
[serve.static]
plugins = ["@zomme/bun-plugin-iconify", "bun-plugin-tailwind"]

[plugins.iconify]
dirs = ["src"]
EOF

# 5. Install shadcn
bunx shadcn@latest init
bunx shadcn@latest add --all --yes

# 6. Create src structure
mkdir -p src/{@types,components/ui,routes,hooks,utils}

# 7. Add scripts to package.json
# "dev": "bun src/index.html"
# "check": "biome check src/"
# "fix": "biome check --write --unsafe src/"
# "format": "biome format --write src/"
# "lint": "biome lint src/"
```

## Key files

### src/@types/virtual.d.ts

```ts
declare module "virtual:icons" {
  interface IconData {
    body: string
    height: number
    width: number
  }
  export const registry: Record<string, IconData>
}
```

### src/components/icon.tsx

```tsx
import { createContext, type ReactNode, type SVGProps, useContext } from "react"

export interface IconData {
  body: string
  height: number
  width: number
}

export type IconRegistry = Record<string, IconData>

const IconRegistryContext = createContext<IconRegistry | null>(null)

export interface IconProviderProps {
  children: ReactNode
  registry: IconRegistry
}

export function IconProvider({ children, registry }: IconProviderProps) {
  return <IconRegistryContext.Provider value={registry}>{children}</IconRegistryContext.Provider>
}

export function useIconRegistry(): IconRegistry | null {
  return useContext(IconRegistryContext)
}

export type IconProps = SVGProps<SVGSVGElement> & {
  icon: string | IconData
}

export function Icon({ icon, className, ...props }: IconProps) {
  const registry = useIconRegistry()
  const data = typeof icon === "string" ? registry?.[icon] : icon

  if (data) {
    return (
      <svg
        aria-hidden="true"
        className={className}
        dangerouslySetInnerHTML={{ __html: data.body }}
        height="1em"
        viewBox={`0 0 ${data.width} ${data.height}`}
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      />
    )
  }

  return (
    <svg aria-hidden="true" className={className} height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect fill="currentColor" height="24" opacity="0.3" rx="4" width="24" x="0" y="0" />
    </svg>
  )
}
```

### src/index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proto — AppName</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body class="font-sans antialiased">
    <div id="root" style="display:flex;flex:1;min-height:100vh"></div>
    <script type="module" src="./index.tsx"></script>
  </body>
</html>
```

### src/index.tsx

```tsx
import { registry } from "virtual:icons"
import { createRoot } from "react-dom/client"
import { Route, Switch, useLocation } from "wouter"
import { IconProvider } from "@/components/icon"
import { TooltipProvider } from "@/components/ui/tooltip"
// import routes...

function App() {
  return (
    <IconProvider registry={registry}>
      <TooltipProvider>
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </TooltipProvider>
    </IconProvider>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
```

### src/utils/cn.ts

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Running

```bash
cd client-proto
bun run dev    # http://localhost:3000
```

## Icons

Use the `<Icon>` component with any Iconify icon set:

```tsx
import { Icon } from "@/components/icon"

<Icon icon="lucide:search" className="text-[14px]" />
<Icon icon="lucide:arrow-left" className="text-[18px] text-muted-foreground" />
<Icon icon="mdi:github" className="text-xl" />
<Icon icon="circle-flags:br" className="text-2xl" />
```

The `@zomme/bun-plugin-iconify` scans `src/` at build-time, collects all `icon="xxx:yyy"` references, and generates a `virtual:icons` module with only the icons actually used. Zero runtime overhead.

**Never use `lucide-react` directly.** Always use `<Icon icon="lucide:xxx" />`.

## Rules

1. **Self-contained.** client-proto has its own package.json, tsconfig, biome, bunfig. No dependency on root project files.
2. **Use shadcn components.** Never recreate components that exist in shadcn. All 57+ components are pre-installed.
3. **Icons via `<Icon>` component.** `<Icon icon="lucide:search" />`. Never import from `lucide-react` directly.
4. **Routing via wouter.** `Switch`, `Route`, `useLocation`, `Link`.
5. **Design tokens** in index.css via CSS custom properties + Tailwind `@theme inline`.
6. **Biome pinned.** `@biomejs/biome` as exact devDependency (no `^`). Schema version matches.
7. **Biome on save.** Imports sorted alphabetically, formatted automatically.
8. **No blank lines between imports.** No blank lines between JSX tags.
9. **Tailwind canonical classes.** Use `group-has-data-[x=y]` not `group-has-[[data-x=y]]`.
10. **Mock data inline.** Forms pre-filled, lists hardcoded. Keep data in the route file.
11. **One route per file.** Feature-based: `routes/templates/list.tsx`, `routes/auth/login.tsx`.
12. **Overflow control.** Root container `overflow: hidden` + `height: 100%`. Only content area scrolls.

## Discovery

Before creating a proto:

1. Check if `client-proto/` already exists in the project.
2. Read `client-proto/package.json` and `client-proto/components.json` for context.
3. Read `.agents/rules/` for project-specific conventions (design tokens, spacing, etc.).
4. If no proto exists, bootstrap following the steps above.

## Checklist

- [ ] client-proto is self-contained (own package.json, tsconfig, biome)
- [ ] `bun run dev` starts successfully
- [ ] shadcn components installed (`components.json` present)
- [ ] Design tokens applied in index.css
- [ ] `<Icon>` component + `IconProvider` + `virtual:icons` wired
- [ ] Icons use `<Icon icon="lucide:xxx" />`, no lucide-react imports
- [ ] Routing via wouter
- [ ] Biome check passes (`bun run check`)
- [ ] Biome pinned as exact devDependency
- [ ] No lucide-react, no iconify-icon, no htm, no importmap, no esm.sh

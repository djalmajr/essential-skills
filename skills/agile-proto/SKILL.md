---
name: agile-proto
description: Create interactive UI prototypes with CDN-only stack (z-proto + daisyUI + Preact + Tailwind v4). Use when asked to "prototype", "create proto", "mockup screens", "interactive prototype", or when exploring UI flows before implementation.
---

# Interactive UI Prototyping

Create standalone interactive prototypes to validate UI flows before implementation. Zero build tools — everything runs from CDN.

## Stack

- **z-proto** — web component shell with responsive presets, zoom, resize handles, and Figma capture
- **daisyUI v5** — component library CSS (btn, card, input, badge, etc.) with custom shadcn-like theme
- **Tailwind CSS v4** — via `@tailwindcss/browser` CDN for utility classes (flex, p-6, etc.)
- **Preact + htm** — lightweight rendering via importmap + esm.sh
- **iconify-icon** — web component for icons (any Iconify set: lucide, mdi, etc.)

## Directory structure

```
{app}/client-proto/
├── index.html          # HTML entry with CDN imports, importmap, z-proto shell
├── index.js            # App entry: scenes, wouter routing, render
├── index.css           # z-proto overrides + shadcn theme
├── components/         # Reusable Preact component wrappers
│   └── ui.js           # Button, Card, Input, Badge, Icon, etc.
└── routes/             # One file per scene/page
    ├── home.js
    ├── dashboard.js
    ├── music.js
    ├── tasks.js
    ├── settings.js
    └── components.js   # shadcn → daisyUI mapping reference
```

## Bootstrapping

Copy templates from `skills/agile-proto/templates/` into the project's `client-proto/` directory:

```bash
cp -r ~/.claude/skills/agile-proto/templates/ my-app/client-proto/
```

Or create files manually following the templates. The key files are:

1. `index.html` — loads all CDN dependencies and defines the z-proto shell
2. `index.js` — defines SCENES array with wouter path-based routing
3. `index.css` — z-proto overrides + custom shadcn/shadcn-dark themes
4. `components/ui.js` — reusable Preact wrappers (Button, Card, Input, Badge, Icon, etc.)
5. `routes/*.js` — example pages (dashboard, music, tasks, settings, components reference)

## Key files

### index.html

```html
<!DOCTYPE html>
<html lang="en" data-theme="shadcn">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proto — AppName</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5/daisyui.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script src="https://cdn.jsdelivr.net/npm/iconify-icon@2/dist/iconify-icon.min.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/djalmajr/z-proto@main/src/z-proto.js"></script>
    <script type="importmap">
      {
        "imports": {
          "~/": "/",
          "htm/preact": "https://esm.sh/htm@3/preact?external=preact",
          "preact": "https://esm.sh/preact@10",
          "preact/": "https://esm.sh/preact@10/",
          "wouter-preact": "https://esm.sh/wouter-preact@3?external=preact"
        }
      }
    </script>
    <link rel="stylesheet" href="/index.css">
    <style>
      :root { --font-sans: 'Inter', sans-serif; }
    </style>
  </head>
  <body class="font-sans antialiased">
    <z-proto>
      <z-proto-header></z-proto-header>
      <z-proto-body title="Proto — AppName">
        <div id="app" class="flex flex-1 overflow-hidden"></div>
      </z-proto-body>
    </z-proto>
    <script type="module" src="/index.js"></script>
  </body>
</html>
```

**CRITICAL: CDN load order matters.**

1. `daisyui@5/themes.css` — theme CSS variables (FIRST)
2. `daisyui@5/daisyui.css` — component classes (SECOND)
3. `@tailwindcss/browser@4` — utility classes (THIRD, must be AFTER daisyUI)

`@tailwindcss/browser` does NOT support `@plugin`. Never use `@plugin` in `<style type="text/tailwindcss">`.

The `shadcn` theme is defined in `index.css` and provides a neutral, shadcn-like palette (near-black primary, subtle borders). Change `data-theme="shadcn"` to `data-theme="shadcn-dark"` for dark mode, or any built-in daisyUI theme.

### Routing pattern (index.js)

Uses wouter-preact for path-based routing. SCENES array defines all routes. SceneNav renders in z-proto-header via createPortal.

```js
import { Route, Switch, useLocation } from "wouter-preact";
import { DashboardPage } from "./routes/dashboard.js";

const SCENES = [
  { path: "/", label: "Dashboard", Component: DashboardPage },
  { path: "/settings", label: "Settings", Component: SettingsPage },
];

// In App: wouter Switch + Route for rendering
html`<${Switch}>${SCENES.map(s => html`<${Route} path=${s.path} component=${s.Component} />`)}<//>`;
```

**Important:** Serve with SPA mode (`bunx serve -s .`) so all paths resolve to `index.html`.

### Route file pattern (routes/dashboard.js)

Routes import reusable components from `~/components/ui.js`:

```js
import { html } from "htm/preact";
import { Button, Card, CardBody, Icon } from "~/components/ui.js";

export function DashboardPage() {
  return html`
    <div class="flex flex-col flex-1 w-full h-full overflow-y-auto p-6 space-y-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <${Button}>
        <${Icon} icon="lucide:plus" />
        New item
      <//>
      <${Card}>
        <${CardBody}>
          <h2 class="card-title">Card title</h2>
          <p>Card content with mock data.</p>
        <//>
      <//>
    </div>
  `;
}
```

## Running

Serve `client-proto/` with any static server. No build step needed:

```bash
cd client-proto
bunx serve -s .        # -s for SPA mode (all paths serve index.html)
```

## Component wrappers (components/ui.js)

Import reusable Preact wrappers instead of raw daisyUI classes:

```js
import { Button, Card, CardBody, CardTitle, CardActions,
         Input, Select, Textarea, Field, Badge, Alert,
         Avatar, Toggle, Checkbox, Radio, Separator,
         TabsList, Tab, Skeleton, Tooltip, Icon } from "~/components/ui.js";

// Buttons
html`<${Button} variant="primary" size="sm">Save<//>`
html`<${Button} variant="outline">Cancel<//>`
html`<${Button} variant="ghost" size="icon"><${Icon} icon="lucide:x" /><//>`

// Cards
html`<${Card}><${CardBody}><${CardTitle}>Title<//><p>Content</p><//><//>`

// Forms
html`<${Field} label="Email" hint="We'll never share your email."><${Input} type="email" /><//>`
html`<${Select}><option>Option 1</option><//>`

// Badges, Alerts, Icons
html`<${Badge} variant="outline">Status<//>`
html`<${Alert} variant="info" icon="lucide:info">Message<//>`
html`<${Icon} icon="lucide:search" size=${16} />`
```

Variants follow shadcn naming: `default`, `primary`, `secondary`, `destructive`, `outline`, `ghost`, `link`.

Full daisyUI reference: https://daisyui.com/components/

## z-proto features

The `<z-proto>` shell provides:

- **Device presets:** Desktop, iPhone, iPad, Pixel, Galaxy, Surface
- **Responsive mode:** Manual width/height with drag handles
- **Zoom:** 50%, 75%, 92%, 100%, 125%
- **Figma capture:** Add `figma-key="YOUR_KEY"` to `<z-proto>` for Figma export
- **Scene navigation:** Rendered in `<z-proto-header>` via createPortal

### z-proto slots

```html
<z-proto figma-key="optional-figma-key">
  <z-proto-header><!-- scene nav portaled here --></z-proto-header>
  <z-proto-body title="Window Title" width="390" height="844">
    <div id="app"><!-- app renders here --></div>
  </z-proto-body>
</z-proto>
```

## Themes

The templates include custom `shadcn` and `shadcn-dark` themes in `index.css`. Switch via `data-theme` on `<html>`:

```html
<html data-theme="shadcn">       <!-- light, shadcn-like -->
<html data-theme="shadcn-dark">  <!-- dark, shadcn-like -->
<html data-theme="light">        <!-- daisyUI default light -->
```

To toggle at runtime:

```js
document.documentElement.setAttribute("data-theme", "shadcn-dark");
```

## Rules

1. **Zero build tools.** Everything via CDN. No package.json, no bundler, no install step.
2. **CDN order matters.** Load `themes.css` → `daisyui.css` → `@tailwindcss/browser`. Reversing breaks styles.
3. **Never use `@plugin` in browser.** `@tailwindcss/browser` does not support plugins. Load daisyUI via `<link>` CSS.
4. **Use component wrappers.** Import `Button`, `Card`, `Input`, etc. from `~/components/ui.js`. They wrap daisyUI classes with shadcn-like API.
5. **Icons via `<Icon>`.** `<${Icon} icon="lucide:search" />`. Never import from `lucide-react`.
6. **Preact + htm.** Use `html` tagged templates, not JSX. Files are `.js`, not `.tsx`.
7. **wouter routing.** Path-based with `Route` + `Switch` from `wouter-preact`. Serve with `-s` (SPA mode).
8. **Mock data inline.** Forms pre-filled, lists hardcoded. Data lives in the route file.
9. **One route per file.** Feature-based: `routes/settings.js`, `routes/inbox/list.js`.
10. **Scroll containment.** Use `index.css` overrides. Only the content area scrolls.
11. **Use `shadcn` theme.** Default to `data-theme="shadcn"` for shadcn-like appearance.
12. **Route roots fill container.** Every route root div must have `flex-1 w-full h-full`.

## Discovery

Before creating a proto:

1. Check if `client-proto/` already exists in the project.
2. If it exists, read `client-proto/index.html` and `client-proto/index.js` for context.
3. Read `.agents/rules/` for project-specific conventions.
4. If no proto exists, copy templates from `skills/agile-proto/templates/`.

## Checklist

- [ ] `client-proto/` is self-contained (no external deps besides CDN)
- [ ] CDN order: themes.css → daisyui.css → @tailwindcss/browser
- [ ] `data-theme="shadcn"` set on `<html>`
- [ ] Static server starts with SPA mode (`bunx serve -s .`)
- [ ] Component wrappers imported from `~/components/ui.js`
- [ ] daisyUI + Tailwind utilities render correctly
- [ ] z-proto shell shows toolbar with presets and zoom
- [ ] Icons render via `<Icon>` component (wraps `<iconify-icon>`)
- [ ] All forms are pre-filled with mock data
- [ ] wouter routing works (path-based, not hash)
- [ ] Route root divs have `flex-1 w-full h-full`
- [ ] No `lucide-react`, no `react`, no `package.json`, no `@plugin`

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
├── index.js            # App entry: scenes, hash routing, render
├── index.css           # z-proto scroll containment overrides
├── components/         # Shared components (app-shell, layouts, etc.)
│   └── app-shell.js    # Optional: sidebar + header layout
└── routes/             # One file per scene/page
    ├── home.js
    ├── settings.js
    └── inbox/
        ├── list.js
        └── thread.js
```

## Bootstrapping

Copy templates from `skills/agile-proto/templates/` into the project's `client-proto/` directory:

```bash
cp -r ~/.claude/skills/agile-proto/templates/ my-app/client-proto/
```

Or create files manually following the templates. The key files are:

1. `index.html` — loads all CDN dependencies and defines the z-proto shell
2. `index.js` — defines SCENES array and hash-based routing
3. `index.css` — z-proto scroll containment overrides
4. `routes/home.js` — example page using daisyUI components

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
          "preact/": "https://esm.sh/preact@10/"
        }
      }
    </script>
    <link rel="stylesheet" href="/index.css">
    <style type="text/tailwindcss">
      @theme inline {
        --font-sans: 'Inter', sans-serif;
      }
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

### Scene routing pattern (index.js)

```js
import { html, render } from "htm/preact";
import { Fragment } from "preact";
import { createPortal } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { HomePage } from "./routes/home.js";

const SCENES = [
  { id: "home", label: "Home", Component: HomePage },
  // { id: "settings", label: "Settings", Component: SettingsPage },
];

// Hash-based routing: #home, #settings, etc.
function getSceneFromHash() {
  const hash = window.location.hash.replace(/^#/, "");
  return SCENES.find((s) => s.id === hash) || SCENES[0];
}
```

### Route file pattern (routes/home.js)

```js
import { html } from "htm/preact";

export function HomePage() {
  return html`
    <div class="flex flex-col h-full overflow-y-auto p-6 space-y-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <button class="btn btn-primary">
        <iconify-icon icon="lucide:plus" width="16"></iconify-icon>
        New item
      </button>
      <div class="card bg-base-100 shadow-sm border border-base-300">
        <div class="card-body">
          <h2 class="card-title">Card title</h2>
          <p>Card content with mock data.</p>
        </div>
      </div>
    </div>
  `;
}
```

## Running

Serve `client-proto/` with any static server. No build step needed:

```bash
cd client-proto
bunx serve .           # or: python3 -m http.server 3000
```

## daisyUI components

Use daisyUI classes directly in htm templates — no component imports needed:

```js
// Buttons
html`<button class="btn btn-primary">Primary</button>`
html`<button class="btn btn-outline btn-sm">Small outline</button>`

// Cards
html`
  <div class="card bg-base-100 shadow-sm border border-base-300">
    <div class="card-body">
      <h2 class="card-title">Title</h2>
      <p>Content</p>
    </div>
  </div>
`

// Inputs
html`<input type="text" class="input input-bordered w-full" value="Pre-filled" />`
html`<select class="select select-bordered w-full"><option selected>Option 1</option></select>`

// Badges, Alerts, Toggles, Tabs
html`<div class="badge badge-primary">Badge</div>`
html`<div role="alert" class="alert alert-info"><iconify-icon icon="lucide:info" width="20"></iconify-icon><span>Message</span></div>`
html`<input type="checkbox" class="toggle toggle-primary" checked />`
```

Full reference: https://daisyui.com/components/

## Icons

Use `<iconify-icon>` web component with any Iconify set:

```html
<iconify-icon icon="lucide:search" width="16"></iconify-icon>
<iconify-icon icon="lucide:arrow-right" width="14"></iconify-icon>
<iconify-icon icon="mdi:github" width="20"></iconify-icon>
```

**Never use `lucide-react` or any icon package.** The iconify-icon web component loads icons on demand from CDN.

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
4. **daisyUI classes.** Use `btn`, `card`, `input`, `badge`, etc. Never recreate components that daisyUI provides.
5. **Icons via `<iconify-icon>`.** Never import from `lucide-react` or any icon package.
6. **Preact + htm.** Use `html` tagged templates, not JSX. Files are `.js`, not `.tsx`.
7. **Hash routing.** Scenes defined in SCENES array, navigated via `#scene-id`.
8. **Mock data inline.** Forms pre-filled, lists hardcoded. Data lives in the route file.
9. **One route per file.** Feature-based: `routes/settings.js`, `routes/inbox/list.js`.
10. **Scroll containment.** Use `index.css` overrides. Only the content area scrolls.
11. **Use `shadcn` theme.** Default to `data-theme="shadcn"` for shadcn-like appearance.

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
- [ ] Static server starts successfully (`bunx serve .`)
- [ ] daisyUI classes render correctly (btn has bg, card has border)
- [ ] Tailwind utilities work (flex, p-6, space-y-4, etc.)
- [ ] z-proto shell shows toolbar with presets and zoom
- [ ] Icons render via `<iconify-icon>`
- [ ] All forms are pre-filled with mock data
- [ ] Scene navigation works via hash routing
- [ ] No `lucide-react`, no `react`, no `package.json`, no `@plugin`

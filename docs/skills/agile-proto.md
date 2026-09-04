# agile-proto

Process for static browser prototypes (**z-proto + HTM UI + Tailwind CSS v4 + Preact/htm + preact-iso**). Static means directly servable, with no backend and no required build pipeline; client-side interactions remain supported.

Component, theme, API, and **UI example** implementation does not live in this package — it belongs to the complementary [`htm-ui`](https://github.com/djalmajr/htm-ui) skill. If `/agile-proto` is installed and `htm-ui` is not, install the complement:

```bash
bunx skills add djalmajr/htm-ui --skill htm-ui
```

Docs and official examples: `https://djalmajr.github.io/htm-ui/`, [`apps/docs`](https://github.com/djalmajr/htm-ui/tree/main/apps/docs), [`apps/todo`](https://github.com/djalmajr/htm-ui/tree/main/apps/todo).

## Use it when

- validating a UI flow before production implementation;
- creating clickable mockup screens or a stakeholder demo;
- exploring responsive behavior and real interactions;
- sending verified running screens to Figma.

Do not use it for production code, backend integration, delivery tracking, or design-tool prototypes (use `/agile-design` for Paper, Figma, Pen.dev, Penpot).

## Invoke

```text
/agile-proto onboarding wizard with account, team, and review steps
```

The default target is `planning/<initiative>/proto/`; existing projects may use `{app}/client-proto/`.

## Stack contract

- no build or package install;
- components imported per file from `htm-ui/<module>.js`;
- public source: `https://cdn.jsdelivr.net/gh/djalmajr/htm-ui@main/packages/ui/`;
- `theme.css` and `ui.css` linked from the same origin;
- HTM tagged templates, never JSX;
- one scene per route file;
- preact-iso routing plus `?route=<scene-id>` capture support;
- Iconify through HTM UI's `Icon` component;
- semantic theme tokens, not raw product colors.

The template bundled in this skill is only the proto glue (z-proto, routes, Figma). Theme, components, and official examples come from HTM UI live (`THEMING.md` + CDN). Do not copy the demo catalog or the `AppShell` from `apps/docs`.

## Example flow

1. Run `templates/scripts/bootstrap.sh` on the target (injects the `@theme` from `THEMING.md`).
2. Confirm the `htm-ui` skill is installed; if not, install it or follow the docs/CDN.
3. Inspect HTM UI docs/source for the needed components.
4. Compose the **product** scenes with per-file imports (`htm-ui/button.js`, `htm-ui/card.js`, …).
5. Implement observable interaction state; do not ship inert examples.
6. Register scenes in `SCENES` and keep one scroll owner per view.
7. Serve with `bunx serve -s .`.
8. Validate every route with pointer, keyboard, narrow/wide viewports, and overlay dismissal/positioning.
9. If requested, capture the running `#app` surface into Figma.

## Quality gates

- `htm-ui` skill located, or explicit CDN/docs fallback;
- no `~/components/ui/` imports or copied primitive catalog;
- every multi-line component expression is on its own line;
- basic and variant examples use meaningfully different states;
- buttons, forms, toggles, segmented inputs, menus, and sorting actually work;
- dropdowns/popovers remain inside the viewport and close outside;
- input, select, and button height variants remain consistent;
- long content uses intentional `ScrollArea`/scroll ownership rather than clipping.

See `skills/agile-proto/SKILL.md` for the full workflow, interaction sweep, and Figma capture procedure.

## Chaining

- **After a validated prototype:** `/agile-epic` (or `/agile-story` for one screen). Put the scene IDs under Prototype refs.
- **Optional:** `/ux-flows new` from the proto routes, then `/ux-persona` against the served proto.

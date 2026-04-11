# agile-proto

Creates standalone interactive UI prototypes using Bun + React + shadcn/ui + Tailwind v4, designed to validate UI flows before committing to implementation. Prototypes live in a self-contained `client-proto/` directory with their own build tooling, component library, and routing.

## When to use

- You need to validate a UI flow before implementing it in production
- You want an interactive prototype instead of static mockups
- You're exploring a user journey (login flow, checkout, onboarding wizard)
- Someone asks to "prototype", "create proto", or "mockup screens"
- You need to demo a feature concept to stakeholders

## When NOT to use

- You need production code — prototypes are throwaway; use `/agile-story` then `/agile-plan` instead
- You need static documentation — use a wiki or design tool
- You're tracking delivery — use `/agile-daily` or `/agile-status-report`
- You need to test business logic or APIs — prototypes mock data, not real backends

## End-to-end examples

### Example 1: Prototyping a new onboarding wizard

The design team wants to validate a 4-step onboarding wizard before engineering builds it:

1. Start by invoking: `/agile-proto onboarding wizard with 4 steps`
2. The skill checks if `client-proto/` exists. If not, it bootstraps the full stack: Bun project, React 19, shadcn/ui, Tailwind v4, wouter router, Icon component, Biome linter.
3. It creates the route files:
   - `src/routes/onboarding/step-1.tsx` — Account info
   - `src/routes/onboarding/step-2.tsx` — Team setup
   - `src/routes/onboarding/step-3.tsx` — Integration preferences
   - `src/routes/onboarding/step-4.tsx` — Confirmation
   - `src/routes/onboarding/OnboardingShell.tsx` — Layout with progress bar
4. It uses shadcn components: `Button`, `Input`, `Select`, `Card`, `Progress`, `Stepper`.
5. It uses `<Icon icon="lucide:arrow-right" />` for navigation icons — **never** `lucide-react` directly.
6. Mock data is inline in the route files — pre-filled forms, hardcoded team list.
7. Run: `cd client-proto && bun run dev` → opens at `http://localhost:3000`
8. Stakeholders click through the wizard and validate the flow.

### Example 2: Prototyping a settings page with tabs

You need to validate the info architecture for a settings page with tabs:

1. Start by invoking: `/agile-proto settings page with account, notifications, and billing tabs`
2. The skill creates:
   - `src/routes/settings/SettingsShell.tsx` — Tab layout with `<Tabs>` from shadcn
   - `src/routes/settings/account.tsx` — Account form
   - `src/routes/settings/notifications.tsx` — Notification toggles
   - `src/routes/settings/billing.tsx` — Billing info
3. All forms are pre-filled with mock data.
4. Routing via wouter: `<Route path="/settings" component={SettingsShell} />`
5. Biome check passes: `cd client-proto && bun run check`

## Key stack rules

- **Self-contained:** `client-proto/` has its own `package.json`, `tsconfig.json`, `biome.json`, `bunfig.toml`
- **shadcn components only:** Never recreate components that shadcn provides. All 57+ components are pre-installed.
- **Icons via `<Icon>`:** Use `<Icon icon="lucide:search" />`. Never import from `lucide-react`.
- **Routing via wouter:** `Switch`, `Route`, `useLocation`, `Link`.
- **Design tokens in index.css** via CSS custom properties + Tailwind `@theme inline`.
- **Mock data inline:** Forms pre-filled, lists hardcoded. Data lives in the route file.
- **One route per file:** Feature-based organization (`routes/settings/account.tsx`).

## Tips & pitfalls

- Prototypes are throwaway. Don't architect for reuse — architect for clarity.
- Never import from `lucide-react`. Always use `<Icon icon="lucide:xxx" />`.
- Never leave blank forms. Pre-fill all mock data so reviewers can click through real scenarios.
- Root container must have `overflow: hidden` and `height: 100%`. Only the content area scrolls.
- Run `bun run check` (Biome) before sharing — if it doesn't pass, the prototype has issues.

## Chaining

- **Before:** `/agile-intake` (capture the need), `/agile-story` (if the prototype validates a story)
- **After:** Once the flow is validated, use `/agile-story` or `/agile-plan` to plan the real implementation.
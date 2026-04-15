// shadcn/alert.tsx
// Same base class as shadcn Alert, with additions for iconify-icon (custom element):
// shadcn uses :has(>svg) to detect a direct SVG, but iconify-icon keeps the SVG inside
// the shadow DOM, so :has doesn't catch it. We add has-[>iconify-icon] as a variant
// and treat iconify-icon with the same size/translate/text-current as &>svg.
import { html } from "htm/preact";
import { cn } from "./utils.js";

const ALERT_BASE =
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>iconify-icon]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 has-[>iconify-icon]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current [&>iconify-icon]:size-4 [&>iconify-icon]:translate-y-0.5 [&>iconify-icon]:text-current";

const ALERT_VARIANTS = {
  default: "bg-card text-card-foreground",
  destructive:
    "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
};

export function Alert({ variant = "default", className = "", children, ...props }) {
  return html`
    <div
      data-slot="alert"
      role="alert"
      class=${cn(ALERT_BASE, ALERT_VARIANTS[variant], className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function AlertTitle({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="alert-title"
      class=${cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function AlertDescription({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="alert-description"
      class=${cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

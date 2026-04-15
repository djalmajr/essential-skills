// shadcn/empty.tsx — empty state with icon, title and description.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Empty({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="empty"
      class=${cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center text-balance",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function EmptyHeader({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="empty-header"
      class=${cn("flex max-w-sm flex-col items-center gap-2", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function EmptyMedia({ variant = "default", className = "", children, ...props }) {
  const variantClass =
    variant === "icon"
      ? "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground"
      : "bg-transparent";
  return html`
    <div
      data-slot="empty-icon"
      class=${cn("mb-2 flex shrink-0 items-center justify-center", variantClass, className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function EmptyTitle({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="empty-title"
      class=${cn("text-lg font-medium tracking-tight", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function EmptyDescription({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="empty-description"
      class=${cn("text-sm text-muted-foreground", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function EmptyContent({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="empty-content"
      class=${cn("flex w-full max-w-sm flex-col items-center gap-4 text-sm text-balance", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

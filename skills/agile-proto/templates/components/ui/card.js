// shadcn/card.tsx
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Card({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="card"
      class=${cn("bg-card text-card-foreground flex flex-col gap-4 rounded-xl border py-4", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CardHeader({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="card-header"
      class=${cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CardTitle({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="card-title"
      class=${cn("leading-none font-semibold", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CardDescription({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="card-description"
      class=${cn("text-muted-foreground text-sm", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CardAction({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="card-action"
      class=${cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CardContent({ className = "", children, ...props }) {
  return html`
    <div data-slot="card-content" class=${cn("px-4", className)} ...${props}>
      ${children}
    </div>
  `;
}

export function CardFooter({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="card-footer"
      class=${cn("flex items-center px-4 [.border-t]:pt-4", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

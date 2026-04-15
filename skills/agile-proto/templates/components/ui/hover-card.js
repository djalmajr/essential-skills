// shadcn/hover-card — CSS-only via group-hover. No JS positioning.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function HoverCard({ className = "", children, ...props }) {
  return html`
    <span
      data-slot="hover-card"
      class=${cn("relative inline-flex group", className)}
      ...${props}
    >
      ${children}
    </span>
  `;
}

export function HoverCardTrigger({ className = "", children, ...props }) {
  return html`
    <span data-slot="hover-card-trigger" class=${cn("cursor-pointer", className)} ...${props}>
      ${children}
    </span>
  `;
}

export function HoverCardContent({ side = "bottom", align = "center", className = "", children, ...props }) {
  const sideClass =
    side === "top"
      ? "bottom-full mb-2"
      : side === "right"
        ? "left-full ml-2"
        : side === "left"
          ? "right-full mr-2"
          : "top-full mt-2";
  const alignClass = align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";
  return html`
    <div
      data-slot="hover-card-content"
      class=${cn(
        "pointer-events-none absolute z-50 w-64 rounded-md border bg-popover p-4 text-sm text-popover-foreground shadow-md",
        "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity",
        sideClass,
        alignClass,
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

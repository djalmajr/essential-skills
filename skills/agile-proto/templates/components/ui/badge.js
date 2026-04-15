// shadcn/badge.tsx
import { html } from "htm/preact";
import { cn } from "./utils.js";

const BADGE_BASE =
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden";

const BADGE_VARIANTS = {
  default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
  destructive:
    "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90",
  outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
};

export function Badge({ variant = "default", className = "", children, ...props }) {
  return html`
    <span
      data-slot="badge"
      class=${cn(BADGE_BASE, BADGE_VARIANTS[variant], className)}
      ...${props}
    >
      ${children}
    </span>
  `;
}

// shadcn/avatar.tsx — no Radix
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Avatar({ className = "", children, ...props }) {
  return html`
    <span
      data-slot="avatar"
      class=${cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      ...${props}
    >
      ${children}
    </span>
  `;
}

export function AvatarFallback({ className = "", children, ...props }) {
  return html`
    <span
      data-slot="avatar-fallback"
      class=${cn("bg-muted flex size-full items-center justify-center rounded-full", className)}
      ...${props}
    >
      ${children}
    </span>
  `;
}

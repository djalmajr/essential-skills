// shadcn/sonner (toast) — static visual for prototypes. For real toasts,
// implement a small store (Preact signal) or use the native Notifications API.
import { html } from "htm/preact";
import { cn } from "./utils.js";

const TOAST_VARIANT = {
  default: "bg-background text-foreground border",
  success: "bg-background text-foreground border border-green-500/50",
  error: "bg-background text-destructive border border-destructive/50",
  warning: "bg-background text-foreground border border-yellow-500/50",
};

export function Toaster({ position = "bottom-right", className = "", children, ...props }) {
  const positionClass = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  }[position];
  return html`
    <div
      data-slot="toaster"
      class=${cn("fixed z-50 flex flex-col gap-2 w-full max-w-sm", positionClass, className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function Toast({ variant = "default", title, description, className = "", children, ...props }) {
  return html`
    <div
      role="status"
      data-slot="toast"
      class=${cn(
        "group pointer-events-auto relative flex w-full items-center justify-between gap-3 rounded-md p-4 shadow-lg",
        TOAST_VARIANT[variant],
        className,
      )}
      ...${props}
    >
      <div class="grid gap-1">
        ${title && html`<div class="text-sm font-semibold">${title}</div>`}
        ${description && html`<div class="text-sm opacity-90">${description}</div>`}
        ${children}
      </div>
    </div>
  `;
}

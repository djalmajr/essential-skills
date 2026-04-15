// shadcn/input-group.tsx — input with addons (icons, prefixes, suffixes, kbd).
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function InputGroup({ className = "", children, ...props }) {
  return html`
    <div
      role="group"
      data-slot="input-group"
      class=${cn(
        "group/input-group relative flex h-9 w-full min-w-0 items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-ring/50",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

const ADDON_ALIGN = {
  "inline-start": "order-first pl-2",
  "inline-end": "order-last pr-2",
  "block-start": "order-first w-full justify-start px-2.5 pt-2",
  "block-end": "order-last w-full justify-start px-2.5 pb-2",
};

export function InputGroupAddon({ align = "inline-start", className = "", children, ...props }) {
  return html`
    <div
      data-slot="input-group-addon"
      data-align=${align}
      class=${cn(
        "flex h-auto items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none",
        ADDON_ALIGN[align],
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function InputGroupInput({ className = "", type = "text", ...props }) {
  return html`
    <input
      type=${type}
      data-slot="input-group-control"
      class=${cn(
        "flex-1 min-w-0 bg-transparent border-0 outline-none text-sm px-3 py-1 placeholder:text-muted-foreground",
        className,
      )}
      ...${props}
    />
  `;
}

export function InputGroupText({ className = "", children, ...props }) {
  return html`
    <span
      class=${cn("flex items-center gap-2 text-sm text-muted-foreground", className)}
      ...${props}
    >
      ${children}
    </span>
  `;
}

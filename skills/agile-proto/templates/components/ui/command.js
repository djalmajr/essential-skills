// shadcn/command — static visual (cmdk). For prototypes, showing the open panel
// is what matters. Real filtering needs additional JS.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Command({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="command"
      class=${cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CommandInput({ className = "", placeholder = "Type a command or search...", ...props }) {
  return html`
    <div class="flex items-center gap-2 border-b px-3" data-slot="command-input-wrapper">
      <iconify-icon icon="lucide:search" width="16" class="text-muted-foreground"></iconify-icon>
      <input
        data-slot="command-input"
        placeholder=${placeholder}
        class=${cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground",
          className,
        )}
        ...${props}
      />
    </div>
  `;
}

export function CommandList({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="command-list"
      class=${cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-1", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CommandEmpty({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="command-empty"
      class=${cn("py-6 text-center text-sm text-muted-foreground", className)}
      ...${props}
    >
      ${children ?? "No results found."}
    </div>
  `;
}

export function CommandGroup({ heading, className = "", children, ...props }) {
  return html`
    <div data-slot="command-group" class=${cn("overflow-hidden p-1 text-foreground", className)} ...${props}>
      ${heading &&
      html`<div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">${heading}</div>`}
      ${children}
    </div>
  `;
}

export function CommandItem({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="command-item"
      class=${cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CommandSeparator({ className = "" }) {
  return html`<div data-slot="command-separator" class=${cn("-mx-1 h-px bg-border", className)}></div>`;
}

export function CommandShortcut({ className = "", children, ...props }) {
  return html`
    <span
      data-slot="command-shortcut"
      class=${cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      ...${props}
    >
      ${children}
    </span>
  `;
}

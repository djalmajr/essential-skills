// shadcn/tabs.tsx — static version (no Radix). Use `active` to highlight the tab.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function TabsList({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="tabs-list"
      role="tablist"
      class=${cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function TabsTrigger({ active = false, className = "", children, ...props }) {
  return html`
    <button
      type="button"
      role="tab"
      data-slot="tabs-trigger"
      data-state=${active ? "active" : "inactive"}
      class=${cn(
        "data-[state=active]:bg-background text-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      ...${props}
    >
      ${children}
    </button>
  `;
}

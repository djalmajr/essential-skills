// shadcn/kbd.tsx
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Kbd({ className = "", children, ...props }) {
  return html`
    <kbd
      data-slot="kbd"
      class=${cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      ...${props}
    >
      ${children}
    </kbd>
  `;
}

// shadcn/input.tsx
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Input({ className = "", type = "text", ...props }) {
  return html`
    <input
      type=${type}
      data-slot="input"
      class=${cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className,
      )}
      ...${props}
    />
  `;
}

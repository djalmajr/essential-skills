// shadcn/textarea.tsx
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Textarea({ className = "", ...props }) {
  return html`
    <textarea
      data-slot="textarea"
      class=${cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ...${props}
    ></textarea>
  `;
}

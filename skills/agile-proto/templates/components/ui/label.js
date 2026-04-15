// shadcn/label.tsx
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Label({ className = "", children, ...props }) {
  return html`
    <label
      data-slot="label"
      class=${cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      ...${props}
    >
      ${children}
    </label>
  `;
}

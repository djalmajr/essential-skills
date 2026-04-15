// Checkbox — native input with shadcn-like classes. The checkmark is rendered
// via a background-image rule in index.css (scoped to input[data-slot=checkbox]:checked)
// because inline data: URLs inside Tailwind arbitrary values don't parse reliably
// under @tailwindcss/browser.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Checkbox({ className = "", ...props }) {
  return html`
    <input
      type="checkbox"
      data-slot="checkbox"
      class=${cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs",
        "appearance-none bg-background",
        "checked:bg-primary checked:border-primary",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ...${props}
    />
  `;
}

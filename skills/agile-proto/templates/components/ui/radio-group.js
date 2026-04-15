// shadcn/radio-group — styled native radio input.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function RadioGroup({ className = "", children, ...props }) {
  return html`
    <div role="radiogroup" data-slot="radio-group" class=${cn("grid gap-3", className)} ...${props}>
      ${children}
    </div>
  `;
}

export function RadioGroupItem({ className = "", ...props }) {
  return html`
    <input
      type="radio"
      data-slot="radio-group-item"
      class=${cn(
        "peer size-4 shrink-0 rounded-full border border-input shadow-xs",
        "appearance-none bg-background",
        "checked:border-primary",
        "checked:bg-[radial-gradient(circle,var(--color-primary)_40%,transparent_45%)]",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ...${props}
    />
  `;
}

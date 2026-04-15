// shadcn/switch — checkbox styled as a toggle. CSS-only.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Switch({ className = "", ...props }) {
  return html`
    <label
      data-slot="switch"
      class=${cn(
        "relative inline-flex h-[1.15rem] w-8 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        "bg-input has-[input:checked]:bg-primary",
        "has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]",
        "has-[input:disabled]:opacity-50 has-[input:disabled]:cursor-not-allowed",
        className,
      )}
    >
      <input type="checkbox" class="peer sr-only" ...${props} />
      <span
        aria-hidden="true"
        class="pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-0 transition-transform translate-x-0.5 peer-checked:translate-x-[calc(100%-0.125rem)]"
      ></span>
    </label>
  `;
}

// shadcn/select — visual wrapper around native <select> (zero JS, accessible,
// supports search-as-you-type, mobile native picker). For a rich, styleable menu,
// use DropdownMenu.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Select({ className = "", children, ...props }) {
  return html`
    <div data-slot="select" class=${cn("relative", className)}>
      <select
        data-slot="select-trigger"
        class="border-input h-9 w-full appearance-none rounded-md border bg-transparent pl-3 pr-8 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50 disabled:cursor-not-allowed"
        ...${props}
      >
        ${children}
      </select>
      <iconify-icon
        icon="lucide:chevron-down"
        width="16"
        class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
      ></iconify-icon>
    </div>
  `;
}

// Semantic re-exports to mirror the shadcn API (internally these are just <option>/<optgroup>).
export function SelectGroup({ label, children, ...props }) {
  return html`<optgroup label=${label} ...${props}>${children}</optgroup>`;
}

export function SelectItem({ value, children, ...props }) {
  return html`<option value=${value} ...${props}>${children}</option>`;
}

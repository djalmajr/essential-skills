// shadcn/collapsible — simple (single-block) version using <details>.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Collapsible({ open = false, className = "", children, ...props }) {
  return html`
    <details
      data-slot="collapsible"
      open=${open}
      class=${cn("group", className)}
      ...${props}
    >
      ${children}
    </details>
  `;
}

export function CollapsibleTrigger({ className = "", children, ...props }) {
  return html`
    <summary
      data-slot="collapsible-trigger"
      class=${cn(
        "list-none cursor-pointer [&::-webkit-details-marker]:hidden",
        className,
      )}
      ...${props}
    >
      ${children}
    </summary>
  `;
}

export function CollapsibleContent({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="collapsible-content"
      class=${cn("overflow-hidden", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

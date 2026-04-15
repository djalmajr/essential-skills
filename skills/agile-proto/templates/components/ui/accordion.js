// Accordion — delegates to native <details>/<summary>.
// Usage:
//   <Accordion>
//     <AccordionItem title="Section 1">Content<//>
//     <AccordionItem title="Section 2" open>Content<//>
//   </Accordion>

import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Accordion({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="accordion"
      class=${cn("divide-y divide-border border-y", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function AccordionItem({ title, open = false, className = "", children, ...props }) {
  return html`
    <details
      data-slot="accordion-item"
      open=${open}
      class=${cn("group", className)}
      ...${props}
    >
      <summary
        data-slot="accordion-trigger"
        class="flex items-center justify-between py-4 text-sm font-medium cursor-pointer list-none hover:underline [&::-webkit-details-marker]:hidden"
      >
        ${title}
        <iconify-icon
          icon="lucide:chevron-down"
          width="16"
          class="transition-transform group-open:rotate-180 text-muted-foreground"
        ></iconify-icon>
      </summary>
      <div
        data-slot="accordion-content"
        class="pb-4 text-sm text-muted-foreground"
      >
        ${children}
      </div>
    </details>
  `;
}

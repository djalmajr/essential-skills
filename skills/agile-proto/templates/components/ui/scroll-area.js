// shadcn/scroll-area — uses native overflow + thin scrollbar.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function ScrollArea({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="scroll-area"
      class=${cn("relative overflow-auto scrollbar-thin", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

// shadcn/separator.tsx
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Separator({ orientation = "horizontal", className = "", ...props }) {
  return html`
    <div
      data-slot="separator"
      data-orientation=${orientation}
      role="separator"
      class=${cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      ...${props}
    ></div>
  `;
}

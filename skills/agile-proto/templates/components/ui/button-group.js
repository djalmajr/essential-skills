// shadcn/button-group.tsx — flex container that joins buttons with no visual gap.
import { html } from "htm/preact";
import { cn } from "./utils.js";

const ORIENTATION = {
  horizontal:
    "*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-md! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
  vertical:
    "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-md! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
};

export function ButtonGroup({ orientation = "horizontal", className = "", children, ...props }) {
  return html`
    <div
      role="group"
      data-slot="button-group"
      data-orientation=${orientation}
      class=${cn(
        "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10",
        ORIENTATION[orientation],
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ButtonGroupText({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="button-group-text"
      class=${cn(
        "flex items-center gap-2 rounded-md border bg-muted px-2.5 text-sm font-medium shadow-xs",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ButtonGroupSeparator({ orientation = "vertical", className = "" }) {
  return html`
    <div
      data-slot="button-group-separator"
      data-orientation=${orientation}
      class=${cn(
        "shrink-0 self-stretch bg-input data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
        className,
      )}
    ></div>
  `;
}

// Tooltip — CSS-only via :hover/:focus. No JS positioning.
// Usage:
//   <Tooltip content="Add to library">
//     <Button>+<//>
//   </Tooltip>

import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Tooltip({ content, side = "top", className = "", children }) {
  // group + group-hover to show/hide. For `bottom`, swap top-full + mb for bottom-full + mt.
  const sideClass =
    side === "bottom"
      ? "top-full mt-1.5"
      : side === "right"
        ? "left-full ml-1.5 top-1/2 -translate-y-1/2"
        : side === "left"
          ? "right-full mr-1.5 top-1/2 -translate-y-1/2"
          : "bottom-full mb-1.5";

  return html`
    <span data-slot="tooltip" class=${cn("relative inline-flex group", className)}>
      ${children}
      <span
        data-slot="tooltip-content"
        role="tooltip"
        class=${cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 z-50 whitespace-nowrap",
          "rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md",
          "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity",
          sideClass,
        )}
      >
        ${content}
      </span>
    </span>
  `;
}

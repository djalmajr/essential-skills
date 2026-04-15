// shadcn/toggle-group — group of toggles behaving as radio (single) or checkbox (multiple).
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function ToggleGroup({ type = "single", className = "", children, ...props }) {
  return html`
    <div
      data-slot="toggle-group"
      data-type=${type}
      role=${type === "single" ? "radiogroup" : "group"}
      class=${cn(
        "inline-flex items-center justify-center gap-1 rounded-md",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

// Internally reuses Toggle: pass `pressed` on the active item.
export { Toggle as ToggleGroupItem } from "./toggle.js";

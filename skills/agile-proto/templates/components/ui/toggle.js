// shadcn/toggle — button with data-state on/off.
import { html } from "htm/preact";
import { cn } from "./utils.js";

const TOGGLE_VARIANTS = {
  default: "bg-transparent",
  outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
};

const TOGGLE_SIZES = {
  default: "h-9 px-2 min-w-9",
  sm: "h-8 px-1.5 min-w-8",
  lg: "h-10 px-2.5 min-w-10",
};

export function Toggle({
  pressed = false,
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) {
  return html`
    <button
      type="button"
      data-slot="toggle"
      data-state=${pressed ? "on" : "off"}
      aria-pressed=${pressed}
      class=${cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
        "hover:bg-muted hover:text-muted-foreground",
        "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "disabled:pointer-events-none disabled:opacity-50",
        TOGGLE_VARIANTS[variant],
        TOGGLE_SIZES[size],
        className,
      )}
      ...${props}
    >
      ${children}
    </button>
  `;
}

// shadcn/button.tsx — patched for <iconify-icon> web component
import { html } from "htm/preact";
import { cn } from "./utils.js";

// [&_iconify-icon] mirrors [&_svg] so lucide icons via <Icon> get the same
// pointer-events/size treatment as inline <svg> elements would.
const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_iconify-icon]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

const BUTTON_VARIANTS = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-white hover:bg-destructive/90",
  outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

// Removed has-[>svg] selectors — they don't match <iconify-icon>.
// Buttons with icons get consistent padding via gap-2 instead.
const BUTTON_SIZES = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md gap-1.5 px-3",
  lg: "h-10 rounded-md px-6",
  icon: "size-9",
  "icon-sm": "size-8",
  "icon-lg": "size-10",
};

export function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) {
  return html`
    <button
      data-slot="button"
      class=${cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
      ...${props}
    >
      ${children}
    </button>
  `;
}

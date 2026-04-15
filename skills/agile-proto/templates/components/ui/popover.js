// shadcn/popover — uses the native HTML popover API (Chrome 114+, Safari 17+, Firefox 125+).
// The trigger carries `popovertarget="<id>"` and the content element has `popover`
// attribute + matching `id`. No JS positioning needed.
import { html } from "htm/preact";
import { cn } from "./utils.js";

// PopoverTrigger is a styled button that opens the popover via its id.
// Accepts the same variant/size props as Button.
const TRIGGER_BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

const TRIGGER_VARIANTS = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const TRIGGER_SIZES = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md gap-1.5 px-3",
  lg: "h-10 rounded-md px-6",
  icon: "size-9",
};

export function PopoverTrigger({
  targetId,
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) {
  return html`
    <button
      type="button"
      data-slot="popover-trigger"
      popovertarget=${targetId}
      class=${cn(TRIGGER_BASE, TRIGGER_VARIANTS[variant], TRIGGER_SIZES[size], className)}
      ...${props}
    >
      ${children}
    </button>
  `;
}

export function PopoverContent({ id, className = "", children, ...props }) {
  return html`
    <div
      id=${id}
      popover="auto"
      data-slot="popover-content"
      class=${cn(
        "rounded-md border bg-popover p-4 text-popover-foreground shadow-md w-72 m-0",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

// DropdownMenu — delegates to <details>/<summary>. Closes on outside click via blur+timeout.
// No JS positioning — menu appears below the trigger via absolute positioning.
// Usage:
//   <DropdownMenu>
//     <DropdownMenuTrigger variant="outline">Options ▾</DropdownMenuTrigger>
//     <DropdownMenuContent>
//       <DropdownMenuLabel>Account</DropdownMenuLabel>
//       <DropdownMenuItem>Profile</DropdownMenuItem>
//       <DropdownMenuSeparator />
//       <DropdownMenuItem>Logout</DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>

import { html } from "htm/preact";
import { cn } from "./utils.js";

export function DropdownMenu({ className = "", children, ...props }) {
  // tabIndex + onBlur closes when focus is lost. setTimeout gives inner items
  // a chance to receive the click before close.
  return html`
    <details
      data-slot="dropdown-menu"
      class=${cn("relative inline-block", className)}
      onBlur=${(e) => {
        const el = e.currentTarget;
        setTimeout(() => {
          if (!el.contains(document.activeElement)) el.removeAttribute("open");
        }, 100);
      }}
      tabIndex=${-1}
      ...${props}
    >
      ${children}
    </details>
  `;
}

// DropdownMenuTrigger is the <summary> styled as a button.
// Nesting a <button> inside <summary> is invalid per MDN; we style the summary
// itself instead. Accepts variant/size like Button.
const TRIGGER_BASE =
  "list-none cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none [&::-webkit-details-marker]:hidden [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

const TRIGGER_VARIANTS = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-white hover:bg-destructive/90",
  outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const TRIGGER_SIZES = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  icon: "size-9",
};

export function DropdownMenuTrigger({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) {
  return html`
    <summary
      data-slot="dropdown-menu-trigger"
      class=${cn(TRIGGER_BASE, TRIGGER_VARIANTS[variant], TRIGGER_SIZES[size], className)}
      ...${props}
    >
      ${children}
    </summary>
  `;
}

export function DropdownMenuContent({ align = "start", className = "", children, ...props }) {
  const alignClass = align === "end" ? "right-0" : "left-0";
  return html`
    <div
      data-slot="dropdown-menu-content"
      class=${cn(
        "absolute top-full mt-1 z-50 min-w-[12rem] rounded-md border bg-popover text-popover-foreground shadow-md p-1",
        alignClass,
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function DropdownMenuItem({ className = "", children, ...props }) {
  return html`
    <button
      type="button"
      data-slot="dropdown-menu-item"
      class=${cn(
        "w-full text-left flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none cursor-pointer",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      ...${props}
    >
      ${children}
    </button>
  `;
}

export function DropdownMenuLabel({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="dropdown-menu-label"
      class=${cn("px-2 py-1.5 text-sm font-semibold", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function DropdownMenuSeparator({ className = "" }) {
  return html`
    <div
      data-slot="dropdown-menu-separator"
      class=${cn("-mx-1 my-1 h-px bg-border", className)}
    ></div>
  `;
}

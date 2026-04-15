// shadcn/navigation-menu — horizontal menu with submenus revealed via :hover/:focus-within.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function NavigationMenu({ className = "", children, ...props }) {
  return html`
    <nav
      data-slot="navigation-menu"
      class=${cn("relative flex max-w-max flex-1 items-center justify-center", className)}
      ...${props}
    >
      ${children}
    </nav>
  `;
}

export function NavigationMenuList({ className = "", children, ...props }) {
  return html`
    <ul
      data-slot="navigation-menu-list"
      class=${cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
      ...${props}
    >
      ${children}
    </ul>
  `;
}

export function NavigationMenuItem({ className = "", children, ...props }) {
  return html`
    <li
      data-slot="navigation-menu-item"
      class=${cn("relative group", className)}
      ...${props}
    >
      ${children}
    </li>
  `;
}

export function NavigationMenuTrigger({ className = "", children, ...props }) {
  return html`
    <button
      type="button"
      data-slot="navigation-menu-trigger"
      class=${cn(
        "inline-flex h-9 items-center gap-1 rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground outline-none",
        className,
      )}
      ...${props}
    >
      ${children}
      <iconify-icon icon="lucide:chevron-down" width="14" class="transition-transform group-hover:rotate-180"></iconify-icon>
    </button>
  `;
}

export function NavigationMenuContent({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="navigation-menu-content"
      class=${cn(
        "absolute top-full left-0 mt-1 z-50 w-max rounded-md border bg-popover text-popover-foreground shadow-md p-2",
        "opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function NavigationMenuLink({ className = "", children, ...props }) {
  return html`
    <a
      data-slot="navigation-menu-link"
      class=${cn(
        "block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      ...${props}
    >
      ${children}
    </a>
  `;
}

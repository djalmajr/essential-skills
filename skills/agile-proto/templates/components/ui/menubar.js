// shadcn/menubar — horizontal menu bar; each item is a <details> reusing dropdown-menu.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Menubar({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="menubar"
      class=${cn("flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function MenubarMenu({ className = "", children, ...props }) {
  return html`
    <details
      data-slot="menubar-menu"
      class=${cn("relative", className)}
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

// MenubarTrigger renders the <summary> itself as the clickable target (no nested <button>,
// which would be invalid per MDN). Styled as a menubar item.
export function MenubarTrigger({ className = "", children, ...props }) {
  return html`
    <summary
      data-slot="menubar-trigger"
      class=${cn(
        "list-none cursor-pointer rounded-sm px-3 py-1 text-sm font-medium outline-none select-none",
        "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
        "[&::-webkit-details-marker]:hidden",
        className,
      )}
      ...${props}
    >
      ${children}
    </summary>
  `;
}

export function MenubarContent({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="menubar-content"
      class=${cn(
        "absolute top-full left-0 mt-1 z-50 min-w-[12rem] rounded-md border bg-popover text-popover-foreground shadow-md p-1",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function MenubarItem({ className = "", children, ...props }) {
  return html`
    <button
      type="button"
      data-slot="menubar-item"
      class=${cn(
        "w-full text-left flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none cursor-pointer hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      ...${props}
    >
      ${children}
    </button>
  `;
}

export function MenubarSeparator({ className = "" }) {
  return html`<div data-slot="menubar-separator" class=${cn("-mx-1 my-1 h-px bg-border", className)}></div>`;
}

export function MenubarShortcut({ className = "", children }) {
  return html`<span class=${cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}>${children}</span>`;
}

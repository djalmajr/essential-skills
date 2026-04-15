// shadcn/context-menu — uses native oncontextmenu + repositions a <details> as a menu.
// Lightweight implementation: right-click opens the menu at the cursor position.
import { html } from "htm/preact";
import { useState } from "preact/hooks";
import { cn } from "./utils.js";

// Hook: pass the trigger ref; the menu follows the contextmenu cursor.
export function useContextMenu() {
  const [pos, setPos] = useState(null);
  function onContextMenu(e) {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  }
  function close() {
    setPos(null);
  }
  return { pos, onContextMenu, close };
}

export function ContextMenuTrigger({ onContextMenu, className = "", children, ...props }) {
  return html`
    <div
      data-slot="context-menu-trigger"
      onContextMenu=${onContextMenu}
      class=${cn("inline-block", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ContextMenuContent({ pos, onClose, className = "", children, ...props }) {
  if (!pos) return null;
  return html`
    <div
      data-slot="context-menu-content"
      style=${{ position: "fixed", top: `${pos.y}px`, left: `${pos.x}px`, zIndex: 50 }}
      class=${cn(
        "min-w-[12rem] rounded-md border bg-popover text-popover-foreground shadow-md p-1",
        className,
      )}
      onClick=${onClose}
      ...${props}
    >
      ${children}
    </div>
    <div
      class="fixed inset-0 z-40"
      onClick=${onClose}
      onContextMenu=${(e) => {
        e.preventDefault();
        onClose();
      }}
    ></div>
  `;
}

export function ContextMenuItem({ className = "", children, ...props }) {
  return html`
    <button
      type="button"
      data-slot="context-menu-item"
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

export function ContextMenuLabel({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="context-menu-label"
      class=${cn("px-2 py-1.5 text-sm font-semibold", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ContextMenuSeparator({ className = "" }) {
  return html`
    <div data-slot="context-menu-separator" class=${cn("-mx-1 my-1 h-px bg-border", className)}></div>
  `;
}

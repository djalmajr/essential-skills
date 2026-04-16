// shadcn/drawer — native <dialog> with slide-from-side. Reuses dialog helpers.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export { openDialog as openDrawer, closeDialog as closeDrawer } from "./dialog.js";

const SIDE_CLASS = {
  top: "top-0 left-0 right-0 max-h-[85vh] rounded-b-lg",
  bottom: "bottom-0 left-0 right-0 max-h-[85vh] rounded-t-lg",
  left: "top-0 bottom-0 left-0 h-full w-3/4 max-w-sm rounded-r-lg",
  right: "top-0 bottom-0 right-0 h-full w-3/4 max-w-sm rounded-l-lg",
};

// Inline styles required because <dialog>.showModal() forces inset:0 and
// centers the element in the top layer. CSS classes alone cannot override it.
const SIDE_STYLE = {
  top: { inset: "unset", top: 0, left: 0, right: 0, maxHeight: "85vh" },
  bottom: { inset: "unset", bottom: 0, left: 0, right: 0, maxHeight: "85vh" },
  left: { inset: "unset", top: 0, bottom: 0, left: 0, margin: "0 auto 0 0", maxWidth: "24rem", width: "75%", height: "100vh" },
  right: { inset: "unset", top: 0, bottom: 0, right: 0, margin: "0 0 0 auto", maxWidth: "24rem", width: "75%", height: "100vh" },
};

export function Drawer({ id, side = "right", className = "", style = {}, dismissible = true, children, ...props }) {
  const mergedStyle = { ...(SIDE_STYLE[side] || {}), ...style };
  const handleClick = (e) => {
    if (dismissible && e.target === e.currentTarget) e.currentTarget.close();
  };
  return html`
    <dialog
      ...${props}
      id=${id}
      data-slot="drawer"
      data-side=${side}
      style=${mergedStyle}
      onClick=${handleClick}
      class=${cn(
        "p-0 max-w-none max-h-none bg-transparent backdrop:bg-black/50 fixed",
        SIDE_CLASS[side],
        className,
      )}
    >
      ${children}
    </dialog>
  `;
}

export function DrawerContent({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="drawer-content"
      class=${cn(
        "bg-background text-foreground border h-full w-full p-6 flex flex-col gap-4 overflow-y-auto",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function DrawerHeader({ className = "", children, ...props }) {
  return html`
    <div data-slot="drawer-header" class=${cn("flex flex-col gap-1.5", className)} ...${props}>
      ${children}
    </div>
  `;
}

export function DrawerTitle({ className = "", children, ...props }) {
  return html`
    <h2 data-slot="drawer-title" class=${cn("text-lg font-semibold", className)} ...${props}>
      ${children}
    </h2>
  `;
}

export function DrawerDescription({ className = "", children, ...props }) {
  return html`
    <p
      data-slot="drawer-description"
      class=${cn("text-muted-foreground text-sm", className)}
      ...${props}
    >
      ${children}
    </p>
  `;
}

export function DrawerFooter({ className = "", children, ...props }) {
  return html`
    <div data-slot="drawer-footer" class=${cn("mt-auto flex flex-col gap-2", className)} ...${props}>
      ${children}
    </div>
  `;
}

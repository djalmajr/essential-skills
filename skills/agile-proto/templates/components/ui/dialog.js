// Modal/Dialog — delegates to native <dialog> (HTML5).
// Usage:
//   <Dialog id="my-dialog">
//     <DialogContent>
//       <DialogTitle>Title</DialogTitle>
//       <DialogDescription>...</DialogDescription>
//       ...
//       <DialogFooter><Button onClick=${closeDialog("my-dialog")}>OK<//></DialogFooter>
//     </DialogContent>
//   </Dialog>
//   <Button onClick=${openDialog("my-dialog")}>Open</Button>

import { html } from "htm/preact";
import { cn } from "./utils.js";

export const openDialog = (id) => () => document.getElementById(id)?.showModal();
export const closeDialog = (id) => () => document.getElementById(id)?.close();

export function Dialog({ id, className = "", dismissible = true, children, ...props }) {
  const handleClick = (e) => {
    if (dismissible && e.target === e.currentTarget) e.currentTarget.close();
  };
  return html`
    <dialog
      id=${id}
      data-slot="dialog"
      onClick=${handleClick}
      class=${cn(
        "bg-transparent p-0 m-auto backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        "open:flex items-center justify-center",
        className,
      )}
      ...${props}
    >
      ${children}
    </dialog>
  `;
}

export function DialogContent({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="dialog-content"
      class=${cn(
        "bg-background text-foreground rounded-lg border shadow-lg p-6 w-full max-w-md grid gap-4",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function DialogHeader({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="dialog-header"
      class=${cn("flex flex-col gap-1.5 text-left", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function DialogTitle({ className = "", children, ...props }) {
  return html`
    <h2
      data-slot="dialog-title"
      class=${cn("text-lg font-semibold leading-none", className)}
      ...${props}
    >
      ${children}
    </h2>
  `;
}

export function DialogDescription({ className = "", children, ...props }) {
  return html`
    <p
      data-slot="dialog-description"
      class=${cn("text-muted-foreground text-sm", className)}
      ...${props}
    >
      ${children}
    </p>
  `;
}

export function DialogFooter({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="dialog-footer"
      class=${cn("flex flex-col-reverse sm:flex-row sm:justify-end gap-2", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

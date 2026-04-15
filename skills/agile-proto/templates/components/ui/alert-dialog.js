// shadcn/alert-dialog — semantic variant of dialog (role=alertdialog).
// Reuses native <dialog>. The `openDialog`/`closeDialog` helpers still work.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export { openDialog as openAlertDialog, closeDialog as closeAlertDialog } from "./dialog.js";

export function AlertDialog({ id, className = "", children, ...props }) {
  return html`
    <dialog
      id=${id}
      role="alertdialog"
      data-slot="alert-dialog"
      class=${cn(
        "bg-transparent p-0 m-auto backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex items-center justify-center",
        className,
      )}
      ...${props}
    >
      ${children}
    </dialog>
  `;
}

export function AlertDialogContent({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="alert-dialog-content"
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

export function AlertDialogHeader({ className = "", children, ...props }) {
  return html`
    <div data-slot="alert-dialog-header" class=${cn("flex flex-col gap-1.5", className)} ...${props}>
      ${children}
    </div>
  `;
}

export function AlertDialogTitle({ className = "", children, ...props }) {
  return html`
    <h2 data-slot="alert-dialog-title" class=${cn("text-lg font-semibold", className)} ...${props}>
      ${children}
    </h2>
  `;
}

export function AlertDialogDescription({ className = "", children, ...props }) {
  return html`
    <p
      data-slot="alert-dialog-description"
      class=${cn("text-muted-foreground text-sm", className)}
      ...${props}
    >
      ${children}
    </p>
  `;
}

export function AlertDialogFooter({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="alert-dialog-footer"
      class=${cn("flex flex-col-reverse sm:flex-row sm:justify-end gap-2", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

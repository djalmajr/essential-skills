// shadcn/table — semantic wrappers over <table>.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Table({ className = "", children, ...props }) {
  return html`
    <div data-slot="table-container" class="relative w-full overflow-auto">
      <table data-slot="table" class=${cn("w-full caption-bottom text-sm", className)} ...${props}>
        ${children}
      </table>
    </div>
  `;
}

export function TableHeader({ className = "", children, ...props }) {
  return html`
    <thead data-slot="table-header" class=${cn("[&_tr]:border-b", className)} ...${props}>
      ${children}
    </thead>
  `;
}

export function TableBody({ className = "", children, ...props }) {
  return html`
    <tbody data-slot="table-body" class=${cn("[&_tr:last-child]:border-0", className)} ...${props}>
      ${children}
    </tbody>
  `;
}

export function TableFooter({ className = "", children, ...props }) {
  return html`
    <tfoot
      data-slot="table-footer"
      class=${cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      ...${props}
    >
      ${children}
    </tfoot>
  `;
}

export function TableRow({ className = "", children, ...props }) {
  return html`
    <tr
      data-slot="table-row"
      class=${cn("border-b transition-colors hover:bg-muted/50", className)}
      ...${props}
    >
      ${children}
    </tr>
  `;
}

export function TableHead({ className = "", children, ...props }) {
  return html`
    <th
      data-slot="table-head"
      class=${cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground",
        className,
      )}
      ...${props}
    >
      ${children}
    </th>
  `;
}

export function TableCell({ className = "", children, ...props }) {
  return html`
    <td
      data-slot="table-cell"
      class=${cn("p-2 align-middle", className)}
      ...${props}
    >
      ${children}
    </td>
  `;
}

export function TableCaption({ className = "", children, ...props }) {
  return html`
    <caption
      data-slot="table-caption"
      class=${cn("mt-4 text-sm text-muted-foreground", className)}
      ...${props}
    >
      ${children}
    </caption>
  `;
}

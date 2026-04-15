// shadcn/pagination — navigation buttons/links.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Pagination({ className = "", children, ...props }) {
  return html`
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      class=${cn("mx-auto flex w-full justify-center", className)}
      ...${props}
    >
      ${children}
    </nav>
  `;
}

export function PaginationContent({ className = "", children, ...props }) {
  return html`
    <ul data-slot="pagination-content" class=${cn("flex flex-row items-center gap-1", className)} ...${props}>
      ${children}
    </ul>
  `;
}

export function PaginationItem({ className = "", children, ...props }) {
  return html`<li data-slot="pagination-item" class=${className} ...${props}>${children}</li>`;
}

export function PaginationLink({ active = false, className = "", children, ...props }) {
  return html`
    <a
      data-slot="pagination-link"
      aria-current=${active ? "page" : undefined}
      class=${cn(
        "inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-md px-3 text-sm font-medium transition-colors",
        active
          ? "border bg-background shadow-xs"
          : "hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      ...${props}
    >
      ${children}
    </a>
  `;
}

export function PaginationPrevious({ className = "", ...props }) {
  return html`
    <a
      data-slot="pagination-previous"
      aria-label="Go to previous page"
      class=${cn(
        "inline-flex h-9 items-center gap-1 rounded-md pl-2.5 pr-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      ...${props}
    >
      <iconify-icon icon="lucide:chevron-left" width="16"></iconify-icon>
      <span>Previous</span>
    </a>
  `;
}

export function PaginationNext({ className = "", ...props }) {
  return html`
    <a
      data-slot="pagination-next"
      aria-label="Go to next page"
      class=${cn(
        "inline-flex h-9 items-center gap-1 rounded-md pl-3 pr-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      ...${props}
    >
      <span>Next</span>
      <iconify-icon icon="lucide:chevron-right" width="16"></iconify-icon>
    </a>
  `;
}

export function PaginationEllipsis({ className = "" }) {
  return html`
    <span aria-hidden="true" class=${cn("flex h-9 w-9 items-center justify-center", className)}>
      <iconify-icon icon="lucide:more-horizontal" width="16"></iconify-icon>
    </span>
  `;
}

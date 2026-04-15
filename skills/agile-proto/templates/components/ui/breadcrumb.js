// shadcn/breadcrumb.tsx
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Breadcrumb({ children, ...props }) {
  return html`<nav aria-label="breadcrumb" data-slot="breadcrumb" ...${props}>${children}</nav>`;
}

export function BreadcrumbList({ className = "", children, ...props }) {
  return html`
    <ol
      data-slot="breadcrumb-list"
      class=${cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm wrap-break-word sm:gap-2.5",
        className,
      )}
      ...${props}
    >
      ${children}
    </ol>
  `;
}

export function BreadcrumbItem({ className = "", children, ...props }) {
  return html`
    <li
      data-slot="breadcrumb-item"
      class=${cn("inline-flex items-center gap-1.5", className)}
      ...${props}
    >
      ${children}
    </li>
  `;
}

export function BreadcrumbLink({ className = "", children, ...props }) {
  return html`
    <a
      data-slot="breadcrumb-link"
      class=${cn("hover:text-foreground transition-colors", className)}
      ...${props}
    >
      ${children}
    </a>
  `;
}

export function BreadcrumbPage({ className = "", children, ...props }) {
  return html`
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      class=${cn("text-foreground font-normal", className)}
      ...${props}
    >
      ${children}
    </span>
  `;
}

export function BreadcrumbSeparator({ className = "", children }) {
  return html`
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      class=${cn("[&>svg]:size-3.5", className)}
    >
      ${children ?? html`<iconify-icon icon="lucide:chevron-right"></iconify-icon>`}
    </li>
  `;
}

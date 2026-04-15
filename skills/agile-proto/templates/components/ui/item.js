// shadcn/item.tsx — list row with media/content/actions.
import { html } from "htm/preact";
import { cn } from "./utils.js";

const ITEM_VARIANT = {
  default: "border-transparent",
  outline: "border-border",
  muted: "border-transparent bg-muted/50",
};

const ITEM_SIZE = {
  default: "gap-3.5 px-4 py-3.5",
  sm: "gap-2.5 px-3 py-2.5",
  xs: "gap-2 px-2.5 py-2",
};

export function ItemGroup({ className = "", children, ...props }) {
  return html`
    <div
      role="list"
      data-slot="item-group"
      class=${cn("flex w-full flex-col gap-4", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ItemSeparator({ className = "" }) {
  return html`<div data-slot="item-separator" class=${cn("my-2 h-px w-full bg-border", className)}></div>`;
}

export function Item({ variant = "default", size = "default", className = "", children, ...props }) {
  return html`
    <div
      data-slot="item"
      data-variant=${variant}
      data-size=${size}
      class=${cn(
        "flex w-full flex-wrap items-center rounded-md border text-sm transition-colors duration-100 outline-none",
        ITEM_VARIANT[variant],
        ITEM_SIZE[size],
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

const ITEM_MEDIA = {
  default: "bg-transparent",
  icon: "[&_svg:not([class*='size-'])]:size-4",
  image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
};

export function ItemMedia({ variant = "default", className = "", children, ...props }) {
  return html`
    <div
      data-slot="item-media"
      data-variant=${variant}
      class=${cn("flex shrink-0 items-center justify-center gap-2", ITEM_MEDIA[variant], className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ItemContent({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="item-content"
      class=${cn("flex flex-1 flex-col gap-1", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ItemTitle({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="item-title"
      class=${cn("line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ItemDescription({ className = "", children, ...props }) {
  return html`
    <p
      data-slot="item-description"
      class=${cn("line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground", className)}
      ...${props}
    >
      ${children}
    </p>
  `;
}

export function ItemActions({ className = "", children, ...props }) {
  return html`
    <div data-slot="item-actions" class=${cn("flex items-center gap-2", className)} ...${props}>
      ${children}
    </div>
  `;
}

export function ItemHeader({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="item-header"
      class=${cn("flex basis-full items-center justify-between gap-2", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ItemFooter({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="item-footer"
      class=${cn("flex basis-full items-center justify-between gap-2", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

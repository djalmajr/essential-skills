// shadcn/carousel — uses CSS scroll-snap (no virtualization JS).
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Carousel({ orientation = "horizontal", className = "", children, ...props }) {
  return html`
    <div
      data-slot="carousel"
      data-orientation=${orientation}
      class=${cn("relative", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CarouselContent({ orientation = "horizontal", className = "", children, ...props }) {
  return html`
    <div
      data-slot="carousel-content"
      class=${cn(
        "flex snap-x snap-mandatory overflow-x-auto scrollbar-hidden gap-4 -mx-4 px-4",
        orientation === "vertical" && "snap-y flex-col snap-mandatory overflow-y-auto",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CarouselItem({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="carousel-item"
      class=${cn("min-w-0 shrink-0 grow-0 basis-full snap-start", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function CarouselPrevious({ className = "", ...props }) {
  return html`
    <button
      type="button"
      data-slot="carousel-previous"
      class=${cn(
        "absolute size-8 left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border bg-background shadow-xs hover:bg-accent",
        className,
      )}
      ...${props}
    >
      <iconify-icon icon="lucide:chevron-left" width="16"></iconify-icon>
    </button>
  `;
}

export function CarouselNext({ className = "", ...props }) {
  return html`
    <button
      type="button"
      data-slot="carousel-next"
      class=${cn(
        "absolute size-8 right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border bg-background shadow-xs hover:bg-accent",
        className,
      )}
      ...${props}
    >
      <iconify-icon icon="lucide:chevron-right" width="16"></iconify-icon>
    </button>
  `;
}

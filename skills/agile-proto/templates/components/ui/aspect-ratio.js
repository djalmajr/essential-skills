// shadcn/aspect-ratio.tsx — uses `aspect-(--ratio)` via Tailwind.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function AspectRatio({ ratio = 1, className = "", children, ...props }) {
  return html`
    <div
      data-slot="aspect-ratio"
      style=${{ "--ratio": ratio }}
      class=${cn("relative aspect-(--ratio)", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

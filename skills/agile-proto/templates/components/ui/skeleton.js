// shadcn/skeleton — pulsing placeholder.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Skeleton({ className = "", ...props }) {
  return html`
    <div
      data-slot="skeleton"
      class=${cn("animate-pulse rounded-md bg-muted", className)}
      ...${props}
    ></div>
  `;
}

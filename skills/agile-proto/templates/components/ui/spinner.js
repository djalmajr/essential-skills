// shadcn/spinner — iconify-icon with animate-spin.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Spinner({ size = 16, className = "", ...props }) {
  return html`
    <iconify-icon
      data-slot="spinner"
      icon="lucide:loader-2"
      width=${size}
      class=${cn("animate-spin", className)}
      ...${props}
    ></iconify-icon>
  `;
}

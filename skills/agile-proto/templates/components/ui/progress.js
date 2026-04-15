// shadcn/progress — styled native <progress>.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Progress({ value = 0, max = 100, className = "", ...props }) {
  return html`
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuenow=${value}
      aria-valuemin="0"
      aria-valuemax=${max}
      class=${cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
      ...${props}
    >
      <div
        data-slot="progress-indicator"
        class="h-full bg-primary transition-all"
        style=${{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  `;
}

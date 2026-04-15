// shadcn/chart — visual placeholders. For prototypes, showing the chart "shape"
// with static divs/SVG is enough (a real chart needs Recharts, out of scope).
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function ChartContainer({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="chart-container"
      class=${cn("aspect-video w-full", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

// Bars: array de números 0-100 (alturas %). Cor via Tailwind class no parent.
export function BarChartPlaceholder({ data = [], className = "" }) {
  return html`
    <div class=${cn("flex items-end gap-2 h-full", className)}>
      ${data.map((h, i) => html`
        <div key=${i} class="flex-1 rounded-t bg-primary/80" style=${{ height: `${h}%` }}></div>
      `)}
    </div>
  `;
}

// Linha simples via SVG polyline.
export function LineChartPlaceholder({ data = [], className = "" }) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(" ");
  return html`
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" class=${cn("w-full h-full", className)}>
      <polyline fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke" points=${points} />
    </svg>
  `;
}

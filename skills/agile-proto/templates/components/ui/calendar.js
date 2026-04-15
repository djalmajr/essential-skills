// shadcn/calendar — static visual (7×6 grid). For a real date input, prefer <input type="date">.
import { html } from "htm/preact";
import { cn } from "./utils.js";

const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function Calendar({ month = new Date(), selected, className = "", ...props }) {
  const y = month.getFullYear();
  const m = month.getMonth();
  const first = new Date(y, m, 1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length < 42) cells.push(null);
  const monthName = month.toLocaleString("en-US", { month: "long", year: "numeric" });
  const selectedDay = selected instanceof Date && selected.getMonth() === m ? selected.getDate() : null;

  return html`
    <div data-slot="calendar" class=${cn("p-3 rounded-md border bg-background w-fit", className)} ...${props}>
      <div class="flex items-center justify-between mb-3 px-1">
        <button type="button" class="size-7 inline-flex items-center justify-center rounded-md hover:bg-accent">
          <iconify-icon icon="lucide:chevron-left" width="14"></iconify-icon>
        </button>
        <span class="text-sm font-medium">${monthName}</span>
        <button type="button" class="size-7 inline-flex items-center justify-center rounded-md hover:bg-accent">
          <iconify-icon icon="lucide:chevron-right" width="14"></iconify-icon>
        </button>
      </div>
      <div class="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-1">
        ${WEEK.map((d) => html`<div key=${d} class="text-center">${d}</div>`)}
      </div>
      <div class="grid grid-cols-7 gap-1">
        ${cells.map(
          (d, i) => html`
            <button
              key=${i}
              type="button"
              disabled=${d === null}
              class=${cn(
                "size-8 text-sm rounded-md inline-flex items-center justify-center transition-colors",
                d === null ? "invisible" : "hover:bg-accent",
                d === selectedDay && "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              ${d ?? ""}
            </button>
          `,
        )}
      </div>
    </div>
  `;
}

// shadcn/combobox — uses native <input list=""> + <datalist>.
// No custom list styling (browser-controlled), but zero-JS.
// For styled lists use Command (static visual).
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Combobox({
  id,
  options = [],
  className = "",
  placeholder = "Select...",
  ...props
}) {
  const listId = `${id}-options`;
  return html`
    <div data-slot="combobox" class=${cn("relative w-full", className)}>
      <input
        id=${id}
        list=${listId}
        placeholder=${placeholder}
        class="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        ...${props}
      />
      <datalist id=${listId}>
        ${options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const label = typeof opt === "string" ? opt : opt.label ?? opt.value;
          return html`<option key=${value} value=${value}>${label}</option>`;
        })}
      </datalist>
    </div>
  `;
}

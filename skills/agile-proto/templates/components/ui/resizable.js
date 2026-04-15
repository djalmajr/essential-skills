// shadcn/resizable — static visual with handles. No resize JS.
// For prototypes, showing the split layout is usually enough.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function ResizablePanelGroup({ direction = "horizontal", className = "", children, ...props }) {
  return html`
    <div
      data-slot="resizable-panel-group"
      data-panel-group-direction=${direction}
      class=${cn(
        "flex h-full w-full",
        direction === "vertical" ? "flex-col" : "flex-row",
        className,
      )}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ResizablePanel({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="resizable-panel"
      class=${cn("flex-1 min-h-0 min-w-0", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function ResizableHandle({ direction = "horizontal", withHandle = false, className = "" }) {
  const isVertical = direction === "vertical";
  return html`
    <div
      data-slot="resizable-handle"
      class=${cn(
        "relative flex items-center justify-center bg-border",
        isVertical ? "h-px w-full cursor-row-resize" : "w-px h-full cursor-col-resize",
        className,
      )}
    >
      ${withHandle &&
      html`
        <div class=${cn(
          "z-10 flex items-center justify-center rounded-sm border bg-border",
          isVertical ? "h-3 w-4" : "h-4 w-3",
        )}>
          <iconify-icon icon=${isVertical ? "lucide:grip-horizontal" : "lucide:grip-vertical"} width="10"></iconify-icon>
        </div>
      `}
    </div>
  `;
}

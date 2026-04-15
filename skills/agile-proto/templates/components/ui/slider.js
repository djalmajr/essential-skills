// shadcn/slider — styled native <input type="range">.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Slider({ className = "", ...props }) {
  return html`
    <input
      type="range"
      data-slot="slider"
      class=${cn(
        "w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer outline-none",
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-sm",
        "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-primary",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      ...${props}
    />
  `;
}

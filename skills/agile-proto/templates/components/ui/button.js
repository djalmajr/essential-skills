// shadcn/button — styles via CSS (index.css) to support :hover properly.
// Uses data-variant and data-size attributes instead of Tailwind classes
// to avoid inline-style specificity conflicts with :hover states.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function Button({
  variant = "default",
  size = "default",
  className = "",
  disabled,
  children,
  ...props
}) {
  return html`
    <button
      data-slot="button"
      data-variant=${variant}
      data-size=${size}
      class=${cn(className)}
      disabled=${disabled}
      ...${props}
    >
      ${children}
    </button>
  `;
}

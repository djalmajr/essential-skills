// Wraps <iconify-icon>. Accepts any Iconify set (lucide, mdi, etc.).
// Usage: <Icon icon="lucide:plus" size=14 />
import { html } from "htm/preact";

export function Icon({ icon, size = 16, className = "", ...props }) {
  return html`
    <iconify-icon
      icon=${icon}
      width=${size}
      class=${className}
      ...${props}
    ></iconify-icon>
  `;
}

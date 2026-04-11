// Preact + htm wrappers over daisyUI classes.
// Mirrors shadcn API: <Button variant="outline" size="sm">

import { html } from "htm/preact";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// ─────────────────────────────────────────────────────────────────────────────
// Button
// ─────────────────────────────────────────────────────────────────────────────
const BTN_VARIANTS = {
  default: "btn-primary",
  primary: "btn-primary",
  secondary: "btn-secondary",
  destructive: "btn-error",
  outline: "btn-outline",
  ghost: "btn-ghost",
  link: "btn-link",
};

const BTN_SIZES = {
  default: "",
  xs: "btn-xs",
  sm: "btn-sm",
  lg: "btn-lg",
  icon: "btn-square btn-sm",
};

export function Button({ variant = "default", size = "default", className, children, ...props }) {
  return html`
    <button
      class=${cn("btn", BTN_VARIANTS[variant], BTN_SIZES[size], className)}
      ...${props}
    >
      ${children}
    </button>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────────────────────────────────────
export function Card({ className, children, ...props }) {
  return html`<div class=${cn("card bg-base-100", className)} ...${props}>${children}</div>`;
}

export function CardBody({ className, children, ...props }) {
  return html`<div class=${cn("card-body", className)} ...${props}>${children}</div>`;
}

export function CardTitle({ className, children, ...props }) {
  return html`<h2 class=${cn("card-title", className)} ...${props}>${children}</h2>`;
}

export function CardActions({ className, children, ...props }) {
  return html`<div class=${cn("card-actions justify-end", className)} ...${props}>${children}</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Input
// ─────────────────────────────────────────────────────────────────────────────
export function Input({ className, type = "text", ...props }) {
  return html`<input type=${type} class=${cn("input input-bordered w-full", className)} ...${props} />`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Textarea
// ─────────────────────────────────────────────────────────────────────────────
export function Textarea({ className, ...props }) {
  return html`<textarea class=${cn("textarea textarea-bordered w-full", className)} ...${props}></textarea>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Select
// ─────────────────────────────────────────────────────────────────────────────
export function Select({ className, children, ...props }) {
  return html`<select class=${cn("select select-bordered w-full", className)} ...${props}>${children}</select>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Label (fieldset pattern)
// ─────────────────────────────────────────────────────────────────────────────
export function Field({ label, hint, children }) {
  return html`
    <fieldset class="fieldset">
      ${label && html`<label class="fieldset-label">${label}</label>`}
      ${children}
      ${hint && html`<p class="text-xs text-base-content/60 mt-1">${hint}</p>`}
    </fieldset>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Badge
// ─────────────────────────────────────────────────────────────────────────────
const BADGE_VARIANTS = {
  default: "badge-primary",
  primary: "badge-primary",
  secondary: "badge-secondary",
  outline: "badge-outline",
  ghost: "badge-ghost",
  destructive: "badge-error text-white",
};

export function Badge({ variant = "default", className, children, ...props }) {
  return html`<div class=${cn("badge", BADGE_VARIANTS[variant], className)} ...${props}>${children}</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Alert
// ─────────────────────────────────────────────────────────────────────────────
const ALERT_VARIANTS = {
  default: "",
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

export function Alert({ variant = "default", icon, title, children, className, ...props }) {
  return html`
    <div role="alert" class=${cn("alert", ALERT_VARIANTS[variant], className)} ...${props}>
      ${icon && html`<iconify-icon icon=${icon} width="16"></iconify-icon>`}
      <div>
        ${title && html`<h3 class="font-bold text-sm">${title}</h3>`}
        ${children && html`<p class="text-xs">${children}</p>`}
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Avatar
// ─────────────────────────────────────────────────────────────────────────────
export function Avatar({ src, fallback, size = "w-10", className }) {
  if (src) {
    return html`
      <div class=${cn("avatar", className)}>
        <div class=${cn(size, "rounded-full")}><img src=${src} alt="avatar" /></div>
      </div>
    `;
  }
  return html`
    <div class=${cn("avatar placeholder", className)}>
      <div class=${cn("bg-neutral text-neutral-content rounded-full", size)}>
        <span class="text-sm">${fallback}</span>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Separator
// ─────────────────────────────────────────────────────────────────────────────
export function Separator({ orientation = "horizontal", className }) {
  return html`<div class=${cn("divider", orientation === "vertical" ? "divider-horizontal" : "", "my-0", className)}></div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tabs
// ─────────────────────────────────────────────────────────────────────────────
export function TabsList({ className, children, ...props }) {
  return html`<div role="tablist" class=${cn("tabs tabs-box bg-base-200", className)} ...${props}>${children}</div>`;
}

export function Tab({ active, className, children, ...props }) {
  return html`<a role="tab" class=${cn("tab", active && "tab-active", className)} ...${props}>${children}</a>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Toggle / Switch
// ─────────────────────────────────────────────────────────────────────────────
export function Toggle({ size = "sm", className, ...props }) {
  return html`<input type="checkbox" class=${cn("toggle", size === "sm" && "toggle-sm", className)} ...${props} />`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Checkbox
// ─────────────────────────────────────────────────────────────────────────────
export function Checkbox({ size = "sm", className, ...props }) {
  return html`<input type="checkbox" class=${cn("checkbox", size === "sm" && "checkbox-sm", className)} ...${props} />`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Radio
// ─────────────────────────────────────────────────────────────────────────────
export function Radio({ size = "sm", className, ...props }) {
  return html`<input type="radio" class=${cn("radio", size === "sm" && "radio-sm", className)} ...${props} />`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────────────────────────────────────────
export function Skeleton({ className }) {
  return html`<div class=${cn("skeleton", className)}></div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tooltip
// ─────────────────────────────────────────────────────────────────────────────
export function Tooltip({ tip, className, children }) {
  return html`<div class=${cn("tooltip", className)} data-tip=${tip}>${children}</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Icon (shorthand for iconify-icon)
// ─────────────────────────────────────────────────────────────────────────────
export function Icon({ icon, size = 16, className }) {
  return html`<iconify-icon icon=${icon} style="font-size: ${size}px" class=${className}></iconify-icon>`;
}

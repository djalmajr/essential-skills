// shadcn/field.tsx — wrappers to build forms (FieldSet, Field, FieldLabel, etc.).
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function FieldSet({ className = "", children, ...props }) {
  return html`
    <fieldset
      data-slot="field-set"
      class=${cn("flex flex-col gap-6", className)}
      ...${props}
    >
      ${children}
    </fieldset>
  `;
}

export function FieldLegend({ variant = "legend", className = "", children, ...props }) {
  return html`
    <legend
      data-slot="field-legend"
      data-variant=${variant}
      class=${cn(
        "mb-3 font-medium",
        variant === "label" ? "text-sm" : "text-base",
        className,
      )}
      ...${props}
    >
      ${children}
    </legend>
  `;
}

export function FieldGroup({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="field-group"
      class=${cn("flex w-full flex-col gap-7", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function Field({ orientation = "vertical", className = "", children, ...props }) {
  const orientationClass = {
    vertical: "flex-col *:w-full",
    horizontal: "flex-row items-center",
    responsive: "flex-col *:w-full @md:flex-row @md:items-center",
  }[orientation];
  return html`
    <div
      role="group"
      data-slot="field"
      data-orientation=${orientation}
      class=${cn("flex w-full gap-3", orientationClass, className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function FieldContent({ className = "", children, ...props }) {
  return html`
    <div
      data-slot="field-content"
      class=${cn("flex flex-1 flex-col gap-1 leading-snug", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function FieldLabel({ className = "", children, ...props }) {
  return html`
    <label
      data-slot="field-label"
      class=${cn("flex w-fit gap-2 text-sm leading-snug font-medium select-none", className)}
      ...${props}
    >
      ${children}
    </label>
  `;
}

export function FieldDescription({ className = "", children, ...props }) {
  return html`
    <p
      data-slot="field-description"
      class=${cn("text-left text-sm leading-normal font-normal text-muted-foreground", className)}
      ...${props}
    >
      ${children}
    </p>
  `;
}

export function FieldError({ className = "", children, ...props }) {
  if (!children) return null;
  return html`
    <div
      role="alert"
      data-slot="field-error"
      class=${cn("text-sm font-normal text-destructive", className)}
      ...${props}
    >
      ${children}
    </div>
  `;
}

export function FieldSeparator({ className = "", children }) {
  return html`
    <div data-slot="field-separator" class=${cn("relative my-2 h-5 text-sm", className)}>
      <div class="absolute inset-0 top-1/2 h-px bg-border"></div>
      ${children &&
      html`<span class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground">${children}</span>`}
    </div>
  `;
}

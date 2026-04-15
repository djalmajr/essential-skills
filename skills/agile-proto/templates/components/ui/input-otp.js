// shadcn/input-otp — single-digit input grid. No dependency on input-otp lib.
// Auto-advances on type and auto-returns on Backspace.
import { html } from "htm/preact";
import { cn } from "./utils.js";

export function InputOTP({ length = 6, className = "", value = "", onChange, ...props }) {
  function handleInput(e, idx) {
    const v = e.target.value.slice(-1).replace(/\D/g, "");
    const chars = value.split("");
    chars[idx] = v;
    const next = chars.join("").slice(0, length);
    onChange?.(next);
    if (v && idx < length - 1) {
      e.target.parentElement.children[idx + 1]?.focus();
    }
  }
  function handleKey(e, idx) {
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      e.target.parentElement.children[idx - 1]?.focus();
    }
  }
  return html`
    <div
      data-slot="input-otp"
      class=${cn("flex items-center", className)}
      ...${props}
    >
      ${Array.from({ length }).map(
        (_, i) => html`
          <input
            key=${i}
            type="text"
            inputmode="numeric"
            maxlength="1"
            value=${value[i] ?? ""}
            onInput=${(e) => handleInput(e, i)}
            onKeyDown=${(e) => handleKey(e, i)}
            class=${cn(
              "size-9 text-center text-sm border-y border-r border-input shadow-xs outline-none transition-all",
              "first:rounded-l-md first:border-l last:rounded-r-md",
              "focus-visible:z-10 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            )}
          />
        `,
      )}
    </div>
  `;
}

export function InputOTPSeparator() {
  return html`<div role="separator" class="flex items-center px-1"><iconify-icon icon="lucide:minus" width="16"></iconify-icon></div>`;
}

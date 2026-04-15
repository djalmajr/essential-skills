// Helper to concatenate classes (equivalent to shadcn's cn, without clsx/tailwind-merge).
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

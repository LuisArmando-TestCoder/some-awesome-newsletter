// WS4. Promise based confirm dialog: `if (await confirmAction({...})) ...`
// Rendered once by ConfirmHost.svelte (mounted in the dashboard layout).
import { writable } from "svelte/store";

export type ConfirmRequest = {
  title: string;
  body?: string;
  confirmLabel: string;
  cancelLabel: string;
  tone?: "primary" | "danger";
  resolve: (ok: boolean) => void;
};

export const confirmRequest = writable<ConfirmRequest | null>(null);

export function confirmAction(opts: Omit<ConfirmRequest, "resolve">): Promise<boolean> {
  return new Promise((resolve) => {
    confirmRequest.set({ ...opts, resolve });
  });
}

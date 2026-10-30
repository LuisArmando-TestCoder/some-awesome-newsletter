import { writable } from 'svelte/store';
import { toast, type ToastTone } from '$lib/ui/components/toast';

export interface Notification {
  title: string;
  message: string;
}

/** Last notification sent with ping. Kept for older code that reads it. */
export const notification = writable<Notification | null>(null);

/**
 * Show a short notice. Legacy entry point: it forwards to the shared toast API,
 * which the Toaster (rendered by Notification.svelte) displays.
 * Every existing call confirms a finished action, so the default tone is success.
 */
export function ping(title: string, message: string, tone: ToastTone = 'success'): number {
  notification.set({ title, message });
  return toast.show({ title: title || undefined, message, tone });
}

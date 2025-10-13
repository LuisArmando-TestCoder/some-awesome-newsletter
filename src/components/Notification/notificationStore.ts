import { writable } from 'svelte/store';

export interface Notification {
  title: string;
  message: string;
}

export const notification = writable<Notification | null>(null);

export function ping(title: string, message: string) {
  notification.set({ title, message });
}

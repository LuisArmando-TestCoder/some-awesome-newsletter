import { writable } from 'svelte/store';

export type ToastTone = 'info' | 'success' | 'warning' | 'danger';

export interface ToastAction {
  label: string;
  onclick: () => void;
}

export interface ToastOptions {
  title?: string;
  message: string;
  tone?: ToastTone;
  /** Milliseconds before the toast closes on its own. 0 keeps it open until dismissed. */
  duration?: number;
  action?: ToastAction;
}

export interface ToastItem {
  id: number;
  title?: string;
  message: string;
  tone: ToastTone;
  duration: number;
  action?: ToastAction;
}

const MIN_MS = 4000;
const MAX_MS = 10000;
const MS_PER_CHAR = 60;
const MAX_VISIBLE = 5;

/** Reading time: about 60 ms per character, between 4 and 10 seconds. */
export function readingDuration(text: string): number {
  return Math.min(MAX_MS, Math.max(MIN_MS, text.length * MS_PER_CHAR));
}

export const toasts = writable<ToastItem[]>([]);

let nextId = 1;

function show(options: ToastOptions): number {
  const id = nextId++;
  const text = `${options.title ?? ''} ${options.message}`.trim();
  const item: ToastItem = {
    id,
    title: options.title,
    message: options.message,
    tone: options.tone ?? 'info',
    duration: options.duration ?? readingDuration(text),
    action: options.action
  };
  toasts.update((list) => {
    // Drop an identical toast that is already showing, then cap the stack.
    const rest = list.filter(
      (t) => !(t.message === item.message && t.title === item.title && t.tone === item.tone)
    );
    return [...rest, item].slice(-MAX_VISIBLE);
  });
  return id;
}

function dismiss(id: number) {
  toasts.update((list) => list.filter((t) => t.id !== id));
}

function clear() {
  toasts.set([]);
}

export const toast = {
  show,
  dismiss,
  clear,
  info: (message: string, title?: string) => show({ message, title, tone: 'info' }),
  success: (message: string, title?: string) => show({ message, title, tone: 'success' }),
  warning: (message: string, title?: string) => show({ message, title, tone: 'warning' }),
  error: (message: string, title?: string) => show({ message, title, tone: 'danger' })
};

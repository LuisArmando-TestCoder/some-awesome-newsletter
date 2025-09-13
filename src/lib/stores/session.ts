import { writable, type Writable } from 'svelte/store';

export type Session = {
  id: string;
  email: string;
  name?: string;
  image?: string;
  provider?: 'google' | 'email' | 'mock';
};

const STORAGE_KEY = 'app.session';

function createSessionStore(): Writable<Session | null> {
  let initial: Session | null = null;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) initial = JSON.parse(raw);
    } catch (e) {
      console.warn('[session] failed to parse localStorage', e);
    }
  }

  const store = writable<Session | null>(initial);

  if (typeof window !== 'undefined') {
    store.subscribe((value) => {
      try {
        if (value) localStorage.setItem(STORAGE_KEY, JSON.stringify(value || 0));
        else localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn('[session] failed to persist to localStorage', e);
      }
    });
  }

  return store;
}

export const session = createSessionStore();

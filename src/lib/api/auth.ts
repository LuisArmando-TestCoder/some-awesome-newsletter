import { runtime } from '$lib/config/runtime';
import { session, type Session } from '$lib/stores/session';

// Helpers for structured logs
const log = (event: string, data: Record<string, unknown> = {}) => {
  console.info('[auth]', event, { ts: new Date().toISOString(), mock: runtime.isMockMode, ...data });
};

export type AuthResult = { ok: true; session: Session } | { ok: false; error: string };

export async function loginWithGoogle(): Promise<AuthResult> {
  log('login_google_click');
  if (runtime.isMockMode) {
    const s: Session = { id: 'mock-user', email: 'mock@example.com', name: 'Mock User', provider: 'mock' };
    session.set(s);
    log('mock_login_success', { provider: 'google' });
    return { ok: true, session: s };
  }

  try {
    // Real flow: redirect to your auth starter endpoint (requests-only boundary)
    // For example: `/api/auth/google/start` that returns {url}
    const res = await fetch('/api/auth/google/start', { method: 'POST' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { url } = await res.json();
    log('login_google_redirect', { url });
    window.location.href = url;
    return { ok: true, session: undefined as any };
  } catch (e: any) {
    log('login_google_error', { message: e?.message });
    return { ok: false, error: 'Failed to start Google login.' };
  }
}

export async function loginWithEmail(email: string): Promise<AuthResult> {
  log('login_email_click', { email });
  if (runtime.isMockMode) {
    const s: Session = { id: 'mock-user', email, name: email.split('@')[0], provider: 'mock' };
    session.set(s);
    log('mock_login_success', { provider: 'email' });
    return { ok: true, session: s };
  }
  try {
    const res = await fetch('/api/auth/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    log('login_email_sent', { email });
    return { ok: true, session: undefined as any };
  } catch (e: any) {
    log('login_email_error', { message: e?.message });
    return { ok: false, error: 'Failed to request magic link.' };
  }
}

export async function signupWithGoogle(): Promise<AuthResult> {
  log('signup_google_click');
  if (runtime.isMockMode) {
    const s: Session = { id: 'mock-user', email: 'mock@example.com', name: 'Mock User', provider: 'mock' };
    session.set(s);
    log('mock_signup_success', { provider: 'google' });
    return { ok: true, session: s };
  }
  try {
    const res = await fetch('/api/auth/google/start?mode=signup', { method: 'POST' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { url } = await res.json();
    log('signup_google_redirect', { url });
    window.location.href = url;
    return { ok: true, session: undefined as any };
  } catch (e: any) {
    log('signup_google_error', { message: e?.message });
    return { ok: false, error: 'Failed to start Google signup.' };
  }
}

export async function signupWithEmail(email: string): Promise<AuthResult> {
  log('signup_email_click', { email });
  if (runtime.isMockMode) {
    const s: Session = { id: 'mock-user', email, name: email.split('@')[0], provider: 'mock' };
    session.set(s);
    log('mock_signup_success', { provider: 'email' });
    return { ok: true, session: s };
  }
  try {
    const res = await fetch('/api/auth/magic-link?mode=signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    log('signup_email_sent', { email });
    return { ok: true, session: undefined as any };
  } catch (e: any) {
    log('signup_email_error', { message: e?.message });
    return { ok: false, error: 'Failed to request signup link.' };
  }
}

export function logout() {
  log('logout_click');
  session.set(null);
  try { fetch('/api/auth/logout', { method: 'POST' }); } catch {}
  log('logout_done');
}

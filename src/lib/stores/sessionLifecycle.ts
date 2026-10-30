/**
 * Sign-in state helpers shared by logout, the socket client and guards.
 * SSR safe: every function is a no-op on the server.
 */
import { derived } from 'svelte/store';
import store from '../../components/store';
import { disconnectSocket } from '$lib/api/socket';

/** Keys that hold credentials or account data and must go on sign out. */
const ACCOUNT_KEYS = ['sessionToken', 'sessionExpiresAt', 'configuratorEmail', 'authCode', 'isAuthCodeValid', 'tokenId', 'clientId', 'user', 'subscribers', 'leads', 'createdNewsSourceId', 'app.session'];

/** Keys that describe the visitor's device preferences, kept on sign out. */
const PREFERENCE_KEYS = new Set(['lang', 'appLanguage', 'globalLanguage', 'dashboardLanguage', 'theme', 'density', 'motion', 'fontFamily', 'autoCollapse', 'aiban.events']);
// `aiban.*` keys are namespaced per owner by the UI (tour seen, checklist hidden, onboarding progress).
const isPreference = (k: string) => PREFERENCE_KEYS.has(k) || k.startsWith('aiban.') || k.startsWith('theme');

export const isSignedIn = derived(store, ($s) => Boolean($s.isAuthCodeValid && $s.configuratorEmail && $s.authCode));

export function clearSession(): void {
	disconnectSocket();
	if (typeof window === 'undefined') return;
	// Remove everything except visitor preferences (language, theme, display).
	// The header calls this on every "Log in" click, so the language must survive.
	try {
		for (const storage of [localStorage, sessionStorage]) {
			const keys: string[] = [];
			for (let i = 0; i < storage.length; i++) {
				const k = storage.key(i);
				if (k && !isPreference(k)) keys.push(k);
			}
			keys.forEach((k) => storage.removeItem(k));
		}
	} catch {
		try {
			ACCOUNT_KEYS.forEach((k) => localStorage.removeItem(k));
		} catch {}
	}
	try {
		const names = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter(Boolean);
		for (const n of names) document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
	} catch {}
	// The in-memory store is left as is (previous behavior): callers that sign in
	// again right away (dashboard entry) write fresh credentials over it, and a
	// full sign out reloads the page.
}

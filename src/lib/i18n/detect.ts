// Which language to show a visitor.
// 1. A language the visitor picked in the language menu (saved with the "chosen" flag).
// 2. Otherwise the browser's preferred languages, in order (navigator.languages),
//    matched on the base code: "es-CR" -> "es", "pt-BR" -> "pt", "ja" -> "jp".
// 3. English.
// Detection is never saved, so a visitor who changes their browser language later
// gets the new one; only an explicit choice in the menu sticks.
import { normalizeCode } from './lazy';

export const LANG_KEY = 'lang';
/** Set to "1" only when the visitor picked a language in the menu. */
export const LANG_CHOSEN_KEY = 'lang.chosen';

// Browser codes that the app files under another code.
const ALIASES: Record<string, string> = { fa: 'pes', fil: 'tl', iw: 'he', in: 'id', jw: 'jv' };

export function toAppCode(code: string | null | undefined): string {
	const base = normalizeCode(code);
	return ALIASES[base] ?? base;
}

function readChosen(): string | null {
	try {
		if (localStorage.getItem(LANG_CHOSEN_KEY) !== '1') return null;
		return localStorage.getItem(LANG_KEY);
	} catch {
		return null;
	}
}

export function browserLanguages(): string[] {
	if (typeof navigator === 'undefined') return [];
	const list = navigator.languages?.length ? navigator.languages : [navigator.language];
	return list.filter(Boolean).map(toAppCode);
}

export function detectLanguage(available: string[]): { code: string; source: 'chosen' | 'browser' | 'default' } {
	const chosen = readChosen();
	if (chosen && available.includes(chosen)) return { code: chosen, source: 'chosen' };
	for (const code of browserLanguages()) if (available.includes(code)) return { code, source: 'browser' };
	return { code: 'en', source: 'default' };
}

/** Called when the visitor picks a language in the menu. */
export function rememberChoice(code: string): void {
	try {
		localStorage.setItem(LANG_KEY, code);
		localStorage.setItem(LANG_CHOSEN_KEY, '1');
	} catch {
		/* storage blocked: the choice lasts for this visit */
	}
}

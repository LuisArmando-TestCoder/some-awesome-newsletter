// Types for the animated dashboard showcases on public pages.
// The content lives in en.ts under `showcase` (sample data, clearly labelled as such).
import type en from '$lib/i18n/locales/en';

export type ShowcaseStrings = (typeof en)['showcase'];
export type ShowcaseUi = ShowcaseStrings['ui'];
export type Example = ShowcaseStrings['examples'][number];

export type SceneId =
	| 'home'
	| 'issue'
	| 'reports'
	| 'subscribers'
	| 'automation'
	| 'source'
	| 'voice'
	| 'signup'
	| 'blog'
	| 'import';

/** Which sidebar item is current for each scene. */
export const SCENE_NAV: Record<SceneId, keyof ShowcaseStrings['nav']> = {
	home: 'home',
	issue: 'automations',
	reports: 'reports',
	subscribers: 'subscribers',
	automation: 'automations',
	source: 'sources',
	voice: 'sources',
	signup: 'subscribers',
	blog: 'blog',
	import: 'subscribers'
};

export const fill = (s: string, vars: Record<string, string | number>) =>
	s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));

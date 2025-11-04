import { writable } from 'svelte/store';
import translations from './locales-dashboard/translations';

export const t = writable(translations.en);

export const locales = Object.keys(translations);

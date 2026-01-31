import { writable } from 'svelte/store';
import translations from './locales-subscribe/translations';

export const t = writable(translations.en);

export const locales = Object.keys(translations);

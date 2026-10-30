import { derived } from 'svelte/store';
import { t } from '$lib/i18n/translations';

export type FaqItem = { id?: string; q: string; a: string };

/**
 * Default FAQ list, read from the active locale (`faq` key in the locale files).
 * The previous hard-coded list claimed a 14-day trial, SOC 2 certification and
 * 24/7 support, none of which the product offers, so it was removed.
 */
export const faqs = derived(t, ($t) => (($t as { faq?: FaqItem[] })?.faq ?? []) as FaqItem[]);

/** Turns a question into a stable anchor id. */
export function faqSlug(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);
}

import { writable } from 'svelte/store';
import { t } from '../../lib/i18n/translations';
import { globalLanguage } from '../store';
import { get } from 'svelte/store';

export const faqs = writable(get(t).faq);

globalLanguage.subscribe(() => {
  faqs.set(get(t).faq);
});

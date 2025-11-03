import { writable, get } from 'svelte/store';
import { t } from './i18n/translations';
import { globalLanguage } from '../components/store';

export const content = writable(get(t).mainContent);

globalLanguage.subscribe(() => {
  content.set(get(t).mainContent);
});

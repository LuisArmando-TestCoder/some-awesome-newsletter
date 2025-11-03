import { writable, get } from 'svelte/store';
import { t } from '../i18n/translations';
import { globalLanguage } from '../../components/store';

export const authContent = writable(get(t).auth);

globalLanguage.subscribe(() => {
  authContent.set(get(t).auth);
});

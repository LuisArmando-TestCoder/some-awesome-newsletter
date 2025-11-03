import { writable, get } from 'svelte/store';
import translations from './i18n/translations';
import { globalLanguage } from '../components/store';
import type en from './i18n/locales/en';

type Translation = typeof en;
type LanguageKey = keyof typeof translations;

const typedTranslations = translations as Record<LanguageKey, Translation>;

const getContent = (lang: string) => {
  const translation = typedTranslations[lang as LanguageKey];
  return translation.mainContent || typedTranslations.en.mainContent;
};

export const content = writable(getContent(get(globalLanguage)));

globalLanguage.subscribe((lang) => {
  content.set(getContent(lang));
});

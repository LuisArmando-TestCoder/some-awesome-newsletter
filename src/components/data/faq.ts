import { writable } from 'svelte/store';
import translations from '../../lib/i18n/translations';
import { globalLanguage } from '../store';
import { get } from 'svelte/store';
import type en from '../../lib/i18n/locales/en';

type Translation = typeof en;
type LanguageKey = keyof typeof translations;

const typedTranslations = translations as unknown as Record<LanguageKey, Translation>;

const getFaqs = (lang: string) => {
  const translation = typedTranslations[lang as LanguageKey];
  return translation.faq || typedTranslations.en.faq;
};

export const faqs = writable(getFaqs(get(globalLanguage)));

globalLanguage.subscribe((lang) => {
  faqs.set(getFaqs(lang));
});

import { writable, type Writable, get } from 'svelte/store';
import translations from '../i18n/translations';
import { globalLanguage } from '../../components/store';
import type en from '../i18n/locales/en';

type Translation = typeof en;
type LanguageKey = keyof typeof translations;

const typedTranslations = translations as Record<LanguageKey, Translation>;

export interface HelpContent {
  title: string;
  subtitle: string;
  contact: {
    cta: string;
    successTitle: string;
    successBody: string;
    learnMore: string;
  };
  questions: {
    desiredLimitsHelp: string;
    useCaseHelp: string;
    expectedSpendHelp: string;
  };
  faqs: {
    id: string;
    q: string;
    a: string;
  }[];
  links: {
    docs: string;
    community: string;
  };
}

export interface HelpState {
  content: HelpContent;
}

const getContent = (lang: string) => {
  const translation = typedTranslations[lang as LanguageKey];
  return translation.help || typedTranslations.en.help;
};

const initial: HelpState = {
  content: getContent(get(globalLanguage))
};

const store: Writable<HelpState> = writable(initial);

globalLanguage.subscribe((lang) => {
  store.update((state) => ({
    ...state,
    content: getContent(lang)
  }));
});

export default store;

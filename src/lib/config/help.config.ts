import { writable, type Writable, get } from 'svelte/store';
import { t } from '../i18n/translations';
import { globalLanguage } from '../../components/store';
import type en from '../i18n/locales/en';

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

const initial: HelpState = {
  content: get(t).help
};

const store: Writable<HelpState> = writable(initial);

globalLanguage.subscribe(() => {
  store.update((state) => ({
    ...state,
    content: get(t).help
  }));
});

export default store;

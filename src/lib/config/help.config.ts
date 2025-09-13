import { writable, type Writable } from 'svelte/store';

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

const content: HelpContent = {
  title: "Request higher limits",
  subtitle: "Move to pay-as-you-go or increase quotas to match your growth.",
  contact: {
    cta: "Submit request",
    successTitle: "Request received",
    successBody: "Our team will reach out shortly.",
    learnMore: "/plans"
  },
  questions: {
    desiredLimitsHelp: "Tell us the limits you need (e.g., 100k API calls/day).",
    useCaseHelp: "Describe your workload and traffic pattern.",
    expectedSpendHelp: "An estimate helps us tailor pricing (optional)."
  },
  faqs: [
    {
      id: "limits-how",
      q: "How do higher limits work?",
      a: "We unlock larger quotas immediately after approval. Billing can be flat-rate or pay-as-you-go."
    },
    {
      id: "pricing-payg",
      q: "What is pay-as-you-go pricing?",
      a: "You pay only for usage beyond your included plan quotas with volume discounts at scale."
    },
    {
      id: "timeline",
      q: "How long does approval take?",
      a: "Most requests are reviewed within 1–2 business days. Urgent cases can be escalated."
    }
  ],
  links: {
    docs: "/plans",
    community: "/help"
  }
};

const initial: HelpState = {
  content
};

const store: Writable<HelpState> = writable(initial);

export default store;

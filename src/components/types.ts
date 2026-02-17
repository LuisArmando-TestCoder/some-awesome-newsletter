import type { SvelteComponent } from "svelte";

export type TextType =
  | "paragraph"
  | "sub-italic"
  | "sub-highlight-italic"
  | "highlight"
  | "title"
  | "title-highlight"
  | "title-sub-italic"
  | "title-sub-highlight-italic"
  | "subtitle"
  | "subtitle-highlight"
  | "subtitle-sub-italic"
  | "subtitle-sub-highlight-italic";

export type TextNode = {
  text: string;
  type: TextType;
};

export type Block = {
  header: boolean;
  type?: TextType;
  text?: string;
  segments?: TextNode[];
};

export type Store = { [index: string]: any };

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export type Language = {
  code: string;
  name: string;
};

export interface Card {
  id: string;
  title: string;
  description?: string;
  selected: boolean;
}

export type ComponentSteps = [(store: Store) => boolean, SvelteComponent][];

export interface Article {
  title: string;
  content: string;
  link: string;
  community: string;
  lead: string;
}

export interface NewsSource {
  type: string;
  url: string;
  linkSelector: string;
  country: string;
  community: string;
  lead: string;
  id: string;
  scheduleTime: string;
  personality: string;
  email?: EmailConfig;
  openAiApiKey?: string;
  emailMaskSender?: string; 
  appPassword?: string; 
  active?: boolean;
  isPublic?: boolean; 
  includeImages?: boolean; 
}

export interface EmailAuth {
  user: string;
  pass: string;
}

export interface EmailConfig {
  host: string;
  auth: EmailAuth;
  senderName: string;
  senderEmail: string;
  newsletterSubject: string;
  newsletterTitle: string;
}

/**
 * Enhanced Pricing Plans based on 2026 Strategy:
 * - free: Strict 100 users limit
 * - starter: $17/mo - 5 sources, 100k users
 * - growth: $35/mo - 17 sources, 250k users
 * - pro: $80/mo - 25 sources, 500k users
 * - master: $150/mo - 50 sources, unlimited users
 */
export type PricingPlanId = "free" | "starter" | "growth" | "pro" | "master" | "vipfree";
export type BillingInterval = "monthly" | "yearly";

export interface Config {
  logo?: string;
  newsSources?: NewsSource[];
  openAiApiKey?: string;
  email: EmailConfig;
  configuratorId?: string;
  emailSignature?: string;
  senderName?: string; 
  newsletterTitle?: string; 
  newsletterSubject?: string; 
  vip?: boolean;
  
  /** * Updated pricingPlan to use specific tiers
   * billingInterval handles the 35% discount logic
   */
  pricingPlan?: PricingPlanId;
  billingInterval?: BillingInterval;
  tilopaySubscriptionId?: string;
}

export interface NewsletterUser {
  email: string;
  name: string;
  bio: string;
  welcomeEmailSent?: boolean;
  language: string; // ISO 639-1 language code
  countryOfResidence?: string; // Alpha-2 country code
  newsSourcesConfigTuples: {
    newsSourceId: string;
    configId: string;
  }[];
}

export interface MailConfigPack {
  host: string;
  auth: {
    user: string;
    pass?: string;
  };
  senderName: string;
  senderEmail: string;
  newsletterSubject: string;
  transporter: any;
}

export interface SystemConfig {
  email: EmailConfig;
  openAiApiKey: string;
}

export type Populator<T extends object> = (
  propertyPath: string,
  value: any
) => T;

export type StepsKey = "News Sources" | "Users" | "Reports" | "Profile" | "Billing" | "Exports" | "Newspaper" | "Secrets/Developer";

export type SideLinkType = {
  url?: string;
  callback?: Function;
  name: string;
  key?: StepsKey;
  children?: SideLinkType[]
}

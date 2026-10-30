import type { Component } from "svelte";

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

// The legacy app store holds many loosely shaped fields that are read all over the UI.
// Typing every field is a larger refactor; until then its values stay `any` on purpose.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- see the comment above
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

/** A step view; step hosts pass `canReveal` to every step. */
export type StepComponent = Component<{ canReveal?: boolean }>;
export type StepValidator = (store: Store) => boolean;
export type ComponentSteps = ReadonlyArray<readonly [StepValidator, StepComponent]>;

export interface Article {
  title: string;
  content: string;
  link: string;
  community: string;
  lead: string;
}

/**
 * A named set of publish credentials (URL + auth + preferences).
 * Stored as an array on Config so the user can define multiple destinations
 * (e.g. "Main Blog", "Client Site A") and assign any news source to one.
 */
export interface WebhookGroup {
  id: string;             // generated with crypto.randomUUID() on client
  name: string;           // user-friendly label, e.g. "Main Blog"
  url: string;            // base site URL — backend appends /wp-json/wp/v2/posts etc.
  username?: string;      // CMS login username
  password?: string;      // CMS application password
  postStatus?: 'publish' | 'draft';
  authorName?: string;
  categoryHint?: string;
  tagsHint?: string;
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
  /** IANA time zone the scheduleTime cron is read in. Missing = UTC (older sources). */
  scheduleTimezone?: string;
  personality: string;
  email?: EmailConfig;
  openAiApiKey?: string;
  /** @deprecated Removed for security (2026-10-30). Issues go out from AIBAN's address; the frontend never sends or keeps this. */
  emailMaskSender?: string; 
  /** @deprecated Removed for security (2026-10-30). Owner email app passwords are never asked for, stored or sent. */
  appPassword?: string; 
  active?: boolean;
  isPublic?: boolean; 
  includeImages?: boolean;
  /** ID of the WebhookGroup to publish to. Falls back to webhookGroups[0] when absent. */
  webhookGroupId?: string;
  /** Paid newsletter flag, stored in the database and edited from /admin. No charging while payments are off. */
  isPaidNewsletter?: boolean;
  newsletterTitle?: string;
  /** When the owner last sent an issue by hand (set by the backend). */
  lastManualSendTimestamp?: string | number;
}

export interface EmailAuth {
  user: string;
  pass: string;
}

export interface EmailConfig {
  host: string;
  /** @deprecated Owner email login details are removed (2026-10-30). The frontend strips this before saving. */
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
  /** @deprecated Billing providers are off (2026-10-30). Plans are changed by hand by the AIBAN team. */

  /**
   * Named publish destinations. Index 0 = System Default applied to all
   * news sources that don't have an explicit webhookGroupId.
   * Persisted to Firestore as a top-level key via the standard PATCH mechanism.
   */
  webhookGroups?: WebhookGroup[];

  /** Brand and footer fields used by the email templates (WS4, WS5). */
  brandColor?: string;
  postalAddress?: string;
  showEmailSignature?: boolean;
  emailSignatureFields?: { name?: string; role?: string; company?: string; phone?: string; website?: string };
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
  transporter: unknown;
}

export interface SystemConfig {
  email: EmailConfig;
  openAiApiKey: string;
}

export type Populator<T extends object> = (
  propertyPath: string,
  value: unknown
) => T;

export type StepsKey = "News Sources" | "Users" | "Reports" | "Profile" | "Billing" | "Exports" | "Newspaper" | "Secrets/Developer";

export type SideLinkType = {
  url?: string;
  callback?: () => void;
  name: string;
  key?: StepsKey;
  children?: SideLinkType[]
}

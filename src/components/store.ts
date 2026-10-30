import { get, writable } from "svelte/store";
import type { Populator, Store } from "./types";
import type { AppSocket } from "$lib/api/socket";
import { getApiBaseUrl } from "$lib/api/config";
import { saveStatus } from "$lib/stores/saveStatus";
import { isApiError } from "$lib/api/errors";

export const latestMessage = writable<string>("");

export const topic = writable<string>("");

export const socket = writable<AppSocket | null>(null);
export const isScrollingDown = writable<boolean>(false);

const colorPalette = [
  "#e91e63",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffc107",
  "#ff5722",
];

const store = writable<Store>({
  keysToSave: [
    "configuratorEmail",
    "newsSource",
    "lead",
    "authCode",
    "isAuthCodeValid",
    "autoCollapse",
    "toggles",
    "config.brandColor",
    "config.newsSources",
    "config.newsletterSubject",
    "config.scheduleTime",
    "config.senderName",
    "config.newsletterTitle",
    "config.emailSignature",
    "config.logo",
    "config.vip",
    "config.pricingPlan",
    // 🆕 Config keys for Billing Fallback
    "config.phone",
    "config.address",
    "config.city",
    "config.state",
    "config.zip",
    "config.country",
    // "subscribers" and "leads" are no longer persisted: lists with thousands of
    // entries filled localStorage on every store write. They reload from the API.
    "subscriberName",
    "subscriberCountry",
    "user",
    "tokenId",
    "clientId",
    "globalLanguage",
    "dashboardLanguage",
    "createdNewsSourceId"
  ],
  appLanguage: "en",
  globalLanguage: "en",
  dashboardLanguage: "en",
  header: true,
  autoCollapse: true,
  toggles: {},
  colorPalette,
  stepsIndex: 0,
  hasInteracted: false,
  configuratorEmail: "",
  newsSource: "",
  lead: "",
  createdNewsSourceId: "",
  hasNewEmailCodeBeenSent: false,
  authCode: "",
  directionsThatShouldDisappear: [],
  isAuthCodeValid: false,
  
  // 🆕 Initialize User Object (prevents null errors)
  user: {
      id: "",
      email: "",
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      avatar: ""
  },

  /** Backend base URL. Kept for legacy callers; new code uses $lib/api/client. */
  apiURL: (origin?: string) => getApiBaseUrl(origin),
  
  config: {
    // 🆕 Expanded Config Defaults (matches keysToSave)
    senderName: "",
    brandColor: "#000000",
    logo: "",
    emailSignature: "",
    newsletterTitle: "",
    newsletterSubject: "",
    scheduleTime: "",
    newsSources: [],
    
    // Billing / Company Defaults
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "CR",

    vip: false,
    pricingPlan: "free",
    /** Named publish groups — empty by default; SSR-safe (no localStorage access) */
    webhookGroups: [],
  },

  subscribers: {},
  leads: {},
  isRefreshingSubscribers: false,
  subscriberEmail: "",
  subscriberName: "",
  subscriberCountry: "",
  subscriberLanguage: "",
  subscriberConfiguratorId: "",
  subscriberNewsSourceId: "",
  subscriberLead: "",
  personality:
    "The writer embodies a dynamic and intellectually stimulating personality, " +
    "marked by a blend of creativity and analytical rigor. " +
    "This voice is articulate and insightful, favoring originality over cliché, " +
    "and strives for genuine communication that resonates on an emotional level. " +
    "An adept navigator of style, the writer emphasizes the importance of varied " +
    "sentence structures and evocative language to maintain engagement and avoid monotony. " +
    "There is a distinct appreciation for depth in communication, " +
    "prioritizing authenticity and respectful interaction while steering clear of superficial " +
    "conclusions and inflated urgency. This voice is both thoughtful and precise, " +
    "aimed at fostering meaningful exchanges that acknowledge complexity and uniqueness.",
});

export const globalLanguage = writable("en");
export const emptyStoreSnapshot = JSON.parse(JSON.stringify(get(store)));

export default store;

export function saveToStore(objectValue: Record<string, unknown>) {
  store.set({
    ...get(store),
    ...objectValue,
  });
  setAllKeysToSaveInLocalStorage();
}

export function populateToStore(propertyPath: string, value: unknown) {
  store.set({
    ...createObjectPopulator(get(store))(propertyPath, value),
  });
}

export function getFromStore(propertyPath: string) {
  return createObjectGetter(get(store))(propertyPath);
}

/**
 * Merge `config` into the store and save it to the backend.
 * Calls made within AUTOSAVE_DELAY_MS are coalesced into one save; every caller
 * gets the same result (the saved config, or null on failure). Progress is
 * published on `saveStatus` ($lib/stores/saveStatus) for a visible indicator.
 * Pass `false` as the second argument to update the store only.
 */
export const AUTOSAVE_DELAY_MS = 600;
let pendingPatch: Record<string, unknown> = {};
let pendingTimer: ReturnType<typeof setTimeout> | null = null;
let pendingWaiters: Array<(v: Record<string, unknown> | null) => void> = [];

export async function saveToConfig(config: Record<string, unknown>, shouldUpdateConfiguration: boolean = true): Promise<Record<string, unknown> | null> {
  if (!get(store).isAuthCodeValid) return null;

  saveToStore({
    config: {
      ...get(store).config,
      ...config,
    },
  });

  if (!shouldUpdateConfiguration) return null;

  pendingPatch = { ...pendingPatch, ...config };
  saveStatus.markDirty();
  if (pendingTimer) clearTimeout(pendingTimer);
  return new Promise<Record<string, unknown> | null>((resolve) => {
    pendingWaiters.push(resolve);
    pendingTimer = setTimeout(flushConfigSave, AUTOSAVE_DELAY_MS);
  });
}

/** Save pending config changes now (for example before navigating away). */
export async function flushConfigSave(): Promise<Record<string, unknown> | null> {
  if (pendingTimer) clearTimeout(pendingTimer);
  pendingTimer = null;
  const waiters = pendingWaiters;
  pendingWaiters = [];
  // Send the full current config (as before) so fields edited elsewhere are not lost.
  const body = { ...get(store).config, ...pendingPatch };
  pendingPatch = {};
  if (waiters.length === 0 && Object.keys(body).length === 0) return null;
  saveStatus.markSaving();
  let result: Record<string, unknown> | null = null;
  try {
    const { updateConfigurationOrThrow } = await import("./systems/requests/updateConfiguration");
    result = await updateConfigurationOrThrow(body);
    saveStatus.markSaved();
  } catch (e) {
    saveStatus.markError((isApiError(e) && e.userMessage) || "We could not save your changes. Check your connection and try again.", () => saveToConfig({}, true));
    result = null;
  }
  waiters.forEach((w) => w(result));
  return result;
}

type Bag = Record<string, unknown>;

function createObjectPopulator<T extends object>(obj: T): Populator<T> {
  return function (propertyPath: string, value: unknown): T {
    const keys = propertyPath.split(".");

    const updateNested = (current: Bag, keys: string[]): Bag => {
      const [first, ...rest] = keys;

      if (rest.length === 0) {
        return {
          ...current,
          [first]: value,
        };
      }
      return {
        ...current,
        [first]: updateNested(
          current && current[first] ? (current[first] as Bag) : {},
          rest
        ),
      };
    };

    return updateNested(obj as Bag, keys) as T;
  };
}

function createObjectGetter<T extends object>(
  obj: T
): (propertyPath: string) => unknown {
  return function (propertyPath: string): unknown {
    const keys = propertyPath.split(".");

    const getNested = (current: unknown, keys: string[]): unknown => {
      const [first, ...rest] = keys;

      if (current == null || typeof current !== "object" || !(first in current)) {
        return undefined;
      }

      const next = (current as Bag)[first];
      if (rest.length === 0) {
        return next;
      }

      return getNested(next, rest);
    };

    return getNested(obj, keys);
  };
}

export function setStorageFromKeysToSave() {
  for (const key of get(store).keysToSave) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "");

      if (!value) continue;

      populateToStore(key, value);
    } catch {
      continue;
    }
  }
}

export function getCookie(name: string) {
  try {
    if (typeof document === "undefined") return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
  } catch {
    return null;
  }
}

/** Cookies written by older versions (auth values readable by any script, sent on every request). */
const LEGACY_COOKIE_KEYS = ["authCode", "tokenId", "clientId", "configuratorEmail", "isAuthCodeValid", "user", "subscribers", "leads"];
let legacyCookiesCleared = false;
function expireLegacyCookies() {
  if (legacyCookiesCleared || typeof document === "undefined") return;
  legacyCookiesCleared = true;
  try {
    localStorage.removeItem("subscribers");
    localStorage.removeItem("leads");
  } catch {
    // Storage blocked: nothing to clear.
  }
  try {
    const existing = document.cookie.split(";").map((c) => c.split("=")[0].trim());
    for (const key of new Set([...LEGACY_COOKIE_KEYS, ...get(store).keysToSave])) {
      if (existing.includes(key)) document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  } catch {
    // Cookies blocked: nothing to clear.
  }
}

function setAllKeysToSaveInLocalStorage() {
  const isLocalStorageAvailable = typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  if (!isLocalStorageAvailable) return;
  // Synchronous on purpose: request helpers read credentials from localStorage
  // right after saveToStore() (for example the dashboard sign in).
  expireLegacyCookies();
  for (const key of get(store).keysToSave) {
    const value = getFromStore(key);
    try {
      // Falsy values keep the stored value (historical behavior: the store starts
      // with empty defaults before hydration). Sign out clears storage explicitly.
      localStorage.setItem(key, JSON.stringify(value || JSON.parse(localStorage.getItem(key) || "")));
    } catch {
      // Storage full or blocked: keep the in-memory value.
    }
  }
}

export function saveAllKeysToSaveInLocalStorage() {
  store.subscribe(() => {
    setAllKeysToSaveInLocalStorage();
  });
}

export const stepsMapping = Object.freeze({
  "Profile": 9,
  "News Sources": 10,
  "Users": 11,
  "Billing": 12,
  "Reports": 13,
  "Exports": 14,
  "Newspaper": 15,
  "Secrets/Developer": 16
});

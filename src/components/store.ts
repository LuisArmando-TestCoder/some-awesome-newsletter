import { get, writable } from "svelte/store";
import type { Config, Populator, Store } from "./types";
import type { Socket } from "socket.io-client";
import updateConfiguration from "./systems/requests/updateConfiguration";

export const latestMessage = writable<string>("");

export const socket = writable<Socket | null>(null);
export const isScrollingDown = writable<boolean>(false); // Add state for scroll direction

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
    "config.emailMaskSender", // New
    "config.vip",
    "config.pricingPlan",
    "subscribers", // Added
    "leads", // Added
    "subscriberName", // Added for subscription flow
    "subscriberCountry", // Added for subscription flow
    "user",
    "tokenId",
    "clientId",
    "globalLanguage",
    "dashboardLanguage"
  ],
  appLanguage: "en", // Added for global language setting
  globalLanguage: "en",
  dashboardLanguage: "en",
  header: true,
  autoCollapse: true,
  toggles: {},
  colorPalette,
  stepsIndex: 0,
  hasInteracted: false, // don't save
  configuratorEmail: "",
  newsSource: "",
  lead: "",
  hasNewEmailCodeBeenSent: false,
  authCode: "",
  directionsThatShouldDisappear: [],
  isAuthCodeValid: false,
  apiURL: (origin?: string) => typeof window !== 'undefined' ? (
    window.location.origin.startsWith('http://localhost') ? "http://localhost:8000" : "https://ai-newsletter-translated.onrender.com"
  ) : (
    origin?.startsWith('http://localhost') ? "http://localhost:8000" : "https://ai-newsletter-translated.onrender.com"
  ),
  config: {
    emailMaskSender: "", // New
    appPassword: "", // New
    vip: false,
    pricingPlan: "free",
  },
  subscribers: {}, // Added initial empty object for subscribers
  leads: {}, // Added initial empty object for leads
  isRefreshingSubscribers: false, // Flag for background refresh
  subscriberEmail: "",
  subscriberName: "", // Added for subscription flow
  subscriberCountry: "", // Added for subscription flow
  subscriberLanguage: "", // Specific to subscriber context
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

export function saveToStore(objectValue: { [index: string]: any }) {
  // console.log("objectValue", objectValue)
  // setAllKeysToSaveInLocalStorage();
  store.set({
    ...get(store),
    ...objectValue,
  });
  setAllKeysToSaveInLocalStorage();
}

export function populateToStore(propertyPath: string, value: any) {
  store.set({
    ...createObjectPopulator(get(store))(propertyPath, value),
  });
}

export function getFromStore(propertyPath: string) {
  return createObjectGetter(get(store))(propertyPath);
}

export async function saveToConfig(config: { [index: string]: any }, shouldUpdateConfiguration: boolean = true): Promise<Config | null> {
  if (get(store).isAuthCodeValid) {
    saveToStore({
      config: {
        ...get(store).config,
        ...config,
      },
    });

    if (shouldUpdateConfiguration) {
      return await updateConfiguration(get(store).config);
    }
  }

  return null;
}

function createObjectPopulator<T extends object>(obj: T): Populator<T> {
  return function (propertyPath: string, value: any): T {
    const keys = propertyPath.split(".");

    // Recursive helper that builds a new nested object for the given chain.
    const updateNested = (current: any, keys: string[]): any => {
      // Take the first key from the chain
      const [first, ...rest] = keys;

      // If there are no more keys, assign the value to this key.
      if (rest.length === 0) {
        return {
          ...current,
          [first]: value,
        };
      }
      // Otherwise, recursively update the nested object.
      return {
        ...current,
        [first]: updateNested(
          current && current[first] ? current[first] : {},
          rest
        ),
      };
    };

    // Return a new object with the updated chain.
    return updateNested(obj, keys);
  };
}

function createObjectGetter<T extends object>(
  obj: T
): (propertyPath: string) => any {
  return function (propertyPath: string): any {
    // Split the property path into individual keys.
    const keys = propertyPath.split(".");

    // Recursive helper function to traverse the object.
    const getNested = (current: any, keys: string[]): any => {
      const [first, ...rest] = keys;

      // If the current object is nullish or the key doesn't exist, return undefined.
      if (current == null || !(first in current)) {
        return undefined;
      }

      // If no further keys remain, return the value at the key.
      if (rest.length === 0) {
        return current[first];
      }

      // Otherwise, recursively traverse deeper.
      return getNested(current[first], rest);
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

function setCookie(name: string, value: string, days = 365) {
  try {
    if (typeof document === "undefined") return;
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(
      JSON.stringify(value)
    ) + expires + "; path=/";
  } catch {}
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

function setAllKeysToSaveInLocalStorage() {
  const isLocalStorageAvailable = typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  for (const key of get(store).keysToSave) {
    const value = getFromStore(key);
    // Save to cookies always
    setCookie(key, value);
    // Save to localStorage if available
    if (isLocalStorageAvailable) {
      try {
        // console.log("Here", key, value)
        localStorage.setItem(key, JSON.stringify(value || JSON.parse(localStorage.getItem(key) || "")));
      } catch {}
    }
  }
}

export function saveAllKeysToSaveInLocalStorage() {
  store.subscribe((currentStore: Store) => {
    setAllKeysToSaveInLocalStorage();
  });
}

export const stepsMapping = Object.freeze({
  "News Sources": 6,
  "Users": 7,
  "Reports": 9,
  "Profile": 5,
  "Billing": 8,
  "Exports": 10,
  // "Newspaper": 11,
  "Secrets/Developer": 12
});

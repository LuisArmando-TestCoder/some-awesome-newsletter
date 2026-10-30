import { get } from "svelte/store";
import store, { globalLanguage, saveToStore } from "../../store";
import { addNewsletterUser } from "./addNewsletterUserEndpoint";
import subscribeNewsletterUser from "./subscribeNewsletterUser";
import { request, seg } from "$lib/api/client";
import { LLM_TIMEOUT_MS } from "$lib/api/config";
import { newsSourceEnvelope } from "$lib/api/schemas";
import { asNewsSource, refreshSubscribersSafely, replaceNewsSourceInStore } from "./_internal";

/** Kept for existing importers. Prefer DEFAULT_SCHEDULE. */
export function getRandomScheduleTime() {
  const randomHour = Math.floor(Math.random() * 24);
  const randomDayOfWeek = Math.floor(Math.random() * 7);
  return `0 ${randomHour} * * ${randomDayOfWeek}`;
}

/** Default schedule when the caller sends none: Mondays at 9:00 UTC (STRATEGY section 3). */
export const DEFAULT_SCHEDULE = "0 9 * * 1";

/**
 * Create a news source for the signed-in owner. The backend fills missing
 * selectors with the LLM, so this can take up to two minutes.
 * Throws an Error whose `message` is safe to show. Returns the new source.
 */
export default async function createNewsSource(newsSource: {
  type?: string;
  url: string;
  country?: string;
  community?: string;
  lead?: string;
  scheduleTime?: string;
  /** IANA zone the cron is read in (missing = UTC). */
  scheduleTimezone?: string;
  personality?: string;
  linkSelector?: string;
  active?: boolean;
  includeImages?: boolean;
}) {
  const configId = get(store).configuratorEmail;

  const body = {
    type: "website",
    personality: get(store).personality,
    community: "World Wide Expats",
    // The backend requires `country` (addNewsSourceEndpoint requiredFields). "US" stays the default until WS7 makes it optional.
    country: "US",
    scheduleTime: newsSource.scheduleTime || DEFAULT_SCHEDULE,
    // Keep explicit booleans (for example active: false); drop empty strings and undefined.
    ...Object.fromEntries(Object.entries(newsSource).filter(([, value]) => value !== undefined && value !== null && value !== "")),
  };

  const json = await request(`/news-source/${seg(configId)}`, {
    method: "POST",
    body,
    timeoutMs: LLM_TIMEOUT_MS,
    schema: newsSourceEnvelope,
    errorMessage: "We could not add this source. Check the address and try again.",
  });
  const created = asNewsSource(json.newsSource);

  await replaceNewsSourceInStore(created);

  // The owner receives their own newsletter: make sure they exist as a subscriber.
  const configuratorEmail = get(store).configuratorEmail;
  if (configuratorEmail && created?.id) {
    try {
      await addNewsletterUser(
        {
          email: configuratorEmail,
          name: configuratorEmail,
          bio: "Newsletter Configurator",
          language: get(globalLanguage) || "en",
          countryOfResidence: "US",
          newsSourcesConfigTuples: [],
        },
        configuratorEmail,
        created.id
      );
      await subscribeNewsletterUser(configuratorEmail, created.id, configuratorEmail);
    } catch (error) {
      console.error("[createNewsSource] Could not subscribe the owner to the new source", error);
    }
  }

  await refreshSubscribersSafely();

  // Disable back navigation to prevent duplicate creation attempts (hitting plan limits)
  saveToStore({ directionsThatShouldDisappear: [-1] });

  // Refresh the saved config so the store has the server's version.
  try {
    const fresh = await request<Record<string, unknown>>("/config", { dedupe: false });
    if (fresh) saveToStore({ config: { ...get(store).config, ...fresh } });
  } catch {
    /* the local copy is already updated */
  }

  return created;
}

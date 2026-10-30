import { get } from "svelte/store";
import store, { saveToStore } from "../../store";
import createInitialConfiguratorConfig from "./createInitialConfiguratorConfig";
import createNewsSource from "./createNewsSource";
import getAuthHeaders from "./getAuthHeaders";
import { request } from "$lib/api/client";
import { refreshSubscribersSafely } from "./_internal";

/**
 * Raw GET /config for the given auth headers. Returns the Response so the
 * callers can read `.ok` and `.json()`. Also used on the server (oauth route),
 * where `origin` selects the local or production backend.
 */
export async function getConfigFetchResponse(authHeaders: Record<string, string>, origin?: string) {
  return request<Response>("/config", {
    auth: { headers: authHeaders || getAuthHeaders() },
    responseType: "response",
    origin,
    dedupe: false,
  });
}

async function fetchConfigJson(): Promise<Record<string, unknown> | null> {
  try {
    return await request<Record<string, unknown>>("/config", { auth: "user", retries: 2 });
  } catch {
    return null;
  }
}

/**
 * Load the owner's session after sign in: config (created when missing), the
 * first news source when onboarding collected one, then subscribers.
 * Returns true when the config loaded.
 */
export default async () => {
  let json = await fetchConfigJson();

  if (!json) {
    await createInitialConfiguratorConfig(getAuthHeaders());
    json = await fetchConfigJson();
  }
  if (!json) return false;

  saveToStore({ config: json });

  const savedSources = Array.isArray(json.newsSources) ? json.newsSources : [];
  if (get(store).newsSource && savedSources.length === 0) {
    try {
      await createNewsSource({
        type: "website",
        url: get(store).newsSource,
        country: "US",
        community: "Expats from US",
        lead: get(store).lead,
        scheduleTime: `0 ${Math.floor(Math.random() * 24)} * * ${Math.floor(Math.random() * 7)}`,
        personality: "Warm and professional journalist voice.",
      });
      const updated = await fetchConfigJson();
      if (updated) saveToStore({ config: updated, ...updated });
    } catch (e) {
      console.error("[getConfiguratorSession] Could not create the first news source", e);
    }
  }

  saveToStore({ isRefreshingSubscribers: true });
  try {
    await refreshSubscribersSafely();
  } finally {
    saveToStore({ isRefreshingSubscribers: false });
  }

  return true;
};

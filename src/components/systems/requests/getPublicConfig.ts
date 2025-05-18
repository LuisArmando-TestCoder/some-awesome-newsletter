import { get } from "svelte/store";
import store from "../../store.ts"; 
import type { Config, Store as AppStoreType } from "../../types.ts"; // Added .ts and AppStoreType

/**
 * Fetches the public configuration for a given configurator ID.
 * This configuration may include details like newsletter title, sender name, and logo.
 *
 * @param configuratorId The ID of the configuration (usually the configurator's email).
 * @returns A Promise that resolves to the public Config object, or null if an error occurs or data is not found.
 */
export default async function getPublicConfig(
  configuratorId: string
): Promise<Config | null> {
  if (!configuratorId) {
    console.error("[getPublicConfig] Error: configuratorId parameter is required.");
    return null;
  }

  // Retrieve the base API URL from the global Svelte store
  const appStore = get(store) as AppStoreType; // Explicitly type the store content
  const apiURLFunction = appStore.apiURL;

  if (!apiURLFunction || typeof apiURLFunction !== 'function') {
    console.error("[getPublicConfig] Error: apiURL function not available in store or not a function.");
    return null;
  }

  const url = `${apiURLFunction()}/config?documentId=${encodeURIComponent(configuratorId)}`;

  console.log(`[getPublicConfig] Fetching public config for ID: ${configuratorId} from URL: ${url}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      let errorMsg = `Failed to fetch public config: ${response.status} ${response.statusText}`;
      try {
        const errorBody = await response.json();
        errorMsg = `Failed to fetch public config: ${errorBody.error || response.statusText}`;
      } catch (_) {
        // Ignore if the error response isn't JSON
      }
      console.error(`[getPublicConfig] ${errorMsg}`);
      return null; // Return null on error
    }

    const data = await response.json();
    console.log(`[getPublicConfig] Successfully fetched public config for ID: ${configuratorId}.`);
    return data as Config; // Type assertion
  } catch (error: any) {
    console.error(
      `[getPublicConfig] Exception occurred while fetching public config for ID ${configuratorId}:`,
      error
    );
    return null; // Return null on exception
  }
}

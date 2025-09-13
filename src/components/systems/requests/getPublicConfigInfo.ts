import { get } from "svelte/store";
import store from "../../store"; // Adjust path if needed

/**
 * Fetches public configuration info (like newsletter title) for a specific
 * configurator and news source. Calls the backend endpoint GET /public-config-info.
 * This endpoint does NOT require authentication headers.
 *
 * @param configuratorId The ID of the configuration.
 * @param newsSourceId The ID of the news source.
 * @returns A Promise that resolves to an object containing public info (e.g., { newsletterTitle: string, senderName: string }),
 *          or null if an error occurs or data is not found.
 */
export default async function getPublicConfigInfo(
  configuratorId: string,
  newsSourceId: string
): Promise<{ newsletterTitle: string; senderName: string } | null> {
  const { apiURL } = get(store);

  if (!configuratorId || !newsSourceId) {
    console.error("[getPublicConfigInfo] Error: configuratorId and newsSourceId parameters are required.");
    return null;
  }

  // Construct the full API URL with query parameters
  const url = `${apiURL()}/public-config-info?configuratorId=${encodeURIComponent(configuratorId)}&newsSourceId=${encodeURIComponent(newsSourceId)}`;

  console.log(`[getPublicConfigInfo] Fetching public info from ${url}`);

  try {
    const response = await fetch(url, { // No auth headers needed
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      let errorMsg = `Failed to fetch public config info: ${response.status} ${response.statusText}`;
      try {
        const errorBody = await response.json();
        errorMsg = `Failed to fetch public config info: ${errorBody.error || response.statusText}`;
      } catch (_) { /* Ignore if error response isn't JSON */ }
      console.error(`[getPublicConfigInfo] ${errorMsg}`);
      return null; // Return null on error
    }

    const data = await response.json();
    console.log(`[getPublicConfigInfo] Successfully fetched public info.`);
    return data as { newsletterTitle: string; senderName: string };

  } catch (error) {
    console.error(`[getPublicConfigInfo] Exception occurred while fetching public info:`, error);
    return null; // Return null on exception
  }
}

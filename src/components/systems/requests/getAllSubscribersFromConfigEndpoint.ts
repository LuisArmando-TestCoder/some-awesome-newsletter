// src/components/systems/requests/getAllSubscribersFromConfigEndpoint.ts

import { get } from "svelte/store";
import store from "../../store"; // Adjust path if needed
import type { NewsletterUser } from "../../types"; // Adjust path if needed
import getAuthHeaders from "./getAuthHeaders";

/**
 * Fetches all subscribers associated with a specific configuration ID,
 * grouped by the news source ID they are subscribed to within that configuration.
 *
 * Calls the backend endpoint GET /config-subscribers/:configId
 *
 * @param configId The ID of the configuration (usually the configurator's email) for which to fetch subscribers.
 * @returns A Promise that resolves to an object where keys are newsSourceIds
 *          and values are arrays of NewsletterUser objects, or an empty object if an error occurs or no data is found.
 */
export default async function getAllSubscribersFromConfigEndpoint(): Promise<Record<string, NewsletterUser[]>> {
  // Retrieve necessary values from the global store
  const { apiURL } = get(store);
  const configId = getAuthHeaders()["x-auth-email"];

  // Construct the full API URL
  const url = `${apiURL()}/config-subscribers/${encodeURIComponent(configId)}`;

  // Prepare authentication headers using the *logged-in user's* credentials
  const authHeaders = getAuthHeaders();

  console.log(
    `[getAllSubscribers] Fetching subscribers for configId: ${configId} from ${url}`
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: authHeaders,
    });

    // Check if the request was successful
    if (!response.ok) {
      let errorMsg = `Failed to fetch subscribers: ${response.status} ${response.statusText}`;
      try {
        // Attempt to parse a more specific error message from the backend
        const errorBody = await response.json();
        errorMsg = `Failed to fetch subscribers: ${
          errorBody.error || response.statusText
        }`;
      } catch (_) {
        // Ignore if the error response is not JSON
      }
      console.error(`[getAllSubscribers] ${errorMsg}`);
      throw new Error(errorMsg); // Throw error to be caught below
    }

    // Parse the JSON response
    const data = await response.json();

    // Type assertion: Assume the backend returns the correct structure.
    // Add runtime validation here if needed for extra safety.
    console.log(
      `[getAllSubscribers] Successfully fetched subscribers for configId: ${configId}`
    );
    return data as Record<string, NewsletterUser[]>;
  } catch (error) {
    console.error(
      `[getAllSubscribers] Exception occurred while fetching subscribers for configId ${configId}:`,
      error
    );
    // Return an empty object in case of any error to prevent crashing the UI component
    return {};
  }
}

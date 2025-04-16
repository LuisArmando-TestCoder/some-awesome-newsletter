// src/components/systems/requests/getAllSubscribersFromConfigEndpoint.ts

import { get } from "svelte/store";
import store from "../../store.ts"; // Adjust path if needed
import type { NewsletterUser } from "../../types.ts"; // Adjust path if needed

/**
 * Fetches all subscribers associated with a specific configuration ID,
 * grouped by the news source ID they are subscribed to within that configuration.
 *
 * Calls the backend endpoint GET /config-subscribers/:configId
 * Requires authentication via x-auth-email and x-auth-code headers.
 *
 * @param configId The ID of the configuration (usually the configurator's email) for which to fetch subscribers.
 * @returns A Promise that resolves to an object where keys are newsSourceIds
 *          and values are arrays of NewsletterUser objects, or an empty object if an error occurs or no data is found.
 */
export default async function getAllSubscribersFromConfigEndpoint(
  configId: string
): Promise<Record<string, NewsletterUser[]>> {
  // Retrieve necessary values from the global store
  const { apiURL, configuratorEmail, authCode } = get(store);

  // Ensure we have the necessary configId to make the request
  if (!configId) {
    console.error("[getAllSubscribers] Error: configId parameter is required.");
    return {}; // Return empty object if configId is missing
  }

  // Ensure we have authentication credentials from the store
  if (!configuratorEmail || !authCode) {
    console.error(
      "[getAllSubscribers] Error: Missing authentication credentials (email or code) in store."
    );
    // Depending on your app flow, you might want to redirect to login or handle differently
    return {}; // Return empty object if not authenticated
  }

  // Construct the full API URL
  const url = `${apiURL()}/config-subscribers/${encodeURIComponent(configId)}`;

  // Prepare authentication headers using the *logged-in user's* credentials
  const authHeaders = {
    "x-auth-email": configuratorEmail,
    "x-auth-code": authCode,
    // Although GET requests don't typically need Content-Type for the body,
    // it's sometimes good practice or required by specific middleware/frameworks.
    // Accept is more relevant for GET.
    Accept: "application/json",
  };

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

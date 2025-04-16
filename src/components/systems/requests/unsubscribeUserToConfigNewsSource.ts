// src/components/systems/requests/unsubscribeUserToConfigNewsSource.ts

import { get } from "svelte/store";
import store from "../../store.ts"; // Adjust path if needed

/**
 * Unsubscribes a user from a specific news source within a specific configuration
 * by calling the backend endpoint.
 *
 * Calls the backend endpoint GET /unsubscribe/:email?configId=...&newsSourceId=...
 * This endpoint typically doesn't require authentication headers as it's often
 * triggered via links in emails.
 *
 * @param email - The email of the user to unsubscribe.
 * @param configId - The ID of the configuration document.
 * @param newsSourceId - The ID of the specific news source to unsubscribe from.
 * @returns A Promise that resolves to `true` if the backend confirms the unsubscription (status 2xx),
 *          and `false` otherwise (e.g., network error, 4xx/5xx response).
 */
export default async function unsubscribeUserToConfigNewsSource(
  email: string,
  configId: string,
  newsSourceId: string
): Promise<boolean> {
  // Retrieve the base API URL from the store
  const { apiURL } = get(store);

  // Validate required inputs
  if (!email || !configId || !newsSourceId) {
    console.error(
      "[unsubscribeUser] Error: email, configId, and newsSourceId parameters are required."
    );
    return false; // Indicate failure due to missing parameters
  }

  // Construct the query parameters
  const queryParams = new URLSearchParams({
    configId: configId,
    newsSourceId: newsSourceId,
  });

  // Construct the full API URL including the email in the path and query parameters
  const url = `${apiURL()}/unsubscribe/${encodeURIComponent(
    email
  )}?${queryParams.toString()}`;

  console.log(
    `[unsubscribeUser] Sending unsubscribe request for ${email} from news source ${newsSourceId} in config ${configId} to URL: ${url}`
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // No authentication headers are typically needed for a public unsubscribe link endpoint
        Accept: "text/html, application/json", // Accept HTML (confirmation) or JSON (errors)
      },
    });

    // Check if the request was successful (status code 2xx)
    if (!response.ok) {
      let errorMsg = `Failed to unsubscribe user: ${response.status} ${response.statusText}`;
      try {
        // Attempt to get a more specific error message from the backend if it sent JSON
        const errorBody = await response.json();
        errorMsg = `Failed to unsubscribe user: ${
          errorBody.error || response.statusText
        }`;
      } catch (_) {
        // Ignore if the error response wasn't JSON (might be an HTML error page)
      }
      console.error(`[unsubscribeUser] ${errorMsg}`);
      return false; // Indicate failure
    }

    // If response.ok is true, the backend handled the unsubscription successfully.
    // The backend might return an HTML confirmation page or a simple 200 OK.
    // We don't strictly need to read the body here unless we want to display it.
    console.log(
      `[unsubscribeUser] Successfully unsubscribed ${email} from news source ${newsSourceId} in config ${configId}. Backend responded with status ${response.status}.`
    );
    return true; // Indicate success
  } catch (error) {
    console.error(
      `[unsubscribeUser] Network or other exception occurred while trying to unsubscribe ${email}:`,
      error
    );
    return false; // Indicate failure due to exception
  }
}

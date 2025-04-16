import { get } from "svelte/store";
import store from "../../store.js"; // Add .js extension
import type { Store } from "../../types.js"; // Import Store type from types.ts

export default async function triggerNewsSourceSend(newsSourceId: string): Promise<boolean> {
  // Cast the store value to the imported type
  const storeValue = get(store) as Store; // Use the imported Store type
  const configId = storeValue.configuratorEmail;
  const apiURL = storeValue.apiURL();
  const authCode = storeValue.authCode;

  if (!newsSourceId) {
    console.error("Error: newsSourceId is required to trigger send.");
    // Optionally, notify the user via a toast or alert
    return false;
  }

  if (!configId || !authCode) {
    console.error("Error: Missing configuration ID or authentication code.");
    // Optionally, notify the user
    return false;
  }

  const url = `${apiURL}/news-source/${configId}/${newsSourceId}/trigger`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // No Content-Type needed for POST without body, but doesn't hurt
        "Content-Type": "application/json",
        "x-auth-email": configId,
        "x-auth-code": authCode,
      },
      // No body is needed for this trigger endpoint
    });

    if (!response.ok) {
      // Log detailed error if possible
      const errorBody = await response.text();
      console.error(
        `Error triggering news source send (${response.status}): ${errorBody}`
      );
      // Optionally, show a user-friendly error message
      return false;
    }

    // Backend returns 202 Accepted on success
    console.log(
      `Successfully initiated send for news source ${newsSourceId}. Status: ${response.status}`
    );
    // Optionally, show a success message to the user
    return true; // Indicate success
  } catch (error) {
    console.error("Network or other error triggering news source send:", error);
    // Optionally, show a user-friendly error message
    return false;
  }
}

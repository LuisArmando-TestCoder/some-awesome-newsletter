import { get } from "svelte/store";
import store from "../../store";
import type { NewsletterUser } from "../../types";
import getConfiguratorSession from "./getConfiguratorSession";

export interface AddNewsletterUserResponse {
  message: string;
}

/**
 * Adds a newsletter user by calling the backend endpoint.
 * @param user - The newsletter user object to add.
 * @param configId - (Optional) The configuration ID.
 * @returns A promise that resolves with the response from the server.
 */
export async function addNewsletterUser(
  user: NewsletterUser,
  configId: string,
  newsSourceId: string
): Promise<AddNewsletterUserResponse> {
  // Build the endpoint URL based on the presence of configId
  const url = `${get(store).apiURL()}/users/${configId}/${newsSourceId}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      // Attempt to parse a JSON error message or fall back to status text
      const errorResponse = await response.json().catch(() => ({}));
      const errorMessage = errorResponse.message || response.statusText;
      throw new Error(`Error adding newsletter user: ${errorMessage}`);
    }

    await getConfiguratorSession(); // Refresh the configurator session after adding a user

    return await response.json();
  } catch (error) {
    console.error("Failed to add newsletter user:", error);
    throw error;
  }
}

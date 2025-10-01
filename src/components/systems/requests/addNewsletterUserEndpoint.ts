import { get } from "svelte/store";
import store from "../../store";
import type { NewsletterUser } from "../../types";
import getAuthHeaders from "./getAuthHeaders";

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
  newsSourceId: string,
  apiKey?: string
): Promise<AddNewsletterUserResponse> {
  const url = `${get(store).apiURL()}/users/${configId}/${newsSourceId}`;
  const authHeaders = await getAuthHeaders();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  } else {
    Object.assign(headers, authHeaders);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      // Attempt to parse a JSON error message or fall back to status text
      const errorResponse = await response.json().catch(() => ({}));
      const errorMessage = errorResponse.message || response.statusText;
      throw new Error(`Error adding newsletter user: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to add newsletter user:", error);
    throw error;
  }
}

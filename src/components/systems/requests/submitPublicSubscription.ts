import { get } from "svelte/store";
import store from "../../store";
import type { NewsletterUser } from "../../../types"; // Assuming types are defined here

// Define the expected payload structure for clarity
interface PublicSubscriptionPayload {
  configuratorId: string;
  newsSourceId: string;
  email: string;
  name: string;
  language?: string; // Optional based on API endpoint inspection
  countryOfResidence?: string; // Optional based on API endpoint inspection
  // bio?: string; // Add if needed based on API
}

/**
 * Submits subscriber data to the public-facing subscription endpoint.
 * Handles creating/updating the user and subscribing them to the specified newsletter.
 * Does NOT send authentication headers.
 *
 * @param payload - An object containing subscriber details.
 * @returns boolean - True if the API call was successful (status 2xx), false otherwise.
 */
export default async function submitPublicSubscription(
  payload: PublicSubscriptionPayload
): Promise<boolean> {
  // Basic validation on frontend before sending
  if (!payload.configuratorId || !payload.newsSourceId || !payload.email || !payload.name) {
    console.error("[submitPublicSubscription] Missing required fields:", payload);
    return false;
  }

  try {
    const response = await fetch(`${get(store).apiURL()}/public-subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // NO Authentication headers for public endpoint
      },
      body: JSON.stringify({
        configuratorId: payload.configuratorId,
        newsSourceId: payload.newsSourceId,
        email: payload.email.trim(), // Trim email before sending
        name: payload.name.trim(), // Trim name before sending
        language: payload.language, // Send if provided
        countryOfResidence: payload.countryOfResidence, // Send if provided
        // bio: payload.bio // Send if provided
      }),
    });

    if (!response.ok) {
      // Log error details if available from the response body
      try {
        const errorData = await response.json();
        console.error(
          `[submitPublicSubscription] API Error ${response.status}:`,
          errorData
        );
      } catch (e) {
        console.error(
          `[submitPublicSubscription] API Error ${response.status}: ${response.statusText}`
        );
      }
      return false; // Indicate failure
    }

    // Optional: Log success or return response data if needed
    // const successData = await response.json();
    // console.log("[submitPublicSubscription] Success:", successData);
    return true; // Indicate success

  } catch (error) {
    console.error("[submitPublicSubscription] Network or fetch error:", error);
    return false; // Indicate failure due to network/fetch issues
  }
}

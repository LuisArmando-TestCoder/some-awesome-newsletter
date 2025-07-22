import { get } from "svelte/store";
import store, { saveToConfig, saveToStore } from "../../store.ts";
import {
  foregroundColor,
  complementaryColor,
} from "../../ThemeChanger/theme-store.ts"; // Corrected casing
import { getComplementaryColor } from "../inputs/ColorPicker/getColorSuggestions.ts";
import createInitialConfiguratorConfig from "./createInitialConfiguratorConfig.ts";
import createNewsSource from "./createNewsSource.ts";
// Removed unused imports: addNewsletterUser, subscribeNewsletterUser
import { loadInitialData, refreshSubscribers } from "../steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserDataService.ts"; // Import refresh function

async function getConfigFetchResponse(authHeaders: {
  [index: string]: string;
}) {
  console.log(get(store).apiURL(), get(store).configuratorEmail);
  let response = await fetch(
    `${get(store).apiURL()}/private-config?documentId=${
      get(store).configuratorEmail
    }`,
    {
      method: "GET",
      headers: authHeaders,
    }
  );

  return response;
}

export default async () => {
  const authHeaders = {
    "x-auth-email": get(store).configuratorEmail,
    "x-auth-code": get(store).authCode,
    "Content-Type": "application/json",
  };

  let response = await getConfigFetchResponse(authHeaders);

  if (!response.ok) {
    await createInitialConfiguratorConfig(authHeaders);
    response = await getConfigFetchResponse(authHeaders);
  }

  const json = await response.json();

  saveToStore({
    config: json,
  });

  if (!json.newsSources || json.newsSources.length === 0) {
    const newsSource = await createNewsSource({
      type: "website",
      url: get(store).newsSource,
      country: "US", // Consider if these should be configurable defaults
      community: "Expats from US", // Consider if these should be configurable defaults
      lead: get(store).lead,
      // Generate random schedule: random hour (0-23), random day of week (0-6)
      scheduleTime: `0 ${Math.floor(Math.random() * 24)} * * ${Math.floor(Math.random() * 7)}`,
      personality: "Warm and professional journalist voice.", // Consider if this should be configurable default
    });

    // User addition/subscription moved to createNewsSource.ts

    // --- Refetch config AFTER potentially creating the first news source ---
    // This ensures the store reflects the newly added source
    console.log("[GET-SESSION] Refetching config after potential news source creation..."); // Use console.log
    const updatedResponse = await getConfigFetchResponse(authHeaders);
    if (!updatedResponse.ok) {
       // Handle error if refetch fails - maybe throw or log and proceed with potentially stale config?
       console.error("[GET-SESSION] Failed to refetch configuration after news source creation.");
       // For now, proceed with the potentially stale 'json' object, but log error.
    } else {
       const updatedJson = await updatedResponse.json();
       console.log("[GET-SESSION] Successfully refetched config. Updating store."); // Use console.log
       saveToStore({ config: updatedJson }); // Save the UPDATED config
       // Update theme based on potentially updated config
       // foregroundColor.set(updatedJson.brandColor);
       // complementaryColor.set(getComplementaryColor(updatedJson.brandColor));
    }
    // --- End refetch ---

  } else {
    // If news sources already existed, just update theme from initial fetch
    // foregroundColor.set(json.brandColor);
    // complementaryColor.set(getComplementaryColor(json.brandColor));
  }


  // --- Ensure subscribers are fetched immediately after login/session setup ---
  saveToStore({ isRefreshingSubscribers: true }); // Set flag before fetch
  try {
    console.log("[GET-SESSION] Triggering initial subscriber refresh after config load...");
    await refreshSubscribers();
    console.log("[GET-SESSION] Initial subscriber refresh completed.");
  } catch (error) {
    console.error("[GET-SESSION] Error during initial subscriber refresh:", error);
    // Decide if login should fail or proceed with potentially missing subscriber data
  } finally {
    // await loadInitialData();
    saveToStore({ isRefreshingSubscribers: false }); // Clear flag after fetch (success or error)
  }
  // --- End subscriber fetch ---

  return response.ok;
};

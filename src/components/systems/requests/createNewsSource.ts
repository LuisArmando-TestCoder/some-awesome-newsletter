import { get } from "svelte/store";
// Removed duplicate import
import store, { saveToConfig } from "../../store.ts"; // Removed saveToStore
import { addNewsletterUser } from "./addNewsletterUserEndpoint.ts";
import subscribeNewsletterUser from "./subscribeNewsletterUser.ts";
// Removed getAllSubscribersFromConfigEndpoint import
import { refreshSubscribers } from "../steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserDataService.ts"; // Import the centralized refresh function

/**
 * Crea una nueva fuente de noticias asociada a una configuración.
 * Este endpoint autocompleta los selectores faltantes usando GPT y guarda la fuente en Firestore.
 */
export default async function createNewsSource(newsSource: {
  type?: string;
  url: string;
  country?: string;
  community?: string;
  lead: string;
  scheduleTime?: string;
  personality?: string;
}) {
  const configId = get(store).configuratorEmail;
  console.log(
    "[CREATE-NEWSOURCE] Using configuratorEmail (configId):",
    configId
  );

  // Generate random schedule: random hour (0-23), random day of week (0-6)
  const randomHour = Math.floor(Math.random() * 24);
  const randomDayOfWeek = Math.floor(Math.random() * 7);
  const randomScheduleTime = `0 ${randomHour} * * ${randomDayOfWeek}`;
  console.log("[CREATE-NEWSOURCE] Generated random scheduleTime:", randomScheduleTime);

  const body = JSON.stringify({
    type: "website",
    personality: get(store).personality, // Consider if this should also be from input or have a default
    community: "World Wide Expats", // Consider if this should be from input or have a default
    country: "US", // Consider if this should be from input or have a default
    scheduleTime: randomScheduleTime, // Use the generated random schedule as default
    ...Object.fromEntries(
      // Filter out falsy values from the input, allowing input to override defaults
      Object.entries(newsSource).filter(([_, value]) => value)
    ),
  });
  console.log("[CREATE-NEWSOURCE] Request body:", body);

  const apiURL = `${get(store).apiURL()}/news-source/${configId}`;
  console.log("[CREATE-NEWSOURCE] Sending POST request to:", apiURL);

  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-email": configId,
      "x-auth-code": get(store).authCode,
    },
    body,
  });
  console.log("[CREATE-NEWSOURCE] Received response:", response);

  if (!response.ok) {
    console.error(
      "[CREATE-NEWSOURCE] Error creating news source. Status:",
      response.status
    );
    return null;
  }

  const json = await response.json();
  const newsSourceFromResponse = json?.newsSource;
  console.log("[CREATE-NEWSOURCE] newsSource from JSON:", newsSourceFromResponse);

  // Save the returned news source to the store if it's the first one
  const currentSources = get(store).config.newsSources || [];
  console.log("[CREATE-NEWSOURCE] Current newsSources in store:", currentSources);

  if (currentSources.length === 0 && newsSourceFromResponse) {
    // No need to filter an empty array—just push the complete object from the server.
    saveToConfig({ newsSources: [newsSourceFromResponse] });
  }

  // Ensure configurator exists as a user and subscribe them to the new source
  const configuratorEmail = get(store).configuratorEmail;
  const newSourceId = json?.newsSource?.id;

  if (configuratorEmail && newSourceId) {
    try {
      console.log(`[CREATE-NEWSOURCE] Ensuring configurator user exists: ${configuratorEmail}`);
      // Add user (backend should handle if already exists)
      await addNewsletterUser(
        { // Basic user data
          email: configuratorEmail,
          name: configuratorEmail, // Use email as name default
          bio: "Newsletter Configurator",
          language: "en", // Default
          countryOfResidence: "US", // Default
          newsSourcesConfigTuples: [], // Backend manages this
        },
        configuratorEmail, // configId
        newSourceId
      );
      console.log(`[CREATE-NEWSOURCE] addNewsletterUser call completed for ${configuratorEmail}.`);

      console.log(`[CREATE-NEWSOURCE] Subscribing configurator ${configuratorEmail} to new source ${newSourceId}`);
      await subscribeNewsletterUser(
        configuratorEmail, // configId
        newSourceId,
        configuratorEmail // userEmail
      );
      console.log(`[CREATE-NEWSOURCE] subscribeNewsletterUser call completed for ${configuratorEmail}.`);

    } catch (error) {
      console.error(`[CREATE-NEWSOURCE] Error adding/subscribing configurator ${configuratorEmail} to source ${newSourceId}:`, error);
      // Decide if this error should prevent returning the newsSource or just log
    }
  } else {
    console.warn("[CREATE-NEWSOURCE] Could not add/subscribe configurator - missing email or new source ID.");
  }

  // Refresh subscribers using the centralized function
  try {
    console.log("[CREATE-NEWSOURCE] Calling centralized subscriber refresh...");
    await refreshSubscribers();
    console.log("[CREATE-NEWSOURCE] Centralized subscriber refresh completed.");
  } catch (error) {
     console.error("[CREATE-NEWSOURCE] Error calling centralized subscriber refresh:", error);
  }

  // Original subscribe call removed as it's now handled above
  /* await subscribeNewsletterUser(
    get(store).configuratorEmail,
    json?.newsSource.id,
    get(store).configuratorEmail
  ); */ // Correctly closed comment

  console.log("[CREATE-NEWSOURCE] Updated store with new news source."); // This should not be commented

  return json?.newsSource;
}

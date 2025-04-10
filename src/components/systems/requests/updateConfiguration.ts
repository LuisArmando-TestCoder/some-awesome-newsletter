import { get } from "svelte/store";
import store from "../../store.ts";

export default async (config: { [index: string]: string }) => {
  const configuratorEmail = get(store).configuratorEmail;
  const authCode = get(store).authCode;
  const apiURL = get(store).apiURL;
  // We will fetch the latest config instead of relying solely on the store state
  // const currentConfig = get(store).config;

  console.log("[UPDATE-CONFIG-FRONT] Starting updateConfiguration with parameters:", {
    providedConfig: config,
    // currentConfig, // Removed from initial log
    configuratorEmail,
    authCode,
    apiURL,
  });

  const authHeaders = {
    "x-auth-email": configuratorEmail,
    "x-auth-code": authCode,
    "Content-Type": "application/json",
  };
  console.log("[UPDATE-CONFIG-FRONT] Using auth headers:", authHeaders);

  // --- Fetch latest config before merging ---
  let latestConfigFromBackend = {};
  const getConfigUrl = `${apiURL}/private-config?documentId=${configuratorEmail}`; // Assuming GET uses private-config
  console.log("[UPDATE-CONFIG-FRONT] Fetching latest config from:", getConfigUrl);
  try {
    const fetchResponse = await fetch(getConfigUrl, {
      method: "GET",
      headers: { // Ensure GET request also has auth headers if needed by backend
        "x-auth-email": configuratorEmail,
        "x-auth-code": authCode,
        "Accept": "application/json",
      },
    });
    if (!fetchResponse.ok) {
      console.error(`[UPDATE-CONFIG-FRONT] Failed to fetch latest config. Status: ${fetchResponse.status}`);
      // Decide how to handle: proceed with potentially stale store data, or fail?
      // Let's fail for safety to avoid potential overwrites with bad data.
      return false;
      // Or fallback: latestConfigFromBackend = get(store).config; // Use store state as fallback
    }
    latestConfigFromBackend = await fetchResponse.json();
    console.log("[UPDATE-CONFIG-FRONT] Successfully fetched latest config:", latestConfigFromBackend);
  } catch (fetchError) {
    console.error("[UPDATE-CONFIG-FRONT] Error fetching latest config:", fetchError);
    return false; // Fail if fetch fails
  }
  // --- End fetch latest config ---


  // Merge the *latest fetched* config with the provided changes
  const mergedConfig = {
    ...latestConfigFromBackend, // Start with the freshly fetched config
    ...config,                 // Spread the specific changes, overwriting existing keys
  };

  const requestBody = JSON.stringify(mergedConfig);
  console.log("[UPDATE-CONFIG-FRONT] Request body (merged with latest fetched):", requestBody);

  const updateURL = `${apiURL}/config?documentId=${configuratorEmail}`; // PUT endpoint remains /config
  console.log("[UPDATE-CONFIG-FRONT] Sending PUT request to:", updateURL);

  let putResponse;
  try {
    putResponse = await fetch(updateURL, { // Use different variable name
      method: "PUT",
      headers: authHeaders, // PUT needs Content-Type, already included
      body: requestBody,
    });
    console.log("[UPDATE-CONFIG-FRONT] Received PUT response:", putResponse);
  } catch (error) {
    console.error("[UPDATE-CONFIG-FRONT] Error during PUT fetch:", error);
    return false;
  }

  // Check PUT response status
  if (!putResponse.ok) {
    console.error("[UPDATE-CONFIG-FRONT] Update configuration failed. Status:", putResponse.status);
    return false;
  }

  // Removed duplicate/incorrect check using old 'response' variable

  console.log("[UPDATE-CONFIG-FRONT] Update configuration succeeded.");
  return true;
};

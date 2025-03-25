import { get } from "svelte/store";
import store from "../../store.ts";

export default async (config: { [index: string]: string }) => {
  const configuratorEmail = get(store).configuratorEmail;
  const authCode = get(store).authCode;
  const apiURL = get(store).apiURL;
  const currentConfig = get(store).config;

  console.log("[UPDATE-CONFIG-FRONT] Starting updateConfiguration with parameters:", {
    providedConfig: config,
    currentConfig,
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

  const requestBody = JSON.stringify({
    ...(config || currentConfig),
  });
  console.log("[UPDATE-CONFIG-FRONT] Request body:", requestBody);

  const updateURL = `${apiURL}/config?documentId=${configuratorEmail}`;
  console.log("[UPDATE-CONFIG-FRONT] Sending PUT request to:", updateURL);

  let response;
  try {
    response = await fetch(updateURL, {
      method: "PUT",
      headers: authHeaders,
      body: requestBody,
    });
    console.log("[UPDATE-CONFIG-FRONT] Received response:", response);
  } catch (error) {
    console.error("[UPDATE-CONFIG-FRONT] Error during fetch:", error);
    return false;
  }

  if (!response.ok) {
    console.error("[UPDATE-CONFIG-FRONT] Update configuration failed. Status:", response.status);
    return false;
  }

  console.log("[UPDATE-CONFIG-FRONT] Update configuration succeeded.");
  return true;
};

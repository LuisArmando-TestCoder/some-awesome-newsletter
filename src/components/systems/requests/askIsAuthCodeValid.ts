import { get } from "svelte/store";
import store, { saveToStore } from "../../store";
import getAuthHeaders from "./getAuthHeaders";

export default async (onSuccessCallback?: Function, onFailureCallback?: Function) => {
  const authCode = getAuthHeaders()["x-auth-code"];
  const configuratorEmail = getAuthHeaders()["x-auth-email"];
  const {idToken, clientId} = getAuthHeaders();

  console.log('[askIsAuthCodeValid.ts] authCode', authCode);
  console.log('[askIsAuthCodeValid.ts] configuratorEmail', configuratorEmail);
  console.log('[askIsAuthCodeValid.ts] idToken', idToken);
  console.log('[askIsAuthCodeValid.ts] clientId', clientId);

  const url = `${get(store).apiURL()}/auth/${configuratorEmail}?code=${
    authCode
  }`+ (idToken ? `&token_id=${idToken}&client_id=${clientId}` : '');

  console.log('[askIsAuthCodeValid.ts] url', url);

  const response = await fetch(url);

  let isAuthCodeValid = response.ok;

  let errorMessage = "Authentication failed. Please try again."; // Default error

  if (response.ok) {
    // Successful validation (200 OK)
    console.log("Authentication successful via askIsAuthCodeValid."); // Use console.log
  } else {
    // Handle specific errors (e.g., 403 Forbidden for invalid code)
    try {
      const errorJson = await response.json();
      errorMessage = errorJson.error || `Authentication failed (${response.status})`;
      console.log(`Authentication failed: ${errorMessage}`); // Use console.log
    } catch (e) {
      // If parsing error response fails
      errorMessage = `Authentication failed (${response.status} ${response.statusText})`;
      console.log(`Authentication failed with non-JSON response: ${errorMessage}`); // Use console.log
    }
    // Reset step index only on failure
    saveToStore({
      stepsIndex: 3, // todo: review: this is hard coded => if you change the position of the auth, you will be taken aback
    });
  }

  saveToStore({ isAuthCodeValid }); // Persist valid state

  // Handle step progression only if validation was successful
  if (isAuthCodeValid) {
    return onSuccessCallback?.();
  }
  
  return onFailureCallback?.();
};

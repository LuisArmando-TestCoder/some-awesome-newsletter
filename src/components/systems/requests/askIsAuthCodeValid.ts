import { get } from "svelte/store";
import store, { saveToStore } from "../../store";
import getConfiguratorSession from "./getConfiguratorSession";
import { user } from "$lib/stores/user";
import getAuthHeaders from "./getAuthHeaders";

export default async (onSuccessCallback?: Function) => {
  const authCode = getAuthHeaders()["x-auth-code"];
  const configuratorEmail = getAuthHeaders()["x-auth-email"];
  const idToken = get(user)?.idToken || get(store).idToken;
  const clientId = get(user)?.clientId || get(store).clientId;

  console.log('[askIsAuthCodeValid.ts] authCode', authCode);
  console.log('[askIsAuthCodeValid.ts] configuratorEmail', configuratorEmail);
  console.log('[askIsAuthCodeValid.ts] idToken', idToken);
  console.log('[askIsAuthCodeValid.ts] clientId', clientId);

  const url = `${get(store).apiURL()}/auth/${configuratorEmail}?code=${
    authCode
  }&token_id=${idToken}&client_id=${clientId}`;

  console.log('[askIsAuthCodeValid.ts] url', url);

  const response = await fetch(url);

  let isAuthCodeValid = response.ok;

  saveToStore({ isAuthCodeValid }); // Persist valid state

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

  console.log("is ok", isAuthCodeValid, get(store).hasNewEmailCodeBeenSent); // Log the derived validity

  // Handle step progression only if validation was successful
  if (isAuthCodeValid && get(store).hasNewEmailCodeBeenSent) {
    saveToStore({
      hasNewEmailCodeBeenSent: false,
      stepsIndex: get(store).stepsIndex + 1,
    });
  }

  // Handle session loading and callbacks only if validation was successful
  if (isAuthCodeValid) {
    await getConfiguratorSession(); // Load session data
    onSuccessCallback?.(); // Call success callback if provided
    saveToStore({
      directionsThatShouldDisappear: get(store).stepsIndex > 6 ? [-1, 1] : [],
      hasNewEmailCodeBeenSent: false, // Reset flag after successful use
    });
  } else {
     // Optionally display the errorMessage to the user via a store or event
     // e.g., saveToStore({ authError: errorMessage });
     // For now, it's logged to console.
  }

  return isAuthCodeValid; // Return the boolean validity status
};

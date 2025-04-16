import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";
import getConfiguratorSession from "./getConfiguratorSession.ts";

export default async (onSuccessCallback?: Function) => {
  const response = await fetch(
    `${get(store).apiURL()}/auth/${get(store).configuratorEmail}?code=${
      get(store).authCode
    }`
  );

  let isValid = false;
  let errorMessage = "Authentication failed. Please try again."; // Default error

  if (response.ok) {
    // Successful validation (200 OK)
    isValid = true;
    saveToStore({ isAuthCodeValid: true }); // Persist valid state
    console.log("Authentication successful via askIsAuthCodeValid."); // Use console.log

  } else {
    // Handle specific errors (e.g., 403 Forbidden for invalid code)
    isValid = false;
    saveToStore({ isAuthCodeValid: false }); // Persist invalid state
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
      stepsIndex: 6, // todo: review: this is hard coded => if you change the position of the auth, you will be taken aback
    });
  }


  console.log("is ok", isValid, get(store).hasNewEmailCodeBeenSent); // Log the derived validity

  // Handle step progression only if validation was successful
  if (isValid && get(store).hasNewEmailCodeBeenSent) {
    saveToStore({
      hasNewEmailCodeBeenSent: false,
      stepsIndex: get(store).stepsIndex + 1,
    });
  }

  // Handle session loading and callbacks only if validation was successful
  if (isValid) {
    onSuccessCallback?.(); // Call success callback if provided
    getConfiguratorSession(); // Load session data
    saveToStore({
      directionsThatShouldDisappear: get(store).stepsIndex > 6 ? [-1, 1] : [],
      hasNewEmailCodeBeenSent: false, // Reset flag after successful use
    });
  } else {
     // Optionally display the errorMessage to the user via a store or event
     // e.g., saveToStore({ authError: errorMessage });
     // For now, it's logged to console.
  }

  return isValid; // Return the boolean validity status
};

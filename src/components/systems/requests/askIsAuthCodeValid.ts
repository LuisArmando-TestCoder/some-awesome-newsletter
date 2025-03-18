import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";

export default async () => {
  const response = await fetch(
    `https://ai-newsletter-translated.onrender.com/auth/${
      get(store).configuratorEmail
    }?code=${get(store).authCode}`
  );

  saveToStore({
    isAuthCodeValid: response.ok,
  });

  console.log("is ok", response.ok, get(store).hasNewEmailCodeBeenSent);

  if (response.ok && get(store).hasNewEmailCodeBeenSent) {
    saveToStore({
      hasNewEmailCodeBeenSent: false,
      stepsIndex: get(store).stepsIndex + 1,
      //   directionsThatShouldDisappear: [-1],
    });
  }

  return response.ok;
};

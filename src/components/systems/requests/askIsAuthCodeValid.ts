import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";

export default async () => {
  const response = await fetch(
    `https://ai-newsletter-translated.onrender.com/auth/${
      get(store).configuratorEmail
    }?code=${get(store).authCode}`
  );

  if (response.ok) {
    console.log("fetch sent, code is valid")
    saveToStore({
      isAuthCodeValid: true
    });
  }
};

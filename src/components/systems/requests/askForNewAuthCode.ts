import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";

export default async () => {
  const response = await fetch(
    `https://ai-newsletter-translated.onrender.com/auth/${
      get(store).configuratorEmail
    }`,
    {
      method: "POST",
    }
  );

  const { success } = await response.json();
};

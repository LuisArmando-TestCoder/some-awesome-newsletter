import { get } from "svelte/store";
import store from "../../store.ts";

export default async () => {
  const response = await fetch(
    `https://ai-newsletter-translated.onrender.com/auth/${
      get(store).configuratorEmail
    }`,
    {
      method: "POST",
    }
  );

  console.log(response);

  const { success } = await response.json();

  if (success) {
    localStorage.setItem("has-email-auth-code-been-sent", "1");
    console.log(get(store).configuratorEmail);
  }
};

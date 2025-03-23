import { get } from "svelte/store";
import store from "../../store.ts";

export default async function regenerateSelectors(configId: string, newsSourceId: string, newUrl?: string) {
  const response = await fetch(
    `${get(store).apiURL}/news-source/regenerate-selectors/${configId}/${newsSourceId}`,
    {
      method: "PUT",
      headers: {
        "x-auth-email": get(store).configuratorEmail,
        "x-auth-code": get(store).authCode,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        newUrl
          ? { newsSourceUrl: newUrl }
          : {} // si no hay URL nueva, se manda vacío
      ),
    }
  );

  if (!response.ok) return null;

  return await response.json(); // contiene `message` y `newsSource`
}

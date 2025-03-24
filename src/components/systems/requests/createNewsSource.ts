import { get } from "svelte/store";
import store from "../../store.ts";

/**
 * Crea una nueva fuente de noticias asociada a una configuración.
 * Este endpoint autocompleta los selectores faltantes usando GPT y guarda la fuente en Firestore.
 */
export default async function createNewsSource(newsSource: {
  type: string;
  url: string;
  country: string;
  community: string;
  lead: string;
  scheduleTime: string;
  personality?: string;
}) {
  const configId = get(store).configuratorEmail;

  const response = await fetch(`${get(store).apiURL}/news-source/${configId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-email": configId,
      "x-auth-code": get(store).authCode,
    },
    body: JSON.stringify(newsSource),
  });

  console.log(response);

  if (!response.ok) {
    console.error("Error creating news source");
    return null;
  }

  const json = await response.json();
  return json.newsSource;
}

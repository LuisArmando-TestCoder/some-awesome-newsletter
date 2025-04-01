import { get } from "svelte/store";
import store, { saveToConfig } from "../../store.ts";

/**
 * Crea una nueva fuente de noticias asociada a una configuración.
 * Este endpoint autocompleta los selectores faltantes usando GPT y guarda la fuente en Firestore.
 */
export default async function createNewsSource(newsSource: {
  type?: string;
  url: string;
  country?: string;
  community?: string;
  lead: string;
  scheduleTime?: string;
  personality?: string;
}) {
  const configId = get(store).configuratorEmail;
  console.log(
    "[CREATE-NEWSOURCE] Using configuratorEmail (configId):",
    configId
  );

  const body = JSON.stringify({
    type: "website",
    personality: get(store).personality,
    community: "World Wide Expats",
    country: "US",
    scheduleTime: "0 6 * * *",
    ...Object.fromEntries(
      Object.entries(newsSource).filter(([_, value]) => value)
    ),
  });
  console.log("[CREATE-NEWSOURCE] Request body:", body);

  const apiUrl = `${get(store).apiURL}/news-source/${configId}`;
  console.log("[CREATE-NEWSOURCE] Sending POST request to:", apiUrl);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-email": configId,
      "x-auth-code": get(store).authCode,
    },
    body,
  });
  console.log("[CREATE-NEWSOURCE] Received response:", response);

  if (!response.ok) {
    console.error(
      "[CREATE-NEWSOURCE] Error creating news source. Status:",
      response.status
    );
    return null;
  }

  const json = await response.json();
  const newsSourceFromResponse = json?.newsSource;
  console.log("[CREATE-NEWSOURCE] newsSource from JSON:", newsSourceFromResponse);

  // Save the returned news source to the store if it's the first one
  const currentSources = get(store).config.newsSources || [];
  console.log("[CREATE-NEWSOURCE] Current newsSources in store:", currentSources);

  if (currentSources.length === 0 && newsSourceFromResponse) {
    // No need to filter an empty array—just push the complete object from the server.
    saveToConfig({ newsSources: [newsSourceFromResponse] });
  }


  console.log("[CREATE-NEWSOURCE] Updated store with new news source.");

  return json?.newsSource;
}

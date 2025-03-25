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
    country: "US",
    community: "Expats from US",
    scheduleTime: "0 6 * * *",
    personality: "Warm and professional",
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
  console.log("[CREATE-NEWSOURCE] Parsed response JSON:", json);
  console.log("[CREATE-NEWSOURCE] newsSource from JSON:", json?.newsSource);

  // Save the returned news source (note singular property)
  const currentSources = get(store).config.newsSources || [];
  console.log(
    "[CREATE-NEWSOURCE] Current newsSources in store:",
    currentSources
  );
  const updatedSources = currentSources.filter(source => source.id !== newsSource.id);
  updatedSources.push(newsSource);
  saveToConfig({ newsSources: updatedSources });

  console.log("[CREATE-NEWSOURCE] Updated store with new news source.");

  return json?.newsSource;
}

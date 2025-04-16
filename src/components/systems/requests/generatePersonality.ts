import { get } from "svelte/store";
import store, { saveToConfig } from "../../store.ts";
import type { NewsSource } from "../../types.ts";

export async function generatePersonality(
  rawContent: string,
  newsSourceId: string
): Promise<{ message: string; newsSource: any; personality: string }> {
  const url = `${get(store).apiURL()}/news-source/personality/${
    get(store).configuratorEmail
  }/${newsSourceId}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-auth-email": get(store).configuratorEmail,
      "x-auth-code": get(store).authCode,
    },
    body: JSON.stringify({ rawContent }),
  });

  console.log("json?.newsSource RESPONSE", response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error generando la personalidad");
  }

  const json = await response.json();
  console.log("json?.newsSource", json?.newsSource, response);

  // Replace the existing news source with the updated one
  const currentSources = get(store).config.newsSources || [];
  const updatedSources = currentSources.map((source: NewsSource) =>
    source.id === json?.newsSource.id ? json?.newsSource : source
  );
  saveToConfig({
    newsSources: updatedSources,
  });

  return json?.newsSource;
}

import { get } from "svelte/store";
import store, { saveToConfig } from "../../store";
import type { NewsSource } from "../../types";
import getAuthHeaders from "./getAuthHeaders";

export default async function regenerateSelectors(configId: string, newsSourceId: string, newUrl?: string) {
  const response = await fetch(
    `${get(store).apiURL()}/news-source/regenerate-selectors/${configId}/${newsSourceId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(
        newUrl
          ? { newsSourceUrl: newUrl }
          : {} // si no hay URL nueva, se manda vacío
      ),
    }
  );

  if (!response.ok) return null;

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

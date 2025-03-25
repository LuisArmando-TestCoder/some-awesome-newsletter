import { get } from "svelte/store";
import store, { saveToConfig } from "../../store.ts";
import type NewsSource from "../steps/StepsTowardsPublish/stages/H_Dashboard/NewsSource.svelte";

export default async function updateNewsSource(
  updateData: { [index: string]: string },
  newsSourceId: string
) {
  const configId = get(store).configuratorEmail;
  const response = await fetch(
    `${get(store).apiURL}/news-source/${configId}/${newsSourceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-email": configId,
        "x-auth-code": get(store).authCode,
      },
      body: JSON.stringify(updateData),
    }
  );

  if (!response.ok) {
    console.error("Error updating news source");
    return null;
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

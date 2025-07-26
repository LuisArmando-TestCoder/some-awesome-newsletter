import { get } from "svelte/store";
import store, { saveToConfig } from "../../store.js"; // Add .js extension
import type { NewsSource } from "../../types.js"; // Add .js extension

// Adjust signature: make newsSourceId optional, broaden updateData type
export default async function updateNewsSource(
  updateData: { [index: string]: string | boolean | null }, // Allow boolean/null for 'active' and optional fields
  newsSourceId?: string // Make id optional to match expected callback
) {
  console.log("[updateNewsSource.ts] updateData:", updateData);
  const configId = get(store).configuratorEmail;
  // Ensure newsSourceId is provided, otherwise throw error or handle appropriately
  if (!newsSourceId) {
    console.error("Error: newsSourceId is required for updating.");
    return null; // Or throw new Error("newsSourceId is required");
  }
  const response = await fetch(
    `${get(store).apiURL()}/news-source/${configId}/${newsSourceId}`,
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
  console.log("[updateNewsSource.ts] Response from server:", JSON.stringify(json, null, 2));

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

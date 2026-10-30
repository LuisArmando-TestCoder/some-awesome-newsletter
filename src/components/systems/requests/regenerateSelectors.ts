import { request, seg } from "$lib/api/client";
import { LLM_TIMEOUT_MS } from "$lib/api/config";
import { newsSourceEnvelope } from "$lib/api/schemas";
import { asNewsSource, replaceNewsSourceInStore } from "./_internal";

/** Re-detect selectors for a source (optionally with a new URL). Returns the source or null. */
export default async function regenerateSelectors(configId: string, newsSourceId: string, newUrl?: string) {
  try {
    const json = await request(`/news-source/regenerate-selectors/${seg(configId)}/${seg(newsSourceId)}`, {
      method: "PUT",
      body: newUrl ? { newsSourceUrl: newUrl } : {},
      timeoutMs: LLM_TIMEOUT_MS,
      schema: newsSourceEnvelope,
    });
    const updated = asNewsSource(json.newsSource);
    await replaceNewsSourceInStore(updated);
    return updated;
  } catch (e) {
    console.error("[regenerateSelectors] Failed", e);
    return null;
  }
}

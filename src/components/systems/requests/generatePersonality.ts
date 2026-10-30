import { get } from "svelte/store";
import store from "../../store";
import { request, seg } from "$lib/api/client";
import { LLM_TIMEOUT_MS } from "$lib/api/config";
import { newsSourceEnvelope } from "$lib/api/schemas";
import type { NewsSource } from "../../types";
import { asNewsSource, replaceNewsSourceInStore } from "./_internal";

/**
 * Build the writing voice of a source from sample text.
 * Returns the updated news source (callers read `.personality`).
 * Throws an Error whose `message` is safe to show.
 */
export async function generatePersonality(
  rawContent: string,
  newsSourceId: string
): Promise<NewsSource> {
  const json = await request(`/news-source/personality/${seg(get(store).configuratorEmail)}/${seg(newsSourceId)}`, {
    method: "PUT",
    body: { rawContent },
    timeoutMs: LLM_TIMEOUT_MS,
    schema: newsSourceEnvelope,
    errorMessage: "We could not build the writing voice from this text. Try a longer sample.",
  });
  const updated = asNewsSource(json.newsSource);
  await replaceNewsSourceInStore(updated);
  return updated;
}

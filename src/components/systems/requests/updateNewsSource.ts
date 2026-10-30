import { get } from "svelte/store";
import store from "../../store";
import { request, seg } from "$lib/api/client";
import { newsSourceEnvelope } from "$lib/api/schemas";
import { asNewsSource, replaceNewsSourceInStore } from "./_internal";

/**
 * Update one news source. Returns the updated source, or null on failure
 * (callers check the return value). `updateNewsSourceOrThrow` throws ApiError.
 */
export default async function updateNewsSource(
  updateData: { [index: string]: string | boolean | null },
  newsSourceId?: string
) {
  try {
    return await updateNewsSourceOrThrow(updateData, newsSourceId);
  } catch (e) {
    console.error("[updateNewsSource] Update failed", e);
    return null;
  }
}

export async function updateNewsSourceOrThrow(
  updateData: { [index: string]: unknown },
  newsSourceId?: string
) {
  if (!newsSourceId) throw new Error("Choose a source first.");
  const configId = get(store).configuratorEmail;
  const json = await request(`/news-source/${seg(configId)}/${seg(newsSourceId)}`, {
    method: "PUT",
    body: updateData,
    idempotent: true,
    retries: 1,
    schema: newsSourceEnvelope,
    errorMessage: "We could not save this source. Try again.",
  });
  const updated = asNewsSource(json.newsSource);
  await replaceNewsSourceInStore(updated);
  return updated;
}

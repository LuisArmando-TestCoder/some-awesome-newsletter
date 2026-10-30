import { request, seg } from "$lib/api/client";
import type { NewsletterUser } from "../../types";

/**
 * Subscribers of one news source. Returns [] on failure.
 * Note: the backend ignores `limit` and `startAfter` today (see API_CONTRACT.md);
 * they are applied here so callers get the page they asked for.
 */
/** Same as the default export but throws ApiError on failure (an error is not an empty list). */
export async function getNewsletterUsersByNewsSourceOrThrow(
  configId: string,
  newsSourceId: string,
  limit?: number,
  startAfter?: string
): Promise<NewsletterUser[]> {
  const data = await request<NewsletterUser[]>(`/newsletter/users/${seg(configId)}/${seg(newsSourceId)}`, {
    query: { limit, startAfter },
    errorMessage: "We could not load your subscribers. Try again in a minute.",
  });
  let list = Array.isArray(data) ? data : [];
  if (startAfter) {
    const i = list.findIndex((u) => u.email === startAfter);
    if (i >= 0) list = list.slice(i + 1);
  }
  return limit ? list.slice(0, limit) : list;
}

/** Subscribers of one source. Returns [] on failure (kept for old callers); prefer the OrThrow variant. */
export default async function getNewsletterUsersByNewsSource(
  configId: string,
  newsSourceId: string,
  limit?: number,
  startAfter?: string
): Promise<NewsletterUser[]> {
  if (!configId) return [];
  try {
    const data = await request<NewsletterUser[]>(`/newsletter/users/${seg(configId)}/${seg(newsSourceId)}`, {
      query: { limit, startAfter },
    });
    let list = Array.isArray(data) ? data : [];
    if (startAfter) {
      const i = list.findIndex((u) => u.email === startAfter);
      if (i >= 0) list = list.slice(i + 1);
    }
    return limit ? list.slice(0, limit) : list;
  } catch (error) {
    console.error("[getNewsletterUsersByNewsSource] Failed", error);
    return [];
  }
}

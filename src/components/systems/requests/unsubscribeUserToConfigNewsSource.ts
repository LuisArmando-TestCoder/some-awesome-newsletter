import { request, seg } from "$lib/api/client";

/**
 * Unsubscribe a user from one news source (public endpoint, also used by
 * email links). Returns true when the backend confirmed it.
 */
export default async function unsubscribeUserToConfigNewsSource(
  email: string,
  configId: string,
  newsSourceId: string
): Promise<boolean> {
  if (!email || !configId || !newsSourceId) return false;
  try {
    await request(`/unsubscribe/${seg(email)}`, {
      auth: "none",
      query: { configId, newsSourceId },
      responseType: "text",
      headers: { Accept: "text/html, application/json" },
      dedupe: false,
      retries: 0,
    });
    return true;
  } catch (error) {
    console.error("[unsubscribeUser] Failed", error);
    return false;
  }
}

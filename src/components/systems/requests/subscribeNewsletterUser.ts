import { request } from "$lib/api/client";

/** Subscribe an existing user to a news source. Returns true on success. */
export default async function subscribeNewsletterUser(configId: string, newsSourceId: string, email: string) {
  try {
    await request("/subscribe", { method: "POST", body: { configId, newsSourceId, email } });
    return true;
  } catch {
    return false;
  }
}

import { request } from "$lib/api/client";

/** Language guessed from the visitor's IP (e.g. "es"), or null. Short timeout: never blocks the page. */
export default async function getGeoIpLanguage(): Promise<string | null> {
  try {
    const data = await request<{ language?: string }>("/geo", { auth: "none", timeoutMs: 4000, retries: 0 });
    return data?.language || null;
  } catch {
    return null;
  }
}

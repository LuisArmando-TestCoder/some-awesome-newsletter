import { request, seg } from "$lib/api/client";
import { LLM_TIMEOUT_MS } from "$lib/api/config";

/** Ask the backend to find the CSS selector for article links. Returns the selector or null. */
export default async function generateSelector(
  configId: string,
  data: { url: string; lead: string; personality: string; scheduleTime: string }
) {
  try {
    const json = await request<{ selector?: string }>(`/news-source/generate-selector/${seg(configId)}`, {
      method: "POST",
      body: data,
      timeoutMs: LLM_TIMEOUT_MS,
    });
    return json?.selector ?? null;
  } catch (e) {
    console.error("[generateSelector] Failed", e);
    return null;
  }
}

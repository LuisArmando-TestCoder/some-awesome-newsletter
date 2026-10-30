import { request } from "$lib/api/client";

/** Send an issue written from pasted content. Returns true when the backend accepted it. */
export default async function sendCustomContent(configId: string, newsSourceId: string, content: string): Promise<boolean> {
  if (!configId || !newsSourceId || !content?.trim()) return false;
  try {
    await request("/newsletter/send-custom-content", {
      method: "POST",
      body: { configId, newsSourceId, content },
      timeoutMs: 120_000,
    });
    return true;
  } catch (error) {
    console.error("[sendCustomContent] Failed", error);
    return false;
  }
}

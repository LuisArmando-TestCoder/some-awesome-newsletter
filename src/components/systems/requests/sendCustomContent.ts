import { request } from "$lib/api/client";
import { toUserMessage } from "$lib/api/errors";

/**
 * Send an issue written from pasted content.
 * Returns true when the backend accepted it, otherwise the server's own sentence
 * (for example "You can send to this news source again in about 7 day(s).") so the
 * owner learns the real reason instead of a generic error.
 */
export default async function sendCustomContent(configId: string, newsSourceId: string, content: string): Promise<true | string> {
  if (!configId || !newsSourceId || !content?.trim()) return "Paste a link or some text to write about.";
  try {
    await request("/newsletter/send-custom-content", {
      method: "POST",
      body: { configId, newsSourceId, content },
      timeoutMs: 120_000,
    });
    return true;
  } catch (error) {
    console.error("[sendCustomContent] Failed", error);
    return toUserMessage(error, "We could not send this issue. Check the link or text and try again in a few minutes.");
  }
}

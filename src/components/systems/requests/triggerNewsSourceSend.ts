import { get } from "svelte/store";
import store from "../../store";
import { request, seg } from "$lib/api/client";
import { toUserMessage } from "$lib/api/errors";

/**
 * Send the newsletter for one news source now.
 * Contract kept for existing callers: returns `true` on success and a user
 * facing message string on failure (callers check `typeof r === "boolean" && r`).
 * The backend answers after the whole send finishes, so the timeout is long.
 */
export default async function triggerNewsSourceSend(newsSourceId: string): Promise<boolean> {
  const { configuratorEmail: configId, authCode } = get(store);

  if (!newsSourceId) return "Choose a source first." as unknown as boolean;
  if (!configId || !authCode) return "Your session has ended. Sign in again to continue." as unknown as boolean;

  try {
    await request(`/news-source/${seg(configId)}/${seg(newsSourceId)}/trigger`, {
      method: "POST",
      timeoutMs: 5 * 60_000,
      retries: 0,
      errorMessage: "We could not send this newsletter. Try again in a few minutes.",
    });
    return true;
  } catch (error) {
    return toUserMessage(error, "We could not send this newsletter. Try again in a few minutes.") as unknown as boolean;
  }
}

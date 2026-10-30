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
export type TriggerResult = {
  /** "queued": accepted, sending in the background (follow runId on the socket). "skipped": nothing to send. */
  state: "queued" | "skipped" | "done";
  runId?: string;
  /** The server's plain sentence (why it was skipped, or that it is on its way). */
  message?: string;
};

/** Like the default export, but says what really happened. Throws ApiError on failure. */
export async function triggerSend(newsSourceId: string): Promise<TriggerResult> {
  const { configuratorEmail: configId } = get(store);
  const res = await request<{ ok?: boolean; status?: string; runId?: string; message?: string; reason?: string }>(
    `/news-source/${seg(configId)}/${seg(newsSourceId)}/trigger`,
    { method: "POST", timeoutMs: 5 * 60_000, retries: 0, errorMessage: "We could not send this newsletter. Try again in a few minutes." },
  );
  if (res?.status === "skipped") return { state: "skipped", message: res.message };
  if (res?.runId) return { state: "queued", runId: res.runId, message: res.message };
  return { state: "done", message: res?.message };
}

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

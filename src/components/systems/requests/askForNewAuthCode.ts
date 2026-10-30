import { get } from "svelte/store";
import store, { saveToStore } from "../../store";
import { request, seg } from "$lib/api/client";

/**
 * Ask the backend to email a sign in code to `configuratorEmail`.
 * Store flags: `hasNewEmailCodeBeenSent` is true while the request runs.
 * `hasAuthCodeAskFailed` keeps its historical (inverted) meaning: it becomes
 * true when the code WAS sent, because existing UI reads it that way.
 * `authCodeRequestError` holds a user facing message when sending failed.
 */
export default async function ask() {
  const email = (get(store).configuratorEmail || "").trim();
  saveToStore({ hasNewEmailCodeBeenSent: true, authCodeRequestError: "" });
  try {
    await request(`/auth/${seg(email)}`, { method: "POST", auth: "none", retries: 0 });
    saveToStore({ hasNewEmailCodeBeenSent: false, hasAuthCodeAskFailed: true });
  } catch (e: any) {
    saveToStore({
      hasNewEmailCodeBeenSent: false,
      authCodeRequestError: e?.userMessage || "We could not send the code. Try again in a minute.",
    });
  }
}

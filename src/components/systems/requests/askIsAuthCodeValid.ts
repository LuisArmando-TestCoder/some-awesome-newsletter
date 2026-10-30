import { saveToStore } from "../../store";
import { request, seg } from "$lib/api/client";
import { getCredentials, setSessionToken } from "$lib/api/credentials";
import { isApiError, toUserMessage } from "$lib/api/errors";

type VerifyResponse = { success?: boolean; sessionToken?: string; sessionExpiresAt?: string; method?: string };

/**
 * Check the stored email + code (or Google token) with the backend.
 * On success stores the session token (sent as a Bearer header from then on)
 * and sets `isAuthCodeValid`.
 *
 * Callbacks:
 * - onSuccess: the code is valid.
 * - onFailure: the backend rejected the code (401/403/400) or nothing is stored.
 * - onError: network or server problem; the code may still be fine. When no
 *   onError is given, onFailure is called (previous behaviour).
 * `authError` in the store holds a user facing message.
 */
export default async (onSuccessCallback?: Function, onFailureCallback?: Function, onErrorCallback?: Function) => {
  const c = getCredentials();

  if (!c.email || !c.code) {
    saveToStore({ isAuthCodeValid: false, authError: "Enter your email and the code we sent you." });
    return onFailureCallback?.();
  }

  try {
    const res = await request<VerifyResponse>(`/auth/${seg(c.email)}`, {
      auth: "none",
      query: {
        code: c.code,
        token_id: c.tokenId && c.clientId ? c.tokenId : undefined,
        client_id: c.tokenId && c.clientId ? c.clientId : undefined,
      },
      dedupe: true,
      retries: 1,
    });
    if (res?.sessionToken) setSessionToken(res.sessionToken, res.sessionExpiresAt);
    saveToStore({ isAuthCodeValid: true, authError: "" });
    return onSuccessCallback?.();
  } catch (e) {
    const rejected = isApiError(e) && [400, 401, 403, 404, 429].includes(e.status);
    if (rejected) {
      setSessionToken(undefined);
      saveToStore({ isAuthCodeValid: false, authError: toUserMessage(e, "That code did not work. Check it or ask for a new one.") });
      return onFailureCallback?.();
    }
    // Network or server trouble: keep the current sign-in state.
    saveToStore({ authError: toUserMessage(e) });
    return (onErrorCallback ?? onFailureCallback)?.();
  }
};

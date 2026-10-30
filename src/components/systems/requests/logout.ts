import { clearSession } from "$lib/stores/sessionLifecycle";
import { request } from "$lib/api/client";
import { getCredentials } from "$lib/api/credentials";

/**
 * Sign out: closes the live connection, clears stored credentials and the
 * legacy auth cookies, then (by default) goes to the home page.
 * Accepts a click event as its argument (some buttons pass it directly);
 * only an explicit `false` skips the redirect.
 */
export default async function logout(doRedirect: boolean | Event = true) {
  // Real sign out (with redirect) also revokes the session on the server, best effort.
  // logout(false) is used to reset storage before a new sign in, so it only clears locally.
  if (doRedirect !== false && getCredentials().sessionToken) {
    request("/v1/auth/logout", { method: "POST", retries: 0, timeoutMs: 4000 }).catch(() => {});
  }
  try {
    clearSession();
  } catch (error) {
    console.error("[logout] Failed to clear user data", error);
  }

  if (doRedirect !== false && typeof window !== "undefined") {
    window.location.href = "/";
  }
}

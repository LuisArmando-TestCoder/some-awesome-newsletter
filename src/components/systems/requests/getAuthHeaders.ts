import { authHeaders } from "$lib/api/credentials";

/**
 * Legacy helper kept for existing callers. Returns JSON headers plus the auth
 * headers the backend reads (x-auth-email, x-auth-code, optional Google token
 * ids, x-user-language). The old `given_name` and `picture` headers were never
 * read by the backend and made fetch() throw for names outside Latin-1.
 */
export default function getAuthHeaders(): { [index: string]: string } {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...authHeaders(),
  };
}

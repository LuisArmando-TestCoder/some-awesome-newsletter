import { get } from "svelte/store";
import store from "../../store";
import type { NewsletterUser } from "../../types";
import getAuthHeaders from "./getAuthHeaders";

export default async function searchNewsletterUser(
  searchTerm: string,
): Promise<NewsletterUser[]> {
  const { apiURL } = get(store);
  const configId = getAuthHeaders()["x-auth-email"];

  if (!configId) {
    console.error("[searchNewsletterUser] Missing configId.");
    return [];
  }

  // Determine if the search term is an email or a name
  const isEmail = searchTerm.includes("@");
  const queryParam = isEmail ? `email=${encodeURIComponent(searchTerm)}` : `name=${encodeURIComponent(searchTerm)}`;

  const url = `${apiURL()}/newsletter/search?${queryParam}`;

  const authHeaders = getAuthHeaders();

  console.log(
    `[searchNewsletterUser] Searching for user with term: ${searchTerm} from ${url}`,
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: authHeaders,
    });

    if (!response.ok) {
      let errorMsg = `Failed to search for user: ${response.status} ${response.statusText}`;
      try {
        const errorBody = await response.json();
        errorMsg = `Failed to search for user: ${
          errorBody.error || response.statusText
        }`;
      } catch (_) {
        // Ignore if the error response is not JSON
      }
      console.error(`[searchNewsletterUser] ${errorMsg}`);
      throw new Error(errorMsg);
    }

    const data = await response.json();
    console.log(
      `[searchNewsletterUser] Successfully found users for term: ${searchTerm}`,
    );
    return data as NewsletterUser[];
  } catch (error) {
    console.error(
      `[searchNewsletterUser] Exception occurred while searching for user with term ${searchTerm}:`,
      error,
    );
    return [];
  }
}

// src/components/systems/requests/getNewsletterUsersByNewsSource.ts

import { get } from "svelte/store";
import store from "../../store";
import type { NewsletterUser } from "../../types";
import getAuthHeaders from "./getAuthHeaders";

export default async function getNewsletterUsersByNewsSource(
  configId: string,
  newsSourceId: string,
  limit?: number,
  startAfter?: string
): Promise<NewsletterUser[]> {
  const { apiURL } = get(store);

  if (!configId) {
    console.error("[getNewsletterUsersByNewsSource] Missing configId.");
    return [];
  }

  let url = `${apiURL()}/newsletter/users/${encodeURIComponent(configId)}/${
    encodeURIComponent(newsSourceId)
  }`;

  const params = new URLSearchParams();
  if (limit) params.append("limit", limit.toString());
  if (startAfter) params.append("startAfter", startAfter);
  
  if (params.toString()) {
      url += `?${params.toString()}`;
  }

  const authHeaders = getAuthHeaders();

  console.log(
    `[getNewsletterUsersByNewsSource] Fetching users for configId: ${configId} and newsSourceId: ${newsSourceId} from ${url}`,
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: authHeaders,
    });

    if (!response.ok) {
      let errorMsg = `Failed to fetch users: ${response.status} ${response.statusText}`;
      try {
        const errorBody = await response.json();
        errorMsg = `Failed to fetch users: ${
          errorBody.error || response.statusText
        }`;
      } catch (_) {
        // Ignore if the error response is not JSON
      }
      console.error(`[getNewsletterUsersByNewsSource] ${errorMsg}`);
      throw new Error(errorMsg);
    }

    const data = await response.json();
    console.log(
      `[getNewsletterUsersByNewsSource] Successfully fetched users for configId: ${configId} and newsSourceId: ${newsSourceId}`,
    );
    return data as NewsletterUser[];
  } catch (error) {
    console.error(
      `[getNewsletterUsersByNewsSource] Exception occurred while fetching users for configId ${configId} and newsSourceId ${newsSourceId}:`,
      error,
    );
    return [];
  }
}

import { request, seg } from "$lib/api/client";
import type { NewsletterUser } from "../../types";

export interface AddNewsletterUserResponse {
  message: string;
}

/**
 * Add a subscriber to a news source. Uses the owner's session, or an API key
 * (Bearer) when given. Throws an Error whose `message` is safe to show
 * (for example the plan limit message from the backend).
 */
export async function addNewsletterUser(
  user: NewsletterUser,
  configId: string,
  newsSourceId: string,
  apiKey?: string
): Promise<AddNewsletterUserResponse> {
  return request<AddNewsletterUserResponse>(`/users/${seg(configId)}/${seg(newsSourceId)}`, {
    method: "POST",
    auth: apiKey ? { bearer: apiKey } : "user",
    body: user,
    errorMessage: "We could not add this subscriber. Try again.",
  });
}

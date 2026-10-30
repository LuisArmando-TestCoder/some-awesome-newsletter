import { request } from "$lib/api/client";

interface PublicSubscriptionPayload {
  configuratorId: string;
  newsSourceId: string;
  email: string;
  name: string;
  language?: string;
  countryOfResidence?: string;
}

/** Public subscribe (no auth). Returns true on success. Use submitPublicSubscriptionOrThrow for the message. */
export default async function submitPublicSubscription(payload: PublicSubscriptionPayload): Promise<boolean> {
  try {
    await submitPublicSubscriptionOrThrow(payload);
    return true;
  } catch {
    return false;
  }
}

export async function submitPublicSubscriptionOrThrow(payload: PublicSubscriptionPayload) {
  if (!payload.configuratorId || !payload.newsSourceId || !payload.email) {
    throw new Error("Enter your email to subscribe.");
  }
  return request<{ success?: boolean; message?: string }>("/public-subscribe", {
    method: "POST",
    auth: "none",
    body: {
      configuratorId: payload.configuratorId,
      newsSourceId: payload.newsSourceId,
      email: payload.email.trim(),
      name: (payload.name || payload.email.split("@")[0]).trim(),
      language: payload.language,
      countryOfResidence: payload.countryOfResidence,
    },
    errorMessage: "We could not subscribe you. Try again in a minute.",
  });
}

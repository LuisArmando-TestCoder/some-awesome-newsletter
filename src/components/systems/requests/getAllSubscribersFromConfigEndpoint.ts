import { request, seg } from "$lib/api/client";
import { getCredentials } from "$lib/api/credentials";
import { subscribersByNewsSourceSchema } from "$lib/api/schemas";
import type { NewsletterUser } from "../../types";

/** All subscribers of the owner, grouped by news source id. Returns {} on failure. */
export default async function getAllSubscribersFromConfigEndpoint(): Promise<Record<string, NewsletterUser[]>> {
  const configId = getCredentials().email;
  if (!configId) return {};
  try {
    return (await request(`/config-subscribers/${seg(configId)}`, {
      schema: subscribersByNewsSourceSchema,
    })) as unknown as Record<string, NewsletterUser[]>;
  } catch (error) {
    console.error("[getAllSubscribers] Failed", error);
    return {};
  }
}

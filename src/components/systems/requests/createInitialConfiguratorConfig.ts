import { get } from "svelte/store";
import store, { saveToStore } from "../../store";
import { request } from "$lib/api/client";

function normalizeWord(input: string): string {
  return (input || "")
    .replace(/[0-9]+/g, "")
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Create the owner's config document. Returns true on success.
 * Also runs on the server (oauth route): there it never touches the shared store.
 */
export default async function createInitialConfiguratorConfig(
  authHeaders: Record<string, string>,
  origin?: string
) {
  const configId = authHeaders["x-auth-email"];

  const body = {
    newsletterSubject: "Daily News",
    newsletterTitle: "Morning Bulletin",
    senderName: normalizeWord(configId?.split("@")[0]),
    emailSignature: "",
    pricingPlan: "free",
    vip: false,
  };

  try {
    const json = await request<{ apiKey?: string }>("/config", {
      method: "POST",
      auth: { headers: authHeaders },
      body,
      origin,
    });
    if (typeof window !== "undefined" && json?.apiKey) {
      saveToStore({ config: { ...get(store).config, apiKeys: [json.apiKey] } });
    }
    return true;
  } catch (e) {
    console.error("[createInitialConfiguratorConfig] Failed to create initial configuration", e);
    return false;
  }
}

import { get } from "svelte/store";
import store, { saveToStore } from "../../store";

function normalizeWord(input: string): string {
  return input
    .replace(/[0-9]+/g, "")
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}

export default async function createInitialConfiguratorConfig(
  authHeaders: Record<string, string>
) {
  const configId = authHeaders["x-auth-email"];

  const body = {
    newsletterSubject: "Daily News",
    newsletterTitle: "Morning Bulletin",
    senderName: normalizeWord(configId?.split("@")[0]),
    emailSignature: "",
  };

  const response = await fetch(`${get(store).apiURL()}/config`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error("Failed to create initial configuration.");
    return false;
  }

  const { apiKey } = await response.json();

  saveToStore({
    config: {
      ...get(store).config,
      apiKeys: [apiKey],
    },
  });

  return true;
}

import { get } from "svelte/store";
import store from "../../store";

function normalizeWord(input: string): string {
  return input
    // Remove digits
    .replace(/[0-9]+/g, "")
    // Replace separators (., -, _) with spaces
    .replace(/[._-]+/g, " ")
    // Split into parts, filter out empties (in case of multiple separators)
    .split(" ")
    .filter(Boolean)
    // Capitalize first letter of each part
    .map(
      word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    // Join back with space
    .join(" ");
}

export default async function createInitialConfiguratorConfig(authHeaders: Record<string, string>) {
  const configId = authHeaders["x-auth-email"];

  const body = {
    newsletterSubject: "Daily News",
    newsletterTitle: "Morning Bulletin",
    senderName: normalizeWord(configId?.split("@")[0]),
    emailSignature: "",
  };

  const response = await fetch(
    `${get(store).apiURL()}/config`,
    {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    console.error("Failed to create initial configuration.");
    return false;
  }

  return true;
}

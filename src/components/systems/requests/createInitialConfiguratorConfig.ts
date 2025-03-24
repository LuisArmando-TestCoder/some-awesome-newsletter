import { get } from "svelte/store";
import store from "../../store.ts";
import createNewsSource from "./createNewsSource.ts";

export default async function createInitialConfiguratorConfig(authHeaders: {
  [index: string]: string;
}) {
  const configId = get(store).configuratorEmail;

  const body = {
    newsletterSubject: "Daily News",
    newsletterTitle: "Morning Bulletin",
    senderName: configId.split("@")[0],
    brandColor:
      get(store).colorPalette[
        Math.floor(Math.random() * get(store).colorPalette.length)
      ],
    emailSignature: "Translated this news article for you",
  };

  const response = await fetch(
    `${get(store).apiURL}/config?documentId=${configId}`,
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

  await createNewsSource({
    type: "website",
    url: get(store).newsSource,
    country: "US",
    community: "Expats from US",
    lead: get(store).lead,
    scheduleTime: "0 6 * * *",
    personality: "Warm and professional journalist voice.",
  });

  return true;
}

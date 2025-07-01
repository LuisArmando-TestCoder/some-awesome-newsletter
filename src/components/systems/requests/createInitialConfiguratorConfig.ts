import { get } from "svelte/store";
import store from "../../store.ts";

export default async function createInitialConfiguratorConfig(authHeaders: {
  [index: string]: string;
}) {
  const configId = get(store).configuratorEmail;

  const body = {
    newsletterSubject: "Daily News",
    newsletterTitle: "Morning Bulletin",
    senderName: configId.split("@")[0],
    // brandColor:
    //   get(store).colorPalette[
    //     Math.floor(Math.random() * get(store).colorPalette.length)
    //   ],
    emailSignature: "",
  };

  const response = await fetch(
    `${get(store).apiURL()}/config?documentId=${configId}`,
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

import { get } from "svelte/store";
import store from "../../store";
import getAuthHeaders from "./getAuthHeaders";

export default async function createInitialConfiguratorConfig() {
  const configId = getAuthHeaders()["x-auth-email"];

  const body = {
    newsletterSubject: "Daily News",
    newsletterTitle: "Morning Bulletin",
    senderName: configId?.split("@")[0],
    // brandColor:
    //   get(store).colorPalette[
    //     Math.floor(Math.random() * get(store).colorPalette.length)
    //   ],
    emailSignature: "",
  };

  const response = await fetch(
    `${get(store).apiURL()}/config?documentId=${getAuthHeaders()["x-auth-email"]}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    console.error("Failed to create initial configuration.");
    return false;
  }

  return true;
}

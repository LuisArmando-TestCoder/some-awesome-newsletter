import { get } from "svelte/store";
import store from "../../store";
import getAuthHeaders from "./getAuthHeaders";

export default async function generateSelector(configId: string, data: { url: string, lead: string, personality: string, scheduleTime: string }) {
  const response = await fetch(
    `${get(store).apiURL()}/news-source/generate-selector/${configId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    console.error("Failed to generate selector", response);
    return null;
  }

  const json = await response.json();
  console.log("Generated selector:", json?.selector);

  return json?.selector;
}

import { get } from "svelte/store";
import store from "../../store";
import getAuthHeaders from "./getAuthHeaders";

export default async function subscribeNewsletterUser(
  configId: string,
  newsSourceId: string,
  email: string
) {
  const response = await fetch(`${get(store).apiURL()}/subscribe`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      configId,
      newsSourceId,
      email,
    }),
  });

  return response.ok;
}

import { get } from "svelte/store";
import store from "../../store.ts";

export default async function subscribeNewsletterUser(
  configId: string,
  newsSourceId: string,
  email: string
) {
  const response = await fetch(`${get(store).apiURL()}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add authentication headers
      "x-auth-email": get(store).configuratorEmail,
      "x-auth-code": get(store).authCode,
    },
    body: JSON.stringify({
      configId,
      newsSourceId,
      email,
    }),
  });

  return response.ok;
}

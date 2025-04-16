import { get } from "svelte/store";
import store from "../../store.ts";

export default async function postSubscriber(subscriber: {
  email: string;
  name: string;
  bio: string;
  language: string;
  countryOfResidence: string;
}) {
  const configId = get(store).configuratorEmail;

  const response = await fetch(`${get(store).apiURL()}/users/${configId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscriber),
  });

  return response.ok;
}

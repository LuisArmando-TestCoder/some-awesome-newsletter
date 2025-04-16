import { get } from "svelte/store";
import store from "../../store.ts";

export default async function getNewsSourcesFromConfiguration(
  configId?: string
) {
  const response = await fetch(
    `${get(store).apiURL()}/configuration-news-sources?configId=${
      configId || get(store).configuratorEmail
    }`,
    {
      headers: {
        "x-auth-email": get(store).configuratorEmail,
        "x-auth-code": get(store).authCode,
      },
    }
  );

  if (!response.ok) return [];

  return await response.json();
}

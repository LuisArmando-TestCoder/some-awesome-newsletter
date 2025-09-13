import { get } from "svelte/store";
import store from "../../store";
import getAuthHeaders from "./getAuthHeaders";

export default async function getNewsSourcesFromConfiguration(
  configId?: string
) {
  const response = await fetch(
    `${get(store).apiURL()}/configuration-news-sources?configId=${
      configId || get(store).configuratorEmail
    }`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) return [];

  return await response.json();
}

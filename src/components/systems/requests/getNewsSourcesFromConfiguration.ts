import { get } from "svelte/store";
import store from "../../store";
import { request } from "$lib/api/client";

/** List news sources of a configuration. Returns [] on failure. */
export default async function getNewsSourcesFromConfiguration(configId?: string) {
  try {
    const data = await request<unknown[]>("/configuration-news-sources", {
      query: { configId: configId || get(store).configuratorEmail },
    });
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

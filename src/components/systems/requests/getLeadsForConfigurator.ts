import { get } from "svelte/store";
import store from "../../store";
import { request, seg } from "$lib/api/client";

/** Lead counters of the owner, keyed by subscriber email. Returns null on failure. */
export default async function getLeadsForConfigurator() {
  try {
    return await request<Record<string, unknown>>(`/leads/${seg(get(store).configuratorEmail)}`);
  } catch {
    return null;
  }
}

import { get } from "svelte/store";
import store from "../../store";
import getAuthHeaders from "./getAuthHeaders";
import type { Config } from "../../types";

/* helper for mutating the store in-place */
const patchStoreConfig = (cfg: Record<string, unknown>) =>
  store.update(s => ({ ...s, config: { ...s.config, ...cfg } }));

export default async function updateConfiguration(
  partialConfig: Record<string, unknown>
): Promise<Config | null> {
  const { configuratorEmail, authCode, apiURL } = get(store);

  /* ─────────── auth / urls ─────────── */
  const headers = getAuthHeaders();
  const getURL = `${apiURL()}/private-config?documentId=${getAuthHeaders()["x-auth-email"]}`;
  const putURL = `${apiURL()}/config?documentId=${getAuthHeaders()["x-auth-email"]}`;

  /* ─────────── fetch latest config first ─────────── */
  let latest: any = {};
  try {
    const r = await fetch(getURL, { headers });
    if (!r.ok) throw new Error(String(r.status));
    latest = await r.json();
  } catch (err) {
    console.error("[UPDATE-CFG] Could not retrieve latest config:", err);
    return null;
  }

  /* ─────────── merge & PUT ─────────── */
  const merged = { ...latest, ...partialConfig };
  let response;
  try {
    response = await fetch(putURL, {
      method: "PUT",
      headers,
      body: JSON.stringify(merged)
    });
  } catch (err) {
    console.error("[UPDATE-CFG] PUT failed:", err);
    return null;
  }
  if (!response.ok) {
    console.error("[UPDATE-CFG] PUT status:", response.status);
    return null;
  }

  /* ─────────── update local store with the config returned by backend ─────────── */
  try {
    let json = await response.json();          // backend now returns { message, config }
    if (json?.config) {
      patchStoreConfig(json.config);   
    } else {
      // fallback: refetch
      const r = await fetch(getURL, { headers });
      json = await r.json()
      if (r.ok) patchStoreConfig(json);
    }
    return json;
  } catch (error) {
    console.error(error);
    return null
  }

  return null;
}

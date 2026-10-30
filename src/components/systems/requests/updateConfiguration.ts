import store from "../../store";
import { request } from "$lib/api/client";
import { getCredentials } from "$lib/api/credentials";

/**
 * Owner email app passwords were removed for security (Luis, 2026-10-30). Issues always go out
 * from AIBAN's address with the owner's sender name, and replies go to the owner's account email.
 * This strips every email login field from config payloads and from the store copy, at the top
 * level, in `email`, and in each news source, so the frontend never sends or keeps them.
 */
const CREDENTIAL_KEYS = ["appPassword", "emailMaskSender"] as const;
export function stripEmailCredentials<T extends Record<string, unknown>>(cfg: T): T {
  if (!cfg || typeof cfg !== "object") return cfg;
  const out: Record<string, unknown> = { ...cfg };
  for (const k of CREDENTIAL_KEYS) delete out[k];
  if (out.email && typeof out.email === "object") {
    const email = { ...(out.email as Record<string, unknown>) };
    delete email.auth;
    out.email = email;
  }
  if (Array.isArray(out.newsSources)) {
    out.newsSources = out.newsSources.map((src) => {
      if (!src || typeof src !== "object") return src;
      const clean = { ...(src as Record<string, unknown>) };
      for (const k of CREDENTIAL_KEYS) delete clean[k];
      return clean;
    });
  }
  return out as T;
}

/* helper for mutating the store in-place */
const patchStoreConfig = (cfg: Record<string, unknown>) =>
  store.update((s) => ({ ...s, config: stripEmailCredentials({ ...s.config, ...cfg } as Record<string, unknown>) as typeof s.config }));

/**
 * Merge `partialConfig` into the latest saved config and save it.
 * Returns the backend answer ({ message, config }) or null on failure.
 * Throwing is avoided on purpose: callers check the return value.
 * Use `updateConfigurationOrThrow` to get the ApiError.
 */
export default async function updateConfiguration(
  partialConfig: Record<string, unknown>
): Promise<Record<string, unknown> | null> {
  try {
    return await updateConfigurationOrThrow(partialConfig);
  } catch (err) {
    console.error("[updateConfiguration] Save failed", err);
    return null;
  }
}

export async function updateConfigurationOrThrow(partialConfig: Record<string, unknown>): Promise<Record<string, unknown> | null> {
  const documentId = getCredentials().email;
  const latest = await request<Record<string, unknown>>("/private-config", {
    query: { documentId },
    dedupe: false,
  });
  const merged = stripEmailCredentials({ ...(latest || {}), ...partialConfig });
  const json = await request<{ config?: Record<string, unknown> } & Record<string, unknown>>("/config", {
    method: "PUT",
    query: { documentId },
    body: merged,
    idempotent: true,
    retries: 1,
  });
  if (json?.config) {
    patchStoreConfig(json.config);
    return json;
  }
  const fresh = await request<Record<string, unknown>>("/private-config", { query: { documentId }, dedupe: false });
  if (fresh) patchStoreConfig(fresh);
  return fresh;
}

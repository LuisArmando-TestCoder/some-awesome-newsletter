import { request, seg, withFallback } from "$lib/api/client";
import type { Config } from "../../types";

/** Fields that are safe to show on public pages (subscribe page, widget). */
export type PublicConfig = Pick<Config, "logo" | "newsletterTitle" | "senderName" | "newsletterSubject"> & {
  brandColor?: string;
  newsSources: Array<{ id: string; url?: string; newsletterTitle?: string; active?: boolean; isPublic?: boolean; lead?: string }>;
};

function toPublic(raw: any): PublicConfig {
  return {
    logo: raw?.logo,
    newsletterTitle: raw?.newsletterTitle,
    newsletterSubject: raw?.newsletterSubject,
    senderName: raw?.senderName,
    brandColor: raw?.brandColor,
    newsSources: Array.isArray(raw?.newsSources)
      ? raw.newsSources
          .filter((ns: any) => ns && typeof ns.id === "string")
          .map((ns: any) => ({
            id: ns.id,
            url: ns.url,
            newsletterTitle: ns.newsletterTitle,
            active: ns.active,
            isPublic: ns.isPublic,
            lead: ns.lead,
          }))
      : [],
  };
}

/**
 * Public information about a newsletter owner (title, sender, logo, public
 * sources). Returns null on failure. Only public fields are kept, whatever the
 * backend sends.
 *
 * Uses `GET /public-config/:configuratorId` (requested from WS7). Until it is
 * live, falls back to the legacy `GET /config` keyed by the owner's email.
 */
export default async function getPublicConfig(configuratorId: string): Promise<Config | null> {
  if (!configuratorId) return null;
  try {
    const raw = await withFallback(
      () => request(`/public-config/${seg(configuratorId)}`, { auth: "none", retries: 1 }),
      () => request("/config", { auth: { headers: { "x-auth-email": configuratorId } }, retries: 1 })
    );
    return toPublic(raw) as unknown as Config;
  } catch (error) {
    console.error("[getPublicConfig] Failed", error);
    return null;
  }
}

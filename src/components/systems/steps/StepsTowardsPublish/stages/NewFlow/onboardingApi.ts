/**
 * Backend calls used by the onboarding flow (WS3).
 * Built on WS6's typed client so timeouts, auth headers and error messages are consistent.
 * Endpoints are documented in docs/aiban/ws3-audit.md ("Backend facts").
 */
import { get } from "svelte/store";
import { request, seg } from "$lib/api/client";
import { LLM_TIMEOUT_MS } from "$lib/api/config";
import { isApiError } from "$lib/api/errors";
import store from "../../../../../store";

const configId = () => get(store).configuratorEmail as string;

export type PreviewInput = {
  url: string;
  lead: string;
  personality: string;
  linkSelector: string;
  language: string;
  config: Record<string, unknown>;
};

/** Build the first issue without saving anything. Returns the email HTML and a subject if the backend sends one. */
export async function generatePreview(input: PreviewInput): Promise<{ html: string; subject?: string }> {
  const data = await request<{ html?: string; subject?: string; title?: string }>("/news-source/generate-newsletter", {
    method: "POST",
    timeoutMs: LLM_TIMEOUT_MS,
    body: {
      newsSource: {
        url: input.url,
        lead: input.lead || input.url,
        personality: input.personality || "Warm, clear and helpful",
        linkSelector: input.linkSelector,
        includeImages: false,
      },
      language: input.language || "en",
      config: input.config,
    },
  });
  if (!data?.html) throw new Error("empty preview");
  return { html: data.html, subject: data.subject || data.title };
}

/** Send any HTML to a list of addresses, using the sender settings in `config` (unsaved values work). */
export async function sendHtml(html: string, subject: string, config: Record<string, unknown>, emails: string[]) {
  return request<{ message?: string }>("/news-source/send-email", {
    method: "POST",
    timeoutMs: 60_000,
    body: { html, subject, config, emails },
  });
}

/** Find the article links rule again for a URL. */
export async function findArticleRule(url: string, scheduleTime: string): Promise<string | null> {
  try {
    const json = await request<{ selector?: string }>(`/news-source/generate-selector/${seg(configId())}`, {
      method: "POST",
      timeoutMs: LLM_TIMEOUT_MS,
      body: { url, lead: url, personality: get(store).personality || "", scheduleTime },
    });
    return json?.selector ?? null;
  } catch {
    return null;
  }
}

/** Ask the backend to send the source's current issue to its subscribers now. */
export async function triggerSend(newsSourceId: string) {
  return request(`/news-source/${seg(configId())}/${seg(newsSourceId)}/trigger`, {
    method: "POST",
    timeoutMs: LLM_TIMEOUT_MS,
  });
}

export type InviteResult = { status: "sent"; invited: string[]; failed: string[] } | { status: "unavailable" };

/**
 * Invite contacts the owner typed in (decision 2026-10-30: invite, then expire).
 * They are NOT added as subscribers. The backend sends a personal invitation in the
 * contact's language and deletes invitations not accepted within 30 days.
 * Endpoint requested from WS7 (requests/7.md). Until it exists we store nothing.
 */
export async function inviteContacts(newsSourceId: string, emails: string[], language: string): Promise<InviteResult> {
  if (!emails.length) return { status: "sent", invited: [], failed: [] };
  try {
    const res = await request<{ invited?: string[]; failed?: string[] }>(`/invitations/${seg(configId())}/${seg(newsSourceId)}`, {
      method: "POST",
      body: { emails, language, expiresInDays: 30 },
    });
    return { status: "sent", invited: res?.invited ?? emails, failed: res?.failed ?? [] };
  } catch (e) {
    if (isApiError(e) && (e.code === "not_found" || e.code === "not_available")) return { status: "unavailable" };
    return { status: "sent", invited: [], failed: emails };
  }
}

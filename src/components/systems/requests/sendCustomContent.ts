import { get } from "svelte/store";
import store from "../../store.ts";
import type { Store as AppStoreType } from "../../types.ts";

export default async function sendCustomContent(
  configId: string,
  newsSourceId: string,
  content: string
): Promise<boolean> {
  if (!configId || !newsSourceId || !content.trim()) {
    console.error(
      "[sendCustomContent] Missing required fields: configId, newsSourceId, or content."
    );
    return false;
  }

  const appStore = get(store) as AppStoreType;
  const apiURLFunction = appStore.apiURL;
  const authCode = appStore.authCode;

  if (typeof apiURLFunction !== "function") {
    console.error(
      "[sendCustomContent] apiURL function not available in store."
    );
    return false;
  }

  // The backend endpoint will be POST /newsletter/send-custom-content
  // The body will contain configId, newsSourceId, and content.
  // Auth headers are x-auth-email (which is configId) and x-auth-code.
  const endpointUrl = `${apiURLFunction()}/newsletter/send-custom-content`;

  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-email": configId, // configuratorEmail is used as configId here
        "x-auth-code": authCode,
      },
      body: JSON.stringify({
        configId: configId, // Sending configId in body as well for clarity/consistency
        newsSourceId: newsSourceId,
        content: content,
      }),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error(
          `[sendCustomContent] API Error ${response.status}:`,
          errorData.message || errorData.error || response.statusText
        );
      } catch (e) {
        console.error(
          `[sendCustomContent] API Error ${response.status}: ${response.statusText}`
        );
      }
      return false;
    }
    
    // Assuming 202 Accepted means success for this async operation
    if (response.status === 202) {
        const successData = await response.json().catch(() => ({})); // Optional: get message from body
        console.log("[sendCustomContent] Success (202 Accepted):", successData.message || "Request accepted for processing.");
        return true;
    }

    // For other 2xx statuses, also treat as success
    console.log("[sendCustomContent] Success:", await response.json().catch(() => ({})));
    return true;

  } catch (error) {
    console.error("[sendCustomContent] Network or fetch error:", error);
    return false;
  }
}

import { get } from "svelte/store";
import store from "../../store.js"; // Add .js extension
import type { Store, Config } from "../../types.js"; // Import Store type from types.ts
import getAuthHeaders from "./getAuthHeaders.js";

interface SendEmailParams {
  html: string;
  subject: string;
  config: Config;
  emails: string[];
}

export default async function sendEmail({ html, subject, config, emails }: SendEmailParams): Promise<boolean> {
  const storeValue = get(store) as Store;
  const apiURL = storeValue.apiURL();

  const url = `${apiURL}/news-source/send-email`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        html,
        subject,
        config,
        emails
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error sending email (${response.status}): ${errorBody}`);
      const error: any = new Error(`HTTP error! status: ${response.status}`);
      error.response = response;
      try {
          const jsonError = JSON.parse(errorBody);
          throw new Error(jsonError.error || jsonError.message || "Failed to send email");
      } catch (e) {
          throw new Error("Failed to send email: " + errorBody);
      }
    }

    console.log(`Successfully sent email to ${emails.join(", ")}`);
    return true;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw error;
  }
}

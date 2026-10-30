import { request } from "$lib/api/client";
import type { Config } from "../../types";

interface SendEmailParams {
  html: string;
  subject: string;
  config: Config;
  emails: string[];
}

/** Send a rendered email to a list of addresses. Returns true; throws an Error with a safe message. */
export default async function sendEmail({ html, subject, config, emails }: SendEmailParams): Promise<boolean> {
  await request("/news-source/send-email", {
    method: "POST",
    body: { html, subject, config, emails },
    timeoutMs: 120_000,
    errorMessage: "We could not send the email. Check your sending settings and try again.",
  });
  return true;
}

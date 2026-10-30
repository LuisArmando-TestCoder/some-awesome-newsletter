import { get } from "svelte/store";
import store from "../../store";
import { importContacts } from "$lib/api/imports";

/**
 * Send a file or pasted text to the backend, which cleans it and adds the
 * contacts. Returns the list of added emails, or null on failure.
 * `newsSourceId` defaults to the first news source of the owner.
 */
export default async function getUsersFromRawFileOrText({
  file,
  text,
  newsSourceId,
}: {
  file?: File;
  text?: string;
  newsSourceId?: string;
}) {
  if (!file && !text) return null;
  const nsId = newsSourceId || get(store).config?.newsSources?.[0]?.id;
  if (!nsId) return null;
  const r = await importContacts({ file, text, newsSourceId: nsId });
  if (!r.added && r.errors.length) return null;
  return r.addedEmails.map((email) => ({ email }));
}

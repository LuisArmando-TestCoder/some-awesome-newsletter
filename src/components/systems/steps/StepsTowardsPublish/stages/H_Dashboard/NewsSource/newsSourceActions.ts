// src/lib/newsSourceActions.ts

import { validateFields } from "./validation";
import { errorMessage as messageOf } from "$lib/api/errors";

/** Fields every create/update payload carries. */
export type NewsSourcePayload = { url?: string; lead?: string; id?: string };

/**
 * Generic helper function for create/update news source actions.
 * @param fields Data object containing the user's form fields
 * @param transform Takes fields and transforms them into a valid payload
 * @param apiCall The create or update function that hits the server
 * @param setError Callback to set error messages locally
 * @param errorMessage Fallback error message
 * @param onSuccess Callback to invoke if successful
 */
export async function processNewsSourceAction<T, P extends NewsSourcePayload, R>(
  fields: T,
  transform: (fields: T) => P,
  apiCall: (payload: P, id?: string) => Promise<R>,
  setError: (msg: string) => void,
  errorMessage: string,
  onSuccess: (result: NonNullable<R>) => void
): Promise<void> {
  const payload = transform(fields);
  console.log("[newsSourceActions.ts] Payload:", payload);

  const validationError = validateFields({
    url: payload.url,
    lead: payload.lead,
  });
  if (validationError) {
    setError(validationError);
    return;
  }

  setError("");

  let result: R;
  try {
    result = await apiCall(payload, payload.id);
  } catch (e) {
    console.error("[NEWS-SOURCE-ERROR]", e);
    setError(messageOf(e) || errorMessage);
    return;
  }

  if (!result) {
    setError(errorMessage);
    return;
  }

  onSuccess(result);
}

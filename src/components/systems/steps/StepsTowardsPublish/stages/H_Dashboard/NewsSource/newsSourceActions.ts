// src/lib/newsSourceActions.ts

import { validateFields } from "./validation.ts";

/**
 * Generic helper function for create/update news source actions.
 * @param fields Data object containing the user's form fields
 * @param transform Takes fields and transforms them into a valid payload
 * @param apiCall The create or update function that hits the server
 * @param setError Callback to set error messages locally
 * @param errorMessage Fallback error message
 * @param onSuccess Callback to invoke if successful
 */
export async function processNewsSourceAction<T>(
  fields: T,
  transform: (fields: T) => any,
  apiCall: (payload: any, id?: string) => Promise<any>,
  setError: (msg: string) => void,
  errorMessage: string,
  onSuccess: (result: any) => void
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

  let result;
  try {
    result = await apiCall(payload, payload.id);
  } catch (e) {
    console.error("[NEWS-SOURCE-ERROR]", e);
    setError(errorMessage);
    return;
  }

  if (!result) {
    setError(errorMessage);
    return;
  }

  onSuccess(result);
}

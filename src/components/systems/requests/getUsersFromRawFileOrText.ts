import { get } from "svelte/store";
import store from "../../store.ts";

/**
 * Puedes usar esta función para enviar un archivo o texto crudo
 * y recibir un arreglo de usuarios estandarizados.
 */
export default async function getUsersFromRawFileOrText({
  file,
  text,
}: {
  file?: File;
  text?: string;
}) {
  let response: Response;
  const apiURL = get(store).apiURL();
  const endpoint = `${apiURL}/news-source/any-user-data-base-file-to-standard-format`;
  console.log(`[getUsersFromRawFileOrText] Starting. Input:`, { file: file?.name, text: text ? 'Provided' : undefined });
  console.log(`[getUsersFromRawFileOrText] Using endpoint: ${endpoint}`);

  // --- MODIFIED: Read file as text on frontend ---
  if (file) {
    console.log(`[getUsersFromRawFileOrText] Reading file as text: ${file.name}`);
    try {
      const fileText = await file.text();
      console.log(`[getUsersFromRawFileOrText] File read successfully, length: ${fileText.length}`);

      // Ensure auth code is trimmed of whitespace/newlines
      const authCode = get(store).authCode?.trim() ?? '';
      const configuratorEmail = get(store).configuratorEmail ?? '';

      const headers = {
        "x-auth-email": configuratorEmail,
        "x-auth-code": authCode,
        "Content-Type": "application/json", // Set content type to JSON
      };

      const body = JSON.stringify({ text: fileText }); // Send file content as text in JSON body

      console.log(`[getUsersFromRawFileOrText] Attempting fetch to ${endpoint} with text from file: ${file.name}`);
      console.log("[getUsersFromRawFileOrText] Headers being sent:", headers);
      // console.log("[getUsersFromRawFileOrText] Body being sent:", body); // Avoid logging potentially large body

      console.log("[getUsersFromRawFileOrText] Sending POST request with text data...");
      response = await fetch(endpoint, {
        method: "POST",
        body: body,
        headers: headers
      });

    } catch (readError) {
      console.error(`[getUsersFromRawFileOrText] Error reading file ${file.name}:`, readError);
      return null; // Return null if file reading fails
    }
  // --- END MODIFIED ---
  } else if (text) { // Keep existing text handling logic
    console.log("[getUsersFromRawFileOrText] Processing raw text.");
    // Ensure auth code is trimmed of whitespace/newlines
    const authCode = get(store).authCode?.trim() ?? '';
    const configuratorEmail = get(store).configuratorEmail ?? '';
    console.log("[getUsersFromRawFileOrText] Sending POST request with text data...");
    response = await fetch(endpoint, {
      method: "POST",
        headers: {
          "x-auth-email": configuratorEmail, // Use trimmed email
          "x-auth-code": authCode, // Use trimmed code
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );
  } else {
    console.warn("[getUsersFromRawFileOrText] No file or text provided. Aborting.");
    return null;
  }

  console.log(`[getUsersFromRawFileOrText] Received response status: ${response.status}`);
  if (!response.ok) {
    console.error("[getUsersFromRawFileOrText] Request failed. Status:", response.status, response.statusText);
    try {
      const errorBody = await response.text(); // Try to get error body
      console.error("[getUsersFromRawFileOrText] Error body:", errorBody);
    } catch (e) {
      console.error("[getUsersFromRawFileOrText] Could not read error body:", e);
    }
    return null;
  }

  try {
    const data = await response.json();
    console.log("[getUsersFromRawFileOrText] Successfully parsed response JSON:", data);
    return data;
  } catch (error) {
    console.error("[getUsersFromRawFileOrText] Failed to parse response JSON:", error);
    return null;
  }
}

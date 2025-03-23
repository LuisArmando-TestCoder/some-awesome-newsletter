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

  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    response = await fetch(
      `${
        get(store).apiURL
      }/news-source/any-user-data-base-file-to-standard-format`,
      {
        method: "POST",
        body: formData,
      }
    );
  } else if (text) {
    response = await fetch(
      `${
        get(store).apiURL
      }/news-source/any-user-data-base-file-to-standard-format`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );
  } else {
    console.warn("You must provide either a file or a text string.");
    return null;
  }

  if (!response.ok) {
    console.error("Failed to convert user data.");
    return null;
  }

  return await response.json();
}

import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";
import {
  foregroundColor,
  complementaryColor,
} from "../../ThemeChanger/store.ts";
import { getComplementaryColor } from "../inputs/ColorPicker/getColorSuggestions.ts";

async function getConfigFetchResponse(authHeaders: {
  [index: string]: string;
}) {
  let response = await fetch(
    `${get(store).apiURL}/private-config?documentId=${
      get(store).configuratorEmail
    }`,
    {
      method: "GET",
      headers: authHeaders,
    }
  );

  return response;
}

export default async () => {
  const authHeaders = {
    "x-auth-email": get(store).configuratorEmail,
    "x-auth-code": get(store).authCode,
    "Content-Type": "application/json",
  };
  let response = await getConfigFetchResponse(authHeaders);
  let json;

  if (!response.ok) {
    const body = {
      newsletterSubject: "Daily News",
      newsletterTitle: "Morning Bulletin",
      senderName: get(store).configuratorEmail.split("@")[0],
      scheduleTime: "0 12 * * *",
      brandColor:
        get(store).colorPalette[
          Math.floor(Math.random() * get(store).colorPalette.length)
        ],
      emailSignature: "Translated this news article for you",
    };

    await fetch(
      `${get(store).apiURL}/config?documentId=${get(store).configuratorEmail}`,
      {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(body),
      }
    );

    response = await getConfigFetchResponse(authHeaders);
  }

  json = await response.json();

  saveToStore({
    config: json,
  });

  foregroundColor.set(json.brandColor);
  complementaryColor.set(getComplementaryColor(json.brandColor));

  return response.ok;
};

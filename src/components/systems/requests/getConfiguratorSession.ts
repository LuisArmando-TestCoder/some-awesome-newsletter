import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";
import {
  foregroundColor,
  complementaryColor,
} from "../../ThemeChanger/store.ts";
import { getComplementaryColor } from "../inputs/ColorPicker/getColorSuggestions.ts";

export default async () => {
  const authHeaders = {
    "x-auth-email": get(store).configuratorEmail,
    "x-auth-code": get(store).authCode,
    "Content-Type": "application/json",
  };
  let response = await fetch(
    `${get(store).apiURL}/private-config?documentId=${
      get(store).configuratorEmail
    }`,
    {
      method: "GET",
      headers: authHeaders,
    }
  );
  let json;

  console.log("response", response.ok, response);

  if (!response.ok) {
    // first news source protocol
    response = await fetch(
      `${get(store).apiURL}/config?documentId=${get(store).configuratorEmail}`,
      {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          newsletterSubject: "Daily News",
          newsletterTitle: "Morning Bulletin",
          senderName: get(store).configuratorEmail.split("@")[0],
          scheduleTime: "0 12 * * *",
          brandColor:
            get(store).colorPalette[
              Math.floor(Math.random() * get(store).colorPalette.length)
            ],
          emailSignature: "I translated this news article for you, dearly "
        }),
      }
    );

    console.log("response", response.ok);

    return;
  }

  json = await response.json();

  saveToStore({
    config: json,
  });

  foregroundColor.set(json.brandColor);
  complementaryColor.set(getComplementaryColor(json.brandColor));

  console.log("json", json);

  return response.ok;
};

import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";

export default async () => {
  let response = await fetch(
    `${get(store).apiURL}/private-config?documentId=${
      get(store).configuratorEmail
    }`,
    {
      method: "GET",
      headers: {
        "x-auth-email": get(store).configuratorEmail,
        "x-auth-code": get(store).authCode,
      },
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
        headers: {
          "x-auth-email": get(store).configuratorEmail,
          "x-auth-code": get(store).authCode,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsletterSubject: "Daily News",
          newsletterTitle: "Morning Bulletin",
          senderName: get(store).configuratorEmail.split("@")[0],
          scheduleTime: "0 12 * * *",
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

  console.log("json", json);

  return response.ok;
};

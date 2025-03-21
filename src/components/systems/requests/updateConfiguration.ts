import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";

export default async (config: { [index: string]: string }) => {
  const authHeaders = {
    "x-auth-email": get(store).configuratorEmail,
    "x-auth-code": get(store).authCode,
    "Content-Type": "application/json",
  };
  let response = await fetch(
    `${get(store).apiURL}/config?documentId=${get(store).configuratorEmail}`,
    {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify({
        ...get(store),
      }),
    }
  );

  console.log("response", response.ok, response);

  if (response.ok) {
    saveToStore({
      config,
    });
    // json = await response.json();
  }

  return response.ok;
};

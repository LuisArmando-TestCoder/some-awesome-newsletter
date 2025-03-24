import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";
import {
  foregroundColor,
  complementaryColor,
} from "../../ThemeChanger/store.ts";
import { getComplementaryColor } from "../inputs/ColorPicker/getColorSuggestions.ts";
import createInitialConfiguratorConfig from "./createInitialConfiguratorConfig.ts";

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

  if (!response.ok) {
    await createInitialConfiguratorConfig(authHeaders);
    response = await getConfigFetchResponse(authHeaders);
  }

  const json = await response.json();

  saveToStore({
    config: json,
  });

  foregroundColor.set(json.brandColor);
  complementaryColor.set(getComplementaryColor(json.brandColor));

  return response.ok;
};

import { get } from "svelte/store";
import store, { saveToConfig, saveToStore } from "../../store.ts";
import {
  foregroundColor,
  complementaryColor,
} from "../../ThemeChanger/store.ts";
import { getComplementaryColor } from "../inputs/ColorPicker/getColorSuggestions.ts";
import createInitialConfiguratorConfig from "./createInitialConfiguratorConfig.ts";
import createNewsSource from "./createNewsSource.ts";
import { addNewsletterUser } from "./addNewsletterUserEndpoint.ts";
import subscribeNewsletterUser from "./subscribeNewsletterUser.ts";

async function getConfigFetchResponse(authHeaders: {
  [index: string]: string;
}) {
  console.log(get(store).apiURL, get(store).configuratorEmail);
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

  if (!json.newsSources || json.newsSources.length === 0) {
    const newsSource = await createNewsSource({
      type: "website",
      url: get(store).newsSource,
      country: "US",
      community: "Expats from US",
      lead: get(store).lead,
      scheduleTime: "0 6 * * *",
      personality: "Warm and professional journalist voice.",
    });

    await addNewsletterUser(
      get(store).configuratorEmail, 
      get(store).configuratorEmail, 
      newsSource.id
    );
  }

  foregroundColor.set(json.brandColor);
  complementaryColor.set(getComplementaryColor(json.brandColor));

  return response.ok;
};

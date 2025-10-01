import { get } from "svelte/store";
import store from "../../store";

import { addNewsletterUser } from "./addNewsletterUserEndpoint";

export default async function postSubscriber(
  subscriber: {
    email: string;
    name: string;
    bio: string;
    language: string;
    countryOfResidence: string;
  },
  apiKey: string
) {
  const configId = get(store).configuratorEmail;
  const newsSourceId = get(store).newsSourceId;

  if (!newsSourceId) {
    throw new Error("newsSourceId is not set in the store");
  }

    const response = await addNewsletterUser(
      { ...subscriber, newsSourcesConfigTuples: [] },
      configId,
      newsSourceId,
      apiKey
    );

  return response.message === "User added successfully.";
}

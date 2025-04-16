import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";

export default async function ask() {
  saveToStore({
    hasNewEmailCodeBeenSent: true,
  });

  const response = await fetch(
    `${get(store).apiURL()}/auth/${get(store).configuratorEmail}`,
    {
      method: "POST",
    }
  );

  if (response.ok) {
    saveToStore({
      hasNewEmailCodeBeenSent: false,
      hasAuthCodeAskFailed: true,
    });
  }
}

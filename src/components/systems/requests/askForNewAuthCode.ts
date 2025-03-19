import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";

export default async function ask(tries?: number) {
  saveToStore({
    hasNewEmailCodeBeenSent: true,
  });

  const response = await fetch(
    `${get(store).apiURL}/auth/${get(store).configuratorEmail}`,
    {
      method: "POST",
    }
  );

  if (response.ok) {
    if (tries === undefined) return ask(3);
    else if (tries > 0) return ask(tries - 1);

    saveToStore({
      hasNewEmailCodeBeenSent: false,
      hasAuthCodeAskFailed: true,
    });
  }
}

import { get } from "svelte/store";
import store, { saveToStore } from "../../store.ts";
import getConfiguratorSession from "./getConfiguratorSession.ts";

export default async (onSuccessCallback?: Function) => {
  const response = await fetch(
    `${get(store).apiURL}/auth/${get(store).configuratorEmail}?code=${
      get(store).authCode
    }`
  );

  saveToStore({
    isAuthCodeValid: response.ok,
  });

  if (!response.ok) {
    saveToStore({
      stepsIndex: 6, // todo: review: this is hard coded => if you change the position of the auth, you will be taken aback
    });
  }

  console.log("is ok", response.ok, get(store).hasNewEmailCodeBeenSent);

  if (response.ok && get(store).hasNewEmailCodeBeenSent) {
    saveToStore({
      hasNewEmailCodeBeenSent: false,
      stepsIndex: get(store).stepsIndex + 1,
    });
  }

  if (response.ok) {
    onSuccessCallback?.();
    getConfiguratorSession();
    saveToStore({
      directionsThatShouldDisappear: [-1],
      hasNewEmailCodeBeenSent: false,
    });
  }

  return response.ok;
};

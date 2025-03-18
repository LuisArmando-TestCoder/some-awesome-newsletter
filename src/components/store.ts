import { get, writable } from "svelte/store";
import type { Store } from "./types.ts";

const store = writable<Store>({
  stepsIndex: 0,
  hasInteracted: false, // don't save
  configuratorEmail: "",
  newsSource: "",
  lead: "",
  hasEmailCodeBeenSent: false,
  authCode: "",
  keysToSave: [
    "stepsIndex",
    "configuratorEmail",
    "newsSource",
    "hasEmailCodeBeenSent",
    "lead",
    "authCode",
  ],
});

export default store;

export function saveToStore(objectValue: { [index: string]: any }) {
  store.set({
    ...get(store),
    ...objectValue,
  });
}

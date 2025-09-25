import { onMount } from "svelte";
import store from "../store";
import askIsAuthCodeValid from "./requests/askIsAuthCodeValid";
import { get } from "svelte/store";

export function useConfigurator(callback: Function) {
  onMount(() => {
    const unsubscribe = store.subscribe(value => {
      if (value.isAuthCodeValid) {
        callback(value);
        unsubscribe();
      }
    });

    askIsAuthCodeValid(() => {
      const value = get(store);
      if (value.isAuthCodeValid) {
        callback(value);
        unsubscribe();
      }
    });
  });
}

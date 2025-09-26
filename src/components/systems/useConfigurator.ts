import { onMount } from "svelte";
import store from "../store";
import askIsAuthCodeValid from "./requests/askIsAuthCodeValid";
import { get } from "svelte/store";

export function useConfigurator(callback: Function) {
  let falsy = false;

  onMount(() => {
    let lastLogo: string | null = null;
    const unsubscribe = store.subscribe(value => {
      if (value.isAuthCodeValid) {
        callback(value);
      }
      if (value.config.logo !== lastLogo) {
        lastLogo = value.config.logo;
        callback(value);
      }
    });

    const interval = setInterval(() => {
      askIsAuthCodeValid(() => {
        const value = get(store);
        if (value.isAuthCodeValid && !falsy) {
          callback(value);
          unsubscribe();
          clearInterval(interval);
          falsy = true;
        }
      });
    }, 1e3);

    
  });
}

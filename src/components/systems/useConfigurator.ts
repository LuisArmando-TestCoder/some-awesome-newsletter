import { onMount } from "svelte";
import store from "../store";
import type { Store } from "../types";
import askIsAuthCodeValid from "./requests/askIsAuthCodeValid";
import { get } from "svelte/store";

/**
 * Run `callback(storeValue)` once the owner is signed in, and again when the
 * logo changes. Checks the stored code once on mount (no polling loop), and
 * cleans up its subscription when the component unmounts.
 */
export function useConfigurator(callback: (value: Store) => void) {
  onMount(() => {
    let lastLogo: string | null | undefined = undefined;
    let notifiedValid = false;

    const unsubscribe = store.subscribe((value) => {
      const logo = value.config?.logo ?? null;
      const logoChanged = lastLogo === undefined || logo !== lastLogo;
      lastLogo = logo;
      if (value.isAuthCodeValid && !notifiedValid) {
        notifiedValid = true;
        callback(value);
      } else if (logoChanged) {
        callback(value);
      }
    });

    if (!get(store).isAuthCodeValid && get(store).configuratorEmail && get(store).authCode) {
      askIsAuthCodeValid();
    }

    return unsubscribe;
  });
}

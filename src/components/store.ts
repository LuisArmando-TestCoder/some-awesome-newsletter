import { writable } from "svelte/store";
import type { Store } from "./types.ts";

export default writable<Store>({
  value: 0,
  hasInteracted: false,
  configuratorEmail: '',
  newsSource: ''
});

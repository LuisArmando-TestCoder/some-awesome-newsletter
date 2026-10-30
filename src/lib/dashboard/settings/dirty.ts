// WS4. True while the open settings tab has unsaved changes (set by SaveBar).
import { writable } from "svelte/store";
export const settingsDirty = writable(false);

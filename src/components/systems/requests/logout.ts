import store, { emptyStoreSnapshot, saveToConfig, saveToStore } from "../../store.ts";
import { complementaryColor, complementaryColorSnapshot, foregroundColor, foregroundColorSnapshot } from "../../ThemeChanger/theme-store.ts";
import type { Store } from "../../types.ts";

export default function logout() {
  foregroundColor.set(foregroundColorSnapshot);
  complementaryColor.set(complementaryColorSnapshot);
  saveToStore(emptyStoreSnapshot)
  deleteAllKeysToSaveInLocalStorage();
  window.location.href = "/"
}

function deleteAllKeysToSaveInLocalStorage() {
  store.subscribe((currentStore: Store) => {
    for (const key of currentStore.keysToSave) {
      localStorage.removeItem(key);
    }
  });
}
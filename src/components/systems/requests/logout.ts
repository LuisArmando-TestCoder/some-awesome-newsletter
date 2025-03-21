import store, { emptyStoreSnapshot } from "../../store.ts";
import { complementaryColor, complementaryColorSnapshot, foregroundColor, foregroundColorSnapshot } from "../../ThemeChanger/store.ts";

export default function logout() {
  store.set(emptyStoreSnapshot);
  foregroundColor.set(foregroundColorSnapshot);
  complementaryColor.set(complementaryColorSnapshot);
}

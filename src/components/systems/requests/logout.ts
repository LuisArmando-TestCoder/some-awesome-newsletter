import store, { emptyStoreSnapshot } from "../../store.ts";

export default function logout() {
  store.set(emptyStoreSnapshot);
}

// src/stores/userActions.ts
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

/**
 * Defines the payload for a user removal request.
 */
export interface UserRemovalPayload {
  email: string;
  newsSourceId: string;
}

/**
 * Writable store to hold the details of the latest user removal request.
 * The parent component should subscribe to this store, handle the removal,
 * and then typically reset the store to `null` to signify the request
 * has been processed.
 */
export const userRemovalRequestStore: Writable<UserRemovalPayload | null> =
  writable(null);

// Optional: You could add other user-related actions here in the future
// export const userEditRequestStore = writable(null);
// export const userBanRequestStore = writable(null);

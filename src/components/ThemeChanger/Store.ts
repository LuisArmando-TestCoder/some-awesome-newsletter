import { writable } from "svelte/store";

export const themeIndex = writable<number>();
export const foregroundColor = writable<string>("#03a9f4");
export const complementaryColor = writable<string>("#00bcd4");
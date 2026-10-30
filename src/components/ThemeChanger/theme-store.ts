import { writable } from "svelte/store";

// Legacy brand colors. Kept for the ColorPicker and Switch components.
// The app UI no longer recolors itself with these: it uses design tokens (src/styles/tokens.scss).
const COLOR_1 = "#03a9f4";
const COLOR_2 = "#03a9f4";

export const themeIndex = writable<number>(0);
export const foregroundColor = writable<string>(COLOR_1);
export const foregroundColorSnapshot = COLOR_1;
export const complementaryColor = writable<string>(COLOR_2);
export const complementaryColorSnapshot = COLOR_2;

/** Resolved theme. true when the dark theme is showing. */
export const isDarkTheme = writable<boolean>(false);

export type ThemePreference = "light" | "dark" | "system";
export type DensityPreference = "comfortable" | "compact";
export type MotionPreference = "system" | "reduced";

/** What the person chose in Display settings. "system" follows the operating system. */
export const themePreference = writable<ThemePreference>("system");
export const densityPreference = writable<DensityPreference>("comfortable");
export const motionPreference = writable<MotionPreference>("system");

const STORAGE = { theme: "theme", density: "density", motion: "motion" } as const;

function read(key: string): string | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage can be blocked; the preference then lasts for this page view only */
  }
}

/** Load saved preferences. Call once in the browser (ThemeChanger does this). */
export function loadDisplayPreferences() {
  const t = read(STORAGE.theme);
  themePreference.set(t === "light" || t === "dark" ? t : "system");
  densityPreference.set(read(STORAGE.density) === "compact" ? "compact" : "comfortable");
  motionPreference.set(read(STORAGE.motion) === "reduced" ? "reduced" : "system");
}

export function setThemePreference(value: ThemePreference) {
  themePreference.set(value);
  write(STORAGE.theme, value);
}

export function setDensityPreference(value: DensityPreference) {
  densityPreference.set(value);
  write(STORAGE.density, value);
}

export function setMotionPreference(value: MotionPreference) {
  motionPreference.set(value);
  write(STORAGE.motion, value);
}

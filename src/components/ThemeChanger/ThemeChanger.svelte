<!--
  ThemeChanger (WS1). Mount once per page (the root layout already does).
  It applies display preferences to <html>:
    data-theme="light|dark" (always set to the resolved theme, so legacy and token colors agree)
    data-density="compact" when chosen
    data-motion="reduced" when chosen
  It also keeps the legacy --color-* variables in sync, mapped to design tokens.
  visible={true} shows a labeled light/dark toggle. For the full menu use $lib/ui/molecules/SettingsMenu.svelte.
-->
<script lang="ts">
  import { onMount } from "svelte";
  import {
    isDarkTheme,
    themeIndex,
    themePreference,
    densityPreference,
    motionPreference,
    loadDisplayPreferences,
    setThemePreference,
  } from "./theme-store";

  export let visible: boolean = false;

  let mounted = false;
  let media: MediaQueryList | null = null;

  function resolveDark(pref: string): boolean {
    if (pref === "dark") return true;
    if (pref === "light") return false;
    return !!media?.matches;
  }

  // Legacy variable map. Index 0 is used in dark theme, 1 in light theme.
  // Names keep their historic (inverted) meaning: --color-background is the ink color,
  // --color-background-inversion is the page color.
  const legacy: Record<string, [string, string]> = {
    "color-background": ["var(--surface-inverse)", "var(--surface-inverse)"],
    "color-background-inversion": ["var(--surface-0)", "var(--surface-0)"],
    "color-background-opaque": [
      "color-mix(in srgb, var(--surface-inverse) 53%, transparent)",
      "color-mix(in srgb, var(--surface-inverse) 53%, transparent)",
    ],
    "color-background-opaque-inversion": [
      "color-mix(in srgb, var(--surface-0) 53%, transparent)",
      "color-mix(in srgb, var(--surface-0) 53%, transparent)",
    ],
    "color-background-very-opaque": [
      "color-mix(in srgb, var(--surface-inverse) 6%, transparent)",
      "color-mix(in srgb, var(--surface-inverse) 6%, transparent)",
    ],
    "color-background-very-opaque-inversion": [
      "color-mix(in srgb, var(--surface-0) 6%, transparent)",
      "color-mix(in srgb, var(--surface-0) 6%, transparent)",
    ],
    "color-foreground": ["var(--accent)", "var(--accent)"],
    "color-foreground-inversion": ["var(--accent)", "var(--accent-contrast)"],
    "color-foreground-opaque": [
      "color-mix(in srgb, var(--accent) 53%, transparent)",
      "color-mix(in srgb, var(--accent) 53%, transparent)",
    ],
    "color-foreground-opaque-inversion": [
      "color-mix(in srgb, var(--accent) 53%, transparent)",
      "color-mix(in srgb, var(--accent) 53%, transparent)",
    ],
    "color-foreground-very-opaque": [
      "color-mix(in srgb, var(--accent) 6%, transparent)",
      "color-mix(in srgb, var(--accent) 6%, transparent)",
    ],
    "color-foreground-very-opaque-inversion": [
      "color-mix(in srgb, var(--accent) 6%, transparent)",
      "color-mix(in srgb, var(--accent) 6%, transparent)",
    ],
    "color-outline": ["var(--border-2)", "var(--border-2)"],
    "color-outline-inversion": ["var(--surface-1)", "var(--surface-1)"],
    "color-untamed": ["var(--surface-2)", "var(--surface-2)"],
    "color-untamed-inversion": ["var(--text-1)", "var(--text-1)"],
    "color-tamed": ["var(--surface-3)", "var(--surface-3)"],
    "color-tamed-inversion": ["var(--text-2)", "var(--text-2)"],
    "bg-filter": ["contrast(85%) brightness(25%)", "contrast(15%) brightness(200%)"],
    "bg-filter-inversion": ["contrast(15%) brightness(200%)", "contrast(85%) brightness(25%)"],
    contrast: ["contrast(.9)", "contrast(.9)"],
    "contrast-inversion": ["contrast(1.2)", "contrast(.9)"],
    "color-variable": ["var(--surface-0)", "var(--surface-inverse)"],
    "color-variable-inversion": ["var(--surface-inverse)", "var(--surface-0)"],
    theme: ["dark", "light"],
    "theme-inversion": ["light", "dark"],
    "color-x-gradient": ["var(--surface-0)", "var(--surface-0)"],
    "color-x-gradient-inversion": ["var(--surface-inverse)", "var(--surface-inverse)"],
    "color-x-gradient-opaque": [
      "linear-gradient(180deg, color-mix(in srgb, var(--surface-0) 10%, transparent) 0%, color-mix(in srgb, var(--surface-0) 70%, transparent) 100%)",
      "linear-gradient(180deg, color-mix(in srgb, var(--surface-0) 10%, transparent) 0%, color-mix(in srgb, var(--surface-0) 70%, transparent) 100%)",
    ],
  };

  function apply() {
    if (!mounted) return;
    const dark = resolveDark($themePreference);
    if ($isDarkTheme !== dark) isDarkTheme.set(dark);
    themeIndex.set(+dark);
    const root = document.documentElement;
    root.setAttribute("data-theme", dark ? "dark" : "light");
    if ($densityPreference === "compact") root.setAttribute("data-density", "compact");
    else root.removeAttribute("data-density");
    if ($motionPreference === "reduced") root.setAttribute("data-motion", "reduced");
    else root.removeAttribute("data-motion");
    for (const [name, values] of Object.entries(legacy)) {
      root.style.setProperty(`--${name}`, dark ? values[0] : values[1]);
    }
  }

  onMount(() => {
    media = window.matchMedia("(prefers-color-scheme: dark)");
    loadDisplayPreferences();
    mounted = true;
    apply();
    const onChange = () => apply();
    media.addEventListener("change", onChange);
    const unsubs = [
      themePreference.subscribe(apply),
      densityPreference.subscribe(apply),
      motionPreference.subscribe(apply),
    ];
    return () => {
      media?.removeEventListener("change", onChange);
      unsubs.forEach((u) => u());
    };
  });

  // Backward compatibility: some code sets isDarkTheme directly.
  $: if (mounted && $isDarkTheme !== resolveDark($themePreference)) {
    setThemePreference($isDarkTheme ? "dark" : "light");
  }

  const toggleTheme = () => setThemePreference($isDarkTheme ? "light" : "dark");
</script>

{#if visible}
  <div class="theme-changer">
    <button
      type="button"
      class="theme-toggle"
      aria-pressed={$isDarkTheme}
      on:click={toggleTheme}
    >
      <svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        {#if $isDarkTheme}
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" fill="currentColor" />
        {:else}
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </g>
        {/if}
      </svg>
      <span class="label">{$isDarkTheme ? "Dark theme" : "Light theme"}</span>
    </button>
  </div>
{/if}

<style lang="scss">
  @use "./ThemeChanger.scss";
</style>

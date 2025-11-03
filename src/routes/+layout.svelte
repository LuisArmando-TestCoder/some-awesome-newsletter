<script lang="ts">
  import Header from "$lib/ui/organisms/Header.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
  import { beforeNavigate, afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import { globalLanguage } from "../components/store";
  import translations, { t } from "$lib/i18n/translations";
  import type en from '$lib/i18n/locales/en';
  export let data;

  type Translation = typeof en;
  type LanguageKey = keyof typeof translations;

  onMount(async () => {
    if (typeof navigator !== "undefined") {
      const lang = Object.keys(translations).find((O) =>
        navigator.language.includes(O)
      ) || 'en';
      if (lang) {
        t.set((translations as unknown as Record<LanguageKey, Translation>)[lang as LanguageKey]);
        await (async () => {
          // Simulate async loading if needed
          return new Promise((resolve) => setTimeout(resolve, 0));
        })();
        globalLanguage.set(lang);
      }

      console.log('Detected language:', lang, t);
    }
  });

  beforeNavigate((navigation) => {
	console.log('Before navigation:', navigation);
});

afterNavigate((navigation) => {
	console.log('After navigation:', navigation);
});
</script>

<ThemeChanger visible={false} />
<Header />
<slot />

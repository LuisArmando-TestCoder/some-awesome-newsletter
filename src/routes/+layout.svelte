<script>
  import Header from "$lib/ui/organisms/Header.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
  import { beforeNavigate, afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import { globalLanguage } from "../components/store";
  import translations from "$lib/i18n/translations";
  export let data;

  onMount(() => {
    if (typeof navigator !== "undefined") {
      const lang = Object.keys(translations).find((O) =>
        navigator.language.includes(O)
      ) || 'en';
      if (lang) {
        globalLanguage.set(lang);
      }

      console.log('Detected language:', lang, translations[lang]);
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

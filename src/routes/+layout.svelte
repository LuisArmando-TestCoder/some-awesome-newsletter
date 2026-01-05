<script lang="ts">
  import Header from "$lib/ui/organisms/Header.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
  import LanguagePicker from "$lib/ui/organisms/LanguagePicker.svelte";
  import { beforeNavigate, afterNavigate } from "$app/navigation";

  export let data;

  // Navigation logging (keeping these as they are helpful for debugging route changes)
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

<LanguagePicker />
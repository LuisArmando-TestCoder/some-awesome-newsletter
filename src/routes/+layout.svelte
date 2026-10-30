<script lang="ts">
  import "../styles/tokens.scss";
  import Header from "$lib/ui/organisms/Header.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
  import LanguagePicker from "$lib/ui/organisms/LanguagePicker.svelte";
  import Toaster from "$lib/ui/components/Toaster.svelte";
  import { beforeNavigate, afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";


  // The signup widget runs inside other sites in an iframe: no site header or language picker there (WS5 request).
  $: embed = $page.url.pathname.startsWith("/subscribe-widget");
  // The platform admin area (/admin, WS6) has its own full-screen shell.
  $: appShell = $page.url.pathname === "/admin" || $page.url.pathname.startsWith("/admin/");

  // Navigation logging only in development (WS1: removed noisy production logs)
  beforeNavigate((navigation) => {
    if (import.meta.env.DEV) console.debug('Before navigation:', navigation);
  });

  afterNavigate((navigation) => {
    if (import.meta.env.DEV) console.debug('After navigation:', navigation);
  });
</script>

<ThemeChanger visible={false} />
{#if !embed && !appShell}
  <Header />
{/if}

<slot />

{#if !embed && !appShell}
  <LanguagePicker />
{/if}

<!-- One toast region for the whole app (WS1). Safe next to the dashboard Notification: only one renders. -->
<Toaster />
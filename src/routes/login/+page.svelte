<script lang="ts">
  import { onMount } from 'svelte';
  import AuthForm, { type AuthCopy } from '$lib/ui/organisms/AuthForm.svelte';
  import { runtime } from '$lib/config/runtime';
    import { writable, type Writable } from 'svelte/store';
    import { globalLanguage } from '../../components/store';
    import { t } from '$lib/i18n/translations';
  let copy: Writable<AuthCopy> = writable({}); // Writable store for the copy content

  // Load JSON copy at runtime (kept simple; could be done in +page.ts too)
  onMount(async () => {
    console.info('[login] page_mount', { mock: runtime.isMockMode });
    copy.set($t.auth.login);
  });

  $: if ($globalLanguage) copy.set($t.auth.login);
</script>

<svelte:head>
  <title>{$t.auth.login.pageTitle ?? 'Log in'} • {runtime.appName}</title>
</svelte:head>

<main class="auth-route">
  {#key copy}  
    <AuthForm mode="login" bind:copy={copy} legal={{ termsUrl: runtime.legal.termsUrl, privacyUrl: runtime.legal.privacyUrl }} />
  {/key}
</main>

<style>
  /* Centred sign-in surface. The card owns its own spacing; this only gives it room. */
  .auth-route {
    display: grid;
    place-items: center;
    width: 100%;
    min-height: calc(100svh - var(--header-h));
    padding-block: var(--space-7);
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import AuthForm, { type AuthCopy } from '$lib/ui/organisms/AuthForm.svelte';
  import { runtime } from '$lib/config/runtime';
    import { globalLanguage } from '../../components/store';
    import { writable, type Writable } from 'svelte/store';
    import { t } from '$lib/i18n/translations';
  let copy: Writable<AuthCopy> = writable({}); // Writable store for the copy content

  onMount(async () => {
    console.info('[signup] page_mount', { mock: runtime.isMockMode });
    copy.set($t.auth.signup);
  });

  $: if ($globalLanguage) copy.set($t.auth.signup);
</script>

<svelte:head>
  <title>{$t.auth.signup.pageTitle ?? 'Sign up'} • {runtime.appName}</title>
</svelte:head>

<main class="auth-route">
  {#key copy}  
    <AuthForm mode="signup" bind:copy={copy} legal={{ termsUrl: runtime.legal.termsUrl, privacyUrl: runtime.legal.privacyUrl }} />
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

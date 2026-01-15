<script lang="ts">
  import { onMount } from 'svelte';
  import AuthForm from '$lib/ui/organisms/AuthForm.svelte';
  import { runtime } from '$lib/config/runtime';
  import { authContent } from '$lib/content/auth';
    import { globalLanguage } from '../../components/store';
    import { writable } from 'svelte/store';
    import { t } from '$lib/i18n/translations';
  let copy: any = writable({});// Writable store for the copy content

  onMount(async () => {
    console.info('[signup] page_mount', { mock: runtime.isMockMode });
    copy.set($t.auth.signup);
  });

  $: $globalLanguage && copy.set($t.auth.login);
</script>

<svelte:head>
  <title>Sign up • {runtime.appName}</title>
</svelte:head>

<div class="mx-auto flex min-h-[80svh] w-full max-w-7xl items-center justify-center px-4 py-10">
  {#key copy}  
    <AuthForm mode="signup" bind:copy={copy} legal={{ termsUrl: runtime.legal.termsUrl, privacyUrl: runtime.legal.privacyUrl }} />
  {/key}
</div>

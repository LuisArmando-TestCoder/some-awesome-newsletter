<script lang="ts">
  import { onMount } from 'svelte';
  import AuthForm from '$lib/ui/organisms/AuthForm.svelte';
  import { runtime } from '$lib/config/runtime';
  import { authContent } from '$lib/content/auth';
    import { writable } from 'svelte/store';
    import { globalLanguage } from '../../components/store';
    import { t } from '$lib/i18n/translations';
  let copy: any = writable({});// Writable store for the copy content
  export let data;

  // Load JSON copy at runtime (kept simple; could be done in +page.ts too)
  onMount(async () => {
    console.info('[login] page_mount', { mock: runtime.isMockMode });
    copy.set($authContent.login);
  });

  $: $globalLanguage && copy.set($t.auth.login);
</script>

<svelte:head>
  <title>Log in • {runtime.appName}</title>
</svelte:head>

<div class="mx-auto flex min-h-[80svh] w-full max-w-7xl items-center justify-center px-4 py-10">
  {#key copy}  
    <AuthForm mode="login" bind:copy={copy} legal={{ termsUrl: runtime.legal.termsUrl, privacyUrl: runtime.legal.privacyUrl }} />
  {/key}
</div>

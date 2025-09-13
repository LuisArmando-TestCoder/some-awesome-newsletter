<script lang="ts">
  import { onMount } from 'svelte';
  import AuthForm from '$lib/ui/organisms/AuthForm.svelte';
  import { runtime } from '$lib/config/runtime';
  import { authContent } from '$lib/content/auth';
  let copy: any;

  onMount(async () => {
    console.info('[signup] page_mount', { mock: runtime.isMockMode });
    copy = $authContent.signup;
  });
</script>

<svelte:head>
  <title>Sign up • {runtime.appName}</title>
</svelte:head>

<div class="mx-auto flex min-h-[80svh] w-full max-w-7xl items-center justify-center px-4 py-10">
  {#if copy}
    <AuthForm mode="signup" {copy} legal={{ termsUrl: runtime.legal.termsUrl, privacyUrl: runtime.legal.privacyUrl }} />
  {/if}
</div>

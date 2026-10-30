<script lang="ts">
  // Dedicated onboarding entry (WS3). Landing page CTAs can link here.
  // Signed-in owners go straight to setup inside /dashboard; everyone else signs up first.
  import { onMount } from "svelte";
  import { hasCredentials } from "$lib/api/credentials";
  import { ob } from "$lib/tutorial/copy";
  import { PREFILL_KEY } from "$lib/tutorial/onboardingState";

  let target = "/signup";

  onMount(() => {
    // Landing page can pass the website it already collected: /start?url=example.com
    try {
      const q = new URLSearchParams(window.location.search);
      const url = q.get("url") || q.get("site");
      if (url && url.length < 500) localStorage.setItem(PREFILL_KEY, url);
    } catch {
      /* storage blocked: the owner types the URL again */
    }
    let signedIn = false;
    try {
      signedIn = hasCredentials();
    } catch {
      signedIn = false;
    }
    target = signedIn ? "/dashboard" : "/signup";
    window.location.replace(target);
  });
</script>

<svelte:head>
  <title>{$ob.start.title}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="start">
  <p>{$ob.start.opening} <a href={target}>{$ob.start.continueHere}</a>.</p>
</main>

<style lang="scss">
  .start {
    min-height: 60vh;
    display: grid;
    place-items: center;
    padding: var(--space-6, 32px) var(--space-4, 16px);
    color: var(--text-2, #4a5058);
    font-size: var(--fs-md, 1rem);
    a { color: var(--text-link, #3b5bdb); }
  }
</style>

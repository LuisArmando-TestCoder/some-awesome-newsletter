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

<main class="start" aria-busy="true">
  <span class="start__dot" aria-hidden="true"></span>
  <p role="status">{$ob.start.opening} <a href={target}>{$ob.start.continueHere}</a>.</p>
</main>

<style lang="scss">
  /* A redirect page: quiet, centred, with a plain link in case the redirect is blocked. */
  .start {
    min-height: 60vh;
    display: grid;
    place-items: center;
    align-content: center;
    gap: var(--space-4);
    padding: var(--space-7) var(--gutter);
    color: var(--text-2);
    font-size: var(--fs-lg);
    text-align: center;

    p {
      margin: 0;
      max-width: 40ch;
    }

    a {
      color: var(--text-link);
      font-weight: var(--fw-medium);
    }
  }

  .start__dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: var(--radius-full);
    background: var(--text-1);
    animation: start-pulse 1.2s var(--ease-in-out) infinite;
  }

  @keyframes start-pulse {
    50% {
      opacity: 0.25;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .start__dot {
      animation: none;
    }
  }
</style>

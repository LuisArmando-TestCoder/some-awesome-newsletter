<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import VideoFacade from '../../components/demo/VideoFacade.svelte';

  const CANONICAL = 'https://aibanewsletter.club/demo';
  // Walkthrough video that the previous demo page already embedded.
  const VIDEO_ID = 'zPOFU2QY_HA';

  $: d = $t?.demoPage ?? {};
  $: metaTitle = d.metaTitle ?? 'Demo | AIBAN';
  $: metaDescription = d.metaDescription ?? '';
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />
  <link rel="canonical" href={CANONICAL} />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:url" content={CANONICAL} />
  <meta property="og:type" content="video.other" />
  <meta property="og:image" content={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`} />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://i.ytimg.com" />
</svelte:head>

<main class="demo">
  <header class="wrap page-hero demo__hero">
    <p class="page-eyebrow rise">{d.eyebrow ?? 'Demo'}</p>
    <h1 class="page-title rise rise-2">{d.title ?? 'See how AIBAN works'}</h1>
    <p class="page-lede rise rise-3">{d.lead ?? ''}</p>
  </header>

  <!-- The film: full container width, poster first, nothing loads from YouTube until play. -->
  <section class="wrap stage" aria-label={d.videoTitle ?? 'AIBAN walkthrough video'}>
    <VideoFacade videoId={VIDEO_ID} title={d.videoTitle ?? 'AIBAN walkthrough video'} playLabel={d.playLabel ?? 'Play the walkthrough video'} />
    <p class="caption">{d.videoNote ?? ''}</p>
  </section>

  <!-- Steps: the title stays in view on wide screens while the list scrolls (5/7). -->
  <section class="chapter" aria-labelledby="steps-title">
    <div class="wrap split">
      <h2 id="steps-title" class="chapter__title">{d.stepsTitle ?? 'What happens after you sign up'}</h2>
      <ol class="steps">
        {#each d.steps ?? [] as step, i (i)}
          <li class="step">
            <span class="step__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div class="step__text">
              <h3 class="step__title">{step.title}</h3>
              <p class="step__body">{step.body}</p>
            </div>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <!-- Closing slide: the one primary action of the page. -->
  <section class="chapter finale" aria-labelledby="cta-title">
    <div class="wrap finale__inner">
      <h2 id="cta-title" class="finale__title">{d.ctaTitle ?? 'Try it with your own website'}</h2>
      <p class="finale__body">{d.ctaBody ?? ''}</p>
      <div class="actions">
        <a class="cta" href="/start" data-cta="demo">{d.primaryCta ?? 'Start free'}</a>
        <a class="more" href="/pricing">{d.secondaryCta ?? 'See pricing'} <span class="more__arrow" aria-hidden="true">&#8250;</span></a>
      </div>
    </div>
  </section>
</main>

<style lang="scss">
  .demo {
    color: var(--text-1);
    font-family: var(--font-body);
    overflow-x: clip;
  }

  .wrap {
    width: 100%;
    max-width: var(--container-xl);
    margin-inline: auto;
    padding-inline: var(--gutter);
  }

  .demo__hero {
    padding-bottom: var(--space-7);
  }

  .stage {
    padding-bottom: calc(var(--section-pad) * 0.6);
  }
  .caption {
    margin: var(--space-4) 0 0;
    font-size: var(--fs-sm);
    color: var(--text-3);
  }

  .chapter {
    padding-block: calc(var(--section-pad) * 0.6);
    border-top: 1px solid var(--border-1);
  }

  .split {
    display: grid;
    gap: var(--space-7) var(--space-8);
  }
  @media (min-width: 56rem) {
    .split {
      grid-template-columns: 5fr 7fr;
      align-items: start;
    }
    .chapter__title {
      position: sticky;
      top: calc(var(--header-h) + var(--space-6));
    }
  }

  .chapter__title {
    margin: 0;
    max-width: 14ch;
    font-family: var(--font-display);
    font-size: var(--fs-4xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
  }

  .steps {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--border-1);
  }
  .step {
    display: grid;
    grid-template-columns: 3.5rem minmax(0, 1fr);
    gap: var(--space-4);
    padding-block: var(--space-6);
    border-bottom: 1px solid var(--border-1);
  }
  .step__num {
    padding-top: 0.2em;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    font-variant-numeric: tabular-nums;
    color: var(--text-3);
  }
  .step__title {
    margin: 0 0 var(--space-2);
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .step__body {
    margin: 0;
    max-width: 56ch;
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
    color: var(--text-2);
  }

  .finale {
    padding-block: var(--section-pad);
  }
  .finale__inner {
    display: grid;
    justify-items: start;
  }
  .finale__title {
    margin: 0;
    max-width: 16ch;
    font-family: var(--font-display);
    font-size: var(--step-chapter);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
  }
  .finale__body {
    margin: var(--space-5) 0 0;
    max-width: 38ch;
    font-size: var(--fs-lg);
    line-height: var(--lh-snug);
    color: var(--text-2);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4) var(--space-6);
    margin-top: var(--space-7);
  }

  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.5rem;
    padding: 0 var(--space-6);
    border-radius: var(--radius-full);
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    letter-spacing: -0.01em;
    text-decoration: none;
    transition:
      background-color var(--t-out) var(--ease-out),
      transform var(--t-out) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .cta:hover {
      background: var(--accent-hover);
      transition-duration: var(--t-in);
    }
  }
  .cta:active {
    transform: scale(0.97);
    transition-duration: 60ms;
  }

  .more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: 2.75rem;
    color: var(--text-1);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.25em;
    border-radius: var(--radius-sm);
    transition: text-decoration-color var(--t-out) var(--ease-out);
  }
  .more__arrow {
    display: inline-block;
    transition: transform var(--t-out) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .more:hover {
      text-decoration-color: currentColor;
      text-decoration-thickness: 2px;
      transition-duration: var(--t-in);
    }
    .more:hover .more__arrow {
      transform: translateX(3px);
    }
  }
  .more:active {
    opacity: 0.7;
  }

  .cta:focus-visible,
  .more:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  @media (prefers-reduced-motion: reduce) {
    .cta:active {
      transform: none;
    }
  }
  :global(:root[data-motion='reduced']) .cta:active {
    transform: none;
  }
</style>

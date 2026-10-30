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
</svelte:head>

<main class="page">
  <header class="page__hero">
    <p class="page__eyebrow">{d.eyebrow ?? 'Demo'}</p>
    <h1 class="page__title">{d.title ?? 'See how AIBAN works'}</h1>
    <p class="page__lead">{d.lead ?? ''}</p>
  </header>

  <section class="section" aria-label={d.videoTitle ?? 'AIBAN walkthrough video'}>
    <VideoFacade videoId={VIDEO_ID} title={d.videoTitle ?? 'AIBAN walkthrough video'} playLabel={d.playLabel ?? 'Play the walkthrough video'} />
    <p class="note">{d.videoNote ?? ''}</p>
  </section>

  <section class="section" aria-labelledby="steps-title">
    <h2 id="steps-title" class="section__title">{d.stepsTitle ?? 'What happens after you sign up'}</h2>
    <ol class="steps">
      {#each d.steps ?? [] as step, i (i)}
        <li class="step">
          <span class="step__num" aria-hidden="true">{i + 1}</span>
          <div>
            <h3 class="step__title">{step.title}</h3>
            <p class="step__body">{step.body}</p>
          </div>
        </li>
      {/each}
    </ol>
  </section>

  <section class="section cta" aria-labelledby="cta-title">
    <h2 id="cta-title" class="section__title">{d.ctaTitle ?? 'Try it with your own website'}</h2>
    <p>{d.ctaBody ?? ''}</p>
    <div class="actions">
      <a class="btn btn--primary" href="/start">{d.primaryCta ?? 'Start free'}</a>
      <a class="btn btn--secondary" href="/pricing">{d.secondaryCta ?? 'See pricing'}</a>
    </div>
  </section>
</main>

<style lang="scss">
  .page {
    max-width: var(--container-md, 880px);
    margin: 0 auto;
    padding: var(--space-8, 64px) var(--space-4, 16px) var(--space-10, 128px);
    color: var(--text-1, #0f172a);
    font-family: var(--font-body, inherit);
  }

  .page__hero { margin-bottom: var(--space-8, 64px); }

  .page__eyebrow {
    margin: 0 0 var(--space-2, 8px);
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-2, #475569);
  }

  .page__title {
    margin: 0 0 var(--space-4, 16px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-3xl, 2.5rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.15);
  }

  .page__lead {
    margin: 0;
    max-width: 60ch;
    font-size: var(--fs-lg, 1.125rem);
    line-height: var(--lh-normal, 1.6);
    color: var(--text-2, #475569);
  }

  .section { margin-bottom: var(--space-8, 64px); }

  .section__title {
    margin: 0 0 var(--space-4, 16px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-2xl, 1.75rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.2);
  }

  .section p {
    margin: 0 0 var(--space-4, 16px);
    max-width: 68ch;
    font-size: var(--fs-md, 1rem);
    line-height: var(--lh-normal, 1.7);
    color: var(--text-2, #475569);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3, 12px);
    margin-top: var(--space-5, 24px);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: var(--space-2, 8px) var(--space-5, 24px);
    border-radius: var(--radius-full, 999px);
    border: 1px solid transparent;
    font-size: var(--fs-md, 1rem);
    font-weight: var(--fw-semibold, 600);
    text-decoration: none;
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &--primary {
      background: var(--accent, #4f46e5);
      color: var(--accent-contrast, #fff);
      &:hover { background: var(--accent-hover, #4338ca); }
    }

    &--secondary {
      background: var(--surface-1, #fff);
      color: var(--text-1, #0f172a);
      border-color: var(--border-2, #cbd5e1);
      &:hover { background: var(--surface-2, #f1f5f9); }
    }
  }

  a:focus-visible {
    outline: 2px solid var(--focus-color, #6366f1);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .btn { transition: none; }
  }
  .section .note {
    margin-top: var(--space-3, 12px);
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-3, #64748b);
  }

  .steps {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-5, 24px);
  }

  .step {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-4, 16px);
    align-items: start;
  }

  .step__num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full, 999px);
    background: var(--accent-soft, #eef2ff);
    color: var(--text-1, #0f172a);
    font-weight: var(--fw-bold, 700);
    font-size: var(--fs-sm, 0.875rem);
  }

  .step__title {
    margin: var(--space-1, 4px) 0 var(--space-1, 4px);
    font-size: var(--fs-lg, 1.125rem);
    font-weight: var(--fw-semibold, 600);
  }

  .section .step__body { margin: 0; }

  .cta {
    padding: var(--space-6, 32px);
    border-radius: var(--radius-lg, 14px);
    background: var(--surface-2, #f1f5f9);
    margin-bottom: 0;
  }
</style>

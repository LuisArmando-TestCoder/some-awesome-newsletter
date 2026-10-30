<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import HelpForm from '$lib/ui/organisms/HelpForm.svelte';
  import HelpFaqs from '$lib/ui/organisms/HelpFaqs.svelte';

  export let data;

  const CANONICAL = 'https://aibanewsletter.club/help';

  $: hc = ($t as any)?.helpCenter ?? {};
  $: helpContent = ($t as any)?.help ?? {};
  $: groups = hc.groups ?? [];
  $: metaTitle = hc.metaTitle ?? 'Help | AIBAN';
  $: metaDescription = hc.metaDescription ?? '';

  // The server load still runs in mock mode with a placeholder user. Only a
  // real signed-in user is used to prefill the request form.
  $: formUser = data?.user && !data?.mockMode ? data.user : null;
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />
  <link rel="canonical" href={CANONICAL} />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:url" content={CANONICAL} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<main class="page">
  <header class="page__hero">
    <p class="page__eyebrow">{hc.eyebrow ?? 'Help center'}</p>
    <h1 class="page__title">{hc.title ?? 'How can we help?'}</h1>
    <p class="page__lead">{hc.lead ?? ''}</p>
  </header>

  <div class="page__body">
    <HelpFaqs
      {groups}
      searchLabel={hc.searchLabel}
      searchPlaceholder={hc.searchPlaceholder}
      clearLabel={hc.clearSearch}
      resultsTemplate={hc.resultsCount}
      noResultsText={hc.noResults}
      topicsLabel={hc.topicsLabel}
      copyLabel={hc.copyLink}
      copiedLabel={hc.linkCopied}
    />

    <section class="card" aria-labelledby="contact-title">
      <h2 id="contact-title" class="card__title">{hc.contactTitle ?? 'Still need help?'}</h2>
      <p class="card__text">{hc.contactBody ?? ''}</p>
      <a class="btn btn--secondary" href="mailto:info@aiban.news">{hc.emailCta ?? 'Email info@aiban.news'}</a>
    </section>

    <section id="higher-limits-form" class="card" aria-labelledby="limits-title">
      <h2 id="limits-title" class="card__title">{hc.limitsTitle ?? helpContent.title ?? 'Request higher limits'}</h2>
      <p class="card__text">{hc.limitsBody ?? helpContent.subtitle ?? ''}</p>
      <HelpForm user={formUser} content={helpContent} />
    </section>
  </div>
</main>

<style lang="scss">
  .page {
    max-width: var(--container-md, 880px);
    margin: 0 auto;
    padding: var(--space-8, 48px) var(--space-4, 16px) var(--space-10, 128px);
    color: var(--text-1, #0f172a);
    font-family: var(--font-body, inherit);
  }

  .page__hero {
    margin-bottom: var(--space-7, 48px);
  }

  .page__eyebrow {
    margin: 0 0 var(--space-2, 8px);
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-2, #475569);
  }

  .page__title {
    margin: 0 0 var(--space-3, 12px);
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

  .page__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-7, 48px);
  }

  .card {
    padding: var(--space-6, 32px);
    border: 1px solid var(--border-1, #e5e7eb);
    border-radius: var(--radius-lg, 14px);
    background: var(--surface-1, #fff);
    scroll-margin-top: calc(var(--header-h, 72px) + var(--space-4, 16px));
  }

  .card__title {
    margin: 0 0 var(--space-2, 8px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-xl, 1.375rem);
    font-weight: var(--fw-bold, 700);
  }

  .card__text {
    margin: 0 0 var(--space-5, 24px);
    color: var(--text-2, #475569);
    line-height: var(--lh-normal, 1.6);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: var(--space-2, 8px) var(--space-5, 24px);
    border-radius: var(--radius-full, 999px);
    font-weight: var(--fw-semibold, 600);
    text-decoration: none;
    border: 1px solid var(--border-2, #cbd5e1);
    background: var(--surface-1, #fff);
    color: var(--text-1, #0f172a);

    &:hover { background: var(--surface-2, #f1f5f9); }

    &:focus-visible {
      outline: 2px solid var(--focus-color, #6366f1);
      outline-offset: 2px;
    }
  }

  @media (max-width: 640px) {
    .card { padding: var(--space-5, 24px) var(--space-4, 16px); }
  }
</style>

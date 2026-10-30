<script lang="ts">
  import { t } from '$lib/i18n/translations';

  const CANONICAL = 'https://aibanewsletter.club/careers';
  const EMAIL = 'info@aiban.news';

  $: c = $t?.careers ?? {};
  $: metaTitle = c.metaTitle ?? 'Careers | AIBAN';
  $: metaDescription = c.metaDescription ?? '';
  $: mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(c.emailSubject ?? 'Working on AIBAN')}`;
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
    <p class="page__eyebrow">{c.eyebrow ?? 'Careers'}</p>
    <h1 class="page__title">{c.title ?? 'Careers at AIBAN'}</h1>
    <p class="page__lead">{c.lead ?? 'AIBAN has no open roles right now.'}</p>
  </header>

  <section class="section" aria-label={c.eyebrow ?? 'Careers'}>
    <p>{c.body ?? ''}</p>
    <div class="actions">
      <a class="btn btn--primary" href={mailto}>{c.emailCta ?? `Email ${EMAIL}`}</a>
      <a class="btn btn--tertiary" href="/about">{c.aboutCta ?? 'Read about AIBAN'}</a>
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

    &--tertiary {
      padding-inline: var(--space-2, 8px);
      color: var(--text-link, #4338ca);
      &:hover { text-decoration: underline; }
    }
  }

  a:focus-visible {
    outline: 2px solid var(--focus-color, #6366f1);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .btn { transition: none; }
  }
</style>

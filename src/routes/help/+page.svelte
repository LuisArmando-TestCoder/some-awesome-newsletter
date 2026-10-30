<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import HelpForm from '$lib/ui/organisms/HelpForm.svelte';
  import HelpFaqs from '$lib/ui/organisms/HelpFaqs.svelte';

  export let data;

  const CANONICAL = 'https://aibanewsletter.club/help';

  $: hc = $t?.helpCenter ?? {};
  $: helpContent = $t?.help ?? {};
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

<main class="help">
  <header class="wrap page-hero help__hero">
    <p class="page-eyebrow rise">{hc.eyebrow ?? 'Help center'}</p>
    <h1 class="page-title rise rise-2">{hc.title ?? 'How can we help?'}</h1>
    <p class="page-lede rise rise-3">{hc.lead ?? ''}</p>
  </header>

  <!-- Answers: the search sits right under the title, topics rail beside the questions. -->
  <section class="wrap help__answers" aria-label={hc.eyebrow ?? 'Help center'}>
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
  </section>

  <!-- Still stuck: write to us, or ask for higher limits (4/8). -->
  <section class="chapter" aria-labelledby="contact-title">
    <div class="wrap split">
      <div class="split__aside">
        <h2 id="contact-title" class="chapter__title">{hc.contactTitle ?? 'Still need help?'}</h2>
        <p class="chapter__text">{hc.contactBody ?? ''}</p>
        <a class="more" href="mailto:info@aiban.news">{hc.emailCta ?? 'Email info@aiban.news'} <span class="more__arrow" aria-hidden="true">&#8250;</span></a>
      </div>

      <section id="higher-limits-form" class="panel" aria-labelledby="limits-title">
        <h3 id="limits-title" class="panel__title">{hc.limitsTitle ?? helpContent.title ?? 'Request higher limits'}</h3>
        <p class="panel__text">{hc.limitsBody ?? helpContent.subtitle ?? ''}</p>
        <HelpForm user={formUser} content={helpContent} />
      </section>
    </div>
  </section>
</main>

<style lang="scss">
  .help {
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

  .help__hero {
    padding-bottom: var(--space-7);
  }

  .help__answers {
    padding-bottom: calc(var(--section-pad) * 0.6);
  }

  .chapter {
    padding-block: calc(var(--section-pad) * 0.6) var(--section-pad);
    border-top: 1px solid var(--border-1);
  }

  .split {
    display: grid;
    gap: var(--space-7) var(--space-8);
  }
  @media (min-width: 64rem) {
    .split {
      grid-template-columns: 4fr 8fr;
      align-items: start;
    }
    .split__aside {
      position: sticky;
      top: calc(var(--header-h) + var(--space-6));
    }
  }

  .chapter__title {
    margin: 0;
    max-width: 12ch;
    font-family: var(--font-display);
    font-size: var(--fs-4xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
  }
  .chapter__text {
    margin: var(--space-4) 0 var(--space-3);
    max-width: 36ch;
    font-size: var(--fs-lg);
    line-height: var(--lh-snug);
    color: var(--text-2);
  }

  .panel {
    min-width: 0;
    padding: clamp(var(--space-5), 4vw, var(--space-7));
    border: 1px solid var(--border-1);
    border-radius: var(--radius-2xl);
    background: var(--surface-0);
    scroll-margin-top: calc(var(--header-h) + var(--space-4));
  }
  /* Arrived from "Contact us" on the pricing page: the panel is marked, not moved. */
  .panel:target {
    border-color: var(--text-1);
  }
  .panel__title {
    margin: 0 0 var(--space-2);
    font-family: var(--font-display);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .panel__text {
    margin: 0 0 var(--space-6);
    max-width: 60ch;
    color: var(--text-2);
    line-height: var(--lh-normal);
  }

  .more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: 2.75rem;
    max-width: 100%;
    color: var(--text-1);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.25em;
    border-radius: var(--radius-sm);
    overflow-wrap: anywhere;
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
  .more:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
</style>

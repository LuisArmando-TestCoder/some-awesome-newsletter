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

<main class="careers">
  <header class="wrap page-hero">
    <p class="page-eyebrow rise">{c.eyebrow ?? 'Careers'}</p>
    <h1 class="page-title rise rise-2">{c.title ?? 'Careers at AIBAN'}</h1>
    <p class="page-lede rise rise-3">{c.lead ?? 'AIBAN has no open roles right now.'}</p>
  </header>

  <!-- One chapter, 8/4: the note on the left, the ways to act on the right. -->
  <section class="chapter" aria-label={c.eyebrow ?? 'Careers'}>
    <div class="wrap split">
      <p class="statement">{c.body ?? ''}</p>
      <div class="actions">
        <a class="pill" href={mailto}>
          <svg class="pill__icon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
          {c.emailCta ?? `Email ${EMAIL}`}
        </a>
        <a class="more" href="/about">{c.aboutCta ?? 'Read about AIBAN'} <span class="more__arrow" aria-hidden="true">&#8250;</span></a>
      </div>
    </div>
  </section>
</main>

<style lang="scss">
  .careers {
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

  .chapter {
    padding-block: calc(var(--section-pad) * 0.6) var(--section-pad);
    border-top: 1px solid var(--border-1);
  }

  .split {
    display: grid;
    gap: var(--space-7) var(--space-8);
  }
  @media (min-width: 56rem) {
    .split {
      grid-template-columns: 8fr 4fr;
      align-items: end;
    }
  }

  .statement {
    margin: 0;
    max-width: 30ch;
    font-family: var(--font-display);
    font-size: var(--fs-3xl);
    font-weight: var(--fw-medium);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
    text-wrap: pretty;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
  }

  /* Secondary pill: the page's main action, but the solid ink fill stays reserved for "Start free". */
  .pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    max-width: 100%;
    min-height: 3.5rem;
    padding: 0 var(--space-6);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    background: var(--surface-0);
    color: var(--text-1);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    text-decoration: none;
    overflow-wrap: anywhere;
    transition:
      background-color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      transform var(--t-out) var(--ease-out);
  }
  .pill__icon {
    flex: none;
    transition: transform var(--t-out) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .pill:hover {
      background: color-mix(in srgb, var(--text-1) var(--state-hover), var(--surface-0));
      border-color: var(--text-1);
      transition-duration: var(--t-in);
    }
    .pill:hover .pill__icon {
      transform: translateX(-2px);
    }
  }
  .pill:active {
    background: color-mix(in srgb, var(--text-1) var(--state-press), var(--surface-0));
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

  .pill:focus-visible,
  .more:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  @media (prefers-reduced-motion: reduce) {
    .pill:active {
      transform: none;
    }
  }
  :global(:root[data-motion='reduced']) .pill:active {
    transform: none;
  }
  @media (forced-colors: active) {
    .pill {
      border-color: ButtonText;
    }
  }
</style>

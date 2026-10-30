<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import Pricing from '$lib/ui/organisms/Pricing.svelte';
  import Faq from '$lib/ui/organisms/Faq.svelte';

  const CANONICAL = 'https://aibanewsletter.club/pricing';

  $: p = $t?.pricing ?? {};
  $: metaTitle = p.pageMetaTitle ?? 'Pricing | AIBAN';
  $: metaDescription = p.pageMetaDescription ?? '';
  $: billingFaq = ($t?.helpCenter?.groups ?? []).find((g: { id: string }) => g.id === 'billing')?.items ?? [];
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

<main class="pricing-page">
  <header class="wrap page-hero pricing-page__hero">
    <p class="page-eyebrow rise">{p.eyebrow ?? 'Pricing'}</p>
    <h1 class="page-title rise rise-2">{p.title ?? p.pageTitle ?? 'Plans and pricing'}</h1>
    <p class="page-lede pricing-page__lede rise rise-3">{p.pageLead ?? ''}</p>
    {#if $t?.mainPage?.disclaimer}
      <p class="pricing-page__note">{$t.mainPage.disclaimer}</p>
    {/if}
  </header>

  <!-- Plans: no entrance or scroll motion near money. -->
  <div class="wrap pricing-page__plans">
    <Pricing showHeader={false} />
  </div>

  {#if billingFaq.length}
    <section class="chapter" aria-labelledby="billing-faq-heading">
      <div class="wrap split">
        <h2 id="billing-faq-heading" class="chapter__title">{p.faqTitle ?? 'Billing questions'}</h2>
        <div class="split__body">
          <Faq items={billingFaq} title="" headingLevel={2} idPrefix="billing-faq" />
        </div>
      </div>
    </section>
  {/if}

  <section class="chapter chapter--contact" aria-label={p.contactText ?? 'Contact'}>
    <div class="wrap contact">
      <p class="contact__text">{p.contactText ?? 'Need higher limits or a custom setup?'}</p>
      <a class="more" href="/help#higher-limits-form">{p.contactCta ?? 'Contact us'} <span class="more__arrow" aria-hidden="true">&#8250;</span></a>
    </div>
  </section>
</main>

<style lang="scss">
  .pricing-page {
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

  .pricing-page__hero {
    padding-bottom: var(--space-8);
  }
  .pricing-page__lede {
    max-width: 46ch;
  }
  .pricing-page__note {
    margin: var(--space-4) 0 0;
    font-size: var(--fs-sm);
    color: var(--text-3);
  }

  .pricing-page__plans {
    padding-bottom: calc(var(--section-pad) * 0.6);
  }

  .chapter {
    padding-block: calc(var(--section-pad) * 0.6);
    border-top: 1px solid var(--border-1);
  }
  .chapter--contact {
    padding-bottom: var(--section-pad);
  }

  .split {
    display: grid;
    gap: var(--space-6) var(--space-8);
  }
  @media (min-width: 56rem) {
    .split {
      grid-template-columns: 5fr 7fr;
      align-items: start;
    }
  }
  .split__body {
    min-width: 0;
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

  .contact {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-4) var(--space-7);
  }
  .contact__text {
    margin: 0;
    max-width: 22ch;
    font-family: var(--font-display);
    font-size: var(--fs-3xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
  }

  .more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: 2.75rem;
    color: var(--text-1);
    font-size: var(--fs-lg);
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
  .more:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
</style>

<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import Pricing from '$lib/ui/organisms/Pricing.svelte';
  import Faq from '$lib/ui/organisms/Faq.svelte';

  const CANONICAL = 'https://aibanewsletter.club/pricing';

  $: p = ($t as any)?.pricing ?? {};
  $: metaTitle = p.pageMetaTitle ?? 'Pricing | AIBAN';
  $: metaDescription = p.pageMetaDescription ?? '';
  $: billingFaq = (($t as any)?.helpCenter?.groups ?? []).find((g: { id: string }) => g.id === 'billing')?.items ?? [];
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
  <header class="pricing-page__hero">
    <h1 class="pricing-page__title">{p.pageTitle ?? 'Pricing'}</h1>
    <p class="pricing-page__lead">{p.pageLead ?? ''}</p>
    {#if $t?.mainPage?.disclaimer}
      <p class="pricing-page__note">{$t.mainPage.disclaimer}</p>
    {/if}
  </header>

  <Pricing showHeader={false} />

  {#if billingFaq.length}
    <Faq items={billingFaq} title={p.faqTitle ?? 'Billing questions'} idPrefix="billing-faq" />
  {/if}

  <section class="pricing-page__contact" aria-label={p.contactText ?? 'Contact'}>
    <p>{p.contactText ?? 'Need higher limits or a custom setup?'}</p>
    <a class="btn btn--secondary" href="/help#higher-limits-form">{p.contactCta ?? 'Contact us'}</a>
  </section>
</main>

<style lang="scss">
  .pricing-page {
    padding: var(--space-8, 64px) 0 var(--space-10, 128px);
    color: var(--text-1, #0f172a);
    font-family: var(--font-body, inherit);
  }

  .pricing-page__hero {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 var(--space-4, 16px);
    text-align: center;
  }

  .pricing-page__title {
    margin: 0 0 var(--space-4, 16px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-4xl, 3rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.1);
  }

  .pricing-page__lead {
    margin: 0 0 var(--space-2, 8px);
    font-size: var(--fs-lg, 1.125rem);
    line-height: var(--lh-normal, 1.6);
    color: var(--text-2, #475569);
  }

  .pricing-page__note {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-3, #64748b);
  }

  .pricing-page__contact {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--space-4, 16px);
    max-width: var(--container-md, 880px);
    margin: 0 auto;
    padding: var(--space-6, 32px) var(--space-4, 16px);
    border-radius: var(--radius-lg, 14px);
    background: var(--surface-2, #f1f5f9);
    text-align: center;

    p { margin: 0; font-weight: var(--fw-semibold, 600); }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: var(--space-2, 8px) var(--space-5, 24px);
    border-radius: var(--radius-full, 999px);
    border: 1px solid var(--border-2, #cbd5e1);
    background: var(--surface-1, #fff);
    color: var(--text-1, #0f172a);
    font-weight: var(--fw-semibold, 600);
    text-decoration: none;

    &:hover { background: var(--surface-2, #f1f5f9); }

    &:focus-visible {
      outline: 2px solid var(--focus-color, #6366f1);
      outline-offset: 2px;
    }
  }
</style>

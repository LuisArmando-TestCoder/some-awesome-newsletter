<script lang="ts">
  import { t } from "../../../lib/i18n/translations";
  import BlogShell from "../../../components/articles/BlogShell.svelte";
  import BlogArticleCard from "../../../components/articles/BlogArticleCard.svelte";
  import BlogSearch from "../../../components/articles/BlogSearch.svelte";
  import BlogPagination from "../../../components/articles/BlogPagination.svelte";
  import LanguageTabs from "../../../components/articles/LanguageTabs.svelte";
  import SubscribeCta from "../../../components/articles/SubscribeCta.svelte";
  import BlogNotice from "../../../components/articles/BlogNotice.svelte";
  import {
    articlePath,
    blogPath,
    fmt,
    languageName,
    ownerName,
    SITE_ORIGIN,
    subscribePath,
  } from "../../../components/articles/blog";

  let { data } = $props();

  const name = $derived(ownerName(data.branding, data.holder));
  const blogName = $derived(data.ns && data.branding.newsletterTitle ? data.branding.newsletterTitle : name);
  const heroTitle = $derived(
    data.ns && data.branding.newsletterTitle ? data.branding.newsletterTitle : fmt($t.blog.heroFrom, { name })
  );
  const subscribeHref = $derived(subscribePath(data.holder, data.subscribeNs));
  const homeHref = $derived(blogPath(data.holder, { ns: data.ns }));
  const pageHref = (p: number) => blogPath(data.holder, { ns: data.ns, lang: data.activeLang, page: p });
  const langHref = (code: string) => blogPath(data.holder, { ns: data.ns, lang: code });
  const allCards = $derived(data.featured ? [data.featured, ...data.latest] : data.latest);
  const hasTextOnly = $derived(data.latest.some((c) => !c.imageUrl));
  const countLine = $derived(
    data.activeLang
      ? fmt(data.total === 1 ? $t.blog.articleCountOne : $t.blog.articleCount, {
          count: data.total,
          language: languageName(data.activeLang),
        })
      : ""
  );
  const canonical = $derived(
    `${SITE_ORIGIN}${blogPath(data.holder, { ns: data.ns, lang: data.languages.length > 1 ? data.activeLang : "", page: data.page })}`
  );
  const metaTitle = $derived(data.page > 1 ? `${fmt($t.blog.metaTitle, { name: blogName })} | ${fmt($t.blog.page, { page: data.page })}` : fmt($t.blog.metaTitle, { name: blogName }));
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={fmt($t.blog.metaDescription, { name: blogName })} />
  <link rel="canonical" href={canonical} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={fmt($t.blog.metaDescription, { name: blogName })} />
  <meta property="og:url" content={canonical} />
  {#if data.featured?.imageUrl}<meta property="og:image" content={data.featured.imageUrl} />{/if}
  {#if data.languages.length > 1}
    {#each data.languages as l (l.code)}
      <link rel="alternate" hreflang={l.code} href={`${SITE_ORIGIN}${langHref(l.code)}`} />
    {/each}
  {/if}
</svelte:head>

<BlogShell {blogName} {homeHref} {subscribeHref}>
  <section class="hero" aria-labelledby="blog-title">
    <div class="wrap">
      <p class="hero__eyebrow">{$t.blog.eyebrow}</p>
      <h1 id="blog-title">{heroTitle}</h1>
      <p class="hero__desc">{$t.blog.heroDescription}</p>
      <div class="hero__actions">
        <BlogSearch holder={data.holder} newsSourceId={data.ns} lang={data.activeLang} localCards={allCards} />
        <a class="btn btn--primary" href={subscribeHref}>{$t.blog.subscribe}</a>
      </div>
    </div>
  </section>

  <div class="wrap content">
    {#if data.error}
      <BlogNotice tone="error" title={$t.blog.errorTitle} body={$t.blog.errorBody}>
        <a class="btn btn--primary" href={pageHref(data.page)} data-sveltekit-reload>{$t.blog.reload}</a>
      </BlogNotice>
    {:else if data.languages.length === 0}
      <BlogNotice title={$t.blog.emptyTitle} body={$t.blog.emptyBody}>
        <a class="btn btn--primary" href={subscribeHref}>{$t.blog.subscribe}</a>
      </BlogNotice>
    {:else}
      <LanguageTabs languages={data.languages} active={data.activeLang} hrefFor={langHref} />
      <p class="count" aria-live="polite">{countLine}</p>

      {#if allCards.length === 0}
        <BlogNotice title={$t.blog.endTitle} body={$t.blog.endBody}>
          <a class="btn btn--secondary" href={pageHref(1)}>{$t.blog.backToNewest}</a>
        </BlogNotice>
      {:else}
        {#if data.featured}
          <section class="featured" aria-label={$t.blog.featured}>
            <BlogArticleCard
              card={data.featured}
              href={articlePath(data.holder, data.featured.id)}
              variant="featured"
              headingLevel={2}
              eager
            />
          </section>
        {/if}

        {#if data.latest.length > 0}
          <section class="latest" aria-labelledby="latest-title">
            <div class="section-head">
              <h2 id="latest-title">{$t.blog.latest}</h2>
              {#if hasTextOnly}<p class="section-hint">{$t.blog.latestHint}</p>{/if}
            </div>
            <ul class="grid">
              {#each data.latest as card (card.id)}
                <li><BlogArticleCard {card} href={articlePath(data.holder, card.id)} /></li>
              {/each}
            </ul>
          </section>
        {/if}

        <BlogPagination page={data.page} hasNext={data.hasNext} hrefFor={pageHref} />
      {/if}

      <div class="cta-wrap">
        <SubscribeCta name={blogName} href={subscribeHref} />
      </div>
    {/if}
  </div>
</BlogShell>

<style lang="scss">
  .wrap {
    max-width: var(--container-lg, 1200px);
    margin: 0 auto;
    padding-inline: var(--space-5, 24px);
  }

  .hero {
    padding: var(--space-8, 64px) 0 var(--space-7, 48px);
    background: linear-gradient(180deg, var(--accent-soft, transparent), var(--surface-0, #fff));
    border-bottom: 1px solid var(--border-1, #e5e5e5);
  }

  .hero__eyebrow {
    margin: 0 0 var(--space-3, 12px);
    font-size: var(--fs-xs, 0.75rem);
    font-weight: var(--fw-semibold, 600);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-2, #444);
  }

  h1 {
    margin: 0;
    max-width: 22ch;
    font-family: var(--font-display, inherit);
    font-size: var(--fs-4xl, 2.75rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.1);
    letter-spacing: -0.02em;
    color: var(--text-1, #111);
    overflow-wrap: anywhere;
  }

  .hero__desc {
    margin: var(--space-4, 16px) 0 0;
    max-width: 60ch;
    font-size: var(--fs-lg, 1.125rem);
    line-height: var(--lh-normal, 1.55);
    color: var(--text-2, #444);
  }

  .hero__actions {
    margin-top: var(--space-6, 32px);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3, 12px);
  }

  .content {
    padding-top: var(--space-6, 32px);
    padding-bottom: var(--space-9, 96px);
  }

  .count {
    margin: var(--space-4, 16px) 0 var(--space-5, 24px);
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #444);
  }

  .featured {
    margin-bottom: var(--space-8, 64px);
  }

  .section-head {
    margin-bottom: var(--space-5, 24px);

    h2 {
      margin: 0;
      font-family: var(--font-display, inherit);
      font-size: var(--fs-2xl, 1.75rem);
      font-weight: var(--fw-bold, 700);
      line-height: var(--lh-tight, 1.2);
      color: var(--text-1, #111);
    }
  }

  .section-hint {
    margin: var(--space-2, 8px) 0 0;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #444);
  }

  .grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
    gap: var(--space-5, 24px);
  }

  .cta-wrap {
    margin-top: var(--space-9, 96px);
  }

  @media (max-width: 600px) {
    .wrap {
      padding-inline: var(--space-4, 16px);
    }
    .hero {
      padding-top: var(--space-7, 48px);
    }
  }
</style>

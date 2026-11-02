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
  const subscribeHref = $derived(subscribePath(data.ref, data.subscribeNs));
  const homeHref = $derived(blogPath(data.ref, { ns: data.ns }));
  const pageHref = (p: number) => blogPath(data.ref, { ns: data.ns, lang: data.activeLang, page: p });
  const langHref = (code: string) => blogPath(data.ref, { ns: data.ns, lang: code });
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
    `${data.ref.origin}${blogPath(data.ref, { ns: data.ns, lang: data.languages.length > 1 ? data.activeLang : "", page: data.page })}`
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
      <p class="hero__eyebrow rise">{$t.blog.eyebrow}</p>
      <h1 id="blog-title" class="rise rise-2">{heroTitle}</h1>
      <p class="hero__desc rise rise-3">{$t.blog.heroDescription}</p>
      <div class="hero__actions">
        <BlogSearch holder={data.holder} ref={data.ref} newsSourceId={data.ns} lang={data.activeLang} localCards={allCards} />
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
              href={articlePath(data.ref, data.featured.id)}
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
                <li><BlogArticleCard {card} href={articlePath(data.ref, card.id)} /></li>
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
    max-width: var(--container-xl);
    margin: 0 auto;
    padding-inline: var(--gutter);
  }

  /* Masthead: eyebrow, the publication name at display scale, one quiet line. */
  .hero {
    padding: calc(var(--section-pad) * 0.6) 0 calc(var(--section-pad) * 0.4);
  }

  .hero__eyebrow {
    margin: 0 0 var(--space-4);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
  }

  h1 {
    margin: 0;
    max-width: 18ch;
    font-family: var(--font-display);
    font-size: var(--step-display);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
    color: var(--text-1);
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .hero__desc {
    margin: var(--space-5) 0 0;
    max-width: 40ch;
    font-size: var(--fs-xl);
    line-height: var(--lh-snug);
    color: var(--text-2);
    text-wrap: pretty;
  }

  .hero__actions {
    margin-top: var(--space-7);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }

  .content {
    padding-top: var(--space-5);
    padding-bottom: var(--section-pad);
  }

  .count {
    margin: var(--space-4) 0 var(--space-6);
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }

  .featured {
    margin-bottom: var(--space-9);
  }

  .section-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-2) var(--space-5);
    margin-bottom: var(--space-6);
    padding-top: var(--space-5);
    border-top: 1px solid var(--text-1);

    h2 {
      margin: 0;
      font-family: var(--font-display);
      font-size: var(--fs-3xl);
      font-weight: var(--fw-semibold);
      line-height: var(--lh-tight);
      letter-spacing: var(--tracking-display);
      color: var(--text-1);
    }
  }

  .section-hint {
    margin: 0;
    max-width: 48ch;
    font-size: var(--fs-sm);
    color: var(--text-3);
  }

  .grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr));
    gap: var(--space-8) var(--space-6);
  }

  .cta-wrap {
    margin-top: var(--section-pad);
  }
</style>

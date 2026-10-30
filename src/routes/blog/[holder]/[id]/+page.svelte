<script lang="ts">
  import { sanitizeHtml } from '$lib/utils/sanitizeHtml';
  import { t } from "../../../../lib/i18n/translations";
  import BlogShell from "../../../../components/articles/BlogShell.svelte";
  import BlogNotice from "../../../../components/articles/BlogNotice.svelte";
  import SubscribeCta from "../../../../components/articles/SubscribeCta.svelte";
  import {
    articlePath,
    blogPath,
    fmt,
    formatDate,
    languageName,
    ownerName,
    SITE_ORIGIN,
    subscribePath,
  } from "../../../../components/articles/blog";

  let { data } = $props();

  const name = $derived(ownerName(data.branding, data.holder));
  const blogName = $derived(data.branding.newsletterTitle || name);
  const subscribeHref = $derived(subscribePath(data.holder, data.ns));
  const homeHref = $derived(blogPath(data.holder, { ns: data.ns, lang: data.article?.language }));
  const canonical = $derived(`${SITE_ORIGIN}${articlePath(data.holder, data.id)}`);
  const date = $derived(data.article ? formatDate(data.article.isoDate, data.article.language || "en") : "");

  const jsonLd = $derived.by(() => {
    const a = data.article;
    if (!a) return "";
    const ld: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title.slice(0, 110),
      description: a.description,
      mainEntityOfPage: canonical,
      url: canonical,
      inLanguage: a.language || undefined,
      datePublished: a.isoDate || undefined,
      image: a.image ? [a.image] : undefined,
      author: data.branding.senderName ? { "@type": "Person", name: data.branding.senderName } : undefined,
      publisher: { "@type": "Organization", name: "AIBAN", url: SITE_ORIGIN },
    };
    // Escape "<" so the JSON can never close the script tag.
    const json = JSON.stringify(ld).replace(/</g, "\\u003c");
    return `<script type="application/ld+json">${json}</` + `script>`;
  });

  let copyState = $state<"idle" | "copied" | "failed">("idle");
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  async function copyLink() {
    clearTimeout(copyTimer);
    try {
      await navigator.clipboard.writeText(canonical);
      copyState = "copied";
    } catch {
      copyState = "failed";
    }
    copyTimer = setTimeout(() => (copyState = "idle"), 5000);
  }
</script>

<svelte:head>
  {#if data.article}
    <title>{data.article.title} | {blogName}</title>
    <meta name="description" content={data.article.description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.article.title} />
    <meta property="og:description" content={data.article.description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:site_name" content={blogName} />
    {#if data.article.language}<meta property="og:locale" content={data.article.language} />{/if}
    {#if data.article.isoDate}<meta property="article:published_time" content={data.article.isoDate} />{/if}
    {#if data.article.image}<meta property="og:image" content={data.article.image} />{/if}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={data.article.title} />
    <meta name="twitter:description" content={data.article.description} />
    {#if data.article.image}<meta name="twitter:image" content={data.article.image} />{/if}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD with "<" escaped, so it cannot close the script tag -->
    {@html jsonLd}
  {:else}
    <title>{data.status === "notfound" ? $t.blog.article.notFoundTitle : $t.blog.article.errorTitle} | {blogName}</title>
    <meta name="robots" content="noindex" />
  {/if}
</svelte:head>

<BlogShell {blogName} {homeHref} {subscribeHref}>
  {#if !data.article}
    <div class="wrap">
      {#if data.status === "notfound"}
        <BlogNotice headingLevel={1} title={$t.blog.article.notFoundTitle} body={$t.blog.article.notFoundBody}>
          <a class="btn btn--primary" href={homeHref}>{$t.blog.article.goToBlog}</a>
        </BlogNotice>
      {:else}
        <BlogNotice headingLevel={1} tone="error" title={$t.blog.article.errorTitle} body={$t.blog.article.errorBody}>
          <a class="btn btn--primary" href={articlePath(data.holder, data.id)} data-sveltekit-reload>{$t.blog.reload}</a>
          <a class="btn btn--secondary" href={homeHref}>{$t.blog.article.goToBlog}</a>
        </BlogNotice>
      {/if}
    </div>
  {:else}
    <article class="wrap post" lang={data.article.language || undefined}>
      <a class="link back" href={homeHref}><span aria-hidden="true">&larr;</span> {$t.blog.article.back}</a>

      <header class="post__header">
        <h1 class="rise">{data.article.title}</h1>
        <p class="post__meta">
          {#if data.branding.senderName}<span>{fmt($t.blog.article.by, { name: data.branding.senderName })}</span>{/if}
          {#if date}<time datetime={data.article.isoDate}>{fmt($t.blog.article.published, { date })}</time>{/if}
          <span>{fmt($t.blog.minRead, { n: data.article.minutes })}</span>
        </p>
      </header>

      <div class="prose">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
        {@html sanitizeHtml(data.article.content)}
      </div>

      <section class="share" aria-labelledby="share-title">
        <h2 id="share-title">{$t.blog.article.share}</h2>
        <div class="share__row">
          <button class="btn btn--secondary" type="button" onclick={copyLink}>
            <svg class="share__icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.5 9.5l3-3M7 4.5l1.2-1.2a2.6 2.6 0 0 1 3.7 3.7L10.7 8.2M9 11.5l-1.2 1.2a2.6 2.6 0 0 1-3.7-3.7L5.3 7.8" /></svg>
            {$t.blog.article.copyLink}
          </button>
          <p class="share__status" class:failed={copyState === "failed"} class:done={copyState === "copied"} role="status" aria-live="polite">
            {#if copyState === "copied"}<svg class="share__icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" /></svg>{$t.blog.article.copied}{:else if copyState === "failed"}{$t.blog.article.copyFailed}{/if}
          </p>
        </div>
      </section>

      <div class="post__cta">
        <SubscribeCta name={blogName} href={subscribeHref} />
      </div>

      {#if data.otherLanguages.length > 0}
        <nav class="langs" aria-labelledby="langs-title">
          <h2 id="langs-title">{$t.blog.article.otherLanguages}</h2>
          <p>{$t.blog.article.otherLanguagesHint}</p>
          <ul>
            {#each data.otherLanguages as l (l.code)}
              <li>
                <a class="btn btn--secondary btn--sm" hreflang={l.code} href={blogPath(data.holder, { ns: data.ns, lang: l.code })}>
                  {languageName(l.code)}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      {/if}
    </article>
  {/if}
</BlogShell>

<style lang="scss">
  .wrap {
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: var(--space-7) var(--gutter) var(--section-pad);
  }

  /* One reading column: 68ch body, the title allowed a little wider. */
  .post {
    max-width: calc(68ch + 2 * var(--gutter));
  }

  .back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    font-size: var(--fs-sm);

    span {
      transition: transform var(--dur-base) var(--ease-out);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover span {
        transform: translateX(-3px);
      }
    }
  }

  .post__header {
    margin: var(--space-7) 0 var(--space-8);
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--border-1);

    h1 {
      margin: 0;
      font-family: var(--font-display);
      font-size: clamp(2.25rem, 1.5rem + 3.2vw, 4.25rem);
      font-weight: var(--fw-semibold);
      line-height: var(--lh-display);
      letter-spacing: var(--tracking-display);
      color: var(--text-1);
      text-wrap: balance;
      overflow-wrap: anywhere;
    }
  }

  .post__meta {
    margin: var(--space-5) 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-3);
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;

    > * + *::before {
      content: "\00B7";
      margin-inline-end: var(--space-3);
      color: var(--border-2);
    }

    > :first-child {
      color: var(--text-1);
      font-weight: var(--fw-medium);
    }
  }

  /* Long-form typography for the generated article HTML. */
  .prose {
    max-width: 68ch;
    font-size: var(--fs-lg);
    line-height: 1.65;
    color: var(--text-1);
    overflow-wrap: break-word;
    hanging-punctuation: first;

    :global(> * + *) {
      margin-top: 1.25em;
    }
    :global(> :first-child) {
      margin-top: 0;
    }
    :global(p) {
      margin-bottom: 0;
      text-wrap: pretty;
    }
    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4) {
      font-family: var(--font-display);
      font-weight: var(--fw-semibold);
      line-height: var(--lh-tight);
      letter-spacing: var(--tracking-tight);
      color: var(--text-1);
      margin-top: 2.2em;
      margin-bottom: 0;
      text-wrap: balance;
    }
    :global(h1 + *),
    :global(h2 + *),
    :global(h3 + *),
    :global(h4 + *) {
      margin-top: 0.75em;
    }
    :global(h1),
    :global(h2) {
      font-size: var(--fs-2xl);
    }
    :global(h3) {
      font-size: var(--fs-xl);
    }
    :global(h4) {
      font-size: var(--fs-lg);
    }
    :global(a) {
      color: var(--text-link);
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 0.2em;
    }
    :global(strong),
    :global(b) {
      font-weight: var(--fw-semibold);
    }
    :global(img),
    :global(video),
    :global(iframe) {
      display: block;
      max-width: 100%;
      height: auto;
      margin-inline: auto;
      border-radius: var(--radius-lg);
    }
    :global(figure) {
      margin-inline: 0;
    }
    :global(figcaption) {
      margin-top: var(--space-3);
      font-size: var(--fs-sm);
      color: var(--text-3);
      text-align: center;
    }
    :global(ul),
    :global(ol) {
      padding-left: 1.4em;
    }
    :global(li + li) {
      margin-top: 0.4em;
    }
    :global(li::marker) {
      color: var(--text-3);
    }
    /* Pull quote: larger, ink rule, no color. */
    :global(blockquote) {
      margin-inline: 0;
      padding: var(--space-1) 0 var(--space-1) var(--space-5);
      border-left: 2px solid var(--text-1);
      color: var(--text-1);
      font-size: var(--fs-xl);
      line-height: var(--lh-snug);
      letter-spacing: var(--tracking-tight);
      font-style: normal;
    }
    :global(hr) {
      border: 0;
      border-top: 1px solid var(--border-1);
      margin-block: 2.5em;
    }
    :global(code) {
      font-family: var(--font-mono);
      font-size: 0.88em;
      background: var(--surface-2);
      padding: 0.1em 0.35em;
      border-radius: var(--radius-sm);
    }
    :global(pre) {
      overflow-x: auto;
      padding: var(--space-4);
      background: var(--surface-2);
      border-radius: var(--radius-md);
      font-size: var(--fs-sm);
    }
    :global(pre code) {
      background: none;
      padding: 0;
    }
    :global(table) {
      display: block;
      width: 100%;
      overflow-x: auto;
      border-collapse: collapse;
      font-size: var(--fs-md);
      font-variant-numeric: tabular-nums;
    }
    :global(th),
    :global(td) {
      padding: var(--space-2) var(--space-3);
      border-bottom: 1px solid var(--border-1);
      text-align: left;
      vertical-align: top;
    }
    :global(th) {
      font-weight: var(--fw-semibold);
      background: var(--surface-1);
    }
  }

  .share {
    margin-top: var(--space-9);
    padding-top: var(--space-5);
    border-top: 1px solid var(--border-1);

    h2 {
      margin: 0 0 var(--space-3);
      font-family: var(--font-body);
      font-size: var(--fs-sm);
      font-weight: var(--fw-semibold);
      letter-spacing: 0;
      color: var(--text-3);
    }
  }

  .share__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
  }

  .share__icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .share__status {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--text-2);

    &.done {
      color: var(--success);
      font-weight: var(--fw-medium);
    }

    &.failed {
      color: var(--danger);
      font-weight: var(--fw-medium);
    }
  }

  .post__cta {
    margin-top: var(--space-9);
  }

  .langs {
    margin-top: var(--space-8);

    h2 {
      margin: 0 0 var(--space-2);
      font-size: var(--fs-lg);
      font-weight: var(--fw-semibold);
      color: var(--text-1);
    }

    p {
      margin: 0 0 var(--space-4);
      color: var(--text-3);
      font-size: var(--fs-sm);
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
  }

  @media (max-width: 600px) {
    .prose {
      font-size: var(--fs-md);
      line-height: 1.6;
    }
  }

  @media print {
    .back,
    .share,
    .post__cta,
    .langs {
      display: none;
    }
  }
</style>

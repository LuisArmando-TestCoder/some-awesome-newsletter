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
        <h1>{data.article.title}</h1>
        <p class="post__meta">
          {#if data.branding.senderName}<span>{fmt($t.blog.article.by, { name: data.branding.senderName })}</span>{/if}
          {#if date}<time datetime={data.article.isoDate}>{fmt($t.blog.article.published, { date })}</time>{/if}
          <span>{fmt($t.blog.minRead, { n: data.article.minutes })}</span>
        </p>
      </header>

      <div class="prose">
        {@html sanitizeHtml(data.article.content)}
      </div>

      <section class="share" aria-labelledby="share-title">
        <h2 id="share-title">{$t.blog.article.share}</h2>
        <div class="share__row">
          <button class="btn btn--secondary" type="button" onclick={copyLink}>{$t.blog.article.copyLink}</button>
          <p class="share__status" class:failed={copyState === "failed"} role="status" aria-live="polite">
            {#if copyState === "copied"}{$t.blog.article.copied}{:else if copyState === "failed"}{$t.blog.article.copyFailed}{/if}
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
    max-width: var(--container-lg, 1200px);
    margin: 0 auto;
    padding: var(--space-6, 32px) var(--space-5, 24px) var(--space-9, 96px);
  }

  .post {
    max-width: calc(68ch + 2 * var(--space-5, 24px));
  }

  .back {
    display: inline-flex;
    gap: var(--space-2, 8px);
    font-size: var(--fs-sm, 0.875rem);
  }

  .post__header {
    margin: var(--space-6, 32px) 0 var(--space-7, 48px);

    h1 {
      margin: 0;
      font-family: var(--font-display, inherit);
      font-size: var(--fs-4xl, 2.5rem);
      font-weight: var(--fw-bold, 700);
      line-height: var(--lh-tight, 1.15);
      letter-spacing: -0.02em;
      color: var(--text-1, #111);
      overflow-wrap: anywhere;
    }
  }

  .post__meta {
    margin: var(--space-4, 16px) 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2, 8px) var(--space-4, 16px);
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #444);
  }

  /* Long-form typography for the generated article HTML. */
  .prose {
    max-width: 68ch;
    font-size: var(--fs-lg, 1.125rem);
    line-height: 1.7;
    color: var(--text-1, #111);
    overflow-wrap: break-word;

    :global(> * + *) {
      margin-top: 1.25em;
    }
    :global(> :first-child) {
      margin-top: 0;
    }
    :global(p) {
      margin-bottom: 0;
    }
    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4) {
      font-family: var(--font-display, inherit);
      font-weight: var(--fw-bold, 700);
      line-height: var(--lh-tight, 1.25);
      color: var(--text-1, #111);
      margin-top: 2em;
      margin-bottom: 0;
    }
    :global(h1),
    :global(h2) {
      font-size: var(--fs-2xl, 1.75rem);
    }
    :global(h3) {
      font-size: var(--fs-xl, 1.375rem);
    }
    :global(h4) {
      font-size: var(--fs-lg, 1.125rem);
    }
    :global(a) {
      color: var(--text-link, #2563eb);
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
    :global(img),
    :global(video),
    :global(iframe) {
      display: block;
      max-width: 100%;
      height: auto;
      margin-inline: auto;
      border-radius: var(--radius-lg, 16px);
    }
    :global(figure) {
      margin-inline: 0;
    }
    :global(figcaption) {
      margin-top: var(--space-2, 8px);
      font-size: var(--fs-sm, 0.875rem);
      color: var(--text-2, #444);
      text-align: center;
    }
    :global(ul),
    :global(ol) {
      padding-left: 1.4em;
    }
    :global(li + li) {
      margin-top: 0.4em;
    }
    :global(blockquote) {
      margin-inline: 0;
      padding: var(--space-2, 8px) 0 var(--space-2, 8px) var(--space-5, 24px);
      border-left: 3px solid var(--accent, #2563eb);
      color: var(--text-2, #444);
      font-style: normal;
    }
    :global(hr) {
      border: 0;
      border-top: 1px solid var(--border-1, #e5e5e5);
      margin-block: 2.5em;
    }
    :global(code) {
      font-family: var(--font-mono, monospace);
      font-size: 0.9em;
      background: var(--surface-2, #f3f3f3);
      padding: 0.1em 0.35em;
      border-radius: var(--radius-sm, 4px);
    }
    :global(pre) {
      overflow-x: auto;
      padding: var(--space-4, 16px);
      background: var(--surface-2, #f3f3f3);
      border-radius: var(--radius-md, 8px);
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
      font-size: var(--fs-md, 1rem);
    }
    :global(th),
    :global(td) {
      padding: var(--space-2, 8px) var(--space-3, 12px);
      border-bottom: 1px solid var(--border-1, #e5e5e5);
      text-align: left;
      vertical-align: top;
    }
    :global(th) {
      font-weight: var(--fw-semibold, 600);
      background: var(--surface-1, #fff);
    }
  }

  .share {
    margin-top: var(--space-8, 64px);
    padding-top: var(--space-5, 24px);
    border-top: 1px solid var(--border-1, #e5e5e5);

    h2 {
      margin: 0 0 var(--space-3, 12px);
      font-size: var(--fs-md, 1rem);
      font-weight: var(--fw-semibold, 600);
      color: var(--text-1, #111);
    }
  }

  .share__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3, 12px);
  }

  .share__status {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #444);

    &.failed {
      color: var(--danger, #b91c1c);
    }
  }

  .post__cta {
    margin-top: var(--space-7, 48px);
  }

  .langs {
    margin-top: var(--space-7, 48px);

    h2 {
      margin: 0 0 var(--space-2, 8px);
      font-size: var(--fs-lg, 1.125rem);
      font-weight: var(--fw-semibold, 600);
      color: var(--text-1, #111);
    }

    p {
      margin: 0 0 var(--space-4, 16px);
      color: var(--text-2, #444);
      font-size: var(--fs-sm, 0.875rem);
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2, 8px);
    }
  }

  @media (max-width: 600px) {
    .wrap {
      padding-inline: var(--space-4, 16px);
    }
    .prose {
      font-size: var(--fs-md, 1rem);
    }
  }
</style>

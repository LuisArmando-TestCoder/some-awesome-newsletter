<script lang="ts">
  import { sanitizeHtml } from '$lib/utils/sanitizeHtml';
  // Legacy URL: /article?q=<id>. Forwards to /blog/<handle>/<id>.
  // If the lookup fails, the article is rendered here so the old link still works.
  // The old page body lives in _deprecated/src/routes/article/+page.svelte.
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { t } from "../../lib/i18n/translations";
  import BlogNotice from "../../components/articles/BlogNotice.svelte";
  import { apiBase, articlePath, fetchWithTimeout, plainText } from "../../components/articles/blog";

  let phase = $state<"loading" | "missing" | "notfound" | "error" | "fallback">("loading");
  let article = $state<{ title: string; content: string; language: string } | null>(null);

  onMount(async () => {
    const id = page.url.searchParams.get("q");
    if (!id) {
      phase = "missing";
      return;
    }
    try {
      const r = await fetchWithTimeout(fetch, `${apiBase()}/article/${encodeURIComponent(id)}`);
      if (r.status === 404) {
        phase = "notfound";
        return;
      }
      if (!r.ok) {
        phase = "error";
        return;
      }
      const raw = await r.json();
      // WS15: the article names its blog by handle (older backends sent the owner's email).
      const blog = typeof raw?.blog === "string" ? raw.blog : typeof raw?.author === "string" ? raw.author : "";
      if (blog) {
        await goto(articlePath(blog, id), { replaceState: true });
        return;
      }
      article = { title: plainText(raw?.title ?? ""), content: raw?.content ?? "", language: raw?.language ?? "" };
      phase = "fallback";
    } catch {
      phase = "error";
    }
  });
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
  {#if article}<title>{article.title}</title>{/if}
</svelte:head>

<div class="page">
  {#if phase === "loading"}
    <p class="redirect" role="status">{$t.article?.loading ?? $t.blog.redirecting}</p>
  {:else if phase === "missing" || phase === "notfound"}
    <BlogNotice headingLevel={1} title={$t.blog.article.notFoundTitle} body={$t.blog.article.notFoundBody} />
  {:else if phase === "error"}
    <BlogNotice headingLevel={1} tone="error" title={$t.blog.article.errorTitle} body={$t.blog.article.errorBody} />
  {:else if article}
    <article class="fallback" lang={article.language || undefined}>
      <h1>{article.title}</h1>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
      <div class="prose">{@html sanitizeHtml(article.content)}</div>
    </article>
  {/if}
</div>

<style lang="scss">
  .page {
    min-height: 70vh;
    padding: var(--space-8) var(--gutter) var(--section-pad);
    background: var(--surface-0);
    color: var(--text-1);
  }
  .redirect {
    margin: 0;
    text-align: center;
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
  .fallback {
    max-width: 68ch;
    margin: 0 auto;

    h1 {
      margin: 0 0 var(--space-7);
      font-family: var(--font-display);
      font-size: clamp(2.25rem, 1.5rem + 3.2vw, 4.25rem);
      font-weight: var(--fw-semibold);
      line-height: var(--lh-display);
      letter-spacing: var(--tracking-display);
      text-wrap: balance;
      overflow-wrap: anywhere;
    }
  }
  .prose {
    font-size: var(--fs-lg);
    line-height: 1.65;
    overflow-wrap: break-word;

    :global(img) {
      display: block;
      max-width: 100%;
      height: auto;
      border-radius: var(--radius-lg);
    }
    :global(a) {
      color: var(--text-link);
    }
    :global(h2),
    :global(h3) {
      margin-top: 2em;
      font-family: var(--font-display);
      font-weight: var(--fw-semibold);
      letter-spacing: var(--tracking-tight);
    }
  }
  @media (max-width: 600px) {
    .prose {
      font-size: var(--fs-md);
    }
  }
</style>

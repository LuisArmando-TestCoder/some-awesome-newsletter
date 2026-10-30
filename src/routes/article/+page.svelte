<script lang="ts">
  import { sanitizeHtml } from '$lib/utils/sanitizeHtml';
  // Legacy URL: /article?q=<id>. Forwards to /blog/<author>/<id>.
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
      if (raw?.author) {
        await goto(articlePath(raw.author, id), { replaceState: true });
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
      <div class="prose">{@html sanitizeHtml(article.content)}</div>
    </article>
  {/if}
</div>

<style lang="scss">
  .page {
    min-height: 70vh;
    padding: var(--space-8, 64px) var(--space-4, 16px);
    background: var(--surface-0, #fff);
    color: var(--text-1, #111);
  }
  .redirect {
    text-align: center;
    color: var(--text-2, #444);
  }
  .fallback {
    max-width: 68ch;
    margin: 0 auto;
    h1 {
      font-family: var(--font-display, inherit);
      font-size: var(--fs-3xl, 2.25rem);
      line-height: var(--lh-tight, 1.15);
    }
  }
  .prose {
    font-size: var(--fs-lg, 1.125rem);
    line-height: 1.7;
    :global(img) {
      max-width: 100%;
      height: auto;
      border-radius: var(--radius-lg, 16px);
    }
    :global(a) {
      color: var(--text-link, #2563eb);
    }
  }
</style>

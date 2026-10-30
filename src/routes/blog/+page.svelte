<script lang="ts">
  import { t } from "../../lib/i18n/translations";
  import BlogNotice from "../../components/articles/BlogNotice.svelte";
</script>

<svelte:head>
  <title>{$t.blog.errorTitle} | AIBAN</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="page">
  <BlogNotice headingLevel={1} title={$t.blog.errorTitle} body={$t.blog.missingHolder}>
    <a class="home" href="/">{$t.blog.publishedWith}</a>
  </BlogNotice>
</div>

<style lang="scss">
  .page {
    min-height: 70vh;
    padding: var(--space-8, 64px) var(--space-4, 16px);
    background: var(--surface-0, #fff);
  }
  .home {
    color: var(--text-link, #2563eb);
    text-decoration: underline;
  }
</style>

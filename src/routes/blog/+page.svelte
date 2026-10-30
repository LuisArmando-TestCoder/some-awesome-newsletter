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
    padding: var(--section-pad) var(--gutter);
    background: var(--surface-0);
  }
  .home {
    color: var(--text-link);
    font-weight: var(--fw-medium);
    text-decoration: underline;
  }
</style>

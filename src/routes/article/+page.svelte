<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
    import ThemeChanger from "../../components/ThemeChanger/ThemeChanger.svelte";
    import store, { globalLanguage } from "../../components/store";
  import { t } from "../../lib/i18n/translations";

  let article: any = null;
  let error: string | null = null;

  $: $t;

  onMount(async () => {
    const id = $page.url.searchParams.get("q");
    if (id) {
      try {
        console.log("$store.apiURL()", $store.apiURL())
        const response = await fetch(`${$store.apiURL()}/article/${id}`);
        if (response.ok) {
          article = await response.json();
        } else {
          error = $t.article.notFound;
        }
      } catch (e) {
        error = $t.article.errorFetching;
      }
    } else {
      error = $t.article.noArticleSpecified;
    }
  });
</script>

<ThemeChanger visible={false} />

<div class="article-page">
  {#if error}
    <p class="error">{error}</p>
  {:else if article}
  <article>
    <a onclick={() => {
        window.history.go(-1);
    }} class="back">{$t.article.goBack}</a>
    {@html article.content}
  </article>
  {:else}
    <p>{$t.article.loading}</p>
  {/if}
</div>

<style lang="scss">
  @use "../styles/everything.scss";

  .back {
    position: absolute;
    top: 25px;
    left: 25px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
  }

  article {
    display: grid;
    place-items: center;
    background: #fff;
    padding: 150px 0;
    position: relative;
  }

  .article-page {
    padding: 2rem;
    line-height: 2;
  }

  .error {
    color: red;
  }
</style>

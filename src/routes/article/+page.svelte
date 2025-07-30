<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
    import ThemeChanger from "../../components/ThemeChanger/ThemeChanger.svelte";
    import store from "../../components/store.ts";

  let article: any = null;
  let error: string | null = null;

  onMount(async () => {
    const id = $page.url.searchParams.get("q");
    if (id) {
      try {
        console.log("$store.apiURL()", $store.apiURL())
        const response = await fetch(`${$store.apiURL()}/article/${id}`);
        if (response.ok) {
          article = await response.json();
        } else {
          error = "Article not found.";
        }
      } catch (e) {
        error = "Error fetching article.";
      }
    } else {
      error = "No article specified.";
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
    }} class="back">Go Back</a>
    {@html article.content}
  </article>
  {:else}
    <p>Loading...</p>
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

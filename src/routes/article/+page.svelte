<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let article: any = null;
  let error: string | null = null;

  onMount(async () => {
    const id = $page.url.searchParams.get("q");
    if (id) {
      try {
        const response = await fetch(`http://localhost:8000/article/${id}`);
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

<div class="article-page">
  {#if error}
    <p class="error">{error}</p>
  {:else if article}
    {@html article.content}
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<style lang="scss">
  .article-page {
    padding: 2rem;
  }

  .error {
    color: red;
  }
</style>

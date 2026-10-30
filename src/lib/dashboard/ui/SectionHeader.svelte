<!-- WS4. Page heading for a dashboard section. -->
<script lang="ts">
  export let title: string;
  export let description: string | null = null;
</script>

<header class="shead">
  <div class="shead__text">
    <h1 class="shead__title">{title}</h1>
    {#if description}<p class="shead__desc">{description}</p>{/if}
  </div>
  {#if $$slots.default}<div class="shead__actions"><slot /></div>{/if}
</header>

<style lang="scss">
  .shead {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-4);
    flex-wrap: wrap;
    margin-bottom: var(--space-6);
  }
  .shead__text { max-width: var(--measure, 68ch); }
  .shead__title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-3xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-display);
    line-height: var(--lh-tight);
    color: var(--text-1);
  }
  .shead__desc { margin: var(--space-2) 0 0; color: var(--text-2); font-size: var(--fs-md); line-height: var(--lh-normal); }
  .shead__actions { display: flex; gap: var(--space-2); flex-wrap: wrap; }
</style>

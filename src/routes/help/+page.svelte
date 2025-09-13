<script lang="ts">
  import { onMount } from 'svelte';
  import helpStore from '$lib/config/help.config';
  import HelpContextCard from '$lib/ui/molecules/HelpContextCard.svelte';
  import HelpForm from '$lib/ui/organisms/HelpForm.svelte';
  import Faq from '$lib/ui/organisms/Faq.svelte';

  export let data;
  let state: any;
  const unsub = helpStore.subscribe(v => (state = v));
</script>

<svelte:head>
  <title>Help • A I N L</title>
</svelte:head>

<div class="help">
  <div class="help__container">
    <div class="help__header">
      <h1 class="help__title">{state?.content?.title}</h1>
      <p class="help__subtitle">{state?.content?.subtitle}</p>
    </div>

    <div class="help__content">
      {#if data.user}
        <HelpContextCard plan={data.plan} usage={data.usage} />
        <HelpForm user={data.user} content={state?.content} />
      {:else}
        <p>Please <a href="/login">log in</a> to request higher limits.</p>
      {/if}
      <Faq />
    </div>

    {#if data.mockMode}
      <div class="help__banner--mock">
        Mock Mode Enabled
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '../../styles/global.scss';

  .help__container {
    max-width: 72rem;
    margin-inline: auto;
    padding: var(--space-lg) var(--space-md);
  }

  .help__header {
    text-align: center;
    margin-bottom: var(--space-xl);
  }

  .help__title {
    font-size: 2.5rem;
    margin-bottom: var(--space-sm);
  }

  .help__subtitle {
    font-size: 1rem;
    color: var(--c-text-light);
  }

  .help__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  .help__banner--mock {
    text-align: center;
    margin-top: var(--space-lg);
    color: red;
  }
</style>

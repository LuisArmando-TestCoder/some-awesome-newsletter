<script lang="ts">
  import { onMount } from 'svelte';

  export let faqs: any[];

  let searchTerm = '';
  let filteredFaqs = faqs;

  function handleSearch() {
    if (searchTerm) {
      filteredFaqs = faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      filteredFaqs = faqs;
    }
  }

  function toggleFaq(e: MouseEvent) {
    const button = e.currentTarget as HTMLButtonElement;
    const item = button.parentElement;
    item?.classList.toggle('help-faqs__item--open');
  }
</script>

<div class="help-faqs">
  <input type="search" bind:value={searchTerm} on:input={handleSearch} placeholder="Search FAQs" class="help-faqs__search" />

  <div class="help-faqs__list">
    {#each filteredFaqs as faq}
      <div class="help-faqs__item">
        <button class="help-faqs__question" on:click={toggleFaq}>
          {faq.q}
        </button>
        <div class="help-faqs__answer">
          <p>{faq.a}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @use '../../../styles/global.scss';

  .help-faqs__search {
    width: 100%;
    padding: var(--space-sm);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-lg);
  }

  .help-faqs__item {
    border-top: 1px solid var(--c-border);
  }

  .help-faqs__question {
    width: 100%;
    text-align: left;
    padding: var(--space-md) 0;
    font-weight: 600;
    cursor: pointer;
    background: none;
    border: none;
  }

  .help-faqs__answer {
    display: none;
    padding-bottom: var(--space-md);
  }

  .help-faqs__item--open .help-faqs__answer {
    display: block;
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';

  export let value = '';
  export let placeholder = '';

  function autosize(node: HTMLTextAreaElement) {
    const fit = () => {
      if (CSS.supports('field-sizing: content')) return;
      node.style.height = 'auto';
      node.style.height = node.scrollHeight + 'px';
    };
    node.addEventListener('input', fit);
    const ro = new ResizeObserver(fit);
    ro.observe(node);
    fit();
    return {
      destroy() {
        node.removeEventListener('input', fit);
        ro.disconnect();
      }
    };
  }
</script>

<textarea {placeholder} bind:value use:autosize class="form__textarea"></textarea>

<style lang="scss">
  .form__textarea {
    field-sizing: content;
    display: block;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    min-height: 6rem;
    max-height: 60dvh;
    line-height: 1.5;
    resize: vertical;
    overflow: auto;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    font-size: 16px;
  }
</style>

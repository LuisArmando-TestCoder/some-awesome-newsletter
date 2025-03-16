<script lang="ts">
  import RevealOnScroll from "../RevealOnScroll/RevealOnScroll.svelte";
  import HTMLTextLettersClassWrapper from "../HTMLTextLettersClassWrapper/HTMLTextLettersClassWrapper.svelte";

  export let text: string;
  export let canReveal = false;
</script>

<RevealOnScroll canReveal={canReveal}>
  <HTMLTextLettersClassWrapper HTMLText={text} />
</RevealOnScroll>

<style lang="scss">
  @use "RevealText.scss";
</style>

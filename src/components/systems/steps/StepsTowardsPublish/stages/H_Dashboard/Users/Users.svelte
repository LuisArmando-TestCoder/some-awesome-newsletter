<script lang="ts">
  import CardComponent from "../../../../../selectors/Card/Card.svelte";
  import Page from "../../../../../wrappers/Page/Page.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<Page></Page>

<style lang="scss">
  @use "../Dashboard.scss";
</style>

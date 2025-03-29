<script lang="ts">
  import CardComponent from "../../../../../selectors/Card/Card.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<CardComponent
  collapsed={true}
  {canReveal}
  svg="group"
  label="**Users** Configuration"
>
</CardComponent>

<style lang="scss">
  @use "../Dashboard.scss";
</style>

<script lang="ts">
  import { reveal } from "../reveal";

  /** When true, the block fades in once as it enters the viewport. */
  export let canReveal = true;
</script>

<div class="reveal-on-scroll" use:reveal={canReveal}>
  <slot></slot>
</div>

<style lang="scss">
  @use "RevealOnScroll.scss";
</style>

<script lang="ts">
  import { reveal } from "../reveal";

  export let text: string;
  export let canReveal = false;
</script>

<span class="reveal-text" use:reveal={canReveal}>{text ?? ""}</span>

<style lang="scss">
  @use "RevealText.scss";
</style>

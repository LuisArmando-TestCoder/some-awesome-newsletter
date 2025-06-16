<script lang="ts">
  import ColorPicker from "../../../../../../inputs/ColorPicker/ColorPicker.svelte";
  import store, { saveToConfig } from "../../../../../../../store.ts";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = true;

  $: canReveal;
</script>


<MarkdownText {canReveal}>
  Your newsletter will be **highlighted** in **this color**
</MarkdownText>
<ColorPicker
  {canReveal}
/>

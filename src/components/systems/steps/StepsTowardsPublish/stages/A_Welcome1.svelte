<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import store from "../../../../store";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>
    ## Automatic newsletter generator
  </MarkdownText>
</Centered>

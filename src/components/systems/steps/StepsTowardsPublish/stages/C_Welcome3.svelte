<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>

  <MarkdownText {canReveal}>
    ### ...use it forever.
  </MarkdownText>

  <style lang="scss">
    .align-right {
      text-align: right;
    }
  </style>
</Centered>

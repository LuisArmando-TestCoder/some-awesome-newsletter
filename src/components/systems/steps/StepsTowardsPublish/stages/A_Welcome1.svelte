<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>
      ## Get a newsletter **where** **there** isn't one
  </MarkdownText>
  
  <MarkdownText {canReveal}>
      ### This is your **AI-powered** newsletter **translator**
  </MarkdownText>
</Centered>
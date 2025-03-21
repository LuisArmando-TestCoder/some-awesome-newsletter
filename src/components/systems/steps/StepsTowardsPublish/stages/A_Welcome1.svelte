<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>
      ## Newsletter **where** **there** isn't one
  </MarkdownText>
  
  <MarkdownText {canReveal}>
      ### **AI-powered** newsletter for **marketing agencies**
  </MarkdownText>
</Centered>
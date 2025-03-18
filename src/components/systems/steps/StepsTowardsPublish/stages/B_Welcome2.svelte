<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>  
      Our **vertical AI** agent-powered **newsletter.**
      
      Just give it a ==website to feed from,== then **your lead,** and then **the users you want to reach**—it's that easy.
  </MarkdownText>
</Centered>
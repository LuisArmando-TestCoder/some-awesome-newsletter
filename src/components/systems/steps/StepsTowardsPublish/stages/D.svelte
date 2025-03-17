<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Link from "../../../inputs/Link/Link.svelte";
  import store from "../../../../store.ts";

  export let canReveal = false;
</script>

<MarkdownText {canReveal}>
  --Let's start with your lead--
  
  ### Where do you want to **lead** your clients?
</MarkdownText>
<Link placeholder="Your website's URL" onChange={lead => store.set({
  ...$store,
  lead
})}/>
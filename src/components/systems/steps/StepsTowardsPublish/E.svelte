<script lang="ts">
  import MarkdownText from "../../texts/MarkdownText/MarkdownText.svelte";
  import Link from "../../inputs/Link/Link.svelte";

  export let canReveal = false;
</script>

<MarkdownText {canReveal}>
  --Now... for your newsletter feed--
  
  ### From which **blog** or **news site** do you want to **generate** your **content?**
</MarkdownText>
<Link placeholder="The news site or blog"/>
<script lang="ts">
  import MarkdownText from "../../texts/MarkdownText/MarkdownText.svelte";
  import Email from "../../inputs/Email/Email.svelte";

  export let canReveal = false;
</script>

<MarkdownText {canReveal}>
  --The email your clients will see...--
  
  ### On behalf of **whom** do we send the **newsletter**?
</MarkdownText>
<Email placeholder="Your email or your organization's"/>
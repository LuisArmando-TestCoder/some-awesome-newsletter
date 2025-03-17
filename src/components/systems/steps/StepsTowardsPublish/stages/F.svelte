<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Email from "../../../inputs/Email/Email.svelte";
  import store from "../../../../store.ts";

  export let canReveal = false;
</script>

<MarkdownText {canReveal}>
  --The email your clients will see...-- 
  
  ### On behalf of **whom** do we
  **send** the **newsletter**?
</MarkdownText>
<Email
  placeholder="Your email or your organization's"
  onChange={(value) => {
    store.set({
      ...$store,
      configuratorEmail: value,
    });
  }}
/>

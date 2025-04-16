<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store.js";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<div>
  <PlainText
    placeholder="Enter the email address to send from"
    value={$store.config.emailMaskSender}
    onChange={(value) => {
      saveToConfig({ emailMaskSender: value });
    }}
  />
  <MarkdownText {canReveal}>
    --The email address that will appear as the sender in your newsletters.--
  </MarkdownText>
</div>

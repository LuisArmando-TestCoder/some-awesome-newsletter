<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store.js";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<div>
  <PlainText
    type="password"
    placeholder="Enter your email app password"
    value={$store.config.appPassword}
    onChange={(value) => {
      saveToConfig({ appPassword: value });
    }}
  />
  <MarkdownText {canReveal}>
    --The app-specific password for your email account (e.g., Gmail App Password).--
  </MarkdownText>
</div>

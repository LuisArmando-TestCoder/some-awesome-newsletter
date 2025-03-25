<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store.ts";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<div>
  <PlainText
    placeholder="Change your email signature"
    value={$store.config.emailSignature}
    onChange={(value) => {
      saveToConfig({ emailSignature: value });
    }}
  />
  <MarkdownText {canReveal}>--Email signatures instil brand trust--</MarkdownText>
</div>

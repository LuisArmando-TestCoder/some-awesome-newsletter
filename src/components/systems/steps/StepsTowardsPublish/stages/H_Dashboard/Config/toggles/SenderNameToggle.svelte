<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { writable } from "svelte/store";
  import type { Store } from "../../../../../../../types";
  import { useConfigurator } from "../../../../../../useConfigurator";

  export let canReveal = true;

  $: $store;
</script>

<div>
  <PlainText
    placeholder="Change your email sender name"
    value={$store.senderName}
    onChange={(value) => {
      saveToConfig({ senderName: value });
    }}
  />
  <MarkdownText {canReveal}>
    --Indicating who the email is from helps establish trust--
  </MarkdownText>
</div>

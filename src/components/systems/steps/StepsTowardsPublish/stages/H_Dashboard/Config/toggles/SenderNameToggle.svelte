<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { t } from "$lib/i18n/dashboard-translations";
  import { getContext } from "svelte";

  export let canReveal = true;

  const { draftConfig, updateDraft } = getContext('config-draft') as any;
</script>

<div>
  <PlainText
    placeholder={$t['placeholders.senderName']}
    value={$draftConfig.senderName}
    onChange={(value) => {
      updateDraft({ senderName: value });
    }}
  />
  <MarkdownText {canReveal}>
    {$t['markdown.senderName']}
  </MarkdownText>
</div>

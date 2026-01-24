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
    placeholder={$t['placeholders.newsletterSubject']}
    value={$draftConfig.newsletterSubject}
    onChange={(value) => {
      updateDraft({ newsletterSubject: value });
    }}
  />
  <MarkdownText {canReveal}>
    {$t['markdown.newsletterSubject']}
  </MarkdownText>
</div>

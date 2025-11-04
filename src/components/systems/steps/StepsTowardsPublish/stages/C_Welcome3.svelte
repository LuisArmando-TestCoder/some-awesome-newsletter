<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import { t } from '$lib/i18n/translations';

  export let canReveal = false;
</script>

<Centered>

  <MarkdownText {canReveal}>
    ### {$t.welcome.useItForever}
  </MarkdownText>

  <style lang="scss">
    .align-right {
      text-align: right;
    }
  </style>
</Centered>

<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>
    It **automatically detects** each user's ==country of residence.==The AI then delivers **the most interesting article** from ==your feed==, **fully translated** into ==their language.==
  </MarkdownText>
  <div class="align-right">
    <MarkdownText {canReveal}>
      *-* --Highlighted-- *in an* --ADHD-friendly-- *way.*
    </MarkdownText>
  </div>

  <style lang="scss">
    .align-right {
      text-align: right;
    }
  </style>
</Centered>

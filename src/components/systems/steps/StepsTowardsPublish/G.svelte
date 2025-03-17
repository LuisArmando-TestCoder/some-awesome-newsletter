<script lang="ts">
  import Code from "../../inputs/Code/Code.svelte";
  import MarkdownText from "../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = false;
</script>

<MarkdownText {canReveal}>
  ## **We** sent **an** auth code **to your** email
</MarkdownText>
<Code />
<MarkdownText {canReveal}>Now you can **login** at **any time**</MarkdownText>

<button
  aria-label="Request a new code"
  class="resend"
  onclick={() => {
    // https://ai-newsletter-translated.onrender.com/
  }}
>
  <MarkdownText {canReveal}>
    -- - And you can always ask for a new code--
  </MarkdownText>
</button>

<style lang="scss">
  .resend {
    padding: 0;
    margin: 0;
    border: 0;
    background: none;
    cursor: pointer;
    display: inline-block;

    &:hover {
      & :global(div span) {
        text-decoration: underline;
      }
    }
  }
</style>

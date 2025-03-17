<script lang="ts">
  import Code from "../../../inputs/Code/Code.svelte";
  import sendAuthCode from "../../../requests/sendAuthCode.ts";
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = false;
</script>

<div class="center">
  <MarkdownText {canReveal}>
    ## **We** sent **an** auth code **to your** email
  </MarkdownText>
</div>
<Code />
<div class="center">
  <MarkdownText {canReveal}>Now you can **login** at **any time**</MarkdownText>
</div>

<button
  aria-label="Request a new code"
  class="resend"
  onclick={() => {
    sendAuthCode();
  }}
>
  <MarkdownText {canReveal}>
    -- - You can always get a new one here--
  </MarkdownText>
</button>

<style lang="scss">
  .center {
    display: grid;
    place-items: center;
    width: 100%;
  }

  .resend {
    padding: 0;
    margin: 0;
    border: 0;
    background: none;
    cursor: pointer;
    display: flex;
    justify-content: end;
    width: 100%;

    &:hover {
      & :global(div span) {
        text-decoration: underline;
      }
    }
  }
</style>

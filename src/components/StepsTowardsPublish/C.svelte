<script lang="ts">
    import MarkdownText from "../MarkdownText/MarkdownText.svelte";

    export let canReveal = false;
</script>

<MarkdownText {canReveal}>  
    It **automatically detects** each user's ==country of residence.== The AI delivers **the most interesting article** from ==your feed==, **fully translated** into ==their language.==  
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
<script lang="ts">
    import MarkdownText from "../../MarkdownText/MarkdownText.svelte";

    export let canReveal = false;
</script>

<MarkdownText {canReveal}>  
    Our **vertical AI agent-powered newsletter.** Just give it a ==website to feed from,== then **your lead,** and **the users you want to reach**—it's that easy. It **automatically detects** each user's ==country of residence.== The AI delivers **the most interesting article** from ==your feed==, **fully translated** into ==their language.==  
</MarkdownText>
<div class="align-right">
    <MarkdownText {canReveal}>
        *- Highlighted in an* --ADHD-friendly-- *way.*
    </MarkdownText>
</div>

<style lang="scss">
    .align-right {
        text-align: right;
    }
</style>
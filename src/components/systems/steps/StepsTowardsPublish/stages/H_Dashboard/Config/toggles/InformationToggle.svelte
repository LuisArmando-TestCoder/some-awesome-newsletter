<script lang="ts">
    import AutoCollapseToggle from "../../AutoCollapseToggle.svelte";
    import NewsletterSubjectToggle from "./NewsletterSubjectToggle.svelte";
    import NewsletterTitleToggle from "./NewsletterTitleToggle.svelte";
    import SenderNameToggle from "./SenderNameToggle.svelte";
  
    export let canReveal = true;
  
    $: canReveal;
</script>

<AutoCollapseToggle {canReveal}
    toggles={{
        newsletterSubject: [NewsletterSubjectToggle],
        newsletterTitle: [NewsletterTitleToggle],
        senderName: [SenderNameToggle],
    }}
/>

<style lang="scss">
  @use "../../Dashboard.scss";
</style>
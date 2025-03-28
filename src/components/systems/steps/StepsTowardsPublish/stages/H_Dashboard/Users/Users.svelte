<script lang="ts">
    import CardComponent from "../../../../../selectors/Card/Card.svelte";
    import AutoCollapseToggle from "../AutoCollapseToggle.svelte";
    // import ColorPickerToggle from "./toggles/ColorPickerToggle.svelte";
    // import NewsletterSubjectToggle from "./toggles/NewsletterSubjectToggle.svelte";
    // import NewsletterTitleToggle from "./toggles/NewsletterTitleToggle.svelte";
    // import SenderNameToggle from "./toggles/SenderNameToggle.svelte";
    // import EmailSignatureToggle from "./toggles/EmailSignatureToggle.svelte";
  
    export let canReveal = true;
  
    $: canReveal;
  </script>
  
  <CardComponent
    collapsed={true}
    {canReveal}
    svg="group"
    label="**Users** Configuration"
  >
    <AutoCollapseToggle {canReveal}
      toggles={{
        // brandColor: [ColorPickerToggle],
        // newsletterSubject: [NewsletterSubjectToggle],
        // newsletterTitle: [NewsletterTitleToggle],
        // senderName: [SenderNameToggle],
        // emailSignature: [EmailSignatureToggle],
      }}
    />
  </CardComponent>
  
  <style lang="scss">
    @use "../Dashboard.scss";
  </style>
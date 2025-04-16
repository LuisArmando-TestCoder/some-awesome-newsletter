<script lang="ts">
  import CardComponent from "../../../../../selectors/Card/Card.svelte";
  import AutoCollapseToggle from "../AutoCollapseToggle.svelte";
  import ColorPickerToggle from "./toggles/ColorPickerToggle.svelte";
  import NewsletterSubjectToggle from "./toggles/NewsletterSubjectToggle.svelte";
  import NewsletterTitleToggle from "./toggles/NewsletterTitleToggle.svelte";
  import SenderNameToggle from "./toggles/SenderNameToggle.svelte";
  import EmailSignatureToggle from "./toggles/EmailSignatureToggle.svelte";
  import OpenAPIKeyToggle from "./toggles/OpenAPIKeyToggle.svelte";
  import EmailCredentialsToggle from "./toggles/EmailCredentialsToggle.svelte"; // New combined toggle
  import Page from "../../../../../wrappers/Page/Page.svelte";

  export let canReveal = true;

  $: canReveal;
</script>


<Page>
  <AutoCollapseToggle {canReveal}
    toggles={{
      brandColor: [ColorPickerToggle],
      newsletterSubject: [NewsletterSubjectToggle],
      newsletterTitle: [NewsletterTitleToggle],
      senderName: [SenderNameToggle],
      emailSignature: [EmailSignatureToggle],
      openAPIKey: [OpenAPIKeyToggle],
      emailCredentials: [EmailCredentialsToggle], // New combined toggle
    }}
  />
</Page>

<style lang="scss">
  @use "../Dashboard.scss";
</style>

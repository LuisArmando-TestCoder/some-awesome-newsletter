<script lang="ts">
  import AutoCollapseToggle from "../AutoCollapseToggle.svelte";
  import ColorPickerToggle from "./toggles/ColorPickerToggle.svelte";
  import NewsletterSubjectToggle from "./toggles/NewsletterSubjectToggle.svelte";
  import NewsletterTitleToggle from "./toggles/NewsletterTitleToggle.svelte";
  import SenderNameToggle from "./toggles/SenderNameToggle.svelte";
  import EmailSignatureToggle from "./toggles/EmailSignatureToggle.svelte";
  import EmailCredentialsToggle from "./toggles/EmailCredentialsToggle.svelte"; // New combined toggle
  import Page from "../../../../../wrappers/Page/Page.svelte";
    import InformationToggle from "./toggles/InformationToggle.svelte";
    import VisualToggle from "./toggles/VisualToggle.svelte";

  export let canReveal = true;

  $: canReveal;
</script>


<Page>
  <AutoCollapseToggle {canReveal}
    toggles={{
      informationSetup: [InformationToggle],
      visualFeatures: [VisualToggle],
      emailCredentials: [EmailCredentialsToggle], // New combined toggle
    }}
  />
</Page>

<style lang="scss">
  @use "../Dashboard.scss";
</style>

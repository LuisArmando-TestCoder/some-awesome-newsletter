<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import store, { saveToStore } from "../../../../store.ts";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import CountryInput from "../../../inputs/Country/Country.svelte"; // Renamed import for clarity

  export let canReveal = false;

  function handleCountrySelect(countryCode: string | null) {
    if (countryCode) { // Only proceed if a country is actually selected
      saveToStore({
        subscriberCountry: countryCode,
        stepsIndex: $store.stepsIndex + 1,
      });
    }
    // Optionally handle the case where countryCode is null (e.g., if deselection was possible)
  }
</script>

<Centered>
  <MarkdownText {canReveal}>
    ### Where are you **located**? (Optional)
    <!-- Added (Optional) as country might not be strictly required by API -->
  </MarkdownText>
  <div class="country-input-container">
    <CountryInput
      defaultCountryCode={$store.subscriberCountry || null}
      onSelect={handleCountrySelect}
    />
  </div>
</Centered>

<style>
  .country-input-container {
    margin-top: 1rem; /* Add some space */
    width: 100%;
    display: flex;
    justify-content: center; /* Center the dropdown */
  }
</style>

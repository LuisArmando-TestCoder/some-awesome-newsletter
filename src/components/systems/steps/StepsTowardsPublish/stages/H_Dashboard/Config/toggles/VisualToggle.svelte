<script lang="ts">
    import AutoCollapseToggle from "../../AutoCollapseToggle.svelte";
    import ColorPickerToggle from "./ColorPickerToggle.svelte";
    import EmailSignatureToggle from "./EmailSignatureToggle.svelte";
  
    export let canReveal = true;
  
    $: canReveal;
</script>

<AutoCollapseToggle {canReveal}
    toggles={{
        brandColor: [ColorPickerToggle],
        emailSignature: [EmailSignatureToggle],
    }}
/>

<style lang="scss">
  @use "../../Dashboard.scss";
</style>
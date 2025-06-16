<script lang="ts">
    import AutoCollapseToggle from "../../AutoCollapseToggle.svelte";
    import ColorPickerToggle from "./ColorPickerToggle.svelte";
    import EmailSignatureToggle from "./EmailSignatureToggle.svelte";
    import ImageToggle from "./ImageToggle.svelte";
  
    export let canReveal = true;
  
    $: canReveal;
</script>

<AutoCollapseToggle {canReveal}
    toggles={{
        logoImage: [ImageToggle],
        // brandColor: [ColorPickerToggle],
        emailSignature: [EmailSignatureToggle],
    }}
/>

<style lang="scss">
  @use "../../Dashboard.scss";
</style>

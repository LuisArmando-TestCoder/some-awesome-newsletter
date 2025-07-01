<script lang="ts">
    import Hey from "../../components/systems/wrappers/InteractiveSlides/Hey.svelte";
    import InteractiveSlides from "../../components/systems/wrappers/InteractiveSlides/InteractiveSlides.svelte";
</script>

<InteractiveSlides
    checkConditions={[
        {
            componentValue: Hey,
            condition: false,
            checkName: "yeah",
            tooltip: "yeah yeah",
        }
    ]}
/>
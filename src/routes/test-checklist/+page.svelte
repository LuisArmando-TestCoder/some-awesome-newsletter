<script lang="ts">
    import { writable } from "svelte/store";
    import Hey from "../../components/systems/wrappers/InteractiveSlides/Hey.svelte";
    import InteractiveSlides from "../../components/systems/wrappers/InteractiveSlides/InteractiveSlides.svelte";
    import GlobalData from "../../components/GlobalData/GlobalData.svelte";
    import SocketClient from "../../components/SocketClient.svelte";
    import Header from "../../components/Header/Header.svelte";
    import { andthisthing, andthisthingaswell } from "../../components/systems/wrappers/InteractiveSlides/store.ts";
    import How from "../../components/systems/wrappers/InteractiveSlides/How.svelte";

    const a = writable([
        {
            componentValue: Hey,
            condition: () => $andthisthing,
            checkName: "yeah",
            tooltip: "yeah yeah",
        },
        {
            componentValue: How,
            condition: () => $andthisthingaswell,
            checkName: "This is how",
            tooltip: "Oh yes",
        },
    ])
</script>

<!-- <ChosenShader /> -->
<Header />
{#key [$andthisthing, $andthisthingaswell]}
    <InteractiveSlides
        checkConditions={$a}
    />
{/key}

<style lang="scss">
  @use "../styles/everything.scss";
</style>

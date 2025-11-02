<script lang="ts">
    import ChosenShader from "../../components/ShaderToy/ChosenShader/ChosenShader.svelte";
    import SocketClient from "../../components/SocketClient.svelte";
    import ThemeChanger from "../../components/ThemeChanger/ThemeChanger.svelte";
    import GlobalData from "../../components/GlobalData/GlobalData.svelte";
    import type { PageData } from './$types.js'; // Import PageData type
    import MinimalSubscribe from "../../components/systems/widgets/Subscribe/MinimalSubscribe.svelte";
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    import { saveToStore } from "../../components/store";

    export let data: PageData; // Receive data from load function

    let configuratorId: string | null = null;
    let newsSourceId: string | null = null;

    onMount(() => {
        saveToStore({
            header: false
        });
        const urlParams = new URLSearchParams($page.url.search);
        configuratorId = urlParams.get('configuratorId');
        newsSourceId = urlParams.get('newsSourceId');
    });
</script>

<ThemeChanger visible={false} />
<GlobalData />
<SocketClient />
<ChosenShader />
{#if configuratorId && newsSourceId}
    <MinimalSubscribe {configuratorId} {newsSourceId} />
{:else}
    <p>Error: Missing required configuration.</p>
{/if}

<style lang="scss">
    @use "../styles/everything.scss";
</style>

<script lang="ts">
    import ChosenShader from "../../components/ShaderToy/ChosenShader/ChosenShader.svelte";
    import SocketClient from "../../components/SocketClient.svelte";
    import ThemeChanger from "../../components/ThemeChanger/ThemeChanger.svelte";
    import GlobalData from "../../components/GlobalData/GlobalData.svelte";
    import type { PageData } from './$types.js'; // Import PageData type
    import Subscribe from "../../components/systems/widgets/Subscribe/Subscribe.svelte";

    export let data: PageData; // Receive data from load function
</script>

<ThemeChanger visible={false} />
<GlobalData />
<SocketClient />
<ChosenShader />
<Subscribe />

<style lang="scss">
    @use "../styles/everything.scss";
</style>

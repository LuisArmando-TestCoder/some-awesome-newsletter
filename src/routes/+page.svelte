<script>
  import GlobalData from "../components/GlobalData/GlobalData.svelte";
  import Header from "../components/Header/Header.svelte";
  import ChosenShader from "../components/ShaderToy/ChosenShader/ChosenShader.svelte";
  import SocketClient from "../components/SocketClient.svelte";
  import MainSteps from "../components/systems/steps/StepsTowardsPublish/MainSteps.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
</script>

<GlobalData />
<SocketClient />
<ChosenShader />
<Header />
<MainSteps />

<style lang="scss">
  @use "./styles/everything.scss";
</style>

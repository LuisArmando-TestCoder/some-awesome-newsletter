<script>
  import GlobalData from "../components/GlobalData/GlobalData.svelte";
  import ChosenShader from "../components/ShaderToy/ChosenShader/ChosenShader.svelte";
  import MainSteps from "../components/systems/steps/StepsTowardsPublish/MainSteps.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
</script>

<GlobalData />
<ChosenShader />
<ThemeChanger visible={true} />
<MainSteps />

<style lang="scss">
  @use "./styles/everything.scss";
</style>

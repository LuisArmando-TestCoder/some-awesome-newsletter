<script>
  import GlobalData from "../components/GlobalData/GlobalData.svelte";
  import ChosenShader from "../components/ShaderToy/ChosenShader/ChosenShader.svelte";
  import ZMainSteps from "../components/systems/steps/StepsTowardsPublish/ZMainSteps.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
</script>

<GlobalData />
<ChosenShader />
<ThemeChanger visible={true} />
<ZMainSteps />

<style lang="scss">
  @use "./styles/everything.scss";
</style>

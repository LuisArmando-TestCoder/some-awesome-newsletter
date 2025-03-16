<script>
  import GlobalData from "../components/GlobalData/GlobalData.svelte";
  import ChosenShader from "../components/ShaderToy/ChosenShader/ChosenShader.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
  import Steps from "../components/Steps/Steps.svelte";
</script>

<GlobalData />
<ChosenShader />
<ThemeChanger visible={true} />
<Steps />

<style lang="scss">
  @use "./styles/everything.scss";
</style>

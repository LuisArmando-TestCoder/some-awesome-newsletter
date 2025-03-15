<script>

  import GlobalData from "../components/GlobalData/GlobalData.svelte";
  import ChosenShader from "../components/ShaderToy/ChosenShader/ChosenShader.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";

</script>

<GlobalData />
<ChosenShader />
<ThemeChanger/>

<style lang="scss">
    @use "./styles/everything.scss";
</style>
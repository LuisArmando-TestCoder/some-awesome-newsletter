<script lang="ts">
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import logout from "../../../../requests/logout.ts";
  import Config from "./Config/Config.svelte";
  import NewsSource from "./NewsSource/NewsSource.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<div class="dashboard">
  <div class="pad">
    <a href="#dashboard" id="dashboard" class="grid scenario">
      <Config {canReveal} />
      <NewsSource {canReveal} />
    </a>
  </div>
  <div class="pad center">
    <SubmitButton callback={logout} label="sign out" />
  </div>
</div>

<style lang="scss">
  @use "./Dashboard.scss";
</style>

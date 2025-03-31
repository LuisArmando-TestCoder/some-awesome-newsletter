<script lang="ts">
  import { onMount } from "svelte";
  import askIsAuthCodeValid from "../../requests/askIsAuthCodeValid.ts";
  import setStorageFromKeysToSave from "../../helpers/setStorageFromKeysToSave.ts";

  onMount(async () => {
    setStorageFromKeysToSave();

    // if (!(await askIsAuthCodeValid())) {
    //   window.location.href = "/";
    // }
  });
</script>

<div class="page">
  <slot />
</div>

<style lang="scss">
  .page {
    margin-top: 160px;
    padding: 0 25px;
  }
</style>
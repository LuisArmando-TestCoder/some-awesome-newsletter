<script lang="ts">
  import { onMount } from "svelte";
  import askIsAuthCodeValid from "../../requests/askIsAuthCodeValid";
  import setStorageFromKeysToSave from "../../helpers/setStorageFromKeysToSave";

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
    box-sizing: border-box;
  }
</style>

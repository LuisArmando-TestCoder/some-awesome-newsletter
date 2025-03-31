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
    padding: 160px 25px 0;
    overflow: auto;
    max-height: 100vh;

    @media (max-width: 640px) {
      padding: 160px 15px 0;
    }
  }
</style>

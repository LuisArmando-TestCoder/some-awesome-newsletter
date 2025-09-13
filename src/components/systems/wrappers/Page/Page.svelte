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
    padding: 160px 25px 0;
    overflow: auto;
    box-sizing: border-box;
    max-height: calc(100vh - 83px);

    @media (max-width: 640px) {
      padding: 160px 15px 0;
    }
  }
</style>

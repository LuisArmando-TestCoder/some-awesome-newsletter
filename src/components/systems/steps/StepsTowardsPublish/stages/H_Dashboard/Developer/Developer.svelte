<script lang="ts">
  import Exports from "../Exports/Exports.svelte";
  import SecretsToggle from "../Config/toggles/SecretsToggle.svelte";
  import Page from "../../../../../wrappers/Page/Page.svelte";
  import NewsSourceDeveloper from "./NewsSourceDeveloper.svelte";
</script>

<Page>
  <SecretsToggle />
  <NewsSourceDeveloper />
  <Exports />
</Page>

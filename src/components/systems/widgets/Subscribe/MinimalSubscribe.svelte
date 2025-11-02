<script lang="ts">
  import type { Store } from "../../../types";
  import Email from "./stages/Email.svelte";
  import Name from "./stages/Name.svelte";
  import Language from "./stages/Language.svelte";
  import Confirmation from "./stages/Confirmation.svelte";
  import WidgetSteps from "./WidgetSteps.svelte";

  export let configuratorId: string;
  export let newsSourceId: string;

  const components: [(store: Store) => boolean, any][] = [
    [
      (store: Store) => true,
      Email,
    ],
    [
      (store: Store) => store.widgetEmail,
      Name,
    ],
    [
      (store: Store) => store.widgetName,
      Language,
    ],
    [
      (store: Store) => store.widgetLanguage,
      Confirmation,
    ],
  ];
</script>

<WidgetSteps {components} />

<script lang="ts">
  import type { Store } from "../../../types.ts";
  import theStoreWritable from "../../../store.ts";
  import sendAuthCode from "../../requests/sendAuthCode.ts";
  import A from "./stages/A.svelte";
  import B from "./stages/B.svelte";
  import C from "./stages/C.svelte";
  import D from "./stages/D.svelte";
  import E from "./stages/E.svelte";
  import F from "./stages/F.svelte";
  import G from "./stages/G.svelte";
  import H from "./stages/H.svelte";
  import ZtepsTowardsPublish from "./StepsTowardsPublish.svelte";

  const t = () => true;

  const components = [
    [t, A],
    [t, B],
    [t, C],
    [t, D],
    [(store: Store) => store.lead, E],
    [(store: Store) => store.newsSource, F],
    [
      (store: Store) => {
        if (
          store.configuratorEmail &&
          store.isComingFromValidStep &&
          !store.hasEmailCodeBeenSent
        ) {
          theStoreWritable.update((currentStore: Store) => ({
            ...currentStore,
            hasEmailCodeBeenSent: true,
          }));
          sendAuthCode();
        }
        return store.configuratorEmail;
      },
      G,
    ],
    [t, H],
  ];
</script>

<ZtepsTowardsPublish {components} />

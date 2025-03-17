<script>
  import Steps from "../Steps.svelte";
  import A from "./A.svelte";
  import B from "./B.svelte";
  import C from "./C.svelte";
  import D from "./D.svelte";
  import E from "./E.svelte";
  import F from "./F.svelte";
  import G from "./G.svelte";
  import H from "./H.svelte";
</script>

<Steps
  components={[
    [() => true, A],
    [() => true, B],
    [() => true, C],
    [() => true, D],
    [() => true, E],
    [() => true, F],
    [() => true, G],
    [() => true, H],
  ]}
/>

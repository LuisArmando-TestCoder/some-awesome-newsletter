<script lang="ts">
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
    [({ lead }: { lead: string }) => lead, E],
    [({ newsSource }: { newsSource: string }) => newsSource, F],
    [
      ({ configuratorEmail, isComingFromValidStep }: any) => {
        if (
          configuratorEmail &&
          isComingFromValidStep &&
          !localStorage.getItem("has-email-auth-code-been-sent")
        ) {
        }
          sendAuthCode();
        return configuratorEmail;
      },
      G,
    ],
    [t, H],
  ];
</script>

<ZtepsTowardsPublish {components} />

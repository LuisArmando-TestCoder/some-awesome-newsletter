<script lang="ts">
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
          !localStorage.getItem("has-email-been-sent")
        ) {
          (async () => {
            const response = await fetch(
              `https://ai-newsletter-translated.onrender.com/auth/${
                configuratorEmail
              }`,
              {
                method: "POST",
              }
            );

            console.log(response);

            const { success } = await response.json();

            if (success) {
              localStorage.setItem("has-email-been-sent", "1");
              console.log(configuratorEmail);
            }
          })();
        }

        return configuratorEmail;
      },
      G,
    ],
    [t, H],
  ];
</script>

<ZtepsTowardsPublish {components} />

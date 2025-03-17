<script lang="ts">
  import A from "./A.svelte";
  import B from "./B.svelte";
  import C from "./C.svelte";
  import D from "./D.svelte";
  import E from "./E.svelte";
  import F from "./F.svelte";
  import G from "./G.svelte";
  import H from "./H.svelte";
  import ZtepsTowardsPublish from "./ZtepsTowardsPublish.svelte";

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

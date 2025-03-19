<script lang="ts">
  import type { Store, Country, Language, Card } from "../../../../types.ts"; // Only import what you use

  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import PlainText from "../../../inputs/PlainText/PlainText.svelte";
  import Email from "../../../inputs/Email/Email.svelte";
  import Code from "../../../inputs/Code/Code.svelte";
  import ColorPicker from "../../../inputs/ColorPicker/ColorPicker.svelte";
  import ScheduleTime from "../../../inputs/ScheduleTime/ScheduleTime.svelte";
  import LinkInput from "../../../inputs/Link/Link.svelte";
  import Checkbox from "../../../selectors/Checkbox/Checkbox.svelte";
  import Radio from "../../../selectors/Radio/Radio.svelte";
  import Switch from "../../../selectors/Switch/Switch.svelte";
  import CountrySelector from "../../../selectors/Country/Country.svelte";
  import CardComponent from "../../../selectors/Card/Card.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import logout from "../../../requests/logout.ts";
  import store from "../../../../store.ts";

  export let canReveal = false;
</script>

{#key $store?.config}
  <div class="pad">
    <CardComponent {canReveal} label="Config">
        Hi
    </CardComponent>
  </div>
  <div class="pad center">
    <SubmitButton callback={logout} label="sign out" />
  </div>
{/key}

<style lang="scss">
  .pad {
    padding: 25px;
    margin: 25px;
  }

  .center {
    display: flex;
    justify-content: center;
  }

  .right {
    display: flex;
    justify-content: right;
  }
</style>

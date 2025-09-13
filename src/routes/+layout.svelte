<script>
  import Header from "$lib/ui/organisms/Header.svelte";
  import { user as userStore } from "$lib/stores/user.js";
  import { onMount } from "svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
  import { saveToStore } from "../components/store";
  export let data;

  // Set the global user store when the prop changes
  
  // onMount(() => {
    if (data.user) saveToStore({
      user: data.user
    })
  // });
</script>

<ThemeChanger visible={false} />
<Header />
<slot />

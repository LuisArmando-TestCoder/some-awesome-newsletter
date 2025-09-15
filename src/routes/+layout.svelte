<script>
  import Header from "$lib/ui/organisms/Header.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
  export let data;
</script>

<ThemeChanger visible={false} />
<Header />
<slot />

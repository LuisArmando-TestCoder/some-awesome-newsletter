<script>
  import Header from "$lib/ui/organisms/Header.svelte";
  import ThemeChanger from "../components/ThemeChanger/ThemeChanger.svelte";
  import { beforeNavigate, afterNavigate } from "$app/navigation";
  export let data;
beforeNavigate((navigation) => {
	console.log('Before navigation:', navigation);
});

afterNavigate((navigation) => {
	console.log('After navigation:', navigation);
});
</script>

<ThemeChanger visible={false} />
<Header />
<slot />

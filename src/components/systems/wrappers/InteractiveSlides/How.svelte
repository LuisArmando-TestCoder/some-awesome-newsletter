<script>
    import { andthisthingaswell } from "./store.ts"
</script>

<button onclick={() => {
    andthisthingaswell.set(!$andthisthingaswell)
}}>Clicked this B {$andthisthingaswell}</button>
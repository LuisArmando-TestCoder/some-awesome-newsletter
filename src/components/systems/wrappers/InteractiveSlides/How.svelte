<script>
    import { andthisthingaswell } from "./store"
</script>

<button onclick={() => {
    andthisthingaswell.set(!$andthisthingaswell)
}}>Clicked this B {$andthisthingaswell}</button>
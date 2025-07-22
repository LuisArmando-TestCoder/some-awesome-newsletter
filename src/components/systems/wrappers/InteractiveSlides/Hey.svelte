<script>
    import { andthisthing } from "./store.ts"
</script>

<button onclick={() => {
    andthisthing.set(!$andthisthing)
}}>Clicked this A {$andthisthing}</button>
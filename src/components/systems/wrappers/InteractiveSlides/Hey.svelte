<script>
    import { andthisthing } from "./store"
</script>

<button onclick={() => {
    andthisthing.set(!$andthisthing)
}}>Clicked this A {$andthisthing}</button>
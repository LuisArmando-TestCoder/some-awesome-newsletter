<script lang="ts">
    import { fade } from 'svelte/transition';
    import type { SvelteComponent } from 'svelte';

    /**
     * Describes one step in the checklist.
     * `componentValue` is any Svelte component constructor that should render when the rule is met.
     */
    interface CheckCondition<T = SvelteComponent> {
        componentValue: new (...args: any) => T;
        condition: boolean;   // purely primitive boolean for strict typing
        checkName: string;
        tooltip: string;
    }

    /**
     * Array of conditions injected by the parent.
     */
    export let checkConditions: CheckCondition[] = [];

    /**
     * Derive which <li> in the component list should be visible.
     * Logic: visible when (current && !next) OR (!current && prev)
     */
    $: showStates = checkConditions.map((cc, idx) => {
        const prev = checkConditions[idx - 1]?.condition ?? true;
        const next = checkConditions[idx + 1]?.condition ?? false;
        const current = cc.condition;
        return (current && !next) || (!current && prev);
    });
</script>

<!-- Checklist with tooltips -->
<ul class="checklist" role="list">
    {#each checkConditions as { checkName, tooltip, condition }, idx}
        <li
            class="check"
            class:checked={condition}
            aria-checked={condition}
            tabindex="0"
        >
            {checkName}
            <span class="tooltip" role="tooltip">{tooltip}</span>
        </li>
    {/each}
</ul>

<!-- Dynamic component host -->
<ul class="component" aria-live="polite">
    {#each checkConditions as { componentValue }, idx}
        <li class:show={showStates[idx]} transition:fade|local>
            {#if showStates[idx]}
                <svelte:component this={componentValue} />
            {/if}
        </li>
    {/each}
</ul>

<style lang="scss">
    /* Checklist styles */
    .checklist {
        list-style: none;
        padding: 0;
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        margin-bottom: 1rem;

        .check {
            position: relative;
            padding: 0.5rem 1rem;
            border: 2px solid #ccc;
            border-radius: 6px;
            cursor: default;
            transition: background-color 0.3s, border-color 0.3s;

            &.checked {
                border-color: #4caf50;
                background-color: rgba(76, 175, 80, 0.1);
            }

            .tooltip {
                position: absolute;
                bottom: -1.75rem;
                left: 50%;
                transform: translateX(-50%);
                background: #333;
                color: #fff;
                padding: 0.25rem 0.5rem;
                font-size: 0.7rem;
                border-radius: 4px;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
            }

            &:hover .tooltip,
            &:focus .tooltip {
                opacity: 1;
            }
        }
    }

    /* Component host styles */
    .component {
        list-style: none;
        padding: 0;
        margin: 0;
        position: relative;
        display: flex;
        justify-content: center;

        li {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;

            &.show {
                opacity: 1;
                pointer-events: all;
            }
        }
    }
</style>

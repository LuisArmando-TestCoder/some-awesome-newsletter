<script lang="ts">
    import { fade } from 'svelte/transition';
    import type { SvelteComponent } from 'svelte';
    // Animation for CSS transitions is not possible due to external re-rendering for state transitions, so use gsap or keyframes

    /**
     * Describes one step in the checklist.
     * `componentValue` is any Svelte component constructor that should render when the rule is met.
     */
    interface CheckCondition<T = SvelteComponent> {
        componentValue: new (...args: any) => T;
        condition: () => boolean;   // purely primitive boolean for strict typing
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
        const prev = checkConditions[idx - 1]?.condition() ?? true;
        const next = checkConditions[idx + 1]?.condition() ?? false;
        const current = cc.condition();
        return prev && !next && !current;
    });
</script>

<!-- Checklist with tooltips -->
<ul class="checklist" role="list">
    {#each checkConditions as { checkName, tooltip, condition }, idx}
        <li
            class="check"
            class:checked={condition()}
            aria-checked={condition()}
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
            <svelte:component this={componentValue} />
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
        margin-bottom: 1rem;
        flex-direction: column;

        .check {
            position: relative;
            padding: 0.5rem 1rem;
            cursor: default;
            transition: background-color 0.3s, border-color 0.3s;

            &::before {
                content: "";
                display: inline-block;
                width: 5px;
                height: 5px;
                position: relative;
                border: 1px solid #4caf50;
                border-radius: 50%;
                margin-right: 10px;
                transition: 0.5s;
                background: transparent;
            }

            &.checked {
                &::before {
                    animation: appear .35s forwards;
                    background: transparent;
                }

                @keyframes appear {
                    0% {
                        background: transparent;
                    }
                    to {
                        background: #4caf50;
                    }
                }
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
            transition: .5s;
            transform: translateX(100px);

            &.show {
                opacity: 1;
                pointer-events: all;
                animation: show .65s forwards;
            }

            @keyframes show {
                0% {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0px);
                }
            }
        }
    }
</style>

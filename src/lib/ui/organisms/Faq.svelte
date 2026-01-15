<script lang="ts">
    import { faqs } from '../../../components/data/faq';
    import { writable, derived } from 'svelte/store';
    import PlainText from '../components/PlainText.svelte';

    // Writable store for the search term
    const searchTerm = writable('');

    // Derived store for filtered FAQs
    const filteredFaqs = derived(
        [faqs, searchTerm],
        ([$faqs, $searchTerm]) => {
            if (!$searchTerm) return $faqs;
            const term = $searchTerm.toLowerCase();
            return $faqs.filter(faq =>
                faq.q.toLowerCase().includes(term) ||
                faq.a.toLowerCase().includes(term)
            );
        }
    );

    function handleFaqToggle(e: MouseEvent) {
        const button = e.currentTarget as HTMLButtonElement;
        const content = button.nextElementSibling as HTMLElement;
        const parent = button.parentElement as HTMLElement; // Get wrapper for active state styling
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        button.setAttribute('aria-expanded', String(!isExpanded));
        
        // Toggle active class on parent for styling
        if (!isExpanded) {
            parent.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 30 + 'px'; // +30 for breathing room
            content.style.opacity = '1';
        } else {
            parent.classList.remove('active');
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
        }
    }
</script>

<section id="faq" class="faq-section">
    <div class="container">
        <div class="section-header">
            <h2 class="gradient-text">Frequently Asked Questions</h2>
            <p class="subtitle">Everything you need to know about the product.</p>
        </div>
        
        <div class="search-wrapper">
            <div class="search-glass">
                <PlainText bind:value={$searchTerm} placeholder="Type to search FAQs..." />
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
        </div>

        <div class="faq-grid">
            {#each $filteredFaqs as item, i}
                <div class="faq-card">
                    <button
                        class="faq-question"
                        aria-expanded="false"
                        aria-controls="faq-answer-{i}"
                        on:click={handleFaqToggle}
                    >
                        <span class="question-text">{item.q}</span>
                        <div class="icon-wrapper">
                            <span class="faq-icon-line vertical"></span>
                            <span class="faq-icon-line horizontal"></span>
                        </div>
                    </button>
                    <div id="faq-answer-{i}" class="faq-answer" role="region">
                        <div class="answer-inner">
                            <p>{item.a}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style lang="scss">
    /* Define local variables for easy theming.
       Using Modern HSL/RGB values for alpha transparency control.
    */
    .faq-section {
        --primary-color: var(--c-primary, #007aff);
        --bg-surface: #ffffff;
        --bg-hover: #f9fafb;
        --border-color: rgba(0, 0, 0, 0.08);
        --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
        --shadow-md: 0 12px 24px -6px rgba(0, 0, 0, 0.08);
        --shadow-glow: 0 0 0 4px rgba(0, 122, 255, 0.15);
        --ease-elastic: cubic-bezier(0.25, 1, 0.5, 1);
        
        padding: var(--space-xxl) 20px;
        position: relative;
        background: radial-gradient(circle at top right, rgba(0, 122, 255, 0.03), transparent 40%);
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
    }

    /* ===== Typography ===== */
    .section-header {
        text-align: center;
        margin-bottom: var(--space-xl);

        h2.gradient-text {
            font-size: clamp(2rem, 5vw, 2.8rem);
            font-weight: 800;
            letter-spacing: -0.03em;
            margin-bottom: var(--space-xs);
            /* Eye-catching Gradient Text */
            background: linear-gradient(135deg, var(--c-text-dark, #111) 30%, var(--c-primary, #444));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .subtitle {
            color: var(--c-text-light);
            font-size: 1.1rem;
        }
    }

    /* ===== Search Bar (Glassmorphism) ===== */
    .search-wrapper {
        margin-bottom: 40px;
        position: relative;
        z-index: 2;
    }

    .search-glass {
        position: relative;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.8);
        border-radius: 16px;
        padding: 4px;
        transition: transform 0.3s var(--ease-elastic), box-shadow 0.3s ease;
        display: flex;
        align-items: center;

        &:focus-within {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md), var(--shadow-glow);
            border-color: var(--primary-color);
        }

        /* Styling the Svelte Component container specifically */
        :global(input), :global(.plain-text-input) { 
            width: 100%;
            border: none;
            background: transparent;
            padding: 16px 16px 16px 50px; /* Space for icon */
            font-size: 1.1rem;
            outline: none;
            color: var(--c-text);
        }

        .search-icon {
            position: absolute;
            left: 20px;
            color: var(--c-text-light);
            pointer-events: none;
        }
    }

    /* ===== FAQ List (Grid Layout) ===== */
    .faq-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    /* ===== FAQ Card Style ===== */
    .faq-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s ease;
        position: relative;

        &:hover {
            border-color: rgba(0, 0, 0, 0.15);
            transform: translateY(-1px);
        }

        &.active {
            border-color: var(--primary-color);
            background: #fff;
            box-shadow: var(--shadow-sm);
        }
    }

    /* ===== Question Button ===== */
    .faq-question {
        width: 100%;
        background: none;
        border: none;
        text-align: left;
        padding: 24px;
        font-size: 1.15rem;
        font-weight: 600;
        color: var(--c-text);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        transition: background 0.2s;

        &:hover {
            background: var(--bg-hover);
        }

        .question-text {
            line-height: 1.4;
        }
    }

    /* ===== Animated Icon (Plus to Minus) ===== */
    .icon-wrapper {
        position: relative;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }

    .faq-icon-line {
        position: absolute;
        background-color: var(--c-text);
        border-radius: 2px;
        transition: transform 0.3s var(--ease-elastic), opacity 0.3s ease;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        
        &.horizontal { width: 100%; height: 2px; }
        &.vertical { width: 2px; height: 100%; }
    }

    /* State: Expanded Icon */
    .faq-question[aria-expanded='true'] {
        .faq-icon-line.vertical {
            transform: translate(-50%, -50%) rotate(90deg);
            opacity: 0; /* Fade out vertical line to make minus */
        }
        .faq-icon-line.horizontal {
            transform: translate(-50%, -50%) rotate(180deg);
            background-color: var(--primary-color);
        }
    }

    /* ===== Answer Area ===== */
    .faq-answer {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        /* Double transition for height and opacity feels more organic */
        transition: max-height 0.4s var(--ease-elastic), opacity 0.3s ease;
        
        .answer-inner {
            padding: 0 24px 24px 24px;
            p {
                color: var(--c-text-light);
                line-height: 1.7;
                font-size: 1.05rem;
                margin: 0;
            }
        }
    }
</style>
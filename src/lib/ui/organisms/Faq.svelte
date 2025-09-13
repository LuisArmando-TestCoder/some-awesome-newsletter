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
		const isExpanded = button.getAttribute('aria-expanded') === 'true';

		button.setAttribute('aria-expanded', String(!isExpanded));
		if (!isExpanded) {
			content.style.maxHeight = content.scrollHeight + 'px';
		} else {
			content.style.maxHeight = '0px';
		}
	}
</script>

<section id="faq" class="faq">
	<div class="container">
		<div class="section-header">
			<h2>Frequently Asked Questions</h2>
		</div>
		<PlainText bind:value={$searchTerm} placeholder="Search FAQs" />
		<div class="faq-list">
			{#each $filteredFaqs as item, i}
				<div class="faq-item">
					<button
						class="faq-question"
						aria-expanded="false"
						aria-controls="faq-answer-{i}"
						on:click={handleFaqToggle}
					>
						<span>{item.q}</span>
						<span class="faq-icon">+</span>
					</button>
					<div id="faq-answer-{i}" class="faq-answer" role="region">
						<p>{item.a}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	.faq {
		max-width: 800px;
		margin: var(--space-xxl) auto;
		.faq-list {
		}
		.faq-item {
			border-bottom: 1px solid var(--c-border);
		}
		.faq-question {
			width: 100%;
			background: none;
			border: none;
			text-align: left;
			padding: var(--space-lg) 0;
			font-size: 1.2rem;
			font-weight: 600;
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: var(--space-md);
			.faq-icon {
				font-size: 1.5rem;
				transition: transform var(--transition-fast);
			}
			&[aria-expanded='true'] .faq-icon {
				transform: rotate(45deg);
			}
		}
		.faq-answer {
			max-height: 0;
			overflow: hidden;
			transition: max-height var(--transition-normal);
			p {
				padding-bottom: var(--space-lg);
				color: var(--c-text-light);
			}
		}
	}
</style>

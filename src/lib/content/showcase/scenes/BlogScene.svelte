<!-- Blog: each issue becomes a public article page; cards arrive in order. -->
<script lang="ts">
	import { fill, type Example, type ShowcaseUi } from '../types';
	let { example, ui }: { example: Example; ui: ShowcaseUi } = $props();
</script>

<div class="blog">
	<p class="ui-muted host a-in">{example.site}/blog</p>
	<p class="ui-h a-in" style:--d="100">{fill(ui.blogTitle, { business: example.business })}</p>
	<div class="grid">
		{#each example.articles as a, i (a)}
			<article class="ui-card card a-in" class:is-lead={i === 0} style:--d={500 + i * 350}>
				<span class="img"></span>
				<p class="t">{a}</p>
				<p class="ui-muted langs">{example.languages.map((l) => l.code.toUpperCase()).join(' · ')}</p>
			</article>
		{/each}
	</div>
</div>

<style>
	.blog {
		display: grid;
		gap: 6px;
		align-content: start;
	}
	.host {
		margin: 0;
		font-size: 11px;
	}
	.grid {
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr;
		gap: 8px;
		margin-top: 8px;
	}
	.card {
		display: grid;
		gap: 6px;
		padding: 8px;
		align-content: start;
	}
	.img {
		display: block;
		aspect-ratio: 3 / 2;
		border-radius: 8px;
		background: linear-gradient(135deg, var(--surface-2), var(--surface-3));
	}
	.is-lead .img {
		background: linear-gradient(135deg, var(--surface-3), var(--text-muted-large));
	}
	.t {
		margin: 0;
		font-weight: var(--fw-semibold);
		line-height: 1.3;
	}
	.is-lead .t {
		font-size: 15px;
		letter-spacing: -0.01em;
	}
	.langs {
		margin: 0;
		font-size: 11px;
	}
	@container scmain (width < 30rem) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
		.is-lead {
			grid-column: 1 / -1;
		}
	}
</style>

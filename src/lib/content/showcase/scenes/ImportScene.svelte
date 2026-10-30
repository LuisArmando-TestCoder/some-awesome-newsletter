<!-- Import: a CSV arrives, rows stream in, the count rises, the list is ready. -->
<script lang="ts">
	import { fill, type Example, type ShowcaseUi } from '../types';
	let { example, ui }: { example: Example; ui: ShowcaseUi } = $props();
</script>

<div class="imp">
	<div class="file ui-card a-pop">
		<span class="doc">CSV</span>
		<div class="file__t">
			<strong>{ui.importFile}</strong>
			<span class="ui-muted">{ui.importing}</span>
		</div>
		<span class="n"><span class="a-count" style:--to={example.importCount} style:--d="600"></span></span>
	</div>
	<span class="progress"><span class="a-grow-x" style:--d="600"></span></span>
	<div class="ui-card rows">
		{#each example.people as p, i (p.email)}
			<div class="row a-in" style:--d={800 + i * 300}>
				<span class="email">{p.email}</span><span class="ui-pill">{p.lang}</span>
			</div>
		{/each}
	</div>
	<p class="done a-in" style:--d="2400"><span class="ui-check"></span>{fill(ui.imported, { count: example.importCount })}</p>
</div>

<style>
	.imp {
		display: grid;
		gap: 10px;
		align-content: start;
	}
	.file {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 12px;
	}
	.doc {
		display: grid;
		place-items: center;
		width: 34px;
		height: 40px;
		border: 1.5px solid var(--text-1);
		border-radius: 4px 10px 4px 4px;
		font-size: 9px;
		font-weight: var(--fw-bold);
	}
	.file__t {
		display: grid;
	}
	.n {
		font-size: 22px;
		font-weight: var(--fw-semibold);
	}
	.progress {
		display: block;
		height: 4px;
		border-radius: 2px;
		background: var(--surface-2);
		overflow: hidden;
	}
	.progress span {
		display: block;
		height: 100%;
		background: var(--text-1);
		animation-duration: 1400ms !important;
	}
	.rows {
		padding: 2px 0;
	}
	.row {
		display: flex;
		justify-content: space-between;
		gap: 8px;
		padding: 7px 12px;
		border-top: 1px solid var(--border-1);
	}
	.row:first-child {
		border-top: 0;
	}
	.email {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.done {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0;
		font-weight: var(--fw-semibold);
	}
</style>

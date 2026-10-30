<!-- Fake pointer for sample dashboards. Moves from (x0,y0) to (x1,y1), as % of the scene, then clicks. -->
<script lang="ts">
	let { x0 = '70%', y0 = '90%', x1, y1, d = 0 }: { x0?: string; y0?: string; x1: string; y1: string; d?: number } = $props();
</script>

<span class="ui-cursor a-cursor" style:--x0={x0} style:--y0={y0} style:--x1={x1} style:--y1={y1} style:--d={d} style:--d2={d + 1050}>
	<svg viewBox="0 0 18 18"><path d="M2 1.5l12.5 7.2-5.6 1.3-2.6 5.4z" fill="currentColor" stroke="var(--surface-0)" stroke-width="1.2" stroke-linejoin="round" /></svg>
	<span class="a-ring"></span>
</span>

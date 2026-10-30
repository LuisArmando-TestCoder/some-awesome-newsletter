<!-- Signup form: on the owner's own site, a visitor subscribes and picks a language. -->
<script lang="ts">
	import Cursor from './Cursor.svelte';
	import { type Example, type ShowcaseUi } from '../types';
	let { example, ui }: { example: Example; ui: ShowcaseUi } = $props();
	const person = $derived(example.people.find((p) => p.via === 'form') ?? example.people[0]);
	const langName = $derived(example.languages.find((l) => l.code.toUpperCase() === person.lang)?.name ?? person.lang);
</script>

<div class="site">
	<div class="page a-in">
		<p class="host ui-muted">{example.site}</p>
		<div class="lines"><span></span><span></span><span class="short"></span></div>
	</div>
	<div class="form ui-card a-in" style:--d="250">
		<p class="form__h">{ui.signupHeading}</p>
		<p class="ui-label">{ui.signupEmail}</p>
		<span class="ui-field"><span class="a-type" style:--n={person.email.length} style:--d="900">{person.email}</span></span>
		<p class="ui-label lbl">{ui.signupLanguage}</p>
		<span class="ui-field select"><span class="a-in" style:--d="2300">{langName}</span><span class="chev"></span></span>
		<span class="ui-btn ui-btn--ink submit a-press" style:--d="3500">{ui.signupButton}</span>
		<p class="done a-in" style:--d="3800"><span class="ui-check"></span>{ui.signupDone}</p>
	</div>
	<Cursor x0="40%" y0="80%" x1="80%" y1="50%" d={2400} />
</div>

<style>
	.site {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1.1fr;
		gap: 14px;
		align-items: start;
		min-height: 100%;
	}
	.host {
		margin: 0 0 12px;
		font-size: 11px;
	}
	.lines {
		display: grid;
		gap: 8px;
	}
	.lines span {
		height: 8px;
		border-radius: 4px;
		background: var(--surface-2);
	}
	.lines .short {
		width: 60%;
	}
	.form {
		display: grid;
		padding: 14px;
	}
	.form__h {
		margin: 0 0 10px;
		font-weight: var(--fw-semibold);
		font-size: 14px;
	}
	.lbl {
		margin-top: 10px;
	}
	.select {
		justify-content: space-between;
	}
	.chev {
		width: 7px;
		height: 7px;
		border-right: 1.5px solid var(--text-2);
		border-bottom: 1.5px solid var(--text-2);
		transform: rotate(45deg) translateY(-2px);
	}
	.submit {
		margin-top: 12px;
		height: 32px;
	}
	.done {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 10px 0 0;
		color: var(--success);
		font-weight: var(--fw-semibold);
		font-size: 12px;
	}
	@container scmain (width < 26rem) {
		.site {
			grid-template-columns: 1fr;
		}
		.page {
			display: none;
		}
	}
</style>

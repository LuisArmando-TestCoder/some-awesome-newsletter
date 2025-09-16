<script lang="ts">
	import { onMount } from "svelte";
	import { content } from "$lib/content";
	import { useSmoothPage } from "$lib/anim/useSmoothPage";
	import { useScrollSection } from "$lib/anim/useScrollSection";
	import { browser } from "$app/environment";
	import { afterNavigate } from "$app/navigation";
	import { getSmoother, refreshAll } from "$lib/anim/gsap.client";
	import Faq from "$lib/ui/organisms/Faq.svelte";
	import logout from "../components/systems/requests/logout";
	// --- State ---
	let showAnnouncement = true;
	let prefersReducedMotion = false;

	// --- Lifecycle & Interactions ---
	onMount(() => {
		if (!browser) return;
		// Check for reduced motion preference
		const mediaQuery = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		);
		prefersReducedMotion = mediaQuery.matches;
		mediaQuery.addEventListener(
			"change",
			(e) => (prefersReducedMotion = e.matches),
		);

		// Handle announcement bar persistence
		if (localStorage.getItem("announcementDismissed") === "true") {
			showAnnouncement = false;
		}

		// Refresh ScrollTrigger on window resize
		window.addEventListener("resize", refreshAll);

		return () => {
			window.removeEventListener("resize", refreshAll);
		};
	});

	afterNavigate(({ to }) => {
		if (browser) {
			const smoother = getSmoother();
			if (smoother && to?.url.hash) {
				smoother.scrollTo(to.url.hash, true, "top top");
			} else if (smoother) {
				smoother.scrollTo(0, true);
			}
			refreshAll();
		}
	});

	function handleDismissAnnouncement() {
		showAnnouncement = false;
		localStorage.setItem("announcementDismissed", "true");
	}
</script>

<svelte:head>
	<title>{$content.title}</title>
	<meta name="description" content={$content.metaDescription} />
	<link rel="canonical" href={$content.canonicalUrl} />
	<!-- Open Graph -->
	<meta property="og:title" content={$content.title} />
	<meta property="og:description" content={$content.metaDescription} />
	<meta property="og:image" content={$content.ogImageUrl} />
	<meta property="og:url" content={$content.canonicalUrl} />
	<meta property="og:type" content="website" />
	<!-- JSON-LD -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "${$content.organization.name}",
			"url": "${$content.organization.url}",
			"logo": "${$content.organization.logo}"
		}
	</script>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Product",
			"name": "${$content.product.name}",
			"description": "${$content.product.description}",
			"brand": {
				"@type": "Organization",
				"name": "${$content.organization.name}"
			}
		}
	</script>
</svelte:head>

<div id="smooth-wrapper" use:useSmoothPage>
	<div id="smooth-content">
		<!-- Accessibility: Skip to main content -->
		<a href="#main-content" class="skip-link">Skip to main content</a>
		<!-- Page Wrapper -->
		<div class="landing-page">
			<!-- 1. Announcement Bar -->
			{#if showAnnouncement}
				<div class="announcement-bar">
					<p>
						{$content.announcement.text}
						<a href="#">{$content.announcement.cta} &rarr;</a>
					</p>
					<button
						aria-label="Dismiss announcement"
						on:click={handleDismissAnnouncement}
						on:keydown={(e) =>
							e.key === "Escape" && handleDismissAnnouncement()}
					>
						&times;
					</button>
				</div>
			{/if}


			<main id="main-content">
				<!-- 3. Hero Section -->
				<section class="hero" use:useScrollSection>
					<div class="container">
						<h1 class="hero-hook" data-speed="0.9">
							{$content.hero.hook}
						</h1>
						<p class="hero-sub-hook" data-speed="0.8">
							{$content.hero.subHook}
						</p>
						<div class="hero-ctas" data-speed="0.9">
							<a
								on:click={() => {
									logout(false);
								}}
								href="/signup"
								class="cta-secondary-inverted"
								>{$content.hero.primaryCta}</a
							>
							<a href="/demo" class="cta-primary-scaled"
								>{$content.hero.secondaryCta}</a
							>
						</div>
						<ul class="hero-trust-cues" data-speed="0.7">
							{#each $content.hero.trustCues as cue}
								<li>{cue}</li>
							{/each}
						</ul>
					</div>
				</section>

				<!-- 4. Social Proof -->
				<section class="social-proof" use:useScrollSection>
					<div class="container">
						<p>{$content.socialProof.counts}</p>
						<div class="logo-strip" data-speed="1.1">
							{#each $content.socialProof.logos as logo}
								<img
									src={logo.src}
									alt="{logo.name} logo"
									loading="lazy"
									width="120"
									height="40"
								/>
							{/each}
						</div>
					</div>
				</section>

				<!-- 5. Value Propositions -->
				<section class="value-props" use:useScrollSection>
					<div class="container">
						<div class="section-header">
							<h2>{$content.valueProps.title}</h2>
							<p>{$content.valueProps.subTitle}</p>
						</div>
						<div class="grid">
							{#each $content.valueProps.props as prop, i}
								<div class="card" data-speed="1.05">
									<h3>{prop.title}</h3>
									<p>{prop.description}</p>
								</div>
							{/each}
						</div>
					</div>
				</section>

				<!-- 6. Feature Grid -->
				<section
					id="features"
					class="feature-grid"
					use:useScrollSection
				>
					<div class="container">
						<div class="section-header">
							<h2>{$content.features.title}</h2>
							<p>
								{$content.features.subTitle}
							</p>
						</div>
						{#each $content.features.featureList as feature, i}
							<div
								class="feature-item"
								class:reverse={i % 2 !== 0}
							>
								<div class="feature-text">
									<h3>{feature.title}</h3>
									<p>{feature.description}</p>
									<a href="#" class="cta-link"
										>{feature.cta} &rarr;</a
									>
								</div>
								<div class="feature-visual" data-speed="auto">
									<img
										src={feature.image}
										alt="{feature.title} screenshot"
										loading="lazy"
										width="500"
										height="350"
									/>
								</div>
							</div>
						{/each}
					</div>
				</section>

				<!-- 7. How It Works -->
				<section class="how-it-works" use:useScrollSection>
					<div class="container">
						<div class="section-header">
							<h2>{$content.howItWorks.title}</h2>
						</div>
						<div class="steps-grid">
							{#each $content.howItWorks.steps as item, i}
								<div class="step-card" data-lag="0.1">
									<div class="step-number">{item.step}</div>
									<h4>{item.title}</h4>
									<p>{item.description}</p>
								</div>
							{/each}
						</div>
					</div>
				</section>

				<!-- 8. Use Cases / Personas -->
				<section class="personas" use:useScrollSection>
					<div class="container">
						<div class="section-header">
							<h2>{$content.personas.title}</h2>
							<p>
								{$content.personas.subTitle}
							</p>
						</div>
						<div class="grid">
							{#each $content.personas.personaList as persona, i}
								<div class="card" data-speed="1.05">
									<h4>{persona.persona}</h4>
									<p>
										<strong>Problem:</strong>
										{persona.problem}
									</p>
									<p>
										<strong>Outcome:</strong>
										{persona.outcome}
									</p>
								</div>
							{/each}
						</div>
					</div>
				</section>

				<!-- 9. Metrics / Outcomes -->
				<section class="metrics" use:useScrollSection>
					<div class="container">
						<div class="section-header">
							<h2>{$content.metrics.title}</h2>
						</div>
						<div class="metrics-grid">
							{#each $content.metrics.metricList as metric, i}
								<div class="metric-item" data-speed="0.9">
									<div class="metric-value">
										{metric.value}
									</div>
									<div class="metric-label">
										{metric.label}
									</div>
									<p class="metric-proof">{metric.proof}</p>
								</div>
							{/each}
						</div>
					</div>
				</section>

				<!-- 10. Integrations -->
				<section class="integrations" use:useScrollSection>
					<div class="container">
						<div class="section-header">
							<h2>{$content.integrations.text}</h2>
						</div>
						<div class="logo-strip" data-speed="1.1">
							{#each $content.integrations.logos as logo}
								<img
									src={logo.src}
									alt="{logo.name} logo"
									loading="lazy"
									width="64"
									height="64"
								/>
							{/each}
						</div>
						<a href="/integrations" class="cta-link"
							>See all integrations &rarr;</a
						>
					</div>
				</section>

				<!-- 11. Testimonials -->
				<section class="testimonials" use:useScrollSection>
					<div class="container">
						<div class="section-header">
							<h2>{$content.testimonials.title}</h2>
						</div>
						<div class="grid">
							{#each $content.testimonials.testimonialList as testimonial, i}
								<blockquote class="card" data-lag="0.05">
									<p>"{testimonial.quote}"</p>
									<footer>
										<cite>
											<strong>{testimonial.name}</strong>, {testimonial.title}
										</cite>
									</footer>
								</blockquote>
							{/each}
						</div>
					</div>
				</section>

				<!-- 12. Pricing Preview -->
				<section
					id="pricing"
					class="pricing-preview"
					use:useScrollSection
				>
					<div class="container">
						<div class="section-header">
							<h2>{$content.pricing.teaser}</h2>
						</div>
						<div class="pricing-box">
							<p>{$content.pricing.subTitle}</p>
							<div class="plan-price">
								{$content.pricing.plan}
							</div>
							<a href="/pricing" class="cta-primary"
								>{$content.pricing.cta}</a
							>
						</div>
					</div>
				</section>

				<!-- 13. FAQ -->
				<Faq />

				<!-- 14. Final CTA -->
				<section id="demo" class="final-cta" use:useScrollSection>
					<div class="container">
						<h2>{$content.finalCta.hook}</h2>
						<a
							on:click={() => {
								logout(false);
							}}
							href="/signup"
							class="cta-primary-inverted"
							>{$content.finalCta.cta}</a
						>
					</div>
				</section>
			</main>

			<!-- 15. Footer -->
			<footer class="page-footer">
				<div class="container">
					<div class="footer-main">
						<div class="footer-about">
							<a href="/" class="logo" aria-label="Homepage">
								<img
									src="/icons/logow.png"
									width="50"
									alt="logo"
								/>
								<span>{$content.organization.name}</span>
							</a>
							<p>
								&copy; {new Date().getFullYear()}
								{$content.footer.copyright}
							</p>
							<p>
								<a href="mailto:{$content.footer.contact}"
									>{$content.footer.contact}</a
								>
							</p>
						</div>
						<div class="footer-links">
							<h4>{$content.footer.companyLinks.title}</h4>
							<ul>
								{#each $content.footer.companyLinks.links as link}
									<li><a href={link.href}>{link.text}</a></li>
								{/each}
							</ul>
						</div>
						<div class="footer-links">
							<h4>{$content.footer.legalLinks.title}</h4>
							<ul>
								{#each $content.footer.legalLinks.links as link}
									<li><a href={link.href}>{link.text}</a></li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	</div>
</div>

<style lang="scss">
	@use "../styles/global.scss";
	* {
		box-sizing: border-box;
	}

	.landing-page {
		animation: fadeIn 0.8s ease-in-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* --- UTILITIES --- */
	.container {
		width: 100%;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		padding: 0 var(--space-lg);
	}

	.skip-link {
		position: absolute;
		top: -100px;
		left: 0;
		background: var(--c-primary);
		color: var(--c-white);
		padding: var(--space-md);
		z-index: 100;
		transition: top 0.3s;
		&:focus {
			top: 0;
		}
	}

	/* --- ATOMS: Buttons & Links --- */
	.cta-primary,
	.cta-secondary,
	.cta-link,
	.cta-primary-inverted,
	.cta-secondary-inverted,
	.cta-primary-scaled {
		display: inline-block;
		font-weight: 600;
		border-radius: var(--radius-md);
		padding: 0.75rem 1.5rem;
		text-align: center;
		transition: all var(--transition-fast);
		border: 2px solid transparent;
		cursor: pointer;

		&:focus-visible {
			outline: 2px solid transparent;
			outline-offset: 2px;
			box-shadow:
				0 0 0 3px var(--c-white),
				0 0 0 5px var(--c-focus-ring);
		}
	}

	.cta-primary {
		background-color: var(--c-white);
		color: var(--c-white);
		box-shadow: inset 0 0 0 100px var(--c-primary);
		transition:
			box-shadow 1s,
			color 0.2s,
			background-color 0.4s;

		&:hover {
			background-color: transparent;
			color: var(--c-primary);
			box-shadow: inset 0 0 0 2px var(--c-primary);
		}
	}

	.cta-primary-inverted {
		background-color: var(--c-primary);
		color: var(--c-primary);
		box-shadow: inset 0 0 0 100px var(--c-white);
		transition:
			box-shadow 1s,
			color 0.2s,
			background-color 0.4s;

		&:hover {
			background-color: transparent;
			color: var(--c-white);
			box-shadow: inset 0 0 0 2px var(--c-white);
		}
	}

	.cta-primary-scaled {
		background-color: var(--c-primary);
		color: var(--c-primary);
		box-shadow: inset 0 0 0 100px var(--c-white);
		transition:
			box-shadow 1s,
			color 0.2s,
			background-color 0.4s,
			transform 0.75;
		transition-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
		transform: scale(1);

		&:hover {
			transform: scale(1.025);
		}
	}

	.cta-secondary {
		background-color: var(--c-bg);
		color: var(--c-primary);
		border-color: var(--c-border);
		&:hover {
			border-color: var(--c-primary);
		}
	}

	.cta-secondary-inverted {
		background-color: var(--c-white);
		color: var(--c-white);
		box-shadow: inset 0 0 0 100px var(--c-primary);
		transition:
			box-shadow 1s,
			color 0.2s,
			background-color 0.4s;

		&:hover {
			background-color: transparent;
			color: var(--c-white);
			box-shadow: inset 0 0 0 2px var(--c-white);
		}
	}

	.cta-link {
		padding: 0;
		font-weight: 600;
		color: var(--c-primary);
	}

	/* --- ATOMS: Cards --- */
	.card {
		background: var(--c-white);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-md);
		transition:
			transform var(--transition-normal),
			box-shadow var(--transition-normal);
		height: 100%;
	}

	/* --- ORGANISMS: Sections --- */
	section {
		padding: var(--space-xl) 0;
		@media (min-width: 768px) {
			padding: var(--space-xxl) 0;
		}
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-xl);
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
		h2 {
			margin-bottom: var(--space-sm);
		}
		p {
			font-size: 1.125rem;
			color: var(--c-text-light);
		}
	}

	.grid {
		display: grid;
		gap: var(--space-lg);
		@media (min-width: 768px) {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}
	}

	/* 1. Announcement Bar */
	.announcement-bar {
		background-color: var(--c-primary);
		color: var(--c-white);
		padding: var(--space-sm) var(--space-lg);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		position: relative;
		border-bottom: 1px solid var(--c-white);
		p {
			margin: 0;
			font-weight: 500;
		}
		a {
			color: var(--c-white);
			text-decoration: underline;
			margin-left: var(--space-sm);
		}
		button {
			background: none;
			border: none;
			color: var(--c-white);
			font-size: 1.5rem;
			line-height: 1;
			cursor: pointer;
			padding: 0 var(--space-md);
			position: absolute;
			right: var(--space-md);
			opacity: 0.8;
			transition: all var(--transition-fast);
			&:hover {
				background-color: var(--c-white);
				color: var(--c-primary);
			}
		}
	}

	/* 2. Header */
	.page-header {
		background: var(--c-bg);
		padding: var(--space-md) 0;
		border-bottom: 1px solid var(--c-border);
		position: sticky;
		top: 0;
		z-index: 10;
		.container {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.logo {
			display: flex;
			align-items: center;
			gap: var(--space-sm);
			font-weight: 700;
			font-size: 1.25rem;
			color: var(--c-text);
			svg {
				color: var(--c-primary);
			}
		}
		nav {
			display: none;
			@media (min-width: 768px) {
				display: block;
			}
			ul {
				list-style: none;
				margin: 0;
				padding: 0;
				display: flex;
				gap: var(--space-lg);
			}
			a {
				color: var(--c-text-light);
				font-weight: 500;
			}
		}
		.header-actions {
			display: flex;
			align-items: center;
			gap: var(--space-sm);
		}
	}

	/* 3. Hero */
	.hero {
		background: url(https://images.pexels.com/photos/574283/pexels-photo-574283.jpeg);
		background-size: cover;
		background-attachment: fixed;
		text-align: center;
		padding-top: var(--space-xxl);
		.container {
			max-width: 800px;
		}
		.hero-hook {
			margin-bottom: var(--space-md);
			color: var(--color-background);
		}
		.hero-sub-hook {
			font-size: 1.25rem;
			color: var(--color-background);
			margin: var(--space-xl);
		}
		.hero-ctas {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: var(--space-md);
			margin: var(--space-xxl) 0;
		}
		.hero-trust-cues {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			justify-content: center;
			gap: var(--space-lg);
			font-size: 0.9rem;
			color: var(--color-background);
			li {
				position: relative;
				&:not(:last-child)::after {
					content: "•";
					position: absolute;
					right: calc(-1 * var(--space-lg) / 2);
					color: var(--c-border);
				}
			}
		}
	}

	/* 4. Social Proof */
	.social-proof {
		z-index: 1;
		padding: var(--space-xl) 0;
		.container {
			text-align: center;
		}
		p {
			font-weight: 500;
			color: var(--c-text-light);
			margin-bottom: var(--space-lg);
		}
		.logo-strip {
			filter: invert(1);
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: var(--space-xl);
			margin: var(--space-xl) 0;
			img {
				max-height: 30px;
				width: auto;
				filter: grayscale(100%);
				opacity: 0.7;
				transition: var(--transition-normal);
			}
		}
	}

	/* 5. Value Props */
	.value-props {
		background: url(http://images.pexels.com/photos/2008145/pexels-photo-2008145.jpeg);
		background-size: cover;
		background-attachment: fixed;
		.card {
			text-align: center;
			h3 {
				color: var(--c-primary);
			}
		}
	}

	/* 6. Feature Grid */
	.feature-item {
		display: grid;
		align-items: center;
		gap: var(--space-xl);
		margin-bottom: var(--space-xxl);
		@media (min-width: 768px) {
			grid-template-columns: 1fr 1fr;
		}
		&.reverse {
			.feature-text {
				order: 2;
			}
		}
		.feature-visual img {
			width: 100%;
			height: auto;
			border-radius: var(--radius-lg);
			box-shadow: var(--shadow-lg);
		}
	}

	/* 7. How It Works */
	.how-it-works {
		background: url(https://images.pexels.com/photos/190295/pexels-photo-190295.jpeg);
		background-size: cover;
		background-attachment: fixed;
		.steps-grid {
			display: grid;
			gap: var(--space-lg);
			text-align: center;
			@media (min-width: 768px) {
				grid-template-columns: repeat(3, 1fr);
			}
		}
		.step-card {
			padding: var(--space-lg);
		}
		.step-number {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background: var(--c-primary);
			color: var(--c-white);
			display: grid;
			place-items: center;
			font-size: 1.5rem;
			font-weight: 700;
			margin: 0 auto var(--space-md);
		}
	}

	/* 9. Metrics */
	.metrics {
		background-color: var(--c-primary);
		color: var(--c-white);
		.section-header h2,
		.section-header p {
			color: var(--c-white);
		}
		.metrics-grid {
			display: grid;
			gap: var(--space-xl);
			text-align: center;
			@media (min-width: 768px) {
				grid-template-columns: repeat(3, 1fr);
			}
		}
		.metric-value {
			font-size: clamp(3rem, 6vw, 5rem);
			font-weight: 700;
			line-height: 1;
		}
		.metric-label {
			font-size: 1.25rem;
			font-weight: 500;
			margin-bottom: var(--space-sm);
		}
		.metric-proof {
			font-size: 0.9rem;
			opacity: 0.8;
			margin: 0;
		}
	}

	/* 10. Integrations */
	.integrations {
		.container {
			text-align: center;
		}
		.logo-strip {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: var(--space-xl);
			margin-bottom: var(--space-lg);
			img {
				height: 48px;
				width: auto;
				transition: transform var(--transition-fast);
			}
		}
	}

	/* 11. Testimonials */
	.testimonials {
		background: url(https://images.pexels.com/photos/1764436/pexels-photo-1764436.jpeg);
		background-size: cover;
		background-attachment: fixed;
		blockquote {
			margin: 0;
			p {
				font-size: 1.125rem;
				font-style: italic;
			}
			cite {
				font-style: normal;
				color: var(--c-text-light);
			}
		}
	}

	/* 12. Pricing Preview */
	.pricing-preview {
		.pricing-box {
			max-width: 500px;
			margin: 0 auto;
			text-align: center;
			padding: var(--space-xl);
			border: 1px solid var(--c-border);
			border-radius: var(--radius-lg);
			box-shadow: var(--shadow-md);
		}
		.plan-price {
			font-size: 2rem;
			font-weight: 700;
			margin: var(--space-md) 0;
			color: var(--c-primary);
		}
	}

	/* 14. Final CTA */
	.final-cta {
		background-color: var(--c-primary);
		color: var(--c-white);
		text-align: center;
		h2 {
			color: var(--c-white);
			margin-bottom: var(--space-lg);
		}
		.cta-primary {
			background-color: var(--c-white);
			color: var(--c-primary);
			&:hover {
				background-color: var(--c-primary);
				color: var(--c-white);
			}
		}
	}

	/* 15. Footer */
	.page-footer {
		background-color: var(--c-text);
		color: var(--c-bg-alt);
		padding: calc(2 * var(--space-xxl)) 0;
		font-size: 0.9rem;
		a {
			color: var(--c-bg-alt);
		}
		.footer-main {
			display: grid;
			gap: var(--space-xl);
			@media (min-width: 768px) {
				grid-template-columns: 2fr 1fr 1fr;
			}
		}
		.logo {
			display: flex;
			place-items: center;
			gap: var(--space-md);
			color: var(--c-white);
			margin-bottom: var(--space-md);
			svg {
				color: var(--c-primary);
			}
		}
		.footer-links {
			h4 {
				color: var(--c-white);
				margin-bottom: var(--space-md);
			}
			ul {
				list-style: none;
				padding: 0;
				margin: 0;
				li {
					margin-bottom: var(--space-sm);
				}
			}
		}
	}
</style>

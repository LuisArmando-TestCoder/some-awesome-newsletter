<script lang="ts">
	import { onMount } from "svelte";
	import { useSmoothPage } from "$lib/anim/useSmoothPage";
	import { useScrollSection } from "$lib/anim/useScrollSection";
	import { browser } from "$app/environment";
	import { afterNavigate } from "$app/navigation";
	import { getSmoother, refreshAll } from "$lib/anim/gsap.client";
	import Faq from "$lib/ui/organisms/Faq.svelte";
	import logout from "../components/systems/requests/logout";
	import { t } from "$lib/i18n/translations";
	import Pricing from "$lib/ui/organisms/Pricing.svelte";
	// --- State ---
	let showAnnouncement = true;
	let prefersReducedMotion = false;

	// --- Lifecycle & Interactions ---
	onMount(() => {
		if (!browser) return;
		const mediaQuery = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		);
		prefersReducedMotion = mediaQuery.matches;
		mediaQuery.addEventListener(
			"change",
			(e) => (prefersReducedMotion = e.matches),
		);

		if (localStorage.getItem("announcementDismissed") === "true") {
			showAnnouncement = false;
		}

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
			if (smoother) {
				refreshAll();
			}
		}
	});

	function handleDismissAnnouncement() {
		showAnnouncement = false;
		localStorage.setItem("announcementDismissed", "true");
	}
</script>

<svelte:head>
	<title>{$t.mainContent.title}</title>
	<meta name="description" content={$t.mainContent.metaDescription} />
	<link rel="canonical" href={$t.mainContent.canonicalUrl} />
	<meta property="og:title" content={$t.mainContent.title} />
	<meta property="og:description" content={$t.mainContent.metaDescription} />
	<meta property="og:image" content={$t.mainContent.ogImageUrl} />
	<meta property="og:url" content={$t.mainContent.canonicalUrl} />
	<meta property="og:type" content="website" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "${$t.mainContent.organization.name}",
			"url": "${$t.mainContent.organization.url}",
			"logo": "${$t.mainContent.organization.logo}"
		}
	</script>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Product",
			"name": "${$t.mainContent.product.name}",
			"description": "${$t.mainContent.product.description}",
			"brand": {
				"@type": "Organization",
				"name": "${$t.mainContent.organization.name}"
			}
		}
	</script>
</svelte:head>

<div>
	<div>
		<a href="#main-content" class="skip-link">Skip to main content</a>
		<div class="landing-page">
			{#if showAnnouncement && $t.mainContent.announcement}
				<div class="announcement-bar">
					<i>
						{$t.mainContent.announcement.text}
						<a href="/signup"
							>{$t.mainContent.announcement.cta} &rarr;</a
						>
					</i>
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
				{#if $t.mainContent.hero}
					<section class="hero">
						<div class="hero-overlay"></div>
						<div class="container">
							<h1 class="hero-hook">
								<span>{$t.mainContent.hero.hook}</span>
							</h1>
							<p class="hero-sub-hook">
								{$t.mainContent.hero.subHook}
							</p>
							<div class="hero-ctas">
								<a
									on:click={() => {
										logout(false);
									}}
									href="/signup"
									class="cta-primary"
								>
									{$t.mainContent.hero.primaryCta}
								</a>
								<a href="/demo" class="cta-secondary">
									{$t.mainContent.hero.secondaryCta}
								</a>
							</div>
							<div class="trust-cues-wrapper">
								<p class="trust-label">Trusted by:</p>
								<ul class="hero-trust-cues">
									{#each $t.mainContent.hero.trustCues as cue}
										<li>
											<span class="check-icon">✓</span>
											{cue}
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</section>
				{/if}

				{#if $t.mainContent.socialProof}
					<section class="social-proof">
						<div class="container">
							<p class="proof-label">
								{$t.mainContent.socialProof.counts}
							</p>
							<div class="logo-strip-wrapper">
								<div class="logo-strip">
									{#each $t.mainContent.socialProof.logos as logo}
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
						</div>
					</section>
				{/if}

				{#if $t.mainContent.valueProps}
					<section class="value-props">
						<div class="bg-overlay"></div>
						<div class="container">
							<div class="section-header light-text">
								<h2>{$t.mainContent.valueProps.title}</h2>
								<p>{$t.mainContent.valueProps.subTitle}</p>
							</div>
							<div class="grid">
								{#each $t.mainContent.valueProps.props as prop, i}
									<div class="glass-card">
										<div
											class="card-icon-placeholder"
										></div>
										<h3>{prop.title}</h3>
										<p>{prop.description}</p>
									</div>
								{/each}
							</div>
						</div>
					</section>
				{/if}

				{#if $t.mainContent.features}
					<section id="features" class="feature-grid">
						<div class="container">
							<div class="section-header">
								<h2>{$t.mainContent.features.title}</h2>
								<p>{$t.mainContent.features.subTitle}</p>
							</div>
							{#each $t.mainContent.features.featureList as feature, i}
								<div
									class="feature-item"
									class:reverse={i % 2 !== 0}
								>
									<div class="feature-text">
										<div class="feature-index">
											0{i + 1}
										</div>
										<h3>{feature.title}</h3>
										<p>{feature.description}</p>
									</div>
									<div class="feature-visual">
										<div class="browser-chrome">
											<span class="dot red"></span>
											<span class="dot yellow"></span>
											<span class="dot green"></span>
										</div>
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
				{/if}

				{#if $t.mainContent.howItWorks}
					<section class="how-it-works">
						<div class="bg-overlay"></div>
						<div class="container">
							<div class="section-header light-text">
								<h2>{$t.mainContent.howItWorks.title}</h2>
							</div>
							<div class="steps-grid">
								{#each $t.mainContent.howItWorks.steps as item, i}
									<div
										class="step-card glass-card"
										data-lag="0.1"
									>
										<div class="step-header">
											<div class="step-number">
												{item.step}
											</div>
											{#if i !== $t.mainContent.howItWorks.steps.length - 1}
												<div
													class="connector-line"
												></div>
											{/if}
										</div>
										<h4>{item.title}</h4>
										<p>{item.description}</p>
									</div>
								{/each}
							</div>
						</div>
					</section>
				{/if}

				{#if $t.mainContent.personas}
					<section class="personas">
						<div class="container">
							<div class="section-header">
								<h2>{$t.mainContent.personas.title}</h2>
								<p>{$t.mainContent.personas.subTitle}</p>
							</div>
							<div class="grid">
								{#each $t.mainContent.personas.personaList as persona, i}
									<div class="card persona-card">
										<div class="persona-tag">Persona</div>
										<h4>{persona.persona}</h4>
										<div class="persona-detail">
											<strong>Problem:</strong>
											<span>{persona.problem}</span>
										</div>
										<div class="persona-detail highlight">
											<strong>Outcome:</strong>
											<span>{persona.outcome}</span>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>
				{/if}

				{#if $t.mainContent.metrics}
					<section class="metrics">
						<div class="container">
							<div class="section-header">
								<h2>{$t.mainContent.metrics.title}</h2>
							</div>
							<div class="metrics-grid">
								{#each $t.mainContent.metrics.metricList as metric, i}
									<div class="metric-item">
										<div class="metric-value">
											{metric.value}
										</div>
										<div class="metric-label">
											{metric.label}
										</div>
										<div class="metric-divider"></div>
										<p class="metric-proof">
											{metric.proof}
										</p>
									</div>
								{/each}
							</div>
						</div>
					</section>
				{/if}

				{#if $t.mainContent.testimonials}
					<section class="testimonials">
						<div class="bg-overlay"></div>
						<div class="container">
							<div class="section-header light-text">
								<h2>{$t.mainContent.testimonials.title}</h2>
							</div>
							<div class="grid">
								{#each $t.mainContent.testimonials.testimonialList as testimonial, i}
									<blockquote
										class="glass-card testimonial-card"
										data-lag="0.05"
									>
										<div class="quote-icon">“</div>
										<p class="quote-text">
											"{testimonial.quote}"
										</p>
										<footer>
											<cite>
												<strong
													>{testimonial.name}</strong
												>
												<span>{testimonial.title}</span>
											</cite>
										</footer>
									</blockquote>
								{/each}
							</div>
						</div>
					</section>
				{/if}

				<Pricing />

				<Faq />

				{#if $t.mainContent.finalCta}
					<section id="demo" class="final-cta">
						<div class="container">
							<div class="cta-box">
								<h2>{$t.mainContent.finalCta.hook}</h2>
								<a
									on:click={() => {
										logout(false);
									}}
									href="/signup"
									class="cta-primary-inverted"
									>{$t.mainContent.finalCta.cta}</a
								>
							</div>
						</div>
					</section>
				{/if}
			</main>

			{#if $t.mainContent.footer}
				<footer class="page-footer">
					<div class="container">
						<div class="footer-main">
							<div class="footer-about">
								<a href="/" class="logo" aria-label="Homepage">
									<img
										src="/logo/logo_large.png"
										width="140"
										alt="logo"
									/>
								</a>
								<p class="copyright">
									&copy; {new Date().getFullYear()}
									{$t.mainContent.footer.copyright}
								</p>
								<p class="contact">
									<a
										href="mailto:{$t.mainContent.footer
											.contact}"
										>{$t.mainContent.footer.contact}</a
									>
								</p>
							</div>
							<div class="footer-col">
								<h4>
									{$t.mainContent.footer.companyLinks.title}
								</h4>
								<ul>
									{#each $t.mainContent.footer.companyLinks.links as link}
										<li>
											<a href={link.href}>{link.text}</a>
										</li>
									{/each}
								</ul>
							</div>
							<div class="footer-col">
								<h4>
									{$t.mainContent.footer.legalLinks.title}
								</h4>
								<ul>
									{#each $t.mainContent.footer.legalLinks.links as link}
										<li>
											<a href={link.href}>{link.text}</a>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</footer>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@use "../styles/global.scss";

	/* --- GLOBAL VARIABLES & UTILITIES --- */
	:root {
		/* Colors */
		--c-primary-dark: #3730a3; /* Darker shade of your primary */
		--c-text-strong: #111827;
		--c-text-body: #4b5563;

		/* Spacing & Layout */
		--section-padding: clamp(4rem, 8vh, 8rem);
		--container-width: 1200px;

		/* Effects */
		--glass-bg: rgba(255, 255, 255, 0.7);
		--glass-border: rgba(255, 255, 255, 0.4);
		--glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
		--backdrop-blur: blur(16px);

		--shadow-elevation: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
		--shadow-glow: 0 0 50px -10px var(--c-primary);

		/* Transitions */
		--ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275);
		
		/* Modern CSS Reset / Variables for this section */
		--hero-padding: clamp(6rem, 15vh, 12rem);
		--hero-text-gradient: linear-gradient(
			135deg,
			#ffffff 0%,
			#e0e0e0 50%,
			#a0a0a0 100%
		);
		--primary-gradient: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
		--primary-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
		--glass-bg: rgba(255, 255, 255, 0.1);
		--glass-border: rgba(255, 255, 255, 0.2);
		--anim-ease: cubic-bezier(0.16, 1, 0.3, 1);
	}

	* {
		box-sizing: border-box;
	}

	.landing-page {
		animation: fadeIn 0.8s ease-in-out forwards;
		overflow-x: hidden;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.container {
		width: 100%;
		max-width: var(--container-width);
		margin-inline: auto;
		padding-inline: var(--space-lg);
	}

	/* --- COMPONENT: Typography --- */
	h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-xxl);
		max-width: 800px;
		margin-inline: auto;

		h2 {
			margin-bottom: var(--space-sm);
			text-wrap: balance;
		}

		p {
			font-size: 1.125rem;
			color: var(--c-text-body);
			max-width: 60ch;
			margin-inline: auto;
			line-height: 1.6;
		}

		/* When over dark backgrounds */
		&.light-text {
			h2,
			p {
				color: white;
			}
			p {
				opacity: 0.9;
			}
		}
	}

	/* --- COMPONENT: Glass Card --- */
	.glass-card {
		background: var(--glass-bg);
		backdrop-filter: var(--backdrop-blur);
		-webkit-backdrop-filter: var(--backdrop-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--glass-shadow);
	}

	/* --- ATOMS: Buttons --- */
	.cta-primary,
	.cta-secondary,
	.cta-primary-inverted {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		border-radius: 99px; /* Pill */
		padding: 0.875rem 2rem;
		transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
		cursor: pointer;
		text-decoration: none;
		letter-spacing: 0.01em;
	}

	.cta-primary {
		background: var(--c-primary);
		color: white;
		box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.15);
		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 6px 20px rgba(0, 0, 0, 0.23);
		}
	}

	.cta-secondary {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
		&:hover {
			background: rgba(255, 255, 255, 0.2);
		}
	}

	.cta-primary-inverted {
		background: white;
		color: var(--c-primary);
		&:hover {
			background: #f3f4f6;
		}
	}

	.skip-link {
		position: absolute;
		top: -100px;
		left: 0;
		background: var(--c-primary);
		color: white;
		padding: 1rem;
		z-index: 9999;
		transition: top 0.3s;
		&:focus {
			top: 0;
		}
	}

	/* 3. Hero */
	.hero {
		position: relative;
		width: 100%;
		min-height: 90vh; /* Full screen feel */
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding-block: var(--hero-padding);
		overflow: hidden;

		/* Background Image Handling */
		background: url(https://images.pexels.com/photos/8086364/pexels-photo-8086364.jpeg);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;

		/* 1. Dark Overlay with Blur for Text Readability */
		&::before {
			content: "";
			position: absolute;
			inset: 0;
			background: radial-gradient(
				circle at center,
				rgba(0, 0, 0, 0.4) 0%,
				rgba(0, 0, 0, 0.8) 100%
			);
			backdrop-filter: blur(2px); /* Subtle depth */
			z-index: 1;
		}

		.container {
			position: relative;
			z-index: 2; /* Place content above overlay */
			max-width: 900px;
			padding-inline: var(--space-md);
			margin-inline: auto;

			/* Entry Animation Wrapper */
			animation: fadeUp 1s var(--anim-ease) forwards;
		}

		/* 2. Typography: Modern & Fluid */
		.hero-hook {
			font-family: "Inter", sans-serif; /* Ensure you have a good font loaded */
			font-weight: 800;
			letter-spacing: -0.02em;
			line-height: 1.1;
			margin-bottom: var(--space-md);

			/* Fluid Typography: Scales smoothly between 2.5rem and 4.5rem */
			font-size: clamp(2.5rem, 5vw + 1rem, 5rem);

			/* Modern Text Gradient */
			span {
				background: var(--hero-text-gradient);
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
			}
		}

		.hero-sub-hook {
			font-size: clamp(1.1rem, 2vw, 1.35rem);
			line-height: 1.6;
			color: rgba(255, 255, 255, 0.85); /* Softer white for subtext */
			margin-inline: auto;
			margin-bottom: var(--space-xl);
			max-width: 60ch; /* Optimal reading length */
			text-wrap: balance; /* Prevents typographic widows */
		}

		/* 3. CTAs: Flexbox & Glassmorphism */
		.hero-ctas {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: var(--space-md);
			margin-bottom: var(--space-xxl);

			a {
				text-decoration: none;
				padding: 1rem 2rem;
				border-radius: 50px; /* Pill shape */
				font-weight: 600;
				font-size: 1rem;
				transition: all 0.3s var(--anim-ease);
			}

			/* Primary Button: Gradient & Glow */
			.cta-primary {
				background: var(--primary-gradient);
				color: white;
				box-shadow: var(--primary-shadow);
				border: 1px solid transparent;

				&:hover {
					transform: translateY(-2px) scale(1.02);
					box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.6);
				}
			}

			/* Secondary Button: Glass Effect */
			.cta-secondary {
				background: var(--glass-bg);
				backdrop-filter: blur(10px);
				border: 1px solid var(--glass-border);
				color: white;

				&:hover {
					background: rgba(255, 255, 255, 0.2);
					transform: translateY(-2px);
				}
			}
		}

		/* 4. Trust Cues: Clean Row */
		.trust-cues-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;

			.trust-label {
				font-size: 0.75rem;
				text-transform: uppercase;
				letter-spacing: 0.1em;
				color: rgba(255, 255, 255, 0.5);
				margin: 0;
			}
		}

		.hero-trust-cues {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 1.5rem;

			li {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				font-size: 0.95rem;
				font-weight: 500;
				color: rgba(255, 255, 255, 0.9);

				.check-icon {
					color: #4f46e5; /* Match primary brand color */
					background: rgba(255, 255, 255, 0.1);
					border-radius: 50%;
					width: 20px;
					height: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 0.7rem;
				}
			}
		}
	}

	/* 5. Animation Keyframes */
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Mobile Tweaks */
	@media (max-width: 600px) {
		.hero-ctas {
			flex-direction: column;
			width: 100%;

			a {
				width: 100%;
				text-align: center;
			}
		}
	}
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* --- 4. SOCIAL PROOF (Refined) --- */
	.social-proof {
		padding: var(--space-xl) 0;
		background: #f9fafb;
		border-bottom: 1px solid #e5e7eb;

		.container {
			text-align: center;
		}

		.proof-label {
			font-size: 0.9rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			color: #9ca3af;
			margin-bottom: var(--space-lg);
		}

		.logo-strip-wrapper {
			/* Fades edges to transparency */
			mask-image: linear-gradient(
				to right,
				transparent,
				black 10%,
				black 90%,
				transparent
			);
			-webkit-mask-image: linear-gradient(
				to right,
				transparent,
				black 10%,
				black 90%,
				transparent
			);
		}

		.logo-strip {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: clamp(2rem, 5vw, 4rem);

			img {
				max-height: 32px;
				width: auto;
				filter: grayscale(100%);
				opacity: 0.5;
				transition: all 0.3s ease;

				&:hover {
					filter: grayscale(0%);
					opacity: 1;
					transform: scale(1.05);
				}
			}
		}
	}

	/* --- 5. VALUE PROPS (Glassmorphism) --- */
	.value-props {
		position: relative;
		padding: var(--section-padding) 0;
		background: url(https://images.pexels.com/photos/434337/pexels-photo-434337.jpeg)
			no-repeat center center/cover fixed;

		.bg-overlay {
			position: absolute;
			inset: 0;
			background: linear-gradient(
				to bottom,
				rgba(17, 24, 39, 0.8),
				rgba(17, 24, 39, 0.6)
			);
		}

		.container {
			position: relative;
			z-index: 1;
		}

		.grid {
			display: grid;
			gap: var(--space-lg);
			grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		}

		.glass-card {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			transition: transform 0.3s ease;

			&:hover {
				transform: translateY(-5px);
				background: rgba(255, 255, 255, 0.8);
			}

			/* Decorative dot */
			&::before {
				content: "";
				width: 40px;
				height: 4px;
				background: var(--c-primary);
				border-radius: 2px;
				margin-bottom: var(--space-md);
			}

			h3 {
				color: var(--c-text-strong);
				margin-bottom: var(--space-sm);
				font-size: 1.5rem;
			}

			p {
				color: var(--c-text-body);
				line-height: 1.6;
			}
		}
	}

	/* --- 6. FEATURE GRID (Modern Layout) --- */
	.feature-grid {
		padding: var(--section-padding) 0;
		background: #fff;
	}

	.feature-item {
		display: grid;
		align-items: center;
		gap: clamp(3rem, 8vw, 6rem);
		margin-bottom: clamp(4rem, 10vh, 8rem);

		@media (min-width: 900px) {
			grid-template-columns: 1fr 1fr;

			&.reverse .feature-text {
				order: 2; /* Text moves to right */
			}
		}

		/* Last item margin fix */
		&:last-child {
			margin-bottom: 0;
		}

		.feature-text {
			.feature-index {
				font-size: 4rem;
				font-weight: 900;
				color: #f3f4f6;
				line-height: 1;
				margin-bottom: -1rem;
				margin-left: -0.5rem;
				z-index: -1;
			}
			h3 {
				font-size: 2rem;
				color: var(--c-text-strong);
				margin-bottom: var(--space-md);
			}
			p {
				font-size: 1.125rem;
				color: var(--c-text-body);
				line-height: 1.7;
			}
		}

		.feature-visual {
			position: relative;
			perspective: 1000px;

			/* Browser Window Styling */
			.browser-chrome {
				background: #e5e7eb;
				height: 24px;
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
				display: flex;
				align-items: center;
				gap: 6px;
				padding-left: 12px;

				.dot {
					width: 8px;
					height: 8px;
					border-radius: 50%;
					&.red {
						background: #ef4444;
					}
					&.yellow {
						background: #f59e0b;
					}
					&.green {
						background: #10b981;
					}
				}
			}

			img {
				display: block;
				width: 100%;
				height: auto;
				border-bottom-left-radius: 8px;
				border-bottom-right-radius: 8px;
				box-shadow: var(--shadow-elevation);
				transition: transform 0.5s ease;
			}

			/* Subtle hover tilt */
			&:hover img {
				transform: rotateY(-2deg) rotateX(2deg);
			}
		}
	}

	/* --- 7. HOW IT WORKS (Connected Steps) --- */
	.how-it-works {
		position: relative;
		padding: var(--section-padding) 0;
		background: url(https://images.pexels.com/photos/190295/pexels-photo-190295.jpeg)
			no-repeat center center/cover fixed;

		.bg-overlay {
			position: absolute;
			inset: 0;
			background: linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.7) 0%,
				rgba(0, 0, 0, 0.5) 100%
			);
		}

		.container {
			position: relative;
			z-index: 1;
		}

		.steps-grid {
			display: grid;
			gap: var(--space-lg);
			@media (min-width: 768px) {
				grid-template-columns: repeat(3, 1fr);
			}
		}

		.step-card {
			text-align: left;
			position: relative;
			transition: transform 0.3s;
			--c-text-body: rgba(255, 255, 255, 0.9);

			&:hover {
				transform: translateY(-5px);
			}

			.step-header {
				display: flex;
				align-items: center;
				margin-bottom: var(--space-md);
			}

			.step-number {
				width: 48px;
				height: 48px;
				border-radius: 12px;
				background: var(--c-primary);
				color: white;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 1.25rem;
				font-weight: 700;
				box-shadow: 0 4px 10px rgba(79, 70, 229, 0.4);
				flex-shrink: 0;
			}

			/* Dashed line connector */
			.connector-line {
				flex-grow: 1;
				height: 2px;
				background-image: linear-gradient(
					to right,
					var(--c-primary) 50%,
					transparent 50%
				);
				background-size: 10px 100%;
				margin: 0 var(--space-sm);
				opacity: 0.5;

				@media (max-width: 768px) {
					display: none;
				}
			}

			h4 {
				font-size: 1.25rem;
				margin-bottom: var(--space-sm);
				color: var(--c-text-strong);
			}

			p {
				font-size: 0.95rem;
				color: var(--c-text-body);
			}
		}
	}

	/* --- 8. PERSONAS (Cards) --- */
	.personas {
		padding: var(--section-padding) 0;
		background: #f8fafc;

		.grid {
			display: grid;
			gap: var(--space-lg);
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}

		.persona-card {
			background: white;
			padding: var(--space-lg);
			border-radius: var(--radius-lg);
			border: 1px solid #e2e8f0;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
			transition:
				border-color 0.3s,
				transform 0.3s;

			&:hover {
				border-color: var(--c-primary);
				transform: translateY(-4px);
			}

			.persona-tag {
				display: inline-block;
				font-size: 0.75rem;
				text-transform: uppercase;
				letter-spacing: 0.05em;
				color: var(--c-primary);
				background: #eef2ff;
				padding: 0.25rem 0.75rem;
				border-radius: 99px;
				margin-bottom: var(--space-md);
			}

			h4 {
				font-size: 1.5rem;
				margin-bottom: var(--space-md);
			}

			.persona-detail {
				margin-bottom: 0.5rem;
				font-size: 0.95rem;
				color: var(--c-text-body);

				strong {
					color: var(--c-text-strong);
				}

				&.highlight {
					margin-top: var(--space-md);
					padding-top: var(--space-md);
					border-top: 1px dashed #e2e8f0;
					color: var(--c-primary);
				}
			}
		}
	}

	/* --- 9. METRICS (Bold Layout) --- */
	.metrics {
		background-color: var(--c-primary);
		color: white;
		padding: var(--section-padding) 0;

		/* Subtle background pattern */
		background-image: radial-gradient(
			circle at top right,
			rgba(255, 255, 255, 0.1) 0%,
			transparent 20%
		);

		.section-header h2 {
			color: white;
		}

		.metrics-grid {
			display: grid;
			gap: 4rem;
			text-align: center;
			@media (min-width: 768px) {
				grid-template-columns: repeat(3, 1fr);
			}
		}

		.metric-item {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.metric-value {
			font-size: clamp(3.5rem, 6vw, 5.5rem);
			font-weight: 800;
			line-height: 1;
			margin-bottom: 0.5rem;
			text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		}

		.metric-label {
			font-size: 1.25rem;
			font-weight: 600;
			opacity: 0.9;
		}

		.metric-divider {
			width: 40px;
			height: 2px;
			background: rgba(255, 255, 255, 0.3);
			margin: 1.5rem 0;
		}

		.metric-proof {
			font-size: 0.9rem;
			opacity: 0.7;
			max-width: 250px;
		}
	}

	/* --- 11. TESTIMONIALS (Masonry style) --- */
	.testimonials {
		position: relative;
		padding: var(--section-padding) 0;
		background: url(https://images.pexels.com/photos/8293641/pexels-photo-8293641.jpeg)
			no-repeat center center/cover fixed;

		.bg-overlay {
			position: absolute;
			inset: 0;
			background: rgba(0, 0, 0, 0.6);
		}

		.container {
			position: relative;
			z-index: 1;
		}

		.grid {
			display: grid;
			gap: var(--space-lg);
			@media (min-width: 768px) {
				grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
			}
		}

		.testimonial-card {
			position: relative;
			background: rgba(
				255,
				255,
				255,
				0.95
			); /* Less transparent for readability */
			padding: 2.5rem;

			.quote-icon {
				position: absolute;
				top: 1rem;
				left: 1.5rem;
				font-size: 4rem;
				color: var(--c-primary);
				opacity: 0.2;
				font-family: serif;
				line-height: 1;
			}

			.quote-text {
				position: relative;
				font-size: 1.1rem;
				font-style: italic;
				color: var(--c-text-strong);
				margin-bottom: 1.5rem;
				z-index: 1;
			}

			footer cite {
				display: flex;
				flex-direction: column;
				font-style: normal;

				strong {
					color: var(--c-text-strong);
					font-weight: 700;
				}
				span {
					font-size: 0.85rem;
					color: var(--c-text-body);
					margin-top: 2px;
				}
			}
		}
	}

	/* --- 12. ANNOUNCEMENT BAR --- */
	.announcement-bar {
		background-color: var(--c-primary-dark);
		color: white;
		padding: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.9rem;
		position: relative;
		z-index: 50;

		a {
			color: white;
			font-weight: 600;
			text-decoration: none;
			margin-left: 8px;
			&:hover {
				text-decoration: underline;
			}
		}

		button {
			background: transparent;
			border: none;
			color: rgba(255, 255, 255, 0.7);
			position: absolute;
			right: 16px;
			font-size: 1.25rem;
			cursor: pointer;
			&:hover {
				color: white;
			}
		}
	}

	/* --- 14. FINAL CTA --- */
	.final-cta {
		padding: 0;

		.cta-box {
			background: var(--c-primary);
			border-radius: var(--radius-lg);
			padding: clamp(3rem, 6vw, 6rem);
			text-align: center;
			margin: var(--space-xxl) auto; /* Floating box effect */
			color: white;
			box-shadow: var(--shadow-glow);

			h2 {
				color: white;
				margin-bottom: var(--space-xl);
				font-weight: 800;
			}
		}
	}

	/* --- 15. FOOTER (Professional Dark) --- */
	.page-footer {
		background-color: #0f172a;
		color: #94a3b8;
		padding: clamp(4rem, 8vh, 6rem) 0;
		font-size: 0.95rem;

		a {
			color: #cbd5e1;
			text-decoration: none;
			transition: color 0.2s;
			&:hover {
				color: white;
			}
		}

		.footer-main {
			display: grid;
			gap: 3rem;
			@media (min-width: 768px) {
				grid-template-columns: 2fr 1fr 1fr;
			}
		}

		.logo {
			display: flex;
			align-items: center;
			gap: 12px;
			color: white;
			font-weight: 700;
			font-size: 1.25rem;
			margin-bottom: 1.5rem;

			img {
				display: block;
				border-radius: 15px;
				box-shadow: 0 0 12px -12px white;
				padding: 7.5px 5px;
				background: black;
			}
		}

		.copyright {
			margin-bottom: 0.5rem;
		}

		h4 {
			color: white;
			font-size: 1rem;
			margin-bottom: 1.5rem;
			font-weight: 600;
		}

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			li {
				margin-bottom: 0.75rem;
			}
		}
	}
</style>

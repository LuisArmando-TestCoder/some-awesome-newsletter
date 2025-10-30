<script lang="ts">
  import HeroBanner from "../../components/demo/HeroBanner.svelte";
  import { content } from '../../lib/content';
  import Faq from "$lib/ui/organisms/Faq.svelte";
  import { useScrollSection } from "$lib/anim/useScrollSection";
  import CTAButton from "../../components/demo/CTAButton.svelte";
</script>

<svelte:head>
  <title>Demo - {$content.title}</title>
  <meta name="description" content={`Watch a demo of ${$content.product.name} in action.`} />
  <link rel="stylesheet" href="/styles/everything.css" />
</svelte:head>

<div class="demo-page">
  <HeroBanner />

  <div class="cta-section">
    <a href="/login">
      <CTAButton label={$content.hero.primaryCta} href="/login" variant="primary" />
    </a>
  </div>

  <Faq />

  {#if $content.footer}
  <footer class="page-footer">
      <div class="container">
          <div class="footer-main">
              <div class="footer-about">
                  <a href="/" class="logo" aria-label="Homepage">
                      <img
                          src="/logo/logo_large.png"
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
  {/if}
</div>

<style lang="scss">
  @use '../styles/everything.scss';

  .demo-page {
    animation: fadeIn 0.8s ease-in-out forwards;
  }

  .cta-section {
    text-align: center;
    padding: 5rem 0 0;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  section {
    padding: 4rem 0;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
    h2 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 1.125rem;
      color: #666;
    }
  }

  .feature-item {
    display: grid;
    align-items: center;
    gap: 3rem;
    margin-bottom: 4rem;
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    &.reverse .feature-text {
      order: 2;
    }
  }

  .feature-visual img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }

  .page-footer {
		background-color: var(--c-text);
		color: var(--c-bg-alt);
		padding: 4rem 0;
		font-size: 0.9rem;
		a {
			color: var(--c-bg-alt);
		}
		.footer-main {
			display: grid;
			gap: 2rem;
			@media (min-width: 768px) {
				grid-template-columns: 2fr 1fr 1fr;
			}
		}
		.logo {
			display: flex;
			align-items: center;
			gap: 1rem;
			color: var(--c-white);
			margin-bottom: 1rem;
		}
		.footer-links {
			h4 {
				color: var(--c-white);
				margin-bottom: 1rem;
			}
			ul {
				list-style: none;
				padding: 0;
				margin: 0;
				li {
					margin-bottom: 0.5rem;
				}
			}
		}
	}
</style>

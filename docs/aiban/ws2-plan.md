# WS2 plan (landing, marketing pages, public blog)

Run started 2026-10-30 07:40 UTC. STRATEGY.md and DESIGN_SYSTEM.md do not exist yet; tokens.scss does not exist yet. Until they land, components use the charter section 4 token names with fallbacks, e.g. `var(--surface-1, #fff)`.

## Readings that shape the plan
- The diagnostic's "intro animation" lives in the onboarding flow inside /dashboard (WS3). The root route `/` is already a long marketing page, but it contains invented content: fake customer logos, "Trusted by 10,000+ teams", invented metrics (90%, 2x, 5x), invented testimonials (Alex Chen, Samantha Jones), placeholder canonical `example.com`, stock photos as "screenshots". All of it goes.
- Primary CTA target: `/signup` (WS3 has not created `/start`). One constant `START_HREF` in the landing so the switch is one line. Logged-in visitors go to `/dashboard`.
- No public backend endpoint can preview an issue from a URL (all generate/personality endpoints need auth). The landing preview is a clearly labeled sample built in the browser from the pasted address. A request goes to WS7/WS8 for a rate-limited public preview endpoint.
- Articles have no translation group id, so "same article in another language" cannot be linked exactly. The article page links to the blog filtered by each available language. Request to WS8 for a `groupId` on saved articles.
- Article pages need SSR for indexing. New route files under `src/routes/blog/**` are WS2's per the charter; the universal `+page.ts` loaders inside them are created by WS2 and announced to WS6 in requests/6.md.

## Slices (disjoint files)
1. Lead (me): `src/routes/+page.svelte` landing rebuild, `src/lib/content/**` (SEO helper, landing sample builder), `src/routes/sitemap.xml/+server.ts`, robots, `mainContent`/`landing` keys in en.ts.
2. Subagent "blog": `src/routes/blog/**` (new), `src/routes/{articles,article}/**` (forward old links), `src/components/{articles,NewsCard,ArticleModal,ArticleCardSkeleton,SearchBar,Pagination}/**`, `blog` keys in en.ts.
3. Subagent "pages": `src/lib/ui/organisms/{Header,Faq,HelpFaqs,HelpForm,Pricing,LanguagePicker}.svelte`, `src/components/{Header,MenuHalf,demo,X,ShaderToy}/**`, `src/components/faq.ts`, `src/routes/{about,pricing,careers,legal,help,demo}/**`, their keys in en.ts.
4. Subagent "benchmark": web research only, writes `docs/aiban/ws2-benchmark.md`.

## Landing structure
Hero (promise, who it is for, primary CTA, secondary "See a sample issue") -> paste your website preview -> "one input, then it runs by itself" chain -> each reader gets their language -> sends from your address -> signup widget and automatic blog -> use cases -> pricing (existing Pricing organism, prices untouched) -> FAQ -> final CTA -> footer.
No GSAP smooth scroll, no shaders on the landing. CSS-only reveal that respects reduced motion.

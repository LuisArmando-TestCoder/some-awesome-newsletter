# WS2 audit (landing, marketing pages, public blog)

Date: 2026-10-30. Sources: reading every WS2 file, the UX diagnostic sections 1 and 4, STRATEGY.md, and a benchmark of beehiiv, Substack, Kit, Buttondown, Ghost, Paragraph, rasa.io, Linear and Stripe (Vox could not be fetched).

## Landing `/` (before)
- Invented proof: five fake customer logos, "Trusted by 10,000+ teams worldwide", metrics "90%", "2x", "5x" with made-up sources, two invented testimonials with names and titles. All violate COPY_RULES.
- Banned copy: "game-changer", "Revolutionize", "Seamless", "The Future of Newsletters is Here", Title Case headings.
- SEO: JSON-LD used `${...}` inside a static script tag, so it shipped literal placeholders. Canonical and organization URLs pointed to `example.com`. No Twitter tags. Stock photos labelled as product screenshots.
- Perf: GSAP smooth-scroll hooks imported on the landing, a full-page fade-in animation delaying first paint, and 100+ lines of ad hoc colors and shadows.
- The primary CTA called `logout(false)` (clears all localStorage) and went to `/signup` with nothing carried over.

## Header and pages (before)
- Header nav was empty by default (only "Billing" showed), no active state on mobile, a "creator card" with the founder's bio and jargon labels ("Architecture", "Access") in the drawer, no dialog semantics.
- Careers listed roles that could not be confirmed. Help showed a mock usage card. `faq.ts` claimed a 14-day trial, SOC 2 and 24/7 support. Demo animated text letter by letter (diagnostic c). HelpForm only logged to the console.

## Public blog (before)
- Hero did not say whose blog it is or what it covers (diagnostic x). Search waited 1.5 s, had no button, no suggestions, no results page, and did not URL-encode the query (x.1). Articles opened in a modal (y.1). Two unexplained grids with separate pagination (z). Article page was client-only, so nothing was indexable.

## Benchmark takeaways used
- Outcome headline under about 12 words, audience in the subhead, primary CTA that says "free", reassurance line under the field.
- No competitor offers a "paste your URL" preview, per-reader languages, or sending from your address on the landing page. AIBAN leads with all three.
- Blog: publication name as H1, subscribe in header, hero and end of article, one lead story then a latest list, live search plus a shareable results page, 68ch measure, Article JSON-LD and canonical per post.

## Still open after this run
- No public preview endpoint (requests/7.md). The landing preview is a labeled sample.
- Articles have no translation group id (requests/8.md); the article page links to other languages of the blog instead of the same article.
- Plans data disagrees across `en.ts plans`, `static/content/plans.json` and `PLAN_DEFINITIONS` (Decision for Luis).

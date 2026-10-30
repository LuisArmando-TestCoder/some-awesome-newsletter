# WS2 summary (run 1, 2026-10-30)

## What changed
- Landing `/` is a real landing page. A visitor reads what AIBAN does and for whom in the hero, types their website, and sees a sample issue with their brand name and address in English, Spanish and German. "Start free with <site>" goes to `/start?url=...`. Then: trigger and steps ("One input, then it runs by itself"), languages, sending from your address, signup form and automatic blog, use cases for service businesses, pricing (prices untouched), FAQ, final CTA, footer. All invented logos, counts, metrics and testimonials are gone.
- SEO: per-page title, description, canonical, OG and Twitter tags on landing, pricing, demo, help, about, careers, legal and blog pages. JSON-LD: Organization, SoftwareApplication, FAQPage (landing), Article (blog posts). `sitemap.xml` and `robots.txt`.
- Public blog: `/blog/<owner>` with owner branding, featured plus latest with one pagination, search with button, suggestions, recent searches and a results page at `/blog/<owner>/search?q=`. Each article has its own SSR page `/blog/<owner>/<id>` with long-form typography, share link, subscribe box and links to other languages. Old `/articles` and `/article` links forward.
- Header: default nav with active state, accessible mobile drawer, hidden on reader-facing routes. About, careers, help (searchable, grouped), demo (video loads on click), pricing and legal pages rewritten or cleaned.
- Requests handled: CTAs to WS3's `/start`, Pricing checkout through `startSubscription` (signed-out visitors go to `/start?plan=...` first), HelpForm posts to `/api/support` with the email fallback, all article HTML passes through `sanitizeHtml()`.

## How to verify
1. On the Mac: `npm run check && npm run build`, then `npm run preview`.
2. Open `/`, enter `acme.com`, press "Preview my newsletter". Enter `abc`: the error shows only after submit.
3. Open `/sitemap.xml`, `/robots.txt`, view source of `/` for the three JSON-LD blocks.
4. Open an owner blog `/blog/<encoded owner email>`, search, open an article, copy its link.

## What is left
- Real preview from the visitor's site needs a public endpoint (requests/7.md).
- Same-article language switch needs a translation group id (requests/8.md).
- Owner blogs are not in the sitemap (needs a public list endpoint).
- New strings need translating (WS9). Other locales show English for new keys.

## Risks
- The build was not run this session (environment). svelte-check shows 0 errors in WS2 files.
- `logout(false)` runs on "Start" for signed-out visitors; WS6 narrowed it so language, theme and `aiban.*` keys survive.

## Decisions for Luis
1. Plans data disagrees in three places (`en.ts plans`, `static/content/plans.json`, `PLAN_DEFINITIONS`), and the terms page names Starter, Growth, Pro, Master. Pick the source of truth. Prices were not changed.
2. Blog URLs contain the owner's email (`/blog/<email>`), as the old `/articles?holder=` did. A slug per owner would hide it; that needs a data change (WS7).
3. Careers now says there are no open roles, since the listed roles could not be confirmed. Restore any that are real.
4. The cookie page contact changed from `legal@aiban.com` to `info@aiban.news`, the address used everywhere else. Confirm the right legal contact.

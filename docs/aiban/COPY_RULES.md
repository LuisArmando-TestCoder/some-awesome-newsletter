# AIBAN copy rules (binding for every string a user or subscriber can read)

These rules come from two project docs, `copywritingrules.md` (Humanizer: remove AI writing patterns, based on Wikipedia "Signs of AI writing") and `ai-writing-giveaways-to-avoid.md`. This is the working checklist. They apply to UI microcopy, tutorial text, landing page, emails, error messages, docs, AND the LLM prompts that write newsletter content for customers (the generated newsletters must also obey these rules).

## Hard constraints (any hit = not done)
- No em dashes (—) or en dashes (–), and no " -- " used as a dash. Use a period, comma, colon or parentheses.
- No emojis in headings, buttons, bullets or body copy.
- Straight quotes (") not curly quotes in source strings.
- Sentence case for headings, buttons, tabs and menu items ("Add a news source", not "Add A News Source").
- Never invent facts, numbers, testimonials, customer names, metrics or reviews. If a number is not real and sourced from the product's own data, do not write it.

## Banned words and phrases (rewrite the sentence)
delve, dive into, tapestry, testament, vibrant, pivotal, crucial, key (as adjective), landscape (abstract), showcase, underscore, highlight (verb), foster, garner, intricate, interplay, enhance, seamless, robust, leverage, unlock, elevate, supercharge, game-changer, revolutionize, cutting-edge, groundbreaking, stunning, breathtaking, nestled, boasts, "serves as", "stands as", "in today's fast-changing world", "quietly", "genuinely", "honestly", "here's the kicker", "the best part", "the crazy thing", "scary truth", "here's the truth", "what nobody tells you", "point AI at", "let's dive in", "let's explore", "without further ado", "at its core", "the real question is", "I hope this helps", "Certainly!", "Great question".

## Banned structures
1. Rhetorical question you answer yourself ("Want more readers? ..."). Exception: genuine form labels that ask the user something ("Which language do your readers speak?") are fine.
2. "[Suspense]? [Answer]." ("Is it hard? Not at all.")
3. Elliptical setups with "..." for drama.
4. "Not X, but Y" / "X isn't Y, it's Z" / "You're not buying X, you're buying Y" / "The goal isn't X, it's Y".
5. "No X, no Y, just Z" and tailing negations ("Set up in minutes, no code.") Write a real clause instead ("You do not need to write code.").
6. Rule of three: triplets of adjectives or forced three-item lists. Use the real number of items.
7. Big contrast / opposing shutdown ("Adapt or get left behind", "Forget everything you know").
8. Aphorisms and philosophical reductions ("Consistency is the currency of trust").
9. Revelation hooks, big reveals, manufactured punchlines, runs of staccato fragments.
10. Inline bold-header bullet lists ("**Speed:** ...") and mechanical bold.
11. -ing tails that add fake depth ("..., ensuring a smooth experience").
12. Copula avoidance: use is/are/has instead of "serves as / features / boasts".
13. Passive or subjectless fragments ("No setup needed."). Say who does what ("You do not need to set anything up.").
14. Generic upbeat endings ("The future looks bright").
15. Monotonous sentence length. Vary it.

## What good AIBAN copy looks like
- Front-load the point. First sentence says what happens or what to do.
- Concrete outcomes tied to the product: "We check your site every morning. When a new article appears, your subscribers get it in their own language."
- Plain words over jargon. The UX diagnostic flagged "Signature HTML", "Buyer persona", "auto collapse", "news sources" as unclear. Prefer "Email signature", "Your ideal reader", "Where your content comes from".
- Every optional field says what happens if you skip it (the default).
- Every image upload states format, max size, min size, aspect ratio, and where it will appear.
- Errors say what went wrong and the next action, never blame the user, and appear only after the user submits (not while typing).
- Tone: calm, direct, warm. Some personality is fine on the landing page; keep dashboards and settings neutral and plain.

## Self-check before saving any copy
Ask: "What makes this obviously AI generated?" and "Does it state any fact or number that isn't real?" Fix both. Then grep the changed files for `—`, `–`, and the banned words above.

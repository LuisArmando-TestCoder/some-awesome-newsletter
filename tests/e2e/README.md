# End-to-end suite

These tests drive the real site in a headless browser against a local copy of everything:

- the SvelteKit app,
- the Deno backend,
- a Firestore emulator,
- a fake inbox that catches every email.

Nothing touches production. `lib.mjs` refuses to run if the site or API address is not on localhost.

## What it covers

| File | What it proves |
| --- | --- |
| `public.mjs` | Every public page renders. The language follows the browser (es, de, fr, pt, en), and a picker choice wins over the browser and persists. "Preview my newsletter" writes a real sample issue and scrolls it into view. Also covers the 404 page and the help form. |
| `owner.mjs` | A new owner from start to finish: sign up with an emailed code, onboarding with a real AI preview, and every dashboard section. Brand settings save, an API key can be created and revoked, and a subscriber gets a double opt-in email and confirms. "Send the next issue" reports the real outcome. Also covers the public blog and article, plus log out and log back in. |
| `admin.mjs` | An admin signs in and opens every admin page. A plan change persists and is then restored. An owner who is not an admin is kept out. |

## Run it

You need five terminals, or background jobs:

```bash
# 1. Stack tools (once)
cd tests/e2e/stack && npm install

# 2. Firestore emulator (port 8085)
cd tests/e2e/stack && npm run emulator

# 3. Test inbox (SMTP 2525, HTTP 2580)
cd tests/e2e/stack && npm run inbox

# 4. Backend (port 8000), from the backend repo
cp <frontend>/tests/e2e/stack/backend.env.example <frontend>/tests/e2e/stack/backend.env
set -a; . <frontend>/tests/e2e/stack/backend.env; set +a
deno run --allow-net --allow-read --allow-env --allow-sys main.ts

# 5. Frontend (port 4300). A localhost address makes the app call the local API.
npx vite dev --port 4300 --strictPort --host 127.0.0.1
```

Then run the suites in this order. `admin.mjs` needs the customer that `owner.mjs` creates.

```bash
node tests/e2e/public.mjs
node tests/e2e/owner.mjs
node tests/e2e/admin.mjs
```

Each file prints `PASS` or `FAIL` per check and exits with code 1 if anything failed. Screenshots and saved sign-ins go to `test-results/e2e/`, which git ignores.

## Settings

| Variable | Default | Use |
| --- | --- | --- |
| `E2E_WEB` | `http://localhost:4300` | Site address |
| `E2E_API` | `http://localhost:8000` | Backend address |
| `E2E_INBOX` | `http://127.0.0.1:2580/messages` | Test inbox |
| `E2E_OWNER` | a new `ownerNNNNNN@aiban.test` | Reuse an existing account |
| `E2E_SITE` | `deno.com/blog` | Website used in onboarding |
| `E2E_PREVIEW_SITE` | `deno.com` | Website used for the landing preview |

The AI steps (preview, rewrite, translate) call OpenRouter with the backend's real key. A full run costs a few cents and takes about 6 to 10 minutes.

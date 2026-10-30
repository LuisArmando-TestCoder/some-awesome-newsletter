# WS5 component harness

`npm run dev` and `npm run build` cannot run in the computer shell (macOS node_modules, no rollup binary for Linux). This harness compiles the subscribe components with the Svelte compiler alone, stubs the store and translations, and serves them as plain ES modules, so they can be checked in a browser.

```
node docs/aiban/ws5-harness/build.mjs          # output in $TMPDIR/aiban-ws5-harness/out (override with HARNESS_OUT)
cd "$TMPDIR/aiban-ws5-harness/out" && python3 -m http.server 8765
```

Then open, for example:
- `http://localhost:8765/index.html?view=form` (add `&layout=compact`, `&accent=c2410c`, `&theme=dark`, `&s=limit` for the plan-limit error)
- `http://localhost:8765/index.html?view=embed` (owner embed code card)
- `http://localhost:8765/index.html?view=confirm&configId=o%40x.com&newsSourceId=n1&userEmail=maria+news@example.com`

`fetch` is mocked in `index.template.html`; nothing reaches the backend. `harness-out.tgz` is a packed copy of the last build, used to take screenshots from the cloud workspace. Neither file ships with the app.

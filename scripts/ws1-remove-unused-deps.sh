#!/usr/bin/env bash
# Removes frontend packages that nothing in the code imports (WS1, 2026-10-30).
# Run on the Mac, from anywhere:  bash scripts/ws1-remove-unused-deps.sh
# Preview without changing anything:  bash scripts/ws1-remove-unused-deps.sh --dry-run
#
# What it does:
# 1. Backs up package.json and package-lock.json to _aiban_backups/deps-<time>/.
# 2. Checks each package again. A package is removed only if no file in src/, svelte.config.js or vite.config.ts imports it.
# 3. Uninstalls those packages in one npm call.
# 4. Fixes @sveltejs/adapter-auto being listed twice (keeps the devDependency, version 6).
# 5. Adds isomorphic-dompurify (requested by WS6 for safer HTML cleaning).
# 6. Runs npm run check and npm run build, and tells you how to undo if either fails.

set -u
cd "$(dirname "$0")/.." || exit 1

DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

if [ ! -f package.json ] || ! grep -q '"@sveltejs/kit"' package.json; then
  echo "This does not look like the AIBAN frontend folder. Nothing changed."
  exit 1
fi

CANDIDATES="@smui/button @smui/card @smui/checkbox @smui/dialog @smui/form-field @smui/icon-button @smui/radio @smui/select @smui/snackbar @smui/textfield @smui/top-app-bar svelte-material-ui smui aos three leaflet hls.js felte svelte-forms-lib svelte-calendar tailwindcss autoprefixer postcss canvas-preset scene-preset victor express express-validator nodemailer jsonwebtoken dotenv node-fetch gapi-script @types/highlight.js"

is_imported() {
  # Escape dots so "hls.js" does not match "hlsXjs".
  local p
  p=$(printf '%s' "$1" | sed 's/[.]/\\./g')
  grep -rlE "from ['\"]$p(/[^'\"]*)?['\"]|import\(['\"]$p(/[^'\"]*)?['\"]\)|require\(['\"]$p(/[^'\"]*)?['\"]\)|@(use|import) ['\"]$p" \
    src svelte.config.js vite.config.ts >/dev/null 2>&1
}

REMOVE=""
KEEP=""
for p in $CANDIDATES; do
  if ! grep -q "\"$p\"" package.json; then
    continue
  fi
  if is_imported "$p"; then
    KEEP="$KEEP $p"
  else
    REMOVE="$REMOVE $p"
  fi
done

echo "Will remove:${REMOVE:- nothing}"
[ -n "$KEEP" ] && echo "Kept because the code now imports them:$KEEP"

if [ "$DRY_RUN" = 1 ]; then
  echo "Dry run. Nothing changed."
  exit 0
fi

STAMP=$(date +%Y%m%d-%H%M%S)
BACKUP="_aiban_backups/deps-$STAMP"
mkdir -p "$BACKUP"
cp package.json "$BACKUP/package.json"
[ -f package-lock.json ] && cp package-lock.json "$BACKUP/package-lock.json"
echo "Backup saved in $BACKUP"

if [ -n "$REMOVE" ]; then
  # shellcheck disable=SC2086
  npm uninstall $REMOVE || { echo "npm uninstall failed. Your files are unchanged in $BACKUP."; exit 1; }
fi

# adapter-auto: drop the old copy in "dependencies", keep the devDependency.
node -e '
const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
if (pkg.dependencies && pkg.dependencies["@sveltejs/adapter-auto"]) {
  delete pkg.dependencies["@sveltejs/adapter-auto"];
  pkg.devDependencies = pkg.devDependencies || {};
  if (!pkg.devDependencies["@sveltejs/adapter-auto"]) pkg.devDependencies["@sveltejs/adapter-auto"] = "^6.0.0";
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, "\t") + "\n");
  console.log("Removed the duplicate @sveltejs/adapter-auto from dependencies.");
}
'

npm install isomorphic-dompurify || echo "Could not add isomorphic-dompurify. Everything else is done; tell WS6."
npm install || { echo "npm install failed. To undo: cp $BACKUP/package*.json . && npm install"; exit 1; }

echo
echo "Running npm run check"
npm run check; CHECK=$?
echo
echo "Running npm run build"
npm run build; BUILD=$?

echo
if [ "$BUILD" = 0 ]; then
  echo "Build passed. Packages removed:$REMOVE"
  [ "$CHECK" != 0 ] && echo "npm run check reported errors. Most of these errors were there before this script ran (see docs/aiban/ws1-log.md). The build is what matters for this change."
else
  echo "Build failed. To undo: cp $BACKUP/package*.json . && npm install"
  exit 1
fi

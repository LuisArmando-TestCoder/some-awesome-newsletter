# WS6 caller inventory: requests/, store.ts and friends

Scope: read-only scan of `src/` (excluding node_modules, .svelte-kit, _aiban_backups, _deprecated). Generated 2026-10-30 for Workstream 6 (typed API client). Abbreviations: `STG/` = `src/components/systems/steps/StepsTowardsPublish/stages/`, `SYS/` = `src/components/systems/`, `REQ/` = `src/components/systems/requests/`.

All requests modules read the base URL from `get(store).apiURL()` and most build headers with `getAuthHeaders()` (which reads localStorage, not the store). Any replacement must keep both behaviours or callers that set localStorage-only values (dashboard layout) break.

## 1. requests/ modules: signature, contract, callers

Legend for "contract": NULL = returns null on failure; FALSE = returns false; EMPTY = returns [] or {}; THROWS = throws Error (callers read `.message`); RESP = returns raw `Response`.

### 1.1 Used modules

| Module (export) | Signature | Success value | Failure contract | Side effects |
|---|---|---|---|---|
| `addNewsletterUserEndpoint` (named `addNewsletterUser`, also `interface AddNewsletterUserResponse`) | `(user: NewsletterUser, configId: string, newsSourceId: string, apiKey?: string) => Promise<{message:string}>` | parsed JSON body | THROWS `Error("Error adding newsletter user: " + (body.message or statusText))`; network errors rethrown | none. POST `/users/:configId/:newsSourceId`. If `apiKey` given uses `Authorization: Bearer` instead of auth headers |
| `askForNewAuthCode` (default, internal name `ask`) | `() => Promise<void>` | undefined | never throws on HTTP error (fetch network error would reject) | `saveToStore({hasNewEmailCodeBeenSent:true})` before; on ok `saveToStore({hasNewEmailCodeBeenSent:false, hasAuthCodeAskFailed:true})` (naming inverted: success sets "failed" true). POST `/auth/:configuratorEmail` |
| `askIsAuthCodeValid` (default, anonymous) | `(onSuccess?: Function, onFailure?: Function) => Promise<any>` | returns `onSuccess()` result | returns `onFailure()` result; network error rejects | `saveToStore({isAuthCodeValid})`. GET `/auth/:email?code=..[&token_id&client_id]` (no auth headers, credentials in query string) |
| `createInitialConfiguratorConfig` (default) | `(authHeaders: Record<string,string>) => Promise<boolean>` | true | FALSE | `saveToStore({config:{...config, apiKeys:[apiKey]}})`. POST `/config`. Also called server side (oauth) |
| `createNewsSource` (default) + named `getRandomScheduleTime(): string` | `(ns: {type?, url, country?, community?, lead, scheduleTime?, personality?, linkSelector?}) => Promise<NewsSource>` (returns `json.newsSource`, may be undefined) | `NewsSource` | THROWS `Error(body.error or "Error creating news source")` | Heavy: if store has 0 sources `saveToConfig({newsSources:[ns]})` (which PUTs config); `addNewsletterUser` + `subscribeNewsletterUser` for configurator (errors swallowed); `refreshSubscribers()` (swallowed); `saveToStore({directionsThatShouldDisappear:[-1]})`; `getConfigFetchResponse()` (result discarded). POST `/news-source/:configId` |
| `generatePersonality` (named) | `(rawContent: string, newsSourceId: string) => Promise<{message,newsSource,personality}>` (declared) but actually returns `json.newsSource` | NewsSource (has `.personality`) | THROWS `Error(body.error or "Error generando la personalidad")` | `saveToConfig({newsSources: replaced})`. PUT `/news-source/personality/:email/:id` |
| `generateSelector` (default) | `(configId: string, data:{url,lead,personality,scheduleTime}) => Promise<string or null>` | `json.selector` | NULL on !ok; network error rejects | none. POST `/news-source/generate-selector/:configId` |
| `getAuthHeaders` (default, sync) | `() => {[k:string]:string}` | object with `Accept`, `Content-Type`, `x-auth-email`, `x-auth-code`, `x-auth-token-id`, `x-auth-client-id`, `x-user-language`, `given_name`, `picture` | never throws | reads localStorage keys `configuratorEmail`, `authCode`, `tokenId`, `clientId`, `lang`, `given_name`, `picture`, `config` (JSON-parsed). Values can be `null`. Imports `getCookie` but does not use it |
| `getConfiguratorSession` (default) + named `getConfigFetchResponse` | default: `() => Promise<boolean>`; named: `(authHeaders: Record<string,string>, origin?: string) => Promise<Response>` | default: `response.ok` of the first config GET; named: raw Response | default: rejects on network error or non-JSON body; named: RESP (caller checks `.ok`) | default: `saveToStore({config})`, may call `createInitialConfiguratorConfig`, may call `createNewsSource` when `store.newsSource` set and no sources, `saveToStore({config, ...config})` (spreads all config keys into the root store), `saveToStore({isRefreshingSubscribers:true/false})`, `refreshSubscribers()`. Named: GET `/config`; note `origin` is only logged, URL uses `apiURL()` without origin (so server side always hits production) |
| `getGeoIpLanguage` (default) | `() => Promise<string or null>` | language code | NULL (never throws) | GET `/geo` |
| `getLeadsForConfigurator` (default) | `() => Promise<any or null>` | JSON object keyed by configuratorEmail | NULL on !ok; network error rejects | GET `/leads/:email` |
| `getNewsletterUsersByNewsSource` (default) | `(configId: string, newsSourceId: string, limit?: number, startAfter?: string) => Promise<NewsletterUser[]>` | array | EMPTY `[]` (never throws) | GET `/newsletter/users/:configId/:newsSourceId` |
| `getPublicConfig` (default) | `(configuratorId: string) => Promise<Config or null>` | Config | NULL (never throws) | GET `/config?documentId=` with `x-auth-email`/`x-auth-code` from store (public page sends empty strings) |
| `getUsersFromRawFileOrText` (default) | `({file?: File, text?: string}) => Promise<any or null>` | parsed JSON | NULL | imported by UserDataService but never called (dead) |
| `logout` (default) | `(doRedirect: boolean = true) => Promise<void>` | undefined | never throws | `localStorage.clear()`; if truthy arg `window.location.href = "/"`. Note `H_Dashboard.svelte` passes it as a click handler so it receives a MouseEvent (truthy => redirect) |
| `regenerateSelectors` (default) | `(configId: string, newsSourceId: string, newUrl?: string) => Promise<NewsSource or null>` | NewsSource | NULL on !ok; network rejects | `saveToConfig({newsSources: replaced})`. PUT `/news-source/regenerate-selectors/:configId/:id` |
| `sendCustomContent` (default) | `(configId: string, newsSourceId: string, content: string) => Promise<boolean>` | true | FALSE (never throws) | POST `/newsletter/send-custom-content` |
| `sendEmail` (default) | `({html, subject, config, emails}: SendEmailParams) => Promise<boolean>` | true | THROWS `Error`. Bug: inner `throw` inside `try{JSON.parse}` is caught by its own catch, so message is always `"Failed to send email: " + rawBody` | POST `/news-source/send-email` |
| `subscribeNewsletterUser` (default) | `(configId: string, newsSourceId: string, email: string) => Promise<boolean>` | `response.ok` | FALSE on !ok; network rejects | POST `/subscribe`. Only called by createNewsSource and UserDataService (return ignored) |
| `triggerNewsSourceSend` (default) | `(newsSourceId: string) => Promise<boolean or string or Error>` | `true` | Mixed: returns `false` for missing args; on HTTP error throws `JSON.parse(body).message` (a string) which its own catch turns into a RETURNED string; if body is not JSON returns a SyntaxError object; network error returns the error object. Effectively never throws | POST `/news-source/:configId/:id/trigger` |
| `unsubscribeUserToConfigNewsSource` (default) | `(email: string, configId: string, newsSourceId: string) => Promise<boolean>` | true | FALSE (never throws) | GET `/unsubscribe/:email?configId&newsSourceId` (no auth) |
| `updateConfiguration` (default) | `(partialConfig: Record<string,unknown>) => Promise<Config or null>` | backend JSON (`{message, config}` or refetched config) | NULL (never throws) | GET `/private-config` first, merges, PUT `/config`, then `store.update` patching `config` directly (bypasses saveToStore, so no localStorage persist). Imported by store.ts (circular import store.ts <-> updateConfiguration.ts) |
| `updateNewsSource` (default) | `(updateData: {[k]: string or boolean or null}, newsSourceId?: string) => Promise<NewsSource or null>` | NewsSource | NULL; network rejects | `saveToConfig({newsSources: replaced})`. PUT `/news-source/:configId/:id` |
| `uploadUserFileChunked` (named) | `({file, newsSourceId, onProgress?, onUserAdded?}) => Promise<{successMessage: string; errorMessage: string or null}>` | object | never throws; errors aggregated in `errorMessage` | reads NDJSON stream lines `{type:'user'|'summary'|'error'}`. POST `/news-source/any-user-data-base-file-to-standard-format/:email` per 500-row chunk |

### 1.2 Dead modules (no importer anywhere in src)

`postSubscriber`, `searchNewsletterUser`, `getNewsSourcesFromConfiguration`, `submitPublicSubscription`, `getAllSubscribersFromConfigEndpoint`. `getUsersFromRawFileOrText` is imported (UserDataService.ts:13) but never called. `submitPublicSubscription.ts` imports types from `../../../types` (resolves to `src/types`, which does not exist; type-only so it compiles away).

### 1.3 Call sites per module

addNewsletterUser
- `REQ/createNewsSource.ts:108` `await addNewsletterUser({email,name,bio,language: get(globalLanguage)||"en",countryOfResidence:"US",newsSourcesConfigTuples:[]}, configuratorEmail, newSourceId)` inside try/catch, error only logged.
- `STG/H_Dashboard/Users/UserDataService.ts:92` (loadInitialData, try/catch, logged) and `:161` (addUserAndSubscribe; catch rethrows `new Error(err.message || ...)`).
- `REQ/postSubscriber.ts:23` (dead) reads `response.message === "User added successfully."`.
- `STG/H_Dashboard/NewsSource/PostExplanation.svelte:49` `const result = await addNewsletterUser(user, configId, newsSourceId); message = result.message || ...`; catch reads `error instanceof Error ? error.message : ...`.

askForNewAuthCode
- `src/lib/ui/organisms/AuthForm.svelte:42` `await askForNewAuthCode(); step='code'` in try/catch (catch shows generic message). `:137` `on:click={() => askForNewAuthCode()}` fire and forget.

askIsAuthCodeValid
- `src/routes/dashboard/+layout.svelte:48` `askIsAuthCodeValid(async () => {...load config, subs, leads...}, () => { window.location.href = "/login?..." })` (not awaited).
- `src/lib/ui/organisms/AuthForm.svelte:122` `askIsAuthCodeValid(() => { window.location.href = "/dashboard?x-auth-email=..&x-auth-code=.." })`.
- `SYS/useConfigurator.ts:22` polled every 1s: `askIsAuthCodeValid(() => {...})`. Interval only cleared on success; on failure it polls forever.
- `SYS/wrappers/Page/Page.svelte:3` imported, call commented out.

createInitialConfiguratorConfig
- `REQ/getConfiguratorSession.ts:33` `await createInitialConfiguratorConfig(getAuthHeaders())` result ignored.
- `src/routes/dashboard/+layout.svelte:56` same pattern, result ignored.
- `src/routes/oauth/+server.js:66` `await createInitialConfiguratorConfig(authHeaders)` SERVER SIDE, result ignored. It writes the new apiKey into the module-level store on the server (shared across requests).

createNewsSource
- `STG/E_NewsSource.svelte:41` passed as `apiCall` to `processNewsSourceAction(fields, transform, createNewsSource, console.error, msg, onSuccess)`.
- `STG/H_Dashboard/NewsSource/AddNewsSourceForm.svelte:63` passed to `processNewsSourceAction(..., createNewsSource, (msg)=>addErrorMessage=msg, $t[...], async (created) => { addedNewsSource.set(created); await getConfiguratorSession(); })`.
- `STG/NewFlow/Step06_NewsWebsite.svelte:81` `const result = await createNewsSource(data); if (result) { result.linkSelector ... } else alert(...)`; catch alerts generic text.
- `STG/NewFlow/Step08_Generate.svelte:93` `const newSource = await createNewsSource({...}); if (newSource && newSource.id) {...saveToStore({createdNewsSourceId: newSource.id}); await getConfiguratorSession()}`; catch reads `err.message || err`.
- `REQ/getConfiguratorSession.ts:44` (auto-create first source from `store.newsSource`), result ignored.
- `processNewsSourceAction` (`STG/H_Dashboard/NewsSource/newsSourceActions.ts`) contract: calls `apiCall(payload, payload.id)`; catch uses `e.message || errorMessage`; then `if (!result) setError(errorMessage)`. So both THROWS and NULL contracts are handled there. Note the 2nd arg: createNewsSource ignores it, updateNewsSource uses it as `newsSourceId`.

generatePersonality
- `SYS/inputs/Personality/Personality.svelte:40` `const result = await generatePersonality(content, newsSourceId); onChange(result.personality)`; catch reads `error?.message`.
- `STG/H_Dashboard/NewsSource/UpdateNewsSourceForm.svelte:13` imported, never called.

generateSelector
- `STG/NewFlow/Step07_Selector.svelte:42` `const result = await generateSelector($store.configuratorEmail, {url, lead, personality, scheduleTime: $store.config.scheduleTime}); if (result) {...} else alert(...)`; catch alerts.

getAuthHeaders
- All REQ modules (internal).
- `STG/NewFlow/Step08_Generate.svelte:52` headers for a direct fetch.
- `SYS/inputs/Secrets/Secrets.svelte:117,133,141,149` `const authHeaders = await getAuthHeaders(); const configId = authHeaders["x-auth-email"]` (awaits a sync function; harmless).
- `src/routes/dashboard/+layout.svelte:30-33` reads `getAuthHeaders()["x-auth-code" | "x-auth-email" | "picture" | "given_name"]` as fallback for URL params, and `:53,56,57` passes it to getConfigFetchResponse/createInitialConfiguratorConfig. IMPORTANT: layout calls `logout(false)` (clears localStorage) right before `saveToStore(...)`, so the new client must still read freshly persisted values.
- `REQ/askIsAuthCodeValid.ts:6-9` reads `x-auth-code`, `x-auth-email`, `x-auth-token-id`, `x-auth-client-id` keys.
- `REQ/updateConfiguration.ts`, `searchNewsletterUser`, `getAllSubscribersFromConfigEndpoint` read `["x-auth-email"]` as configId.

getConfiguratorSession (default)
- `STG/E_NewsSource.svelte:56` `await getConfiguratorSession()` result ignored.
- `STG/NewFlow/Step08_Generate.svelte:110` awaited, ignored.
- `STG/H_Dashboard/NewsSource/AddNewsSourceForm.svelte` (onSuccess) awaited, ignored.
- `STG/H_Dashboard/Users/NewsSourceUserManagement.svelte:173,179` awaited in success and in catch, ignored.
- `src/routes/dashboard/+page.svelte:33` inside `onDestroy` (not awaited).

getConfigFetchResponse (named)
- `REQ/createNewsSource.ts:160` result discarded.
- `src/routes/dashboard/+layout.svelte:53,57` `let response = await getConfigFetchResponse(getAuthHeaders()); if (!response.ok) {...}; const json = await response.json()`.
- `src/routes/oauth/+server.js:63,69` with `(authHeaders, url.origin)`, checks `.ok`, then `await response.json()` only for logging.

getGeoIpLanguage
- `src/components/GlobalData/GlobalData.svelte:13` `const lang = await getGeoIpLanguage(); if (lang) populateToStore("appLanguage", lang)`.

getLeadsForConfigurator
- `STG/H_Dashboard/Users/UserDataService.ts:67` in Promise.all; `if (leadsResponse && leadsResponse[configId])`.
- `src/routes/dashboard/+layout.svelte:63` in Promise.all; `if (leadsResponse) saveToStore({ leads: leadsResponse[configuratorEmail] })`.

getNewsletterUsersByNewsSource
- `STG/H_Dashboard/Users/UserDataService.ts:36` `subscribersToSave[source.id] = await getNewsletterUsersByNewsSource(configId, source.id)` (no pagination args used anywhere).

getPublicConfig
- `src/routes/subscribe/+page.svelte:48` `const publicConfig = await getPublicConfig(id); if (publicConfig) { publicConfig.logo; publicConfig.newsletterTitle }`.
- `SYS/widgets/Subscribe/stages/A_InitialParams.svelte:41` `if (publicConfig && publicConfig.newsSources) filter(ns => ns.isPublic !== false && ns.active !== false)` in try/catch.

logout
- `logout()` (redirect): `src/components/MenuHalf/MenuHalf.svelte:85`, `src/lib/ui/organisms/Sidebar.svelte:130`, `src/components/Header/Header.svelte:60`, `STG/H_Dashboard/H_Dashboard.svelte:28` (`<SubmitButton callback={logout}>`, receives MouseEvent).
- `logout(false)`: `src/routes/+page.svelte:127,366`, `src/routes/dashboard/+layout.svelte:37`, `src/lib/ui/organisms/Header.svelte:109,110,205`.
- Separate function with the same name: `src/lib/api/auth.ts` `logout()` (no importers).

regenerateSelectors
- `STG/H_Dashboard/Developer/DeveloperNewsSourceItem.svelte:37` `const response = await regenerateSelectors($store.configuratorEmail, newsSource.id, newsSource.url); errorRegeneratingSelectors.set(!response); if (response) linkSelector = response.linkSelector`. No try/catch.

sendCustomContent
- `STG/H_Dashboard/Users/NewsSourceUserManagement.svelte:105` `const success = await sendCustomContent(get(store).configuratorEmail, newsSource.id, text); if (success) ... else ...`; catch reads `error.message`.

sendEmail
- `STG/NewFlow/Step08_Generate.svelte:132` `await sendEmail({html: previewHtml, subject, config: $store.config, emails: [$store.configuratorEmail]})`; catch reads `err.message || err`.

subscribeNewsletterUser
- `REQ/createNewsSource.ts:123`, `STG/H_Dashboard/Users/UserDataService.ts:104`. Return ignored, both in try/catch.

triggerNewsSourceSend
- `STG/H_Dashboard/Users/NewsSourceUserManagement.svelte:135` `const response = await triggerNewsSourceSend(newsSource.id); if (typeof response === "boolean" && response) success else setFeedback("error", String(response))`; catch reads `error.message`. Callers DEPEND on a returned non-boolean being the error text. A rewrite that throws must update this caller.

unsubscribeUserToConfigNewsSource
- `STG/H_Dashboard/Users/UserDataService.ts:251` `const success = await ...` then the value is only logged; local store is updated and `true` returned regardless (UI says success even if backend failed).

updateConfiguration
- `src/components/store.ts:184` `return await updateConfiguration(get(store).config)` inside `saveToConfig`.
- `STG/H_Dashboard/Users/NewsSourceUserManagement.svelte:169` `const success = await updateConfiguration({ newsSources }); if (success) ... else ...`; catch reads `error.message`.

updateNewsSource
- `STG/H_Dashboard/NewsSource/UpdateNewsSourceForm.svelte:139` via `processNewsSourceAction(payload, f=>f, updateNewsSource, ...)`: payload contains `id`, which becomes the 2nd arg `newsSourceId`. Note the full payload (including `id`) is also sent as the PUT body.

uploadUserFileChunked
- `STG/H_Dashboard/Users/UserDataService.ts:216` (processBulkUpload), which is used by `NewsSourceUserManagement.svelte:221` and `STG/NewFlow/Step12_Share.svelte:47` reading `result.errorMessage` / `result.successMessage`.

## 2. UserDataService.ts (not WS6 but imported by requests/)

Path: `STG/H_Dashboard/Users/UserDataService.ts`. Imported by `REQ/createNewsSource.ts` (refreshSubscribers), `REQ/getConfiguratorSession.ts` (loadInitialData imported but only referenced in comments; refreshSubscribers called), `src/routes/dashboard/+layout.svelte` (refreshSubscribers), and as namespace by `Users.svelte` (imported, unused), `NewsSourceUserManagement.svelte`, `NewFlow/Step12_Share.svelte`. This creates a cycle: createNewsSource -> UserDataService -> requests -> store.

- `refreshSubscribers(): Promise<void>`: reads `store.configuratorEmail` and `store.config.newsSources`; for each source calls `getNewsletterUsersByNewsSource` in parallel; writes `saveToStore({ subscribers: {[newsSourceId]: NewsletterUser[]} })` (full replace). Throws `Error(err.message || "Failed to refresh subscriber list.")` when configId missing. Because the fetcher swallows errors and returns `[]`, a failed source shows as zero subscribers.
- `loadInitialData(): Promise<void>`: writes `saveToStore({subscribers:{}, leads:{}})`, then Promise.all(refreshSubscribers, getLeadsForConfigurator), writes `saveToStore({ leads: leads[configId] or {} })`; for each source with an empty subscriber list calls addNewsletterUser + subscribeNewsletterUser for the configurator, then refreshSubscribers again. Errors reset `subscribers` and `leads` to `{}`. Currently not called anywhere (only commented out).
- `addUserAndSubscribe(userData: Pick<NewsletterUser,'name'|'email'|'bio'|'language'>, newsSourceId)`: validates, calls addNewsletterUser, pushes the user into `store.subscribers[newsSourceId]` via saveToStore. Throws Error.
- `processBulkUpload(file, newsSourceId, onUserAdded?)`: wraps uploadUserFileChunked then refreshSubscribers. Throws Error only on missing configId or refresh failure.
- `unsubscribeUserFromSource(email, newsSourceId): Promise<boolean>`: calls unsubscribe endpoint, ignores its boolean, removes the user from `store.subscribers[newsSourceId]`, returns true.

Store keys written: `subscribers`, `leads`. Both are in `keysToSave`, so every write serializes the entire subscriber map to localStorage and to a cookie (cookie size limit 4 KB is exceeded quickly; setCookie silently produces a truncated or rejected cookie).

## 3. store.ts exports and usage

Exports: default `store` (writable<Store>, Store = `{[k]: any}`), `latestMessage`, `topic`, `socket`, `isScrollingDown`, `globalLanguage`, `emptyStoreSnapshot`, `saveToStore`, `populateToStore`, `getFromStore`, `saveToConfig`, `setStorageFromKeysToSave`, `getCookie`, `saveAllKeysToSaveInLocalStorage`, `stepsMapping`. Internal: `setCookie`, `setAllKeysToSaveInLocalStorage`, `createObjectPopulator`, `createObjectGetter`.

115 files import store.ts; 103 import the default store.

| Export | Signature | Importers |
|---|---|---|
| default `store` | `Writable<Store>` | 103 files (used as `$store.x`, `get(store).x`, `store.subscribe`, and `store.update` in `REQ/updateConfiguration.ts:8` and `SYS/widgets/Subscribe/Subscribe.svelte:142`) |
| `saveToStore` | `(obj: {[k]: any}) => void` shallow merge at root, then persists every keysToSave path to localStorage and cookies | 43 files (list in section 3.1) |
| `populateToStore` | `(path: string, value) => void` deep set by dot path, does NOT persist | `GlobalData/GlobalData.svelte` (`"appLanguage"`), `SYS/helpers/setStorageFromKeysToSave.ts` |
| `getFromStore` | `(path: string) => any` | `GlobalData.svelte` (`appLanguage`), `SYS/widgets/Subscribe/Subscribe.svelte`, `stages/B_UserDetails.svelte` (`widgetPrefilledEmail/Name/Language`), `stages/C_ConfirmAndSubscribe.svelte` (`widgetConfiguratorId`, `widgetSelectedNewsSourceId`, `widgetEmail`, `widgetName`, `widgetPrefilledLanguage/Country/Bio`, and `getFromStore("apiURL")()` ) |
| `saveToConfig` | `(cfg, shouldUpdateConfiguration = true) => Promise<Config or null>`; no-op returning null unless `isAuthCodeValid`; merges into `store.config` then PUTs the WHOLE config via updateConfiguration | REQ: createNewsSource, generatePersonality, regenerateSelectors, updateNewsSource, getConfiguratorSession (imported, unused). UI: `SYS/inputs/Secrets/Secrets.svelte:66,72,81` (`{webhookGroups}`), `STG/H_Dashboard/Config/Config.svelte:36` (`get(draftConfig)`), `Config/toggles/AppPasswordToggle.svelte:27` (`{appPassword}`), `Config/toggles/EmailMaskSenderToggle.svelte:19` (`{emailMaskSender}`). No UI caller reads the return value |
| `setStorageFromKeysToSave` | `() => void` hydrate from localStorage | `SYS/steps/StepsTowardsSubscribe/StepsTowardsSubscribe.svelte:40` (onMount). A duplicate default export exists in `SYS/helpers/setStorageFromKeysToSave.ts`, used by `SYS/wrappers/Page/Page.svelte:10` |
| `saveAllKeysToSaveInLocalStorage` | `() => void` subscribes forever (never unsubscribed) | `StepsTowardsSubscribe.svelte:42` |
| `getCookie` | `(name) => string or null` | imported by `REQ/getAuthHeaders.ts` and `REQ/getConfiguratorSession.ts`, called by neither. Effectively unused |
| `emptyStoreSnapshot` | JSON clone of initial store (drops `apiURL` function) | no importers |
| `stepsMapping` | frozen `{Profile:9, "News Sources":10, Users:11, Billing:12, Reports:13, Exports:14, Newspaper:15, "Secrets/Developer":16}` | MenuHalf.svelte, StepsTowardsPublish/MainSteps.svelte, STG/E_NewsSource.svelte, STG/NewFlow/Step13_Plan.svelte, lib/ui/organisms/SideLink.svelte, lib/ui/organisms/Sidebar.svelte, routes/dashboard/+layout.svelte, routes/dashboard/+page.svelte |
| `latestMessage` | `Writable<string>` | SocketClient.svelte (set from socket `log`), Personality.svelte, Developer/DeveloperNewsSourceItem.svelte, NewsSource/AddNewsSourceForm.svelte, NewsSource/NewsSource.svelte, NewsSource/UpdateNewsSourceForm.svelte, Users/NewsSourceUserManagement.svelte, NewFlow/Step08_Generate.svelte |
| `topic` | `Writable<string>` | NewFlow/Step04_Topic, Step06_NewsWebsite, Step07_Selector, Step08_Generate |
| `socket` | `Writable<Socket or null>` | SocketClient.svelte only |
| `isScrollingDown` | `Writable<boolean>` | Header/Header.svelte, routes/dashboard/+page.svelte, routes/subscribe/+page.svelte |
| `globalLanguage` | `Writable<string>` (separate from `store.globalLanguage`) | data/faq.ts, REQ/createNewsSource.ts, REQ/triggerNewsSourceSend.ts (imported unused), H_Dashboard/Billing/Billing.svelte, NewFlow/Step02_Language.svelte, lib/config/help.config.ts, lib/content/auth.ts, lib/ui/organisms/LanguagePicker.svelte, routes/article, routes/articles, routes/confirm-subscription, routes/login, routes/signup |

### 3.1 saveToStore importers (43)

Header/Header.svelte, MenuHalf/MenuHalf.svelte, REQ/askForNewAuthCode.ts, REQ/askIsAuthCodeValid.ts, REQ/createInitialConfiguratorConfig.ts, REQ/createNewsSource.ts, REQ/getConfiguratorSession.ts, StepsTowardsPublish/MainSteps.svelte, STG/D_Lead.svelte, STG/E_NewsSource.svelte, STG/H_Dashboard/Users/UserDataService.ts, STG/NewFlow/Step01..Step13 (13 files), StepsTowardsSubscribe/StepsTowardsSubscribe.svelte, StepsTowardsSubscribe/stages/A_Welcome, B_Email, B_Name, C_Language, TransitionSteps/TransitionSteps.svelte, widgets/Subscribe/Subscribe.svelte, widgets/Subscribe/stages/A_InitialParams, B_UserDetails, Email, Language, Name, lib/ui/organisms/AuthForm.svelte, LanguagePicker.svelte, Sidebar.svelte, routes/dashboard/+layout.svelte, routes/dashboard/+page.svelte, routes/subscribe-widget/+page.svelte, routes/subscribe/+page.svelte.

`stepsIndex` dominates: 30 files write it via saveToStore and 30 read it.

## 4. Other modules in scope

- `SYS/useConfigurator.ts`: `useConfigurator(callback: Function)`; must be called during component init (uses onMount). Subscribes to store, calls `callback(value)` whenever `isAuthCodeValid` is true (every store change) and when `config.logo` changes; also polls `askIsAuthCodeValid` every 1 s until valid. Importers: `STG/H_Dashboard/Config/toggles/EmailMaskSenderToggle.svelte`, `AppPasswordToggle.svelte`. Neither the store subscription nor the interval is cleaned up on destroy (leak).
- `src/components/GlobalData/GlobalData.svelte`: onMount `startTicks()` (which itself calls onMount inside onMount, so the inner callback never runs reliably) and geo language detection writing `appLanguage`. Used by routes dashboard, subscribe, subscribe-widget, test-checklist.
- `GlobalData/ticks.ts`: exports `ticks: HTMLElement[]`, `itemHovered`, `startTicks()`. Only GlobalData imports it.
- `GlobalData/localSessionFallbackFetch.ts`: exports `localSessionFallbackFetch<T>(url, customKey | FetchConfig)`. No importers (dead). Uses sessionStorage/localStorage unguarded inside functions.
- `src/components/SocketClient.svelte`: no props; onMount (browser only) subscribes to store and when `isAuthCodeValid && configuratorEmail && authCode` dynamically imports socket.io-client, connects `io(apiURL(), {path: "/socket-io"})`, emits `register {id, accessCode: authCode}`, writes `socket` and `latestMessage` (on `log`), answers `resetPage` with `resetAck`, pings every 5 min. Used by routes dashboard, subscribe, subscribe-widget, test-checklist.
- `src/components/types.ts`: types only (`Store` is `{[index:string]: any}`, so store access is untyped everywhere). `Config.email: EmailConfig` is required but never present in store defaults. `NewsSource` lacks `isPaidNewsletter` used in AddNewsSourceForm.
- `src/lib/stores/`: `session.ts` (`session` writable persisted to localStorage `app.session`, guarded by `typeof window`; used only by `lib/api/auth.ts` and a type import in `routes/help/+page.server.ts`), `sidebar.store.ts` (`collapsed`; MultiSlotComponent, Sidebar, dashboard layout), `mobile-menu.store.ts` (`isMobileMenuOpen`; Container, MenuHalf, MenuHalfTrigger), `language.store.ts` (`language`; LanguagePicker only, a third language source besides `globalLanguage` and `store.globalLanguage/appLanguage/dashboardLanguage`).
- `src/lib/api/auth.ts`: `loginWithGoogle`, `loginWithEmail(email)`, `signupWithGoogle`, `signupWithEmail(email)` returning `AuthResult = {ok:true, session} | {ok:false, error}`; `logout()`. Calls relative `/api/auth/*` routes that do not exist in `src/routes`. NO importers (dead; real auth goes through REQ/askForNewAuthCode, askIsAuthCodeValid and routes/oauth).
- `src/lib/utils/checkPlanLimits.ts`: `checkPlanLimit(feature: "newsSources" | "users") => {allowed, limit, current, plan}` reading `store.config.pricingPlan`, `store.config.newsSources.length`, unique emails across `store.subscribers`. Hardcoded PLAN_LIMITS duplicate `lib/config/plans.config.ts` PLAN_DEFINITIONS. Importers: Step13_Plan, Developer/NewsSourceDeveloper, Users/NewsSourceUserManagement, Users/ManualAddUserForm, NewsSource/UpdateNewsSourceForm, NewsSource/AddNewsSourceForm, NewsSource/NewsSource, Billing/Billing.
- `src/lib/config/runtime.ts`: `runtime = {appName, legal:{termsUrl,privacyUrl,cookiesUrl}, isMockMode}`; importers AuthForm.svelte, lib/api/auth.ts, routes/login, routes/signup.
- `src/lib/config/help.config.ts`: default writable `{content: get(t).help}`, re-derived on `globalLanguage` change via a module-level subscription (never unsubscribed). Importer routes/help/+page.svelte.
- `src/lib/config/plans.config.ts`: default writable PlansState, `loadPlansContent()`, `computeFeatures(content, id)`, `setInterval(interval)` (shadows the global `setInterval` name for importers), types. Importers Billing.svelte, lib/ui/organisms/Header.svelte, Pricing.svelte.
- `SYS/helpers/`: `camelCaseToCapitalized(text)` (AutoCollapseToggle.svelte, selectors/Card/JsonViewer.svelte); `setStorageFromKeysToSave()` duplicate of the store.ts export (Page.svelte); `cronToNaturalLanguage.ts` (see below).
- `cronToNaturalLanguage`: `src/components/cronToNaturalLanguage.ts` and `SYS/helpers/cronToNaturalLanguage.ts` are byte-identical (cmp equal), each exporting `cronToNaturalLanguage(cron: string): string`. Neither is imported anywhere; the only other mention is text in `src/routes/test-styles/+page.svelte`. The ScheduleTime input uses its own `SYS/inputs/ScheduleTime/cronToNatural.ts`. Both copies are dead and one can be deleted.

## 5. Store keys

Method: static scan of all 115 files importing store.ts for `$store.x`, `$store?.x`, `get(store).x`, destructuring from `get(store)`, variables assigned from `get(store)`, `saveToStore({x})` top-level keys, `saveToConfig({x})` (reported as `config.x`), `populateToStore('x')`, `getFromStore('x')`. `config.*` sub-keys are listed when accessed as `$store.config.x`. Dynamic access (spreads such as `saveToStore({config: updatedJson, ...updatedJson})` in getConfiguratorSession) cannot be resolved statically. Secrets.svelte reads `webhook*`, `senderName`, `newsletterTitle`, `emailMaskSender`, `configuratorId` through `const cfg = get(store).config`, so those rows are really `config.*` (legacy webhook fields kept for migration into `webhookGroups`).


### 5.1 Key table

Counts are files. "Default" means the key exists in the initial store object (or config defaults).

| Key | Reads (files) | Writes (files) | Default in store.ts | Flag |
|---|---|---|---|---|
| `apiURL` | 37: src/components/SocketClient.svelte<br>SYS/inputs/Secrets/Secrets.svelte<br>SYS/requests/addNewsletterUserEndpoint.ts<br>SYS/requests/askForNewAuthCode.ts<br>SYS/requests/askIsAuthCodeValid.ts<br>SYS/requests/createInitialConfiguratorConfig.ts<br>SYS/requests/createNewsSource.ts<br>SYS/requests/generatePersonality.ts<br>SYS/requests/generateSelector.ts<br>SYS/requests/getAllSubscribersFromConfigEndpoint.ts<br>SYS/requests/getConfiguratorSession.ts<br>SYS/requests/getGeoIpLanguage.ts<br>SYS/requests/getLeadsForConfigurator.ts<br>SYS/requests/getNewsSourcesFromConfiguration.ts<br>SYS/requests/getNewsletterUsersByNewsSource.ts<br>SYS/requests/getPublicConfig.ts<br>SYS/requests/getUsersFromRawFileOrText.ts<br>SYS/requests/regenerateSelectors.ts<br>SYS/requests/searchNewsletterUser.ts<br>SYS/requests/sendCustomContent.ts<br>SYS/requests/sendEmail.ts<br>SYS/requests/submitPublicSubscription.ts<br>SYS/requests/subscribeNewsletterUser.ts<br>SYS/requests/triggerNewsSourceSend.ts<br>SYS/requests/unsubscribeUserToConfigNewsSource.ts<br>SYS/requests/updateConfiguration.ts<br>SYS/requests/updateNewsSource.ts<br>SYS/requests/uploadUserFileChunked.ts<br>STG/H_Dashboard/Billing/Billing.svelte<br>STG/H_Dashboard/Newspaper/Newspaper.svelte<br>STG/NewFlow/Step08_Generate.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/D_Subscribed.svelte<br>SYS/widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte<br>src/lib/ui/organisms/Pricing.svelte<br>src/routes/article/+page.svelte<br>src/routes/articles/+page.svelte<br>src/routes/confirm-subscription/+page.svelte | 0:  | yes |  |
| `appLanguage` | 1: src/components/GlobalData/GlobalData.svelte | 2: src/components/GlobalData/GlobalData.svelte<br>src/lib/ui/organisms/LanguagePicker.svelte | yes |  |
| `authCode` | 9: src/components/SocketClient.svelte<br>SYS/requests/getConfiguratorSession.ts<br>SYS/requests/getPublicConfig.ts<br>SYS/requests/getUsersFromRawFileOrText.ts<br>SYS/requests/sendCustomContent.ts<br>SYS/requests/triggerNewsSourceSend.ts<br>SYS/requests/updateConfiguration.ts<br>SYS/steps/StepsTowardsPublish/MainSteps.svelte<br>src/lib/ui/organisms/AuthForm.svelte | 2: src/lib/ui/organisms/AuthForm.svelte<br>src/routes/dashboard/+layout.svelte | yes |  |
| `clientId` | 0:  | 1: src/routes/dashboard/+layout.svelte | no | written but never read |
| `colorPalette` | 2: SYS/inputs/ColorPicker/ColorPicker.svelte<br>SYS/inputs/ColorPicker/getColorSuggestions.ts | 0:  | yes |  |
| `complementaryColor` | 2: STG/H_Dashboard/Reports/Reports.svelte<br>STG/H_Dashboard/Users/Users.svelte | 0:  | no | read but never written and no default |
| `config` | 16: SYS/inputs/Secrets/Secrets.svelte<br>SYS/requests/createInitialConfiguratorConfig.ts<br>STG/H_Dashboard/Config/Config.svelte<br>STG/H_Dashboard/Users/NewsSourceUserManagement.svelte<br>STG/H_Dashboard/Users/Users.svelte<br>STG/NewFlow/Step01_Frequency.svelte<br>STG/NewFlow/Step02_Language.svelte<br>STG/NewFlow/Step03_Redirect.svelte<br>STG/NewFlow/Step04_Topic.svelte<br>STG/NewFlow/Step05_Signature.svelte<br>STG/NewFlow/Step07_Selector.svelte<br>STG/NewFlow/Step08_Generate.svelte<br>STG/NewFlow/Step09_AppPassword.svelte<br>STG/NewFlow/Step10_Gmail.svelte<br>STG/NewFlow/Step13_Plan.svelte<br>src/lib/ui/organisms/BillingForm.svelte | 10: SYS/requests/createInitialConfiguratorConfig.ts<br>SYS/requests/getConfiguratorSession.ts<br>STG/NewFlow/Step01_Frequency.svelte<br>STG/NewFlow/Step02_Language.svelte<br>STG/NewFlow/Step03_Redirect.svelte<br>STG/NewFlow/Step04_Topic.svelte<br>STG/NewFlow/Step05_Signature.svelte<br>STG/NewFlow/Step09_AppPassword.svelte<br>STG/NewFlow/Step10_Gmail.svelte<br>src/routes/dashboard/+layout.svelte | yes |  |
| `config.appPassword` | 1: STG/NewFlow/Step09_AppPassword.svelte | 1: STG/H_Dashboard/Config/toggles/AppPasswordToggle.svelte | yes |  |
| `config.brandColor` | 2: STG/H_Dashboard/Reports/Reports.svelte<br>STG/H_Dashboard/Users/Users.svelte | 0:  | yes |  |
| `config.emailMaskSender` | 1: STG/NewFlow/Step10_Gmail.svelte | 1: STG/H_Dashboard/Config/toggles/EmailMaskSenderToggle.svelte | yes |  |
| `config.lead` | 2: STG/NewFlow/Step03_Redirect.svelte<br>STG/NewFlow/Step08_Generate.svelte | 0:  | no | not in config defaults |
| `config.logo` | 2: STG/NewFlow/Step05_Signature.svelte<br>SYS/useConfigurator.ts | 0:  | yes |  |
| `config.newsSources` | 17: SYS/requests/createNewsSource.ts<br>SYS/requests/generatePersonality.ts<br>SYS/requests/regenerateSelectors.ts<br>SYS/requests/updateNewsSource.ts<br>SYS/steps/StepsTowardsPublish/MainSteps.svelte<br>STG/H_Dashboard/Developer/NewsSourceDeveloper.svelte<br>STG/H_Dashboard/Exports/Exports.svelte<br>STG/H_Dashboard/NewsSource/NewsSource.svelte<br>STG/H_Dashboard/Newspaper/Newspaper.svelte<br>STG/H_Dashboard/Reports/Reports.svelte<br>STG/H_Dashboard/Users/BulkAddUserSection.svelte<br>STG/H_Dashboard/Users/NewsSourceUserManagement.svelte<br>STG/H_Dashboard/Users/UserDataService.ts<br>STG/H_Dashboard/Users/Users.svelte<br>STG/NewFlow/Step01_Frequency.svelte<br>src/lib/utils/checkPlanLimits.ts<br>src/routes/dashboard/+layout.svelte | 4: SYS/requests/createNewsSource.ts<br>SYS/requests/generatePersonality.ts<br>SYS/requests/regenerateSelectors.ts<br>SYS/requests/updateNewsSource.ts | yes |  |
| `config.newsletterSubject` | 1: STG/NewFlow/Step08_Generate.svelte | 0:  | yes |  |
| `config.newsletterTitle` | 1: STG/NewFlow/Step05_Signature.svelte | 0:  | yes |  |
| `config.pricingPlan` | 5: STG/H_Dashboard/Billing/Billing.svelte<br>STG/H_Dashboard/Users/BulkAddUserSection.svelte<br>STG/NewFlow/Step13_Plan.svelte<br>src/lib/ui/organisms/Pricing.svelte<br>src/lib/utils/checkPlanLimits.ts | 0:  | yes |  |
| `config.scheduleTime` | 4: STG/NewFlow/Step01_Frequency.svelte<br>STG/NewFlow/Step06_NewsWebsite.svelte<br>STG/NewFlow/Step07_Selector.svelte<br>STG/NewFlow/Step08_Generate.svelte | 0:  | yes |  |
| `config.senderName` | 3: src/components/MenuHalf/MenuHalf.svelte<br>STG/NewFlow/Step05_Signature.svelte<br>src/lib/ui/organisms/Sidebar.svelte | 0:  | yes |  |
| `config.webhookGroups` | 2: SYS/inputs/Secrets/Secrets.svelte<br>STG/H_Dashboard/NewsSource/UpdateNewsSourceForm.svelte | 1: SYS/inputs/Secrets/Secrets.svelte | yes |  |
| `configuratorEmail` | 25: src/components/SocketClient.svelte<br>SYS/requests/askForNewAuthCode.ts<br>SYS/requests/createNewsSource.ts<br>SYS/requests/generatePersonality.ts<br>SYS/requests/getConfiguratorSession.ts<br>SYS/requests/getLeadsForConfigurator.ts<br>SYS/requests/getNewsSourcesFromConfiguration.ts<br>SYS/requests/getPublicConfig.ts<br>SYS/requests/getUsersFromRawFileOrText.ts<br>SYS/requests/postSubscriber.ts<br>SYS/requests/triggerNewsSourceSend.ts<br>SYS/requests/updateConfiguration.ts<br>SYS/requests/updateNewsSource.ts<br>SYS/requests/uploadUserFileChunked.ts<br>STG/H_Dashboard/Config/toggles/EmailSignatureToggle.svelte<br>STG/H_Dashboard/Config/toggles/InteractiveSignatureEditor.svelte<br>STG/H_Dashboard/Developer/DeveloperNewsSourceItem.svelte<br>STG/H_Dashboard/NewsSource/PostExplanation.svelte<br>STG/H_Dashboard/Newspaper/Newspaper.svelte<br>STG/H_Dashboard/Users/NewsSourceUserManagement.svelte<br>STG/H_Dashboard/Users/UserDataService.ts<br>STG/NewFlow/Step05_Signature.svelte<br>STG/NewFlow/Step07_Selector.svelte<br>STG/NewFlow/Step08_Generate.svelte<br>STG/NewFlow/Step12_Share.svelte | 2: src/lib/ui/organisms/AuthForm.svelte<br>src/routes/dashboard/+layout.svelte | yes |  |
| `configuratorId` | 1: SYS/inputs/Secrets/Secrets.svelte | 0:  | no | read but never written and no default |
| `createdNewsSourceId` | 1: STG/NewFlow/Step12_Share.svelte | 1: STG/NewFlow/Step08_Generate.svelte | yes |  |
| `dashboardLanguage` | 0:  | 1: src/lib/ui/organisms/LanguagePicker.svelte | yes | written but never read |
| `directionsThatShouldDisappear` | 2: SYS/steps/StepsTowardsPublish/MainSteps.svelte<br>SYS/steps/TransitionSteps/TransitionSteps.svelte | 3: src/components/Header/Header.svelte<br>SYS/requests/createNewsSource.ts<br>SYS/steps/StepsTowardsPublish/MainSteps.svelte | yes |  |
| `emailMaskSender` | 2: SYS/inputs/Secrets/Secrets.svelte<br>STG/H_Dashboard/Config/toggles/EmailMaskSenderToggle.svelte | 0:  | no | read but never written and no default |
| `given_name` | 2: src/components/MenuHalf/MenuHalf.svelte<br>src/lib/ui/organisms/Sidebar.svelte | 1: src/routes/dashboard/+layout.svelte | no |  |
| `globalLanguage` | 1: STG/NewFlow/Step08_Generate.svelte | 1: src/lib/ui/organisms/LanguagePicker.svelte | yes |  |
| `hasAuthCodeAskFailed` | 0:  | 1: SYS/requests/askForNewAuthCode.ts | no | written but never read |
| `hasInteracted` | 2: SYS/steps/StepsTowardsSubscribe/StepsTowardsSubscribe.svelte<br>src/routes/dashboard/+layout.svelte | 1: SYS/steps/TransitionSteps/TransitionSteps.svelte | yes |  |
| `hasNewEmailCodeBeenSent` | 1: src/lib/ui/organisms/AuthForm.svelte | 2: SYS/requests/askForNewAuthCode.ts<br>src/lib/ui/organisms/AuthForm.svelte | yes |  |
| `header` | 1: SYS/wrappers/MultiSlotComponent/MultiSlotComponent.svelte | 2: src/routes/subscribe-widget/+page.svelte<br>src/routes/subscribe/+page.svelte | yes |  |
| `isAuthCodeValid` | 8: src/components/Header/Header.svelte<br>src/components/MenuHalf/MenuHalf.svelte<br>src/components/SocketClient.svelte<br>SYS/useConfigurator.ts<br>src/lib/ui/organisms/AuthForm.svelte<br>src/lib/ui/organisms/Header.svelte<br>src/lib/ui/organisms/Sidebar.svelte<br>src/routes/dashboard/+layout.svelte | 2: SYS/requests/askIsAuthCodeValid.ts<br>src/lib/ui/organisms/AuthForm.svelte | yes |  |
| `isRefreshingSubscribers` | 1: STG/H_Dashboard/Users/Users.svelte | 1: SYS/requests/getConfiguratorSession.ts | yes |  |
| `keysToSave` | 1: SYS/helpers/setStorageFromKeysToSave.ts | 0:  | yes |  |
| `lead` | 7: SYS/requests/getConfiguratorSession.ts<br>STG/D_Lead.svelte<br>STG/E_NewsSource.svelte<br>STG/NewFlow/Step06_NewsWebsite.svelte<br>STG/NewFlow/Step07_Selector.svelte<br>STG/NewFlow/Step08_Generate.svelte<br>STG/NewFlow/Step12_Share.svelte | 2: STG/D_Lead.svelte<br>src/routes/dashboard/+layout.svelte | yes |  |
| `leads` | 1: STG/H_Dashboard/Reports/Reports.svelte | 2: STG/H_Dashboard/Users/UserDataService.ts<br>src/routes/dashboard/+layout.svelte | yes |  |
| `linkSelector` | 2: STG/NewFlow/Step07_Selector.svelte<br>STG/NewFlow/Step08_Generate.svelte | 2: STG/NewFlow/Step06_NewsWebsite.svelte<br>STG/NewFlow/Step07_Selector.svelte | no |  |
| `newsSource` | 5: SYS/requests/getConfiguratorSession.ts<br>STG/E_NewsSource.svelte<br>STG/NewFlow/Step06_NewsWebsite.svelte<br>STG/NewFlow/Step07_Selector.svelte<br>STG/NewFlow/Step08_Generate.svelte | 3: STG/E_NewsSource.svelte<br>STG/NewFlow/Step06_NewsWebsite.svelte<br>src/routes/dashboard/+layout.svelte | yes |  |
| `newsSourceId` | 1: SYS/requests/postSubscriber.ts | 0:  | no | read but never written and no default |
| `newsletterTitle` | 1: SYS/inputs/Secrets/Secrets.svelte | 0:  | no | read but never written and no default |
| `personality` | 6: SYS/requests/createNewsSource.ts<br>STG/E_NewsSource.svelte<br>STG/H_Dashboard/NewsSource/AddNewsSourceForm.svelte<br>STG/NewFlow/Step06_NewsWebsite.svelte<br>STG/NewFlow/Step07_Selector.svelte<br>STG/NewFlow/Step08_Generate.svelte | 0:  | yes |  |
| `picture` | 2: src/components/MenuHalf/MenuHalf.svelte<br>src/lib/ui/organisms/Sidebar.svelte | 1: src/routes/dashboard/+layout.svelte | no |  |
| `schedule` | 1: STG/E_NewsSource.svelte | 0:  | no | read but never written and no default |
| `senderName` | 1: SYS/inputs/Secrets/Secrets.svelte | 0:  | no | read but never written and no default |
| `stepsIndex` | 30: src/components/MenuHalf/MenuHalf.svelte<br>SYS/steps/Steps.svelte<br>SYS/steps/StepsTowardsPublish/MainSteps.svelte<br>STG/D_Lead.svelte<br>STG/E_NewsSource.svelte<br>STG/NewFlow/Step01_Frequency.svelte<br>STG/NewFlow/Step02_Language.svelte<br>STG/NewFlow/Step03_Redirect.svelte<br>STG/NewFlow/Step04_Topic.svelte<br>STG/NewFlow/Step05_Signature.svelte<br>STG/NewFlow/Step06_NewsWebsite.svelte<br>STG/NewFlow/Step07_Selector.svelte<br>STG/NewFlow/Step08_Generate.svelte<br>STG/NewFlow/Step09_AppPassword.svelte<br>STG/NewFlow/Step10_Gmail.svelte<br>STG/NewFlow/Step11_Send.svelte<br>STG/NewFlow/Step12_Share.svelte<br>STG/NewFlow/Step13_Plan.svelte<br>SYS/steps/StepsTowardsSubscribe/StepsTowardsSubscribe.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/A_Welcome.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/B_Email.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/B_Name.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/C_Language.svelte<br>SYS/steps/TransitionSteps/TransitionSteps.svelte<br>SYS/widgets/Subscribe/stages/Email.svelte<br>SYS/widgets/Subscribe/stages/Language.svelte<br>SYS/widgets/Subscribe/stages/Name.svelte<br>src/lib/ui/organisms/SideLink.svelte<br>src/lib/ui/organisms/Sidebar.svelte<br>src/routes/dashboard/+layout.svelte | 30: src/components/Header/Header.svelte<br>src/components/MenuHalf/MenuHalf.svelte<br>SYS/steps/StepsTowardsPublish/MainSteps.svelte<br>STG/D_Lead.svelte<br>STG/E_NewsSource.svelte<br>STG/NewFlow/Step01_Frequency.svelte<br>STG/NewFlow/Step02_Language.svelte<br>STG/NewFlow/Step03_Redirect.svelte<br>STG/NewFlow/Step04_Topic.svelte<br>STG/NewFlow/Step05_Signature.svelte<br>STG/NewFlow/Step06_NewsWebsite.svelte<br>STG/NewFlow/Step07_Selector.svelte<br>STG/NewFlow/Step08_Generate.svelte<br>STG/NewFlow/Step09_AppPassword.svelte<br>STG/NewFlow/Step10_Gmail.svelte<br>STG/NewFlow/Step11_Send.svelte<br>STG/NewFlow/Step12_Share.svelte<br>STG/NewFlow/Step13_Plan.svelte<br>SYS/steps/StepsTowardsSubscribe/StepsTowardsSubscribe.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/A_Welcome.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/B_Email.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/B_Name.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/C_Language.svelte<br>SYS/steps/TransitionSteps/TransitionSteps.svelte<br>SYS/widgets/Subscribe/stages/Email.svelte<br>SYS/widgets/Subscribe/stages/Language.svelte<br>SYS/widgets/Subscribe/stages/Name.svelte<br>src/lib/ui/organisms/Sidebar.svelte<br>src/routes/dashboard/+layout.svelte<br>src/routes/subscribe/+page.svelte | yes |  |
| `subscriberConfiguratorId` | 2: SYS/steps/StepsTowardsSubscribe/stages/C_Language.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/D_Subscribed.svelte | 2: SYS/steps/StepsTowardsSubscribe/stages/A_Welcome.svelte<br>src/routes/subscribe/+page.svelte | yes |  |
| `subscriberEmail` | 3: SYS/steps/StepsTowardsSubscribe/stages/B_Email.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/C_Language.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/D_Subscribed.svelte | 1: SYS/steps/StepsTowardsSubscribe/stages/B_Email.svelte | yes |  |
| `subscriberLanguage` | 1: SYS/steps/StepsTowardsSubscribe/stages/C_Language.svelte | 1: SYS/steps/StepsTowardsSubscribe/stages/C_Language.svelte | yes |  |
| `subscriberLead` | 0:  | 1: src/routes/subscribe/+page.svelte | yes | written but never read |
| `subscriberName` | 1: SYS/steps/StepsTowardsSubscribe/stages/B_Name.svelte | 1: SYS/steps/StepsTowardsSubscribe/stages/B_Name.svelte | yes |  |
| `subscriberNewsSourceId` | 2: SYS/steps/StepsTowardsSubscribe/stages/C_Language.svelte<br>SYS/steps/StepsTowardsSubscribe/stages/D_Subscribed.svelte | 2: SYS/steps/StepsTowardsSubscribe/stages/A_Welcome.svelte<br>src/routes/subscribe/+page.svelte | yes |  |
| `subscribers` | 5: STG/H_Dashboard/Reports/Reports.svelte<br>STG/H_Dashboard/Users/BulkAddUserSection.svelte<br>STG/H_Dashboard/Users/UserDataService.ts<br>STG/H_Dashboard/Users/Users.svelte<br>src/lib/utils/checkPlanLimits.ts | 1: STG/H_Dashboard/Users/UserDataService.ts | yes |  |
| `tokenId` | 0:  | 1: src/routes/dashboard/+layout.svelte | no | written but never read |
| `url` | 1: STG/NewFlow/Step08_Generate.svelte | 0:  | no | read but never written and no default |
| `user` | 3: STG/H_Dashboard/Billing/Billing.svelte<br>src/lib/ui/organisms/BillingForm.svelte<br>src/lib/ui/organisms/Pricing.svelte | 0:  | yes |  |
| `webhookAuthorName` | 1: SYS/inputs/Secrets/Secrets.svelte | 0:  | no | read but never written and no default |
| `webhookCategoryHint` | 1: SYS/inputs/Secrets/Secrets.svelte | 0:  | no | read but never written and no default |
| `webhookPostStatus` | 1: SYS/inputs/Secrets/Secrets.svelte | 0:  | no | read but never written and no default |
| `webhookTagsHint` | 1: SYS/inputs/Secrets/Secrets.svelte | 0:  | no | read but never written and no default |
| `webhookUrl` | 1: SYS/inputs/Secrets/Secrets.svelte | 0:  | no | read but never written and no default |
| `webhookUsername` | 1: SYS/inputs/Secrets/Secrets.svelte | 0:  | no | read but never written and no default |
| `widgetConfiguratorId` | 2: SYS/widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte<br>SYS/widgets/Subscribe/stages/Confirmation.svelte | 2: SYS/widgets/Subscribe/Subscribe.svelte<br>SYS/widgets/Subscribe/stages/A_InitialParams.svelte | no |  |
| `widgetEmail` | 3: SYS/widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte<br>SYS/widgets/Subscribe/stages/Confirmation.svelte<br>SYS/widgets/Subscribe/stages/Email.svelte | 2: SYS/widgets/Subscribe/stages/B_UserDetails.svelte<br>SYS/widgets/Subscribe/stages/Email.svelte | no |  |
| `widgetLanguage` | 2: SYS/widgets/Subscribe/stages/Confirmation.svelte<br>SYS/widgets/Subscribe/stages/Language.svelte | 2: SYS/widgets/Subscribe/stages/B_UserDetails.svelte<br>SYS/widgets/Subscribe/stages/Language.svelte | no |  |
| `widgetName` | 3: SYS/widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte<br>SYS/widgets/Subscribe/stages/Confirmation.svelte<br>SYS/widgets/Subscribe/stages/Name.svelte | 2: SYS/widgets/Subscribe/stages/B_UserDetails.svelte<br>SYS/widgets/Subscribe/stages/Name.svelte | no |  |
| `widgetPrefilledBio` | 1: SYS/widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte | 1: SYS/widgets/Subscribe/Subscribe.svelte | no |  |
| `widgetPrefilledCountry` | 1: SYS/widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte | 1: SYS/widgets/Subscribe/Subscribe.svelte | no |  |
| `widgetPrefilledEmail` | 1: SYS/widgets/Subscribe/stages/B_UserDetails.svelte | 1: SYS/widgets/Subscribe/Subscribe.svelte | no |  |
| `widgetPrefilledLanguage` | 2: SYS/widgets/Subscribe/stages/B_UserDetails.svelte<br>SYS/widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte | 1: SYS/widgets/Subscribe/Subscribe.svelte | no |  |
| `widgetPrefilledName` | 1: SYS/widgets/Subscribe/stages/B_UserDetails.svelte | 1: SYS/widgets/Subscribe/Subscribe.svelte | no |  |
| `widgetSelectedNewsSourceId` | 2: SYS/widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte<br>SYS/widgets/Subscribe/stages/Confirmation.svelte | 2: SYS/widgets/Subscribe/Subscribe.svelte<br>SYS/widgets/Subscribe/stages/A_InitialParams.svelte | no |  |

### 5.2 Flagged keys

- `url` (`$store.url`, Step08_Generate.svelte:57,96) and `schedule` (`$store.schedule`, E_NewsSource.svelte:29): never written, no default. Probably meant `newsSource` and `config.scheduleTime`.
- `config.lead` (Step03_Redirect.svelte, Step08_Generate.svelte): Config has no `lead`; lead lives on NewsSource or root `lead`. Always undefined.
- `emailMaskSender` (root): EmailMaskSenderToggle.svelte:17 reads `$store.emailMaskSender` but writes `saveToConfig({emailMaskSender})`, i.e. `config.emailMaskSender`. Read and write keys do not match, so the field never shows the saved value (except after getConfiguratorSession spreads config into root).
- `complementaryColor` (root): Users.svelte:72 and Reports.svelte read `$store.complementaryColor`; never written to this store (it lives in `ThemeChanger/theme-store`).
- `personality` (root): read in 6 files, never written to the main store (only default text; the flow writes `stepsStore.personality`). `createNewsSource` always sends this default personality unless the caller passes one.
- `linkSelector` (root): written by Step06/Step07, read by Step07/Step08; not in defaults and not in keysToSave (lost on reload).
- `newsSourceId` (root): only read by dead `postSubscriber.ts`.
- `hasAuthCodeAskFailed`: written by askForNewAuthCode (on SUCCESS), never read. `hasNewEmailCodeBeenSent` is read by AuthForm.
- `tokenId`, `clientId`: written by dashboard layout, never read from the store; read back from localStorage by getAuthHeaders (they are in keysToSave). Keep persisted.
- `picture`, `given_name`: written by dashboard layout and read by MenuHalf/Sidebar, but NOT in keysToSave, so getAuthHeaders' `getMixedStore("picture")` and `("given_name")` always read null from localStorage and send `picture`/`given_name` headers as null (fetch serializes to the string "null"). The `config.logo` fallback reads localStorage key `config`, which is never written (paths are stored under `config.logo`), so it is dead too.
- `lang` (localStorage key read by getAuthHeaders for `x-user-language`): nothing writes it. The header is always null.
- `dashboardLanguage`: written by LanguagePicker (root) and by Step02_Language as `config.dashboardLanguage`; never read via store. Language state is split across `store.appLanguage`, `store.globalLanguage`, `store.dashboardLanguage`, `config.dashboardLanguage`, the `globalLanguage` writable and `lib/stores/language.store.ts`.
- `subscriberLead`: written by routes/subscribe/+page.svelte, never read.
- `subscriberCountry`, `autoCollapse`, `toggles`: in keysToSave and defaults; no store reads or writes found (AutoCollapseToggle receives them as props).
- `user`: read by Billing.svelte, BillingForm.svelte, Pricing.svelte; never written (default object only). `config.phone/address/city/state/zip/country` in keysToSave: no direct reads found besides BillingForm prefill.
- `widget*` keys (`widgetConfiguratorId`, `widgetSelectedNewsSourceId`, `widgetEmail`, `widgetName`, `widgetLanguage`, `widgetPrefilled*`): Subscribe widget scratch state, not in defaults or keysToSave. Consistent read/write; fine but untyped.
- `header`: written by subscribe routes, read by MultiSlotComponent. OK.
- `config.apiKeys`: written by createInitialConfiguratorConfig, never read in the UI.
- `config.vip`: in keysToSave, no store read found.

## 6. Direct fetch() calls outside requests/

UI code calling the backend directly (should move behind the client):

| File:line | Method and URL |
|---|---|
| `STG/NewFlow/Step08_Generate.svelte:50` | POST `${apiURL()}/news-source/generate-newsletter` with getAuthHeaders |
| `STG/H_Dashboard/Newspaper/Newspaper.svelte:61` | GET `${apiURL()}/articles/${configuratorEmail}?page=&size=` (no auth headers) |
| `STG/H_Dashboard/Newspaper/Newspaper.svelte:149` | GET `${apiURL()}/articles/${configuratorEmail}?search=&newsSourceId=` (search not URL-encoded) |
| `STG/H_Dashboard/Newspaper/Newspaper.svelte:231` | GET `${apiURL()}/articles/${configuratorEmail}?page=&size=` |
| `STG/H_Dashboard/Billing/Billing.svelte:111` | POST `${apiURL()}/api/subscribe` |
| `STG/H_Dashboard/Billing/Billing.svelte:148` | POST `${apiURL()}/api/cancel-subscription` |
| `src/lib/ui/organisms/Pricing.svelte:43` | POST `${apiURL()}/api/subscribe` |
| `SYS/inputs/Secrets/Secrets.svelte:119` | POST `${apiURL()}/configurations/${configId}/secret` (no `.ok` check) |
| `SYS/inputs/Secrets/Secrets.svelte:133` | GET `${apiURL()}/apikeys/${configId}` (no `.ok` check) |
| `SYS/inputs/Secrets/Secrets.svelte:141` | POST `${apiURL()}/apikeys/${configId}` |
| `SYS/inputs/Secrets/Secrets.svelte:149` | DELETE `${apiURL()}/apikeys/${configId}/${hash}` |
| `SYS/widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte:87` | POST `${apiURL}${endpoint}` (prop default `/public-subscribe`; duplicates dead REQ/submitPublicSubscription) |
| `SYS/widgets/Subscribe/stages/Confirmation.svelte:19` | POST `/subscribe-widget/subscribe` (SvelteKit route) |
| `SYS/steps/StepsTowardsSubscribe/stages/C_Language.svelte:26` | POST `/subscribe-widget/subscribe` (SvelteKit route) |
| `src/routes/articles/+page.svelte:69,152,271` | GET `${apiURL()}/articles/${holder}?...` (copy of Newspaper.svelte logic) |
| `src/routes/articles/+page.svelte:239` | GET `${apiURL()}/article/${id}` |
| `src/routes/article/+page.svelte:18` | GET `${apiURL()}/article/${id}` |
| `src/routes/confirm-subscription/+page.svelte:30` | GET `${apiURL}/confirm-subscription?configId=&newsSourceId=&userEmail=` (params not encoded) |

Other fetches (not backend UI calls): `src/components/SVG/SVG.svelte:30` (asset), `STG/H_Dashboard/NewsSource/PostExplanation.svelte:94` (inside a displayed code-sample string, not executed), `src/lib/api/auth.ts` (dead, relative `/api/auth/*`), `src/lib/polar.ts:8,23` (Polar sandbox API), server routes `src/routes/oauth/+server.js:13` (Google userinfo) and `src/routes/subscribe-widget/subscribe/+server.ts:35,49,76,98,118`.

## 7. SSR hazards

Static scan of every file importing store.ts plus all files in scope, looking for `window`, `document`, `localStorage`, `sessionStorage`, `navigator` outside function bodies (module top level, top-level `$:` blocks, or template expressions):

- No unguarded module-top-level access was found. Top-level hits are guarded: `store.ts:95` apiURL (`typeof window`), `lib/stores/session.ts:15,26` (`typeof window`), `lib/ui/organisms/Sidebar.svelte:79` (`$:` with `typeof window`), `lib/ui/organisms/BillingForm.svelte:41` (`$: if (browser && ...)`). Template uses of `window` are in event handlers only (C_Language, D_Subscribed, AuthForm, routes/article).
- Unguarded inside functions (safe only while called from the browser): `REQ/logout.ts` (`window.location`, localStorage inside try), `store.ts setStorageFromKeysToSave` (localStorage inside try, ReferenceError swallowed), `SYS/helpers/setStorageFromKeysToSave.ts` (same), `GlobalData/localSessionFallbackFetch.ts` (dead), `GlobalData/ticks.ts` (inside onMount), `lib/api/auth.ts` (dead).
- Real server-side hazard: `src/routes/oauth/+server.js` imports `REQ/getConfiguratorSession.ts` and `REQ/createInitialConfiguratorConfig.ts` on the SERVER. That pulls in store.ts, theme-store, getColorSuggestions, createNewsSource, UserDataService, read-excel-file. `createInitialConfiguratorConfig` calls `saveToStore`, mutating the module-level store that is shared by all server requests (it writes the new user's `config.apiKeys`). `getConfigFetchResponse(authHeaders, origin)` ignores `origin` for the URL and calls `apiURL()` which, with no window and no origin, always returns the production backend, even in local dev. The `cookie` and localStorage writes are skipped server side because they are guarded.
- Module-level subscriptions that never unsubscribe: `lib/config/help.config.ts` (`globalLanguage.subscribe`), `store.ts saveAllKeysToSaveInLocalStorage` (each call adds another subscription), `useConfigurator.ts` (store subscription and interval not cleaned up).
- `emptyStoreSnapshot` is computed at import time (fine on the server, but loses `apiURL`).

## 8. Notes for the typed client rewrite

1. Keep both contracts while migrating: NULL/FALSE/EMPTY returners (`generateSelector`, `getLeadsForConfigurator`, `getPublicConfig`, `getGeoIpLanguage`, `getNewsletterUsersByNewsSource`, `regenerateSelectors`, `updateNewsSource`, `updateConfiguration`, `sendCustomContent`, `subscribeNewsletterUser`, `unsubscribeUserToConfigNewsSource`, `createInitialConfiguratorConfig`) are checked by truthiness; THROWERS (`createNewsSource`, `generatePersonality`, `addNewsletterUser`, `sendEmail`) are read via `e.message`. `processNewsSourceAction` handles both.
2. `triggerNewsSourceSend` is the odd one: caller tests `typeof response === "boolean" && response` and otherwise shows `String(response)` as the error.
3. `askIsAuthCodeValid` is callback-based and returns the callback result; `getConfiguratorSession` returns a boolean nobody reads; `getConfigFetchResponse` returns a raw `Response` and callers call `.ok` and `.json()` on it.
4. Side effects into the store (saveToConfig, saveToStore, refreshSubscribers, config refetch) are part of the observable contract for createNewsSource, generatePersonality, regenerateSelectors, updateNewsSource, updateConfiguration, askIsAuthCodeValid, askForNewAuthCode, createInitialConfiguratorConfig and getConfiguratorSession. Callers rely on `$store.config.newsSources` updating after these calls.
5. `saveToConfig` triggers a GET plus a full PUT of the whole config on every call (including each keystroke in AppPasswordToggle/EmailMaskSenderToggle onChange).
6. Circular imports to break: `store.ts -> updateConfiguration.ts -> store.ts`; `createNewsSource.ts -> UserDataService.ts -> requests -> store.ts`; `getConfiguratorSession.ts <-> createNewsSource.ts` (createNewsSource imports getConfigFetchResponse, getConfiguratorSession imports createNewsSource).
7. Credentials: the auth code travels in a query string (`/auth/:email?code=`) and in dashboard redirect URLs (AuthForm, oauth +server.js), and is persisted in localStorage and in a non-HttpOnly cookie by every saveToStore.

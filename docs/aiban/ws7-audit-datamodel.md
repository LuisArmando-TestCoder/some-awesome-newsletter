# AIBAN backend: Firestore data-model review

Scope: `/home/claude/be` (read-only review). Firestore is accessed only over REST via `helper/fetchWithAuth.ts`. All line numbers refer to the current tree.

Severity tags: **P0** = data loss, cross-tenant exposure or account takeover in production today. **P1** = correctness or cost problem that will bite as soon as usage grows. **P2** = hygiene, or a precondition for new features.

---

## 0. Root causes (read these first)

Most findings below trace back to these five facts.

1. **`fetchWithAuth` does not throw on 404 or 409** (`helper/fetchWithAuth.ts:25-27`). It returns the raw `Response`. At least six callers were written assuming it throws an error that contains "404" or "409", so their "not found" and "already exists" branches never run:
   - `db/newsletter/addNewsletterUser.ts:54-77`: `userExists` is **always `true`**, so the create branch (lines 197-260) never runs. The update branch then PATCHes a new document **without the `email` field** (line 81 strips it) and **without `welcomeEmailSent`**.
   - `db/newsletter/getNewsletterUser.ts:26-31`, `helper/firestore/fetchFirestoreData.ts:14-18`, `API/leads/addLeadCountEndpoint.ts:53-69`, `API/leads/*Getter*.ts`, `engine/emailSender.ts:44`: these 404 branches are dead code.
   - `db/configuration/postConfigDocument.ts:49,74`: a POST to an existing document returns 409, which is **silently treated as success**. The same applies to `db/post.ts:28-31`.
2. **The tenant id is the owner's email.** `configurations/{ownerEmail}` (`postConfigDocument.ts:36-38`). That email also appears in public URLs (`configuratorId=` in subscribe and lead links), in Storage paths (`logos/{email}/…`), in `articles.author`, in `leads/{email}`, in `articleHolders/{encodeURIComponent(email)}` and in every subscriber's `newsSourcesConfigTuples[].configId` and `subscriptions.{email}` key. There is no opaque tenant id, so an owner cannot change their email.
3. **Subscribers are global, one document per email:** `newsletterUsers/{email}`. Every tenant reads and writes the **same document**. Tenant membership lives in the array `newsSourcesConfigTuples` and the map `subscriptions.{configId}.{newsSourceId}`. See §1.3.
4. **All mutable tenant state sits in one document:** `configurations/{email}`. That includes `newsSources[]`, `apiKeys[]`, `webhookGroups[]`, plan and billing fields, and secrets. Every feature does read-modify-write (RMW) on that document with no precondition. `updateConfigDocument.ts:54` builds `updateMask` from **every top-level key**, so in practice it overwrites the whole document.
5. **Authorization is inconsistent.** Several routes are unauthenticated or never check `configId === x-auth-email`, so the data model's only isolation boundary (the document id) is never enforced (§1.4). This is out of strict "data model" scope, but it decides whether tenant isolation exists at all, so it is listed.

---

## 1. Collections and document shapes

The serializer matters for every collection. `helper/firestore/toFirestoreValue.ts` writes **every number as `doubleValue`**, never `integerValue`, and has **no `timestampValue`**. `fromFirestoreValue.ts` drops `timestampValue`, `referenceValue`, `bytesValue` and `geoPointValue` (it returns `undefined`). As a result, every date in the database is a string or a double, TTL policies (which need a Timestamp field) cannot work, and `increment` transforms produce doubles.

| Collection | Doc id | Fields actually written | Writers | Readers |
|---|---|---|---|---|
| `configurations` | owner email (from the `x-auth-email` header); legacy `defaultConfig` is the fallback default in `getConfigDocument.ts:27` and `getFallBackAuth.ts:54` | `Config` in `types.ts:79-117`: `email{host,auth{user,pass},senderName,senderEmail,newsletterSubject,newsletterTitle}`, `senderName`, `newsletterTitle`, `newsletterSubject`, `openAiApiKey`, `emailMaskSender`, `appPassword`, `brandColor`, `logo` (CDN URL, or **raw base64** when it comes through `POST /config`, which does no image processing), `facebookLink`, `instagramLink`, `emailSignature`, `apiKeys[{hash,createdAt}]`, `pricingPlan`, `billingInterval`, `vip`, `tilopaySubscriptionId`, `webhookUrl`, `webhookSharedSecret`, `webhookUsername`, `webhookPassword`, `webhook*Hint`, `webhookGroups[{id,name,url,username,password,…}]`, `newsSources[NewsSource]` (each item has `id`=hash, `url`, `type`, `linkSelector`, `community`, `lead`, `scheduleTime` cron, `personality` long text, `active`, `lastManualSendTimestamp` double, `openAiApiKey?`, `appPassword?`, `emailMaskSender?`, `email?`, `isPublic`, `isPaidNewsletter`, `webhookGroupId`, legacy `subscribersIDs`), sometimes a persisted `configuratorId` | `postConfigDocument.ts`, `updateConfigDocument.ts`, `db/put.ts`, `updateConfigurationEndpoint.ts`, `add/update/deleteNewsSourceEndpoint.ts`, `regenerateSelectorsEndpoint.ts:16-34`, `getPersonalityOutOfContentEndpoint.ts:87-105`, `apiKeyEndpoint.ts`, `storeWebhookEndpoint.ts`, `generateSecretEndpoint.ts`, `triggerNewsSource.ts:56`, `sendCustomContentEndpoint.ts:90`, `billingRouter.ts:72` (a no-op, see P0-3) | almost everything; the scheduler polls it every 60 s for each news source |
| `newsletterUsers` | subscriber email (global) | `name`, `bio`, `language`, `newsSourcesConfigTuples[{configId,newsSourceId}]`, `subscriptions{configId:{newsSourceId:{accepted,rejectionSent,pricingPlan?,billingInterval?,tilopaySubscriptionId?}}}`, `welcomeEmailSent?`; `email` **only on legacy documents** (see root cause 1) | `addNewsletterUser.ts` (public subscribe, API-key add, bulk import, owner self-subscribe on news-source create), `subscribe…ts`, `unsubscribe…ts`, `updateNewsletterUser.ts`, `confirmSubscriptionEndpoint.ts:43-53`, `newsletterBillingRouter.ts:92-98`, `sendRejectionNotifications.ts:61-71` (dead code) | `getUsersGroupedByLanguageFromSubscribers.ts` (send path), `getNewsletterUsersByNewsSource.ts`, search, billing |
| `authCodes` | email | `code` (a 6-digit OTP, **or the Google `sub` used as a permanent password**), sometimes `tokenId`, `clientId` (`postConfigDocument.ts:56`) | `sendCodeToEmail.ts:83-100`, `verifyUserCode.ts:48`, `postConfigDocument.ts:56` (not awaited; 409 is swallowed, so it never updates) | `isAuthenticated.ts:28-43`, which runs on **every authenticated request** (one read per API call) |
| `system` | `secret` | `email{…}`, `openAiApiKey`, `appPassword`, `emailMaskSender`, `the_pass` (master password, `multiAuth.ts:39-40`) | manual | `getSystemConfig.ts`, `multiAuth.ts` |
| `leads` | owner email | nested map `{newsSourceId:{subscriberEmail:{isoTimestamp:leadUrl}}}`; grows by one leaf per click and is never pruned | `addLeadCountEndpoint.ts` (unauthenticated `GET /lead-counter`) | `allLeadCountersFromOneConfiguratorIdEndpoint.ts`, `specificUserLeadsGetterEndpoint.ts` |
| `articles` | `generateHash(renderedHtml)` | `content` (full rendered HTML, which **contains the owner's tracking links**), `creation` (`toLocaleDateString("en-US")`, not sortable), `author` (owner email), `language`, `newsSourceId` | `emailSender.ts:13-24` when `newsSource.isPublic ?? true` | `articlesEndpoints.ts:135-173` (public), `GET /article/:id` |
| `articleHolders` | `encodeURIComponent(ownerEmail)` (the stored id is literally `a%40b.com`) | `{newsSourceId: [articleId, …]}`, unbounded arrays | `emailSender.ts:26-54` (RMW through `put`, which masks every key) | nothing found; this is a write-only index |
| Storage `logos/{configId}/{ts}_{hash}.{ext}` | n/a | public-read objects (`helper/imageProcessor.ts:145,217`) | `updateConfigurationEndpoint.ts:84` | public |
| Typesense | n/a | **None.** `helper/typesense-client.ts` is never imported, so no collection is written or read. `db/projectId.ts:5-7` still **reads `typesensecloudserviceaccount.json` at boot**, so a missing file crashes every Firestore import. | none | none |

Implicit "collections" that live only in memory: the rate limiter (`helper/rateLimiter.ts:55`), the article caches in `articlesEndpoints.ts`, the cron queue, and the circuit breaker. They are per-process, so with more than one instance the limits and caches split, and they reset on every deploy.

### 1.1 Who writes `configurations` (lost-update surface)

Twelve code paths do GET → mutate in memory → PATCH `newsSources` or the whole document, with no `currentDocument.updateTime` precondition. See §3.

### 1.2 Document-size and index-entry ceilings

- `configurations/{email}`: up to 50 news sources × (`personality` text + selectors + credentials), plus `apiKeys[]` (bcrypt hashes, never pruned), plus `webhookGroups[]`, plus a **base64 logo when created via `POST /config`**. `express.json` allows 100 MB (`main.ts:58`). The 1 MiB limit is reachable, and a single large logo hits it.
- `leads/{email}`: one map leaf per click, and every leaf is indexed (ascending and descending). Firestore allows **40,000 index entries per document**, so writes start failing at about 20k clicks per owner. That happens well before 1 MiB.
- `articleHolders/{email}`: one id of roughly 70 bytes per article. A Master plan (50 sources, daily sends) reaches 1 MiB in under a year.
- `newsletterUsers/{email}`: bounded by the number of tenants per subscriber, so this one is fine.

### 1.3 Tenant-isolation consequences of global `newsletterUsers/{email}`

- **Profile fields are shared and last-writer-wins across tenants.** `name`, `bio` and `language` are global. When tenant B (through its API key, the public form or bulk import) adds an existing subscriber, `addNewsletterUser.ts:114` spreads B's payload over the document, so the subscriber's language changes in tenant A's newsletter too.
- **Cross-tenant mass assignment.** `addNewsletterUser.ts:81,114` takes `req.body` wholesale (`addNewsletterUserEndpoint.ts:57`). A tenant can send `subscriptions: {...}` and, when the tuple already exists (line 171), that map replaces the **whole** `subscriptions` field. This can flip `accepted` and plan fields for **other tenants'** subscriptions. `updateSubscriberInfoEndpoint.ts:23-30` strips only `newsSourcesConfigTuples`, so a subscriber can set `subscriptions.*.accepted=true` or `pricingPlan` on paid newsletters themselves.
- **Data leakage.** `GET /config-subscribers/:configId` (`getAllSubscribersFromConfigEndpoint.ts:78-86`) and `/newsletter/users/:configId/:nsId` return the full document. That exposes the subscriber's **other** newsletters (`subscriptions` keys are other owners' emails), their Tilopay subscription ids, and their bio as written for other tenants.
- **Search reads across tenants.** `getNewsletterUsersByName.ts:10-19` runs a global `name == X` query over all tenants (unbounded) and then filters in memory.
- **Deletes are global.** `DELETE /delete-user/:email` removes the subscriber from every tenant at once. No per-tenant "remove" exists except the tuple removal in `unsubscribeUserToConfigNewsSource.ts`. That function leaves `subscriptions[configId]` in place, so the record of a subscription the person cancelled is kept.
- **No per-tenant pagination, counting or sorting.** The only access path is `array-contains {configId,newsSourceId}`. A tenant-wide view needs one query per news source (N queries), and orphaned tuples from deleted news sources (`deleteNewsSourceEndpoint.ts` never cleans them) can never be found again without a full scan.
- **Write contention.** A popular subscriber's document is a hot spot across tenants (the limit is about 1 sustained write per second per document).
- **GDPR controller boundary.** Each tenant is a separate data controller for its readers. A shared document means tenant A's erasure request handling, consent records and retention rules cannot be applied without affecting tenant B.

**Recommendation:** move tenant-owned subscriber data to `configurations/{configId}/subscribers/{emailKey}` (where `emailKey = sha256(lowercased email)`, with the email stored as a field). Fields: `email`, `name`, `language`, `newsSourceIds[]`, `status` (pending|active|unsubscribed|bounced), `consent{method,at,ip,formUrl}`, `confirmedAt`, `unsubscribedAt`, `paid{newsSourceId:{plan,interval,tilopaySubscriptionId}}`, `source` (form|api|import|owner), `createdAt`, `updatedAt`. Keep a thin global `people/{emailKey}` (email, auth, `tenants[]` for self-service) only for the "manage my subscriptions" page. Migrate by fanning out each `newsletterUsers` document into one subscriber document per tuple.

### 1.4 Isolation is not enforced at the boundary (P0, listed for completeness)

| Route | Problem | Location |
|---|---|---|
| `GET /config` | **No auth.** Any caller who sets the `x-auth-email` header gets that owner's config (it strips only `openAiApiKey`, `email.auth` and `email.host`, so `appPassword`, `webhookPassword`, `webhookGroups[].password`, `webhookSharedSecret` and `apiKeys` hashes leak), and a config is auto-created for an arbitrary email | `API/configuration/getConfigurationEndpoint.ts:11-28` |
| `GET /all-configurations` | **No auth.** Returns every tenant, including `appPassword`, `webhook*` secrets, `apiKeys` and `tilopaySubscriptionId`. Crashes when `config.email` is undefined | `getAllConfigurationsEndpoint.ts:6-32` |
| `GET /configuration-news-sources` | Optional auth. Leaks `newsSources[].appPassword` and `emailMaskSender` | `getAllConfigurationNewsSourcesEndpoint.ts:10,22-24` |
| `PUT /config` | Mass assignment: the body can set `pricingPlan`, `vip`, `apiKeys` or `tilopaySubscriptionId`, so an owner can upgrade their own plan for free | `updateConfigurationEndpoint.ts:114-165` |
| `multiAuthMiddleware` | (a) With an email and code it **never checks `configId`**, so any user who can log in can act on any tenant: add subscribers, list subscribers, set the webhook URL, rotate the webhook secret. (b) The `pass` path trusts the `x-auth-email` header. (c) The API-key path does not set `req.userEmail` | `db/auth/multiAuth.ts:37-63`; callers `addNewsletterUserEndpoint.ts:13`, `getNewsletterUsersByNewsSourceEndpoint.ts:11`, `getSegmentedSubscribersEndpoint.ts:14`, `storeWebhookEndpoint.ts:11`, `generateSecretEndpoint.ts:13` |
| Bulk import | `authMiddleware` only; no `configId === authEmail` check | `getAnyUserDataBaseFileToStandardFormatEndpoint.ts:13-17` |
| `GET /auth/:email?token_id&client_id` | **Account takeover.** The Google token is verified against an **attacker-chosen `client_id`**, and `payload.email` is never compared to `:email`. The attacker's `sub` is then written as the victim's auth code | `API/auth/verifyUserCode.ts:31-50`, `helper/verifyGoogleIdToken.ts:10-13` |
| OTP | Never expires. There is no attempt counter or rate limit on verify, so the 6-digit code can be brute-forced. The code is logged (`sendCodeToEmail.ts:105`) and all headers are logged (`main.ts:48-51`), which includes `x-auth-code`. A Google `sub` is mailed in plain text (`sendCodeToEmail.ts:64-66`). | `isAuthenticated.ts:36-43` |
| `/confirm-subscription`, `/unsubscribe/:email` | No signed token, so anyone can confirm or unsubscribe anyone, which defeats double opt-in | `confirmSubscriptionEndpoint.ts:11-53`, `unsubscribeEndpoint.ts:9-24` |
| `/lead-counter` | Unauthenticated write into any tenant's leads document, plus an open redirect | `addLeadCountEndpoint.ts:32-114` |
| `/cancel-subscription`, `/api/newsletter-cancel-subscription` | Trust a header or body email, with no auth | `billingRouter.ts:167-170`, `newsletterBillingRouter.ts:212-215` |
| Billing webhooks | Unsigned. `returnData` is plain base64 JSON, not a signature (contrary to the comment at `billingRouter.ts:225`). There is no idempotency | `billingRouter.ts:212-280`, `newsletterBillingRouter.ts:264-315` |

---

## 2. Read patterns

| # | Pattern | Location | Impact | Fix |
|---|---|---|---|---|
| R1 | List `configurations` without paging. `nextPageToken` is ignored, and `offset` is applied **in memory after** `pageSize=limit`, so `limit=10&offset=10` returns nothing | `db/configuration/getAllConfigurationsDocuments.ts:18-50` | Cron scheduling at boot (`main.ts:29`) silently drops tenants past page 1. The leads auth checks treat a missing config as allowed | Loop on `nextPageToken`; use `pageSize` plus `pageToken` instead of offset; add `mask.fieldPaths` to fetch only what the caller needs |
| R2 | Full scan of **all configs per request** to authorize leads | `allLeadCountersFromOneConfiguratorIdEndpoint.ts:27`, `specificUserLeadsGetterEndpoint.ts:36` | O(tenants) reads per call. Combined with R1 it is also an auth bypass (lines 31-41 / 40-50 only deny when the config is found) | Compare `configuratorId === req.userEmail`; no read needed |
| R3 | Each scheduled news source reads its config every 60 s | `engine/scheduleAllNewsSources.ts:163-189` | sources × 1,440 reads/day (100 sources is 144k/day, about 3× the Spark free quota). This is the likely cause of the 429s the circuit breaker exists for | Poll once per config, or keep a `scheduleIndex/{configId}` doc with `updatedAt` and compare it via `mask.fieldPaths=updatedAt`; or move schedules to `automations` (§6) and drive them from one collection-group query |
| R4 | N+1: one `runQuery` per news source, run sequentially | `getAllSubscribersFromConfigEndpoint.ts:78-80`, `getSegmentedSubscribersEndpoint.ts:52-59` | 50 sequential queries | Use the per-tenant `subscribers` subcollection with one paginated query; in the meantime, `Promise.all` with a concurrency cap |
| R5 | Silent truncation at `limit=1000` with no cursor returned to the caller | `getNewsletterUsersByNewsSource.ts:11,36`; endpoints listed in R4 | A dashboard with more than 1,000 subscribers shows 1,000 | Return `{items,nextCursor}` (startAfter `__name__`, which is already implemented at lines 40-46) |
| R6 | Plan-limit check reads **up to 1,000 full documents** on every subscribe, including the **unauthenticated** public form | `addNewsletterUserEndpoint.ts:26-30`, `publicSubscriptionEndpoint.ts:60-64` | Read amplification and a quota DoS vector. The count is per news source, not per tenant, as the plan intends | `runAggregationQuery` with `count()` (1 read per 1,000 index entries), or `usage/current.subscriberCount` (§6) |
| R7 | Unbounded `runQuery` on the send path | `getUsersGroupedByLanguageFromSubscribers.ts:51-62` | Loads every subscriber of a source into memory in one response | Page through with `limit` 500 and a `startAt` cursor, and stream to the sender |
| R8 | `db/query.ts` has no `limit`; used for `name ==` and `email ==` searches | `db/query.ts:10-21`, `getNewsletterUsersByName.ts:10`, `getNewsletterUserByEmail.ts:10` | Global unbounded queries; exact match only | Search by email = `GET newsletterUsers/{email}` (or the subscriber doc by key); search by name needs a prefix field (`nameLower`, `>=`/`<` range) or Typesense |
| R9 | Queries on the `email` **field**, which new documents do not have (root cause 1) | `getNewsletterUserByEmail.ts:10-13`, `getNewsletterUsersBatch.ts:41-48` (imported, unused) | Search by email misses every subscriber created after the 404 change | Use the doc id: `GET` / `db/batchGet.ts` (exists, unused) |
| R10 | `articles` query paginates with **`offset` and no `orderBy`** | `articlesEndpoints.ts:150-156` | Unstable order; skipped documents are still billed; `mayHaveMore` is a guess | `orderBy createdAt desc, __name__ desc` plus a `startAt` cursor; needs composite indexes (author ASC, createdAt DESC) and (author ASC, newsSourceId ASC, createdAt DESC) after adding a `createdAt` timestamp |
| R11 | Full scan of `newsletterUsers` | `scripts/getAllUsers.ts` → `engine/sendRejectionNotifications.ts:13` (no caller found, so dead code) | Delete it, or rewrite over a `status == "pending"` index | |
| R12 | One `authCodes` read on **every** authenticated request | `isAuthenticated.ts:28-30` | Read cost scales with traffic | Issue a signed session (JWT or HMAC cookie) after OTP verification; keep `authCodes` for OTP only, with `expiresAt` and `attempts` |
| R13 | Repeated config reads within one request (the config is fetched 2-4×) | `addNewsletterUser.ts:28,143,217`, `addNewsSourceEndpoint.ts:174` | Extra reads | Pass the config object down |

**Indexes.** Every current query is single-equality or `array-contains` with `__name__` ordering, which built-in single-field indexes cover, so no `firestore.indexes.json` exists or is needed today. The following **single-field index exemptions** are recommended to cut write cost and stay under the 40k entries limit: `articles.content`, `configurations.newsSources` (array of large maps), `configurations.apiKeys`, `configurations.logo`, `leads.*` (or delete the collection), `newsletterUsers.bio`. The composite indexes needed for the proposed collections are listed in §6.

---

## 3. Write patterns

### 3.1 Read-modify-write without a precondition (lost updates)

None of these use `currentDocument.updateTime=<readTime>` or a transaction.

| Location | What is clobbered |
|---|---|
| `db/configuration/updateConfigDocument.ts:54` (mask = every key) and `db/put.ts:35` (same mechanism) | Every caller effectively rewrites the whole config |
| `API/newsSource/triggerNewsSource.ts:42-56` | Writes back a config read **before** a scrape, LLM and send run that takes minutes. Every owner edit made during the run is reverted (the code comment at line 46 acknowledges this) |
| `API/newsletter/sendCustomContentEndpoint.ts:87-90` | Whole config written to save one timestamp. The timestamp is persisted before the send, and the "undo on failure" TODO at line 105 is not done |
| `API/newsSource/addNewsSourceEndpoint.ts:141-145,273` | `newsSources.push` plus a full `put`. Two concurrent adds lose one. The plan limit check (line 239) is also racy |
| `updateNewsSourceEndpoint.ts:118-147`, `deleteNewsSourceEndpoint.ts:57-85`, `regenerateSelectorsEndpoint.ts:16-34`, `getPersonalityOutOfContentEndpoint.ts:87-105` | Whole `newsSources` array. A cron-triggered timestamp write and a user edit race |
| `apiKeyEndpoint.ts:46-51,77-88` | Whole config written to push or pop one API key; a concurrent delete can resurrect a revoked key |
| `storeWebhookEndpoint.ts:24-34`, `generateSecretEndpoint.ts:20-33` | Whole config |
| `updateConfigurationEndpoint.ts:111-180` | Deep merge in memory, then a full write |
| `db/newsletter/addNewsletterUser.ts:93-195` | Whole `subscriptions` and `newsSourcesConfigTuples`; concurrent subscribes from two tenants lose one |
| `subscribe…ts:46-60`, `unsubscribe…ts:44-76`, `confirmSubscriptionEndpoint.ts:24-53`, `newsletterBillingRouter.ts:60-98` | Whole `subscriptions` map or tuple array per subscriber. A confirm click racing a billing webhook loses either `accepted` or `tilopaySubscriptionId` |
| `addLeadCountEndpoint.ts:72-107` | **Whole-document PATCH with no `updateMask`** (line 101). Concurrent clicks drop leads. The precondition branch never runs (root cause 1) |
| `engine/emailSender.ts:28-36` | `articleHolders` RMW; concurrent sends from two sources lose ids |

**Pattern to adopt** (a shared helper, e.g. `db/commit.ts`):

```
POST https://firestore.googleapis.com/v1/projects/{p}/databases/(default)/documents:commit
{
  "writes": [{
    "update": { "name": "projects/{p}/databases/(default)/documents/configurations/{id}",
                "fields": { "newsSources": {...} } },
    "updateMask": { "fieldPaths": ["newsSources"] },
    "currentDocument": { "updateTime": "<updateTime from the GET>" }
  }]
}
```

- If the precondition fails, the response is `FAILED_PRECONDITION` (400, which fetchWithAuth throws). Retry the GET-mutate-commit cycle with a cap of 3.
- For arrays, prefer `fieldTransforms` with `appendMissingElements` or `removeAllFromArray` (`apiKeys`, `newsSourcesConfigTuples`, `articleHolders`). For counters use `increment` with `integerValue`.
- For nested maps, PATCH a **field path** instead of the whole map, e.g. ``updateMask.fieldPaths=subscriptions.`owner@x.com`.`nsId`.accepted``. Field paths that contain `@`, `.` or `-` need backticks (the escaping logic exists in `scripts/migrateArraysToSubcollections.ts:13-14`; promote it to a helper). `helper/computeUpdateMask.ts:9` already wraps keys in backticks, but **URL-encodes the key inside the backticks**. That is harmless for plain keys but wrong for keys that contain `%`.

### 3.2 Multi-document updates that should be atomic (`:commit`)

| Flow | Documents touched today, non-atomically |
|---|---|
| Add news source | `configurations` (×2: `put` at line 273, then `updateConfigDocument` at line 145), then `newsletterUsers/{owner}` (line 162), then trigger send |
| Delete news source | `configurations` only. Subscriber tuples, `subscriptions[cfg][ns]`, `leads[ns]` and `articleHolders[ns]` are orphaned (`deleteNewsSourceEndpoint.ts:67-85`) |
| Delete subscriber | `newsletterUsers/{email}` only. `authCodes/{email}` and every `leads/*.*.{email}` remain (`deleteNewsletterUser.ts:24-27`) |
| Billing plan change | `configurations` (silently fails, see P0-3); no event record |
| Save article | `articles/{hash}` and `articleHolders/{email}` |
| Create owner | `configurations/{email}`, then a fire-and-forget `authCodes/{email}` (`postConfigDocument.ts:55-59`, not awaited) |

Use `:commit` (up to 500 writes, all-or-nothing) for anything that must stay consistent. Use `:batchWrite` (non-atomic, per-write status) for fan-out cleanups such as removing tuples from N subscribers, and record progress in a job document so the cleanup can resume.

### 3.3 Other write defects

- **P0-3**: `billingRouter.ts:60-72` upgrades or downgrades a plan via `postConfigDocument`, which POSTs `?documentId=` against an **existing** document. Firestore returns 409, `fetchWithAuth` returns it without throwing, and the code logs `[DB Success]`. **Paid upgrades and cancellations are never persisted.** If the call ever succeeded (for example after a manual delete), `postConfigDocument.ts:27-29` would **wipe `newsSources`**.
- `db/post.ts:28-31` treats 409 as success. That is correct for content-hash articles but wrong for `authCodes` (the Google `sub` never updates).
- `scripts/migrateArraysToSubcollections.ts:124-126` runs on **import** (a top-level IIFE). It hard-codes the project id (line 7) and PATCHes element documents with no mask. Guard it with `import.meta.main`.
- `saveArticle` (`emailSender.ts:13-24`): `creation` is a locale string. Add `createdAt` as `timestampValue`.

---

## 4. Firestore ↔ Typesense consistency

**Current state:** Typesense is not used. `helper/typesense-client.ts` is never imported, no collection schema exists, and no add, update or delete path indexes anything. Subscriber "search" is the Firestore exact-match queries in R8 and R9. The only side effect is that `db/projectId.ts:5-7` requires the Typesense credentials file at boot, and `deno.json:15` lists an npm `typesense@^1.7.2` while the client file imports `esm.sh/typesense@2.1.0`.

Subscriber write paths that **would** need to sync if Typesense is introduced. All of them currently mutate Firestore only:

| Path | File |
|---|---|
| create or merge | `db/newsletter/addNewsletterUser.ts` (public form, API, bulk import, owner self-add) |
| profile update | `db/newsletter/updateNewsletterUser.ts` |
| subscribe / unsubscribe tuple | `subscribeNewsletterUserToConfigNewsSource.ts`, `unsubscribeUserToConfigNewsSource.ts` |
| confirm | `confirmSubscriptionEndpoint.ts:43-53` |
| paid status | `newsletterBillingRouter.ts:46-105` |
| delete | `deleteNewsletterUser.ts` |
| news source deleted (tuple orphaning) | `deleteNewsSourceEndpoint.ts` |

**Recommended design if subscriber search ships on Typesense:**

- Typesense collection `subscribers`. The document id is `${configIdKey}:${emailKey}`, with one document **per tenant membership** (never per global user, or every search leaks across tenants). Fields: `configId` (facet, mandatory filter), `email`, `name`, `language` (facet), `status` (facet), `newsSourceIds` (string[] facet), `createdAt` (int64, sort), `updatedAt`.
- Give the browser only **scoped search keys** (`generateScopedSearchKey` with an embedded `filter_by: configId:=<id>`, expiring in about 1 h). Never expose the admin key.
- **Outbox pattern.** In the same `:commit` as each Firestore subscriber write, add `configurations/{configId}/searchOutbox/{autoId}` with `{op: upsert|delete, docId, payload, createdAt}`. A worker drains it with Typesense `import?action=upsert`, which is idempotent, and deletes the outbox doc on success. Updates are applied when `updatedAt` is newer than the indexed value.
- A nightly reconciler pages Firestore by `__name__` (pageSize 300) and compares `updatedAt` with Typesense `export?filter_by=configId:=X`.
- GDPR delete must delete from Typesense synchronously, using `delete?filter_by=email:=X` across tenants for subscriber erasure.

---

## 5. GDPR export and erasure

### 5.1 Data map

**(a) Owner (`configuratorId` = owner email)**

| Store | Location | Export | Delete |
|---|---|---|---|
| Firestore | `configurations/{email}`, the whole document | yes; redact `apiKeys[].hash`, mask `appPassword`, `openAiApiKey`, `webhookPassword`, `webhookGroups[].password`, `webhookSharedSecret` as `"set"` | delete the document. **Cancel the Tilopay subscription first** (`tilopaySubscriptionId`) |
| Firestore | `authCodes/{email}` | metadata only (not the code) | delete |
| Firestore | `leads/{email}` (contains readers' emails; the owner is controller) | yes | delete |
| Firestore | `articles` where `author == email` (`runQuery`, paginate) | yes | `:batchWrite` delete in pages of 500 |
| Firestore | `articleHolders/{encodeURIComponent(email)}` (the stored id is `x%40y.com`) | yes | delete |
| Firestore | `newsletterUsers/{email}` (the owner subscribes to their own sources, `addNewsSourceEndpoint.ts:162`) | yes, via the subscriber flow | via the subscriber flow |
| Firestore | Every `newsletterUsers/*` with a tuple `configId == email`. Today that can only be found by `array-contains` per known news-source id. Orphaned tuples need a **full collection scan** until a `configIds[]` field (or the subcollection model) exists | export as the owner's audience (CSV: email, name, language, status, consent) | `:batchWrite`: `removeAllFromArray` on matching tuples, plus delete field path `subscriptions.\`email\``. If the subscriber has no tuples left, delete the doc and their `authCodes` |
| Firestore (proposed) | `configurations/{email}/{automations,automationRuns,activity,usage,meta,subscribers,searchOutbox}` | yes | recursive delete (the REST API has no recursive delete, so list each subcollection and `:batchWrite`) |
| Firestore (proposed) | `idempotencyKeys` where `configId == email`, `billingWebhookEvents` where `configId == email` | billing: keep as an accounting record under a lawful-basis exception, but pseudonymise the email | delete idempotency keys; pseudonymise billing |
| Cloud Storage | `logos/{email}/*` | list URLs | delete objects |
| Typesense | none today; proposed `subscribers` with `filter_by=configId:=X` | n/a | `DELETE /collections/subscribers/documents?filter_by=configId:=X` |
| Logs | `main.ts:48-51` logs all headers, and many `log()` lines contain emails | note in policy | set log retention, and stop logging headers and codes |
| Third parties | Tilopay customer record; WordPress posts created on the owner's site; OpenAI requests | list | cancel the subscription; WordPress content is out of scope |

**(b) Subscriber email**

| Store | Location | Export | Delete |
|---|---|---|---|
| Firestore | `newsletterUsers/{email}` | yes, but **group the `subscriptions` keys by tenant** and show owners' display names, not owners' emails | delete. Cancel every `subscriptions[*][*].tilopaySubscriptionId` first |
| Firestore | `authCodes/{email}` | metadata | delete |
| Firestore | `leads/{ownerEmail}.{nsId}.{email}` across **all** owners. There is no index on map keys, so this needs a full scan of `leads` | yes | for each leads document, PATCH with `updateMask.fieldPaths=\`nsId\`.\`email\`` and an empty body, which deletes that key |
| Firestore | `configurations/{email}` if they are also an owner | run the owner flow | run the owner flow |
| Firestore | `articles.content` HTML is per-article, not per-subscriber (tracking links are added per recipient at send time and are not stored), so there is nothing to do | | |
| Firestore (proposed) | `configurations/*/subscribers/{emailKey}`: a collection-group query on `emailKey ==` | yes | delete each |
| Firestore (proposed) | `activity` events whose `subject.id == emailKey` (collection group) | yes | delete, or redact `summary` |
| Typesense (proposed) | `filter_by=email:=X` | yes | delete by filter |

### 5.2 Proposed API (new `db/gdpr/*`)

```ts
// db/gdpr/types.ts
export interface GdprContext {
  requestId: string;          // also the idempotency key; stored at gdprRequests/{requestId}
  actor: { kind: "owner" | "subscriber" | "admin"; email: string };
  dryRun?: boolean;           // count only, no writes
  pageSize?: number;          // default 300 for list/runQuery, 500 for batchWrite
  onProgress?: (p: GdprProgress) => void; // stream to the socket logger / dashboard
}
export interface GdprProgress { step: string; done: number; total?: number }
export interface GdprManifestEntry { store: "firestore" | "storage" | "typesense" | "tilopay";
  path: string; count: number; action: "exported" | "deleted" | "pseudonymised" | "skipped"; note?: string }

// db/gdpr/exportOwner.ts
export default function exportOwner(
  configId: string,
  ctx: GdprContext,
): Promise<{
  manifest: GdprManifestEntry[];
  account: Omit<Config, "apiKeys"> & { apiKeys: { createdAt: string }[] }; // secrets masked
  newsSources: NewsSource[];
  audience: AsyncIterable<{ email: string; name?: string; language?: string;
                            newsSourceIds: string[]; status: string; consentAt?: string }>;
  articles: AsyncIterable<{ id: string; newsSourceId: string; language: string; createdAt?: string }>;
  leads: Record<string, Record<string, Record<string, string>>>;
  storageObjects: string[];
}>;

// db/gdpr/deleteOwner.ts
export default function deleteOwner(
  configId: string,
  ctx: GdprContext & {
    cancelBilling: (subscriptionId: string) => Promise<void>; // Tilopay deleteCoupon
    retainBillingRecords?: boolean;                           // default true, pseudonymised
  },
): Promise<{ manifest: GdprManifestEntry[]; orphanedSubscribersDeleted: number }>;

// db/gdpr/exportSubscriber.ts
export default function exportSubscriber(
  email: string,
  ctx: GdprContext,
): Promise<{
  manifest: GdprManifestEntry[];
  profile: { email: string; name?: string; bio?: string; language?: string };
  memberships: { tenantDisplayName: string; configId: string; newsSourceId: string;
                 accepted: boolean; plan?: string; billingInterval?: string }[];
  leads: { configId: string; newsSourceId: string; at: string; url: string }[];
}>;

// db/gdpr/deleteSubscriber.ts
export default function deleteSubscriber(
  email: string,
  ctx: GdprContext & {
    scope?: { configId: string };           // tenant-scoped erasure (owner removing a reader)
    cancelBilling: (subscriptionId: string) => Promise<void>;
  },
): Promise<{ manifest: GdprManifestEntry[] }>;
```

Implementation notes:

- Persist `gdprRequests/{requestId}` with `{status, step, cursor, manifest, createdAt, completedAt}` so a crash can resume. Erasure crosses hundreds of documents and cannot be one transaction.
- For an owner, read `newsSources` once, then for each source run `array-contains` with a `startAt` cursor over `__name__` and apply `:batchWrite` per page. Fall back to a full `newsletterUsers` scan for orphans until `configIds[]` exists.
- Remove map keys that contain `@` and `.` with a backtick-quoted field path in `updateMask` and omit the key from `fields`. That is the REST way to delete a field.
- Route both functions through new authenticated endpoints. The owner endpoint requires `configId === req.userEmail`. The subscriber endpoint requires an OTP for that email. The current `DELETE /delete-user/:email` should call `deleteSubscriber`.

---

## 6. Proposed new collections

### 6.0 URL helpers (extend `helper/firestore/firestoreUrlGetters.ts`)

`constructFirestoreUrl` inserts `collection` raw and encodes only `documentId`, so a subcollection path can be passed as the collection. Add these helpers so callers stop hand-building URLs (four files duplicate the `:runQuery` URL today):

```ts
const ROOT = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;
const NAME_ROOT = `projects/${projectId}/databases/(default)/documents`;

export const tenantPath = (configId: string, sub: string) =>
  `configurations/${encodeURIComponent(configId)}/${sub}`;            // pass as `collection`
export const docName = (path: string, id: string) => `${NAME_ROOT}/${path}/${encodeURIComponent(id)}`;
export const getFirestoreListUrl = (path: string, o: { pageSize?: number; pageToken?: string;
  orderBy?: string; mask?: string[] } = {}) => { /* ?pageSize=&pageToken=&orderBy=createdAt%20desc&mask.fieldPaths=… */ };
export const getFirestoreRunQueryUrl = (parentPath?: string) =>      // subcollection or collection group
  parentPath ? `${ROOT}/${parentPath}:runQuery` : `${ROOT}:runQuery`;
export const getFirestoreRunAggregationUrl = (parentPath?: string) =>
  parentPath ? `${ROOT}/${parentPath}:runAggregationQuery` : `${ROOT}:runAggregationQuery`;
export const getFirestoreCommitUrl = () => `${ROOT}:commit`;
export const getFirestoreBatchWriteUrl = () => `${ROOT}:batchWrite`;
export const getFirestoreBeginTxUrl = () => `${ROOT}:beginTransaction`;
```

The serializer needs three changes first:
1. Integers become `integerValue` (strings, per the REST spec).
2. `Date` becomes `timestampValue` (RFC 3339).
3. `fromFirestoreValue` must handle `timestampValue` (to an ISO string), `referenceValue` and `bytesValue`.

Without these, TTL and `increment` do not work.

**Pagination.**
- *List* (simple, tenant-scoped): `GET {ROOT}/configurations/{cid}/activity?pageSize=25&orderBy=createdAt%20desc&pageToken=<token>`. The response carries `nextPageToken`. `orderBy` on list needs the matching single-field index, which is automatic.
- *runQuery* (filters plus order): there is no `pageToken`. Use cursors:
  ```json
  { "structuredQuery": {
      "from": [{ "collectionId": "automationRuns" }],
      "where": { "fieldFilter": { "field": {"fieldPath":"automationId"}, "op":"EQUAL", "value":{"stringValue":"A1"} } },
      "orderBy": [{ "field": {"fieldPath":"startedAt"}, "direction":"DESCENDING" },
                  { "field": {"fieldPath":"__name__"},  "direction":"DESCENDING" }],
      "startAt": { "values": [{"timestampValue":"<last.startedAt>"},
                              {"referenceValue":"projects/…/automationRuns/<last.id>"}], "before": false },
      "limit": 25 } }
  ```
  POST it to `{ROOT}/configurations/{cid}:runQuery`. Return the opaque cursor `base64(lastStartedAt|lastId)` to the client.
- *Collection group* (scheduler or admin): POST `{ROOT}:runQuery` with `"from":[{"collectionId":"automations","allDescendants":true}]`.

### 6.1 Placement decision

Use **subcollections under `configurations/{configId}`** for everything tenant-owned (automations, runs, activity, onboarding, usage, subscribers):
- the document path is the isolation boundary, so it is impossible to forget a `where configId ==`;
- per-tenant list pagination is trivial;
- GDPR delete has one prefix to walk;
- small, frequently written documents stay out of the 1 MiB config document.

The cost is that deleting the parent does not delete children, so the GDPR code must walk them, and cross-tenant jobs need collection-group indexes.

Use **top-level collections** for cross-tenant infrastructure keyed by something other than tenant: `idempotencyKeys` and `billingWebhookEvents`. A single TTL policy per collection group is simpler there, and webhooks arrive before the tenant is known.

### 6.2 Schemas

| Collection | Doc id | Fields | Writes | Indexes / TTL |
|---|---|---|---|---|
| `configurations/{cid}/automations/{automationId}` | ULID (sortable, no hot-spotting compared with a timestamp prefix) | `name`, `enabled` bool, `trigger{type: "schedule"\|"subscriber.created"\|"subscriber.confirmed"\|"article.published"\|"lead.clicked", cron?, timezone?, newsSourceId?}`, `conditions[{field,op,value}]`, `actions[{type:"sendNewsletter"\|"sendEmail"\|"webhook"\|"tag"\|"wait", params}]`, `nextRunAt` ts, `lastRunAt` ts, `lastRunStatus`, `runCount` int, `failureCount` int, `version` int, `createdAt`, `updatedAt`, `createdBy` | create: `:commit` with `currentDocument.exists=false`, plus an `activity` event, plus `usage/current.automationCount` increment. Update: PATCH with `updateMask` and `currentDocument.updateTime` | CG composite `(enabled ASC, nextRunAt ASC)` for the scheduler; tenant list `orderBy createdAt desc` |
| `configurations/{cid}/automationRuns/{runId}` | ULID. A **sibling of** `automations`, not nested, so "all runs for this tenant" is one query | `automationId`, `status: queued\|running\|succeeded\|failed\|skipped`, `trigger` snapshot, `idempotencyKey` (`${automationId}:${scheduledFor}`), `scheduledFor` ts, `startedAt`, `finishedAt`, `durationMs` int, `attempt` int, `stats{recipients,sent,failed,skipped}` ints, `error{code,message}`, `expiresAt` ts | create with `exists=false` using id `sha256(idempotencyKey)` so a double cron fire in multi-instance deployments is impossible; status transitions with an `updateTime` precondition | composite `(automationId ASC, startedAt DESC)`, `(status ASC, startedAt DESC)`; **TTL on `expiresAt`** (90 days) |
| `configurations/{cid}/activity/{eventId}` | ULID | `type` (enum: `subscriber.added`, `subscriber.confirmed`, `subscriber.unsubscribed`, `subscriber.imported`, `newsSource.created/updated/deleted`, `newsletter.sent/failed`, `automation.ran`, `apiKey.created/revoked`, `billing.planChanged`, `settings.updated`), `actor{kind: owner\|apiKey\|subscriber\|system, id}`, `subject{kind,id}` (use `emailKey`, not the raw email), `summary` (≤140 chars, plain copy), `meta` map (small), `createdAt`, `expiresAt` | Written **in the same `:commit`** as the business write. Never RMW | list `orderBy createdAt desc pageSize 25`; composite `(type ASC, createdAt DESC)` for filters; TTL 180 days |
| `configurations/{cid}/meta/onboarding` | fixed `onboarding` | `version` int, `steps{createAccount,addNewsSource,brandEmail,addFirstSubscriber,sendFirstIssue,connectWordPress,choosePlan,createApiKey}` each `{done:bool, at:ts, auto:bool}`, `dismissedAt?`, `completedAt?`, `updatedAt` | PATCH **field paths only**, e.g. `updateMask.fieldPaths=steps.addNewsSource`. No read needed and no race. Set `auto:true` server-side from the same commit as the triggering action | none |
| `idempotencyKeys/{keyId}` | `sha256(configId + ":" + method + ":" + route + ":" + Idempotency-Key header)` | `configId`, `route`, `requestHash` (sha256 of body), `status: in_progress\|completed`, `responseStatus` int, `responseBody` (≤ 16 KB string), `lockedUntil` ts, `createdAt`, `expiresAt` ts | 1) create with `currentDocument.exists=false`. 2) A 409 or `ALREADY_EXISTS` means GET it: if `completed`, replay the response; if `in_progress` and `lockedUntil` is in the future, return 409; if `requestHash` differs, return 422. 3) On finish, PATCH status and response with an `updateTime` precondition | **TTL on `expiresAt`** (24 h); single-field `configId` |
| `billingWebhookEvents/{eventId}` | `${provider}_${orderId}_${eventType}` (Tilopay sends `order`; the event type comes from the route) | `provider`, `eventType` (success\|cancel\|rejected\|reactivate), `orderId`, `configId?`, `subscriberEmailKey?`, `newsSourceId?`, `planId`, `interval`, `payloadHash`, `signatureValid` bool, `receivedAt`, `processedAt?`, `status: received\|applied\|ignored\|failed`, `error?`, `expiresAt` | **One `:commit` transaction:** `exists=false` create of the event, plus the plan PATCH on the config (or subscriber) with an `updateTime` precondition, plus an `activity` event. A replayed webhook hits ALREADY_EXISTS, so return 200 | composite `(configId ASC, receivedAt DESC)` for the billing history UI; TTL about 400 days, or none if accounting needs it |
| `configurations/{cid}/usage/{period}` | `YYYY-MM`, plus a fixed `current` | period: `emailsSent`, `emailsFailed`, `issuesSent`, `articlesGenerated`, `llmTokensIn`, `llmTokensOut`, `apiCalls`, `leadsClicked`, `subscribersAdded`, `subscribersRemoved` (all `integerValue`), `updatedAt`. `current`: `subscriberCount`, `newsSourceCount`, `automationCount`, `planId`, `limits{…}` snapshot | `fieldTransforms: [{fieldPath:"emailsSent", increment:{integerValue:"N"}}]` via `:commit`. **Aggregate per send chunk**, never per email, to stay under about 1 write/s per document. If a tenant ever exceeds that, shard as `usage/{period}/shards/{0..9}` and sum on read | list `orderBy __name__ desc pageSize 12` for the chart |
| `configurations/{cid}/leadEvents/{autoId}` (replaces `leads`) | auto id | `newsSourceId`, `subscriberKey` (emailKey), `url`, `createdAt`, `expiresAt` | append-only create, plus `usage` increment in the same commit | composite `(newsSourceId ASC, createdAt DESC)`; TTL 13 months |
| `configurations/{cid}/subscribers/{emailKey}` (see §1.3) | `sha256(lowercased email)` | see §1.3 | via `:commit` with `searchOutbox` and `activity` | composites `(newsSourceIds ARRAY_CONTAINS, status ASC, createdAt DESC)`, `(status ASC, createdAt DESC)`; CG single-field `emailKey` for GDPR |

TTL needs a policy created once per collection group, e.g. `gcloud firestore fields ttls update expiresAt --collection-group=idempotencyKeys --enable-ttl`, and the field must be a **Timestamp**. Deletion happens within about 24 h, not immediately. Readers must still check `expiresAt > now`.

---

## 7. Prioritized fix list

### P0: fix before onboarding more tenants

1. `API/auth/verifyUserCode.ts:31-50`: require `userInfo.email_verified && userInfo.email === email`, and pin the audience to the server's own Google client id (env), not `req.query.client_id`.
2. `API/configuration/getConfigurationEndpoint.ts:11-28`: add `authMiddleware(true)`; stop auto-creating configs on GET.
3. `API/configuration/getAllConfigurationsEndpoint.ts:6-32` and `getAllConfigurationNewsSourcesEndpoint.ts:22-24`: require admin auth, or replace with an explicit **allow-list** projection (`newsletterTitle`, `senderName`, `logo`, `brandColor`, public source fields). Never use a deny-list.
4. `db/auth/multiAuth.ts:49-63`: after email/code auth, enforce `req.params.configId === email`. For the API key path, set `req.userEmail = configId`. Remove the `pass` master-password path (lines 37-46), or at least stop trusting the header email there.
5. `API/configuration/updateConfigurationEndpoint.ts:114-165`, `API/newsletter/updateSubscriberInfoEndpoint.ts:23-30` and `db/newsletter/addNewsletterUser.ts:81,114`: allow-list writable fields. Reject `pricingPlan`, `vip`, `billingInterval`, `tilopaySubscriptionId`, `apiKeys`, `webhookSharedSecret`, `subscriptions` and `newsSourcesConfigTuples`.
6. `API/billing/billingRouter.ts:60-72`: replace `postConfigDocument` with a masked PATCH of `pricingPlan`, `billingInterval`, `vip` and `tilopaySubscriptionId`, inside the `billingWebhookEvents` transaction from §6.2. Add webhook authenticity (HMAC the `returnData` with a server secret, or verify the order against the Tilopay API) at `billingRouter.ts:212-280` and `newsletterBillingRouter.ts:264-315`. Require auth on `billingRouter.ts:167` and `newsletterBillingRouter.ts:212`.
7. `helper/fetchWithAuth.ts:25-27`: return `{ok,status}` consistently, or throw a typed `FirestoreNotFound` / `FirestoreConflict`. Then fix `db/newsletter/addNewsletterUser.ts:54-77` (use `response.status === 404`) and backfill the missing `email` and `welcomeEmailSent` fields on `newsletterUsers` documents created by the update branch.
8. `API/newsletter/confirmSubscriptionEndpoint.ts:11-53` and `API/newsletter/unsubscribeEndpoint.ts:9-24`: require an HMAC token over `(email, configId, newsSourceId, action, exp)`. Update the link builders at `engine/generateEmailContent.ts:57,63` and `addNewsletterUser.ts:147,226`.
9. `API/newsletter/getAllSubscribersFromConfigEndpoint.ts:78-80`, `getNewsletterUsersByNewsSource.ts:73-80`: project to `{email,name,language,status:subscriptions[configId][ns]}` only. Never return other tenants' `subscriptions` keys.
10. OTP: add `expiresAt` (10 min) and `attempts` to `authCodes` (`sendCodeToEmail.ts:86`), a rate limit on `GET /auth/:email` (`verifyUserCode.ts:20`), and stop logging codes (`sendCodeToEmail.ts:67,105`) and headers (`main.ts:48-51`).
11. `getAnyUserDataBaseFileToStandardFormatEndpoint.ts:15`: add the `configId === x-auth-email` check.

### P1: correctness and cost

12. `engine/scheduleAllNewsSources.ts:163-189`: one poll per config (or none, via a schedule index) instead of per source. This is the biggest read-quota saving.
13. `API/newsSource/triggerNewsSource.ts:42-56` and `sendCustomContentEndpoint.ts:87-90`: replace the whole-config write with a field-path update of `lastManualSendTimestamp` on the single source. Arrays cannot be patched per element, so move `newsSources` to `configurations/{cid}/newsSources/{nsId}` (P1-20), or re-read and write with an `updateTime` precondition.
14. `db/configuration/updateConfigDocument.ts:54` and `db/put.ts:35`: accept an explicit `fieldPaths` argument plus `expectedUpdateTime`, and fail when they are missing. Migrate the 12 callers in §3.1.
15. `API/leads/addLeadCountEndpoint.ts:72-107`: replace with an append-only `leadEvents` create plus a `usage` increment. Freeze `leads` and migrate it. Validate `leadUrl` against the news source's `lead` to close the open redirect.
16. `API/leads/allLeadCountersFromOneConfiguratorIdEndpoint.ts:27-41` and `specificUserLeadsGetterEndpoint.ts:36-50`: drop `getAllConfigurationsDocuments()` and authorize with `configuratorId === req.userEmail`.
17. `db/configuration/getAllConfigurationsDocuments.ts:18-50`: follow `nextPageToken`, remove the in-memory offset, add `mask.fieldPaths`. Callers: `main.ts:29`, `scripts/run_cron.ts:164`.
18. `addNewsletterUserEndpoint.ts:26-30` and `publicSubscriptionEndpoint.ts:60-64`: replace with a `runAggregationQuery` count across **all** sources of the tenant, or `usage/current.subscriberCount`. Add a per-IP rate limit to `/public-subscribe`.
19. `getNewsletterUsersByNewsSource.ts:11` and `getUsersGroupedByLanguageFromSubscribers.ts:51-62`: cursor pagination (return `nextCursor`), and stream batches to `sendEmails`.
20. Split `configurations.newsSources[]` into `configurations/{cid}/newsSources/{nsId}` (`scripts/migrateArraysToSubcollections.ts` is a starting point, but it must not run on import, lines 124-126). This removes the array RMW in `add/update/delete/regenerate/personality` endpoints and the 1 MiB risk.
21. Introduce `configurations/{cid}/subscribers/{emailKey}` (§1.3), dual-write from `addNewsletterUser.ts`, then cut readers over. Add a `configIds[]` field to `newsletterUsers` in the meantime (written alongside tuples) so per-tenant scans and GDPR are possible.
22. `engine/emailSender.ts:26-54`: delete `articleHolders` (nothing reads it), or use `appendMissingElements`. Add `createdAt` as a timestamp to `articles` (line 17) and switch `articlesEndpoints.ts:150-156` to `orderBy createdAt desc` plus a cursor, with the composite indexes from R10.
23. `API/newsSource/deleteNewsSourceEndpoint.ts:67-85`: in the same job, remove tuples, `subscriptions[cfg][ns]` and `leads[ns]` via `:batchWrite`.
24. `db/newsletter/deleteNewsletterUser.ts:24-27`: route it through `deleteSubscriber` (§5.2) so `authCodes`, leads and Tilopay are covered.
25. `db/newsletter/getNewsletterUserByEmail.ts:10-13`: use `GET newsletterUsers/{email}` (with a tenant membership check). Fix `getNewsletterUsersByName.ts:10` to use a `nameLower` prefix range plus a tenant filter, or Typesense with scoped keys (§4).
26. `db/configuration/postConfigDocument.ts:27-29,55-59`: drop the forced `newsSources = []` on the billing path, `await` the `authCodes` write, and use `currentDocument.exists=false` explicitly.

### P2: hygiene and enablers

27. `helper/firestore/toFirestoreValue.ts:21` and `fromFirestoreValue.ts:8-16`: add `integerValue`, `timestampValue` and `Date` support (needed for TTL and increments).
28. `helper/computeUpdateMask.ts:9`: escape backticks and backslashes inside quoted paths instead of URL-encoding inside the backticks; URL-encode the whole `fieldPaths` value instead.
29. `db/projectId.ts:5-7`: make the Typesense credentials optional. Pick one Typesense package (`deno.json:15` vs `helper/typesense-client.ts:2`), or delete the client until it is used.
30. Remove dead code: `scripts/getAllUsers.ts`, `engine/sendRejectionNotifications.ts`, `db/newsletter/getNewsletterUsersBatch.ts`, the import of it in `getAllSubscribersFromConfigEndpoint.ts:8`, and `API/auth/legacyAuthProxy.ts` (it references an undefined `name` at line 34).
31. Add `firestore.indexes.json` with the exemptions from §2 and the composites from §6.2; commit it next to the code.
32. Consolidate the four hand-built `:runQuery` URLs (`getNewsletterUsersBatch.ts:36`, `getNewsletterUsersByNewsSource.ts:20`, `getUsersGroupedByLanguageFromSubscribers.ts:46`, `query.ts`) on the helpers in §6.0.
33. Plan an opaque `tenantId` (ULID) with `configurations/{tenantId}` and an `ownerEmail` field, plus an `owners/{emailKey} → tenantId` lookup. This removes owner emails from public URLs (`configuratorId=` in subscribe and lead links), Storage paths and other tenants' subscriber documents, and makes changing the email possible.

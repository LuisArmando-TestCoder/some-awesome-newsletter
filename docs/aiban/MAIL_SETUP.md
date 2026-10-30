# Mail setup: daily limits and DNS records (SPF, DKIM, DMARC)

Owner: WS8. For Luis. Decided 2026-10-30: no Google Cloud OAuth ("send from my own Gmail" is dropped; sign-in stays the emailed code). Every owner's newsletter goes out from the AIBAN address under the owner's name. A paid sending service comes later.

## 1. What the engine does (already in the code)
Every mailbox has a rolling 24 hour limit: 450 for a free Gmail address, 1,800 for any other domain (Google Workspace or another mail server). 5% stays reserved for welcome emails and owner notices. When an issue would go over the limit, the readers not reached yet get the same issue, with the same subject, as soon as the limit frees up (within 24 hours). Readers who unsubscribe meanwhile are skipped, and the owner gets one email that day. Change the limits with `MAIL_SYSTEM_DAILY_LIMIT` (the AIBAN address), `MAIL_GMAIL_DAILY_LIMIT` or `MAIL_WORKSPACE_DAILY_LIMIT`. `GET /v1/mail/status` shows an owner how many of today's sends are used.

## 2. Which domain gets the records
Only the domain in the AIBAN sending address (the part after @ in the address stored in Firestore `system/secret`, for example `info@aiban.news` means `aiban.news`). The records below assume that mailbox is Google Workspace (the code sends through smtp.gmail.com). If that address is a free `@gmail.com` account, no DNS records are possible; a Workspace mailbox on your own domain fixes that. If the mailbox is GoDaddy email (Microsoft 365), use the Microsoft values in 3.4.

Your other domain (the one that only hosts the website and never sends mail) gets the "no mail" records in 3.5, so nobody can send spoofed mail from it.

## 3. Records (Google Workspace mailbox)
GoDaddy: My Products, Domain, DNS (Manage DNS), Add New Record. The "Name" field takes the short host (`@`, `_dmarc`, `google._domainkey`); GoDaddy adds the domain itself.
Squarespace: Domains, your domain, DNS (DNS Settings), Custom records, Add record. The "Host" field takes the same short host; Squarespace adds the domain itself.
TTL: 1 hour on GoDaddy, the default on Squarespace.

### 3.1 SPF
| Type | Name / Host | Value |
|---|---|---|
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` |
A domain can have only one SPF record. If a TXT record starting with `v=spf1` already exists (GoDaddy often adds `include:secureserver.net`), edit it and add `include:_spf.google.com` before `~all` instead of adding a second record.

### 3.2 DKIM
The value is a public key that Google generates for your domain; nobody else can give it to you.
1. admin.google.com, Apps, Google Workspace, Gmail, Authenticate email. Pick the domain, Generate new record, key length 2048, prefix `google`.
2. Add the record Google shows:
| Type | Name / Host | Value |
|---|---|---|
| TXT | `google._domainkey` | `v=DKIM1; k=rsa; p=MIIBIjANBgkq...` (the full text Google shows, pasted as one line) |
3. Wait 1 to 48 hours, then click Start authentication in the same Google screen. It turns to "Authenticating email with DKIM".
GoDaddy accepts the 2048-bit value in one field. If Squarespace rejects the length, generate a 1024-bit key in Google instead.

### 3.3 DMARC
Add it after SPF and DKIM pass.
| Type | Name / Host | Value |
|---|---|---|
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:YOUR-INBOX; pct=100` |
Replace `YOUR-INBOX` with an address you read on the same domain (for example `dmarc@aiban.news`). Reports sent to an address on another domain, such as a gmail.com address, are often not delivered. After two to four weeks with no unexpected senders in the reports, change `p=none` to `p=quarantine`.

### 3.4 If the AIBAN mailbox is GoDaddy email (Microsoft 365) instead
- SPF: `v=spf1 include:secureserver.net -all` (GoDaddy usually creates it already).
- DKIM: two CNAME records from Microsoft Defender (security.microsoft.com, Email authentication settings, DKIM, your domain): `selector1._domainkey` and `selector2._domainkey`, each pointing to the value Microsoft shows (`selector1-yourdomain-com._domainkey.<tenant>.onmicrosoft.com`). Then turn DKIM on there.
- DMARC: same as 3.3.
- In that case the SMTP host for the AIBAN address must be Microsoft's (`smtp.office365.com`, port 587), not Gmail's.

### 3.5 The domain that never sends mail
| Type | Name / Host | Value |
|---|---|---|
| TXT | `@` | `v=spf1 -all` |
| TXT | `_dmarc` | `v=DMARC1; p=reject;` |
Skip this if that domain has any mailbox at all (even forwarding through GoDaddy or Squarespace email).

### 3.6 Check
Send an issue to a Gmail inbox, open it, More, Show original. SPF, DKIM and DMARC should all say PASS. Gmail and Yahoo require all three plus one-click unsubscribe from bulk senders; the engine adds `List-Unsubscribe`, and `MAIL_ONE_CLICK_UNSUBSCRIBE=1` adds the one-click header once WS7 accepts POST on the unsubscribe link.

## 4. Render environment
Add `OPENROUTER_API_KEY` (and optionally `LLM_OPENROUTER_MODEL=~deepseek/deepseek-flash-latest`). `MAIL_TOKEN_KEY`, `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET` are no longer needed.

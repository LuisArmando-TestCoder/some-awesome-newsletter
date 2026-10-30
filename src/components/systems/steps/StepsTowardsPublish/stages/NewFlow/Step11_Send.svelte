<script lang="ts">
  // Onboarding slot 4: send the first real issue. The owner was subscribed when the
  // source was created. People typed in here are invited, never subscribed directly.
  import store from "../../../../../store";
  import { refreshSubscribers } from "../H_Dashboard/Users/UserDataService";
  import OnboardingShell from "./OnboardingShell.svelte";
  import { ob, fmt } from "$lib/tutorial/copy";
  import { onboarding, updateOnboarding, trackOnboardingEvent } from "$lib/tutorial/onboardingState";
  import { nextStep } from "./nav";
  import { parseEmailList } from "./infer";
  import { inviteContacts, sendHtml, triggerSend } from "./onboardingApi";

  export let canReveal = false;
  const INDEX = 4;

  let others = "";
  let sending = false;
  let error = "";
  let warning = "";
  let info = "";
  let sentCount = 0;

  $: owner = $store.configuratorEmail || "";
  $: alreadySent = !!$onboarding.firstSendAt;

  async function send() {
    error = "";
    warning = "";
    info = "";
    const id = $onboarding.newsSourceId;
    const { valid, invalid } = parseEmailList(others);
    if (invalid.length) {
      error = fmt($ob.send.errors.invalidEmails, { list: invalid.join(", ") });
      return;
    }
    sending = true;
    try {
      const toInvite = valid.filter((e) => e.toLowerCase() !== owner.toLowerCase());
      const added: string[] = [];
      if (toInvite.length) {
        const result = await inviteContacts(id, toInvite, $onboarding.language || "en");
        if (result.status === "unavailable") {
          warning = $ob.send.invitesUnavailable;
        } else {
          added.push(...result.invited);
          if (result.invited.length) info = fmt($ob.send.invited, { count: result.invited.length });
          if (result.failed.length) warning = fmt($ob.send.errors.add, { list: result.failed.join(", ") });
        }
      }

      try {
        await triggerSend(id);
      } catch (e) {
        // The trigger can refuse (rate limit, no new article). The preview is still a real
        // issue, so deliver it to the owner, who is subscriber number one.
        console.warn("[onboarding/send] trigger failed, sending preview to owner", e);
        if (!$onboarding.previewHtml) throw e;
        await sendHtml($onboarding.previewHtml, $onboarding.previewSubject || $ob.preview.defaultSubject, $store.config ?? {}, [owner]);
      }
      sentCount = 1;
      // "first_issue_delivered" (STRATEGY.md activation) needs a confirmed non-owner subscriber and
      // delivery data from the backend, so the client records only that the first send happened.
      trackOnboardingEvent("first_issue_sent");
      // Only the date is kept locally. Invited addresses are never stored in the browser.
      updateOnboarding({ firstSendAt: new Date().toISOString() });
      others = "";
      refreshSubscribers().catch(() => {});
    } catch (e) {
      console.error("[onboarding/send]", e);
      error = $ob.send.errors.send;
    } finally {
      sending = false;
    }
  }
</script>

<OnboardingShell
  {canReveal}
  index={INDEX}
  title={alreadySent ? $ob.send.sentTitle : $ob.send.title}
  why={alreadySent ? fmt($ob.send.sentBody, { count: Math.max(sentCount, 1) }) : $ob.send.why}
  skipNote={alreadySent ? "" : $ob.send.skipNote}
  primaryLabel={alreadySent ? $ob.send.continue : $ob.send.sendNow}
  onPrimary={alreadySent ? nextStep : send}
  loading={sending}
  loadingLabel={$ob.send.sending}
  optional={!alreadySent}
  onSkip={nextStep}
>
  {#if !alreadySent}
    <p class="ob-success">{fmt($ob.send.youAreSubscribed, { email: owner })}</p>
    <div class="ob-field">
      <label class="ob-label" for="ob-send-others">{$ob.send.othersLabel}</label>
      <textarea
        id="ob-send-others"
        class="ob-textarea"
        rows="3"
        placeholder={$ob.send.othersPlaceholder}
        bind:value={others}
        aria-describedby="ob-send-others-hint"
      ></textarea>
      <p class="ob-hint" id="ob-send-others-hint">{$ob.send.othersHint}</p>
    </div>
  {:else}
    <div class="sent" role="status">
      <span class="sent__mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 12.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
      <p>{fmt($ob.send.youAreSubscribed, { email: owner })}</p>
    </div>
  {/if}
  {#if info}<p class="ob-success" role="status">{info}</p>{/if}
  {#if warning}<p class="ob-hint" role="status">{warning}</p>{/if}
  {#if error}<p class="ob-error shake" role="alert">{error}</p>{/if}
</OnboardingShell>

<style lang="scss">
  .sent {
    display: flex;
    gap: var(--space-4);
    align-items: center;
    padding: var(--space-5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);

    p {
      margin: 0;
      color: var(--text-2);
      overflow-wrap: anywhere;
    }
  }
  .sent__mark {
    flex: none;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border: 1.5px solid currentColor;
    border-radius: var(--radius-full);
    color: var(--success);
  }
</style>

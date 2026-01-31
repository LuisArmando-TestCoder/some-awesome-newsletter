<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { writable, get } from "svelte/store";
  import store from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import IconButton from "../../../../../../buttons/IconButton/IconButton.svelte";
  import { t } from "$lib/i18n/dashboard-translations";
  import Link from "../../../../../../inputs/Link/Link.svelte";
  import ColorPicker from "../../../../../../inputs/ColorPicker/ColorPicker.svelte";

  export let canReveal = true;

  const { draftConfig, updateDraft } = getContext('config-draft') as any;

  const brandColor = writable("#ff0000");
  const facebookLink = writable("");
  const instagramLink = writable("");
  const signatureBody = writable("");

  let editor: HTMLDivElement;
  let quill: any;

  onMount(async () => {
    brandColor.set(localStorage.getItem("brandColor") || "#000000");
    facebookLink.set(localStorage.getItem("facebookLink") || "");
    instagramLink.set(localStorage.getItem("instagramLink") || "");
    signatureBody.set(localStorage.getItem("signatureBody") || "");

    brandColor.subscribe(value => {
      if (typeof window !== 'undefined') localStorage.setItem("brandColor", value)
    });
    facebookLink.subscribe(value => {
      if (typeof window !== 'undefined') localStorage.setItem("facebookLink", value)
    });
    instagramLink.subscribe(value => {
      if (typeof window !== 'undefined') localStorage.setItem("instagramLink", value)
    });
    signatureBody.subscribe(value => {
      if (typeof window !== 'undefined') localStorage.setItem("signatureBody", value)
    });

    const { default: Quill } = await import("quill");

    quill = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["link", "image", "video"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
      },
    });

    // Initialize content from local storage (body only)
    const currentBody = get(signatureBody);
    if (currentBody) {
      quill.root.innerHTML = currentBody;
    }

    quill.on("text-change", (delta: any, oldDelta: any, source: string) => {
      if (source === 'user') {
        signatureBody.set(quill.root.innerHTML);
      }
    });
  });

  function generateSignature() {
    const { logo, senderName, newsletterTitle } = $draftConfig;
    const email = $store.configuratorEmail;
    const bodyContent = get(signatureBody);

    const signature = `
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;background:#101010;font-family:Arial,Helvetica,sans-serif">
  <tbody><tr>
    <td align="left" style="padding:18px 20px">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse">
        <tbody><tr>
          <td width="4" style="background:${$brandColor || '#00c2a8'};font-size:0;line-height:0">&nbsp;</td>
          <td width="16" style="font-size:0;line-height:0">&nbsp;</td>
          ${logo ? `
          <td width="150" align="left" valign="middle" style="vertical-align:middle;padding:0">
            <img src="${logo}" width="135" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;height:auto;line-height:0" class="CToWUd" data-bit="iit">
          </td>
          <td width="18" style="font-size:0;line-height:0">&nbsp;</td>
          ` : ''}
          <td width="420" align="left" valign="middle" style="vertical-align:middle;color:#ffffff">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse">
              <tbody><tr>
                <td style="padding:0 0 4px 0;font-size:19px;line-height:22px;font-weight:700;color:#ffffff;letter-spacing:.2px">
                  ${senderName || 'Your Name'}
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0 0 0;border-top:1px solid rgba(255,255,255,.35);font-size:12px;line-height:16px;color:${$brandColor || '#00c2a8'};text-transform:uppercase;letter-spacing:.6px">
                  ${newsletterTitle || 'Your Title'}
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0 0 0;font-size:13px;line-height:18px;color:#ffffff">
                  <a href="mailto:${email}" style="color:#ffffff;text-decoration:none" target="_blank">${email}</a>
                </td>
              </tr>
              ${bodyContent ? `
              <tr>
                <td style="padding:8px 0 0 0;color:#ffffff;font-size:14px;line-height:1.5;">
                  ${bodyContent}
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding:10px 0 0 0">
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse">
                    <tbody><tr>
                      ${$instagramLink ? `
                      <td style="padding-right:8px">
                        <a href="${$instagramLink}" style="text-decoration:none" target="_blank">
                          <img src="https://ci3.googleusercontent.com/meips/ADKq_Naf6pOFzWBNh7N0__Kg83P2_zvKPIISjluqS8yzGoi1jaHDPCUe5AftiTOCw42cEY90Y1GtU1EsaG6s3WN4k5fM8dICvOzORgRYdEgYcqxVebv8ivPC6avM86Q2PgCS0oQ=s0-d-e1-ft#https://img.mysignature.io/s/4/9/f/49fdaa84-063e-5e12-a-908-0f24275d855e.png" width="26" alt="Instagram" style="display:block;border:0;outline:none;text-decoration:none;height:auto;line-height:0;border-radius:50%;padding:2px;border:1px solid rgba(255,255,255,.45)" class="CToWUd" data-bit="iit">
                        </a>
                      </td>
                      ` : ''}
                      ${$facebookLink ? `
                      <td>
                        <a href="${$facebookLink}" style="text-decoration:none" target="_blank">
                          <img src="https://ci3.googleusercontent.com/meips/ADKq_NZmgN-sD8y6DY6YquwLvTz3YhdfnbGSenv5i0XIimOXFZKp91XfSSQkDRrZdj744ObrX-9lJxdC9PBM_bRADH5KGFVqqAmZMwi2mNWcHUcDvY3P9W8-aWhEoZslF8sONsc=s0-d-e1-ft#https://img.mysignature.io/s/4/6/5/465cf7da-d98b-55ac-af99-9a8c726ed574.png" width="26" alt="Facebook" style="display:block;border:0;outline:none;text-decoration:none;height:auto;line-height:0;border-radius:50%;padding:2px;border:1px solid rgba(255,255,255,.45)" class="CToWUd" data-bit="iit">
                        </a>
                      </td>
                      ` : ''}
                    </tr>
                  </tbody></table>
                </td>
              </tr>
            </tbody></table>
          </td>
        </tr>
      </tbody></table>
    </td>
  </tr>
</tbody></table>
`;
    if ($draftConfig.emailSignature !== signature) {
      updateDraft({ emailSignature: signature });
    }
  }
</script>

<div>
  <MarkdownText {canReveal}>{$t['markdown.emailSignature']}</MarkdownText>
  <div class="signature-container">
    <div class="editor-wrapper">
      <div bind:this={editor} />
    </div>
    <Link
      placeholder={$t['placeholders.facebookProfile']}
      bind:value={$facebookLink}
    />
    <Link
      placeholder={$t['placeholders.instagramProfile']}
      bind:value={$instagramLink}
    />
    <ColorPicker
      bind:selectedColor={$brandColor}
    />
    <IconButton
      src="./icons/refresh.svg"
      disabled={false}
      loading={false}
      label={$t['labels.generateSignature']}
      callback={generateSignature}
    />
    <div class="signature-preview">
      {@html $draftConfig.emailSignature ? $draftConfig.emailSignature : $t['labels.noEmailSignatureSet']}
    </div>
  </div>
</div>

<style>
  @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

  .editor-wrapper {
    height: 300px;
    margin-bottom: 1rem;
  }

  .signature-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-top: 1rem;
  }
  .signature-preview {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
  }
</style>

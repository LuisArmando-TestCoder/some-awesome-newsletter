<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import store, { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import TextArea from "../../../../../../inputs/TextArea/TextArea.svelte";
  import IconButton from "../../../../../../buttons/IconButton/IconButton.svelte";
  import Link from "../../../../../../inputs/Link/Link.svelte";
  import ColorPicker from "../../../../../../inputs/ColorPicker/ColorPicker.svelte";

  export let canReveal = true;

  const brandColor = writable("#000000");
  const facebookLink = writable("");
  const instagramLink = writable("");

  onMount(() => {
    brandColor.set(localStorage.getItem("brandColor") || "#000000");
    facebookLink.set(localStorage.getItem("facebookLink") || "");
    instagramLink.set(localStorage.getItem("instagramLink") || "");

    brandColor.subscribe(value => localStorage.setItem("brandColor", value));
    facebookLink.subscribe(value => localStorage.setItem("facebookLink", value));
    instagramLink.subscribe(value => localStorage.setItem("instagramLink", value));
  });

  function generateSignature() {
    const { logo, senderName, newsletterTitle } = $store.config;
    const email = $store.configuratorEmail;
    const phoneNumber = "+506 7108 6045"; // Placeholder

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
                  <a href="tel:${phoneNumber}" style="color:#ffffff;text-decoration:none" target="_blank">${phoneNumber}</a>
                  &nbsp;&nbsp;•&nbsp;&nbsp;
                  <a href="mailto:${email}" style="color:#ffffff;text-decoration:none" target="_blank">${email}</a>
                </td>
              </tr>
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
    if ($store.config.emailSignature !== signature)
    saveToConfig({ emailSignature: signature });
  }
</script>

<div>
  <TextArea
    placeholder="Change your email signature HTML here"
    bind:value={$store.config.emailSignature}
  />
  <MarkdownText {canReveal}>--Email signatures instil brand trust--</MarkdownText>
  <div class="signature-container">
    <Link
      placeholder="Facebook Profile"
      bind:value={$facebookLink}
    />
    <Link
      placeholder="Instagram Profile"
      bind:value={$instagramLink}
    />
    <ColorPicker
      bind:selectedColor={$brandColor}
    />
    <IconButton
      src="./icons/refresh.svg"
      disabled={false}
      loading={false}
      label="Generate Signature"
      callback={generateSignature}
    />
    <div class="signature-preview">
      {@html $store.config.emailSignature ? $store.config.emailSignature : "No email signature set"}
    </div>
  </div>
</div>

<style>
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

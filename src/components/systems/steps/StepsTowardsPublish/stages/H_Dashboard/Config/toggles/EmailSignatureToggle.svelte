<script lang="ts">
  import store, { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import TextArea from "../../../../../../inputs/TextArea/TextArea.svelte";
  import IconButton from "../../../../../../buttons/IconButton/IconButton.svelte";

  export let canReveal = true;

  function generateSignature() {
    const { logo, senderName, newsletterTitle } = $store.config;
    const email = $store.configuratorEmail;
    console.log("$store.config", JSON.stringify($store.config.logo))
    const logoHtml = logo
      ? `
    <td valign="bottom" style="height: 80px;">
      <img src="${logo}" alt="Logo" height="80" style="border-radius: 50%;">
    </td>
    <td width="20"></td>
    `
      : "";

    const senderNameHtml = senderName
      ? `<p style="margin: 0; font-size: 14px; font-weight: bold; color: #222;">${senderName}</p>`
      : "";

    const newsletterTitleHtml = newsletterTitle
      ? `<p style="margin: 4px 0; font-size: 12px; color: #555;">${newsletterTitle}</p>`
      : "";

    const emailHtml = email
      ? `<p style="margin: 4px 0 0; font-size: 11px;"><a href="mailto:${email}" style="color: #777; text-decoration: none;">${email}</a></p>`
      : "";

    const signature = `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 12px; color: #333; height: 80px;">
  <tr>
    ${logo ? logoHtml : ''}
    <td valign="bottom" style="font-family: Arial, sans-serif; font-size: 12px; color: #555; height: 80px;">
      ${senderNameHtml}
      ${newsletterTitleHtml}
      ${emailHtml}
    </td>
  </tr>
</table>
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
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  .signature-preview {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
  }
</style>

<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { writable, get } from "svelte/store";
  import store from "../../../../../../../store";
  import { t } from "$lib/i18n/dashboard-translations";
  import Image from "../../../../../../inputs/Image/Image.svelte";
  import Link from "../../../../../../inputs/Link/Link.svelte";
  import ColorPicker from "../../../../../../inputs/ColorPicker/ColorPicker.svelte";
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";

  export let canReveal = true;

  const { draftConfig, updateDraft } = getContext('config-draft') as any;

  // Local state for fields not directly in config root or that need special handling
  const brandColor = writable("#ff0000");
  const facebookLink = writable("");
  const instagramLink = writable("");
  const signatureBody = writable("");

  let editor: HTMLDivElement;
  let quill: any;

  onMount(async () => {
    // Initialize from localStorage
    brandColor.set(localStorage.getItem("brandColor") || "#000000");
    facebookLink.set(localStorage.getItem("facebookLink") || "");
    instagramLink.set(localStorage.getItem("instagramLink") || "");
    signatureBody.set(localStorage.getItem("signatureBody") || "");

    // Sync to localStorage
    brandColor.subscribe(v => typeof window !== 'undefined' && localStorage.setItem("brandColor", v));
    facebookLink.subscribe(v => typeof window !== 'undefined' && localStorage.setItem("facebookLink", v));
    instagramLink.subscribe(v => typeof window !== 'undefined' && localStorage.setItem("instagramLink", v));
    signatureBody.subscribe(v => typeof window !== 'undefined' && localStorage.setItem("signatureBody", v));

    // Initialize Quill
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

  // Reactive generation of signature HTML
  $: {
    // Dependencies
    const _logo = $draftConfig.logo;
    const _name = $draftConfig.senderName;
    const _title = $draftConfig.newsletterTitle;
    const _body = $signatureBody;
    const _color = $brandColor;
    const _fb = $facebookLink;
    const _insta = $instagramLink;
    const _email = $store.configuratorEmail; // From global store as it's not editable here usually?

    const signature = `
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;background:#101010;font-family:Arial,Helvetica,sans-serif">
  <tbody><tr>
    <td align="left" style="padding:18px 20px">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse">
        <tbody><tr>
          <td width="4" style="background:${_color || '#00c2a8'};font-size:0;line-height:0">&nbsp;</td>
          <td width="16" style="font-size:0;line-height:0">&nbsp;</td>
          ${_logo ? `
          <td width="150" align="left" valign="middle" style="vertical-align:middle;padding:0">
            <img src="${_logo}" width="135" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;height:auto;line-height:0" class="CToWUd" data-bit="iit">
          </td>
          <td width="18" style="font-size:0;line-height:0">&nbsp;</td>
          ` : ''}
          <td width="420" align="left" valign="middle" style="vertical-align:middle;color:#ffffff">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse">
              <tbody><tr>
                <td style="padding:0 0 4px 0;font-size:19px;line-height:22px;font-weight:700;color:#ffffff;letter-spacing:.2px">
                  ${_name || 'Your Name'}
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0 0 0;border-top:1px solid rgba(255,255,255,.35);font-size:12px;line-height:16px;color:${_color || '#00c2a8'};text-transform:uppercase;letter-spacing:.6px">
                  ${_title || 'Your Title'}
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0 0 0;font-size:13px;line-height:18px;color:#ffffff">
                  <a href="mailto:${_email}" style="color:#ffffff;text-decoration:none" target="_blank">${_email}</a>
                </td>
              </tr>
              ${_body ? `
              <tr>
                <td style="padding:8px 0 0 0;color:#ffffff;font-size:14px;line-height:1.5;">
                  ${_body}
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding:10px 0 0 0">
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse">
                    <tbody><tr>
                      ${_insta ? `
                      <td style="padding-right:8px">
                        <a href="${_insta}" style="text-decoration:none" target="_blank">
                          <img src="https://ci3.googleusercontent.com/meips/ADKq_Naf6pOFzWBNh7N0__Kg83P2_zvKPIISjluqS8yzGoi1jaHDPCUe5AftiTOCw42cEY90Y1GtU1EsaG6s3WN4k5fM8dICvOzORgRYdEgYcqxVebv8ivPC6avM86Q2PgCS0oQ=s0-d-e1-ft#https://img.mysignature.io/s/4/9/f/49fdaa84-063e-5e12-a-908-0f24275d855e.png" width="26" alt="Instagram" style="display:block;border:0;outline:none;text-decoration:none;height:auto;line-height:0;border-radius:50%;padding:2px;border:1px solid rgba(255,255,255,.45)" class="CToWUd" data-bit="iit">
                        </a>
                      </td>
                      ` : ''}
                      ${_fb ? `
                      <td>
                        <a href="${_fb}" style="text-decoration:none" target="_blank">
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

  function handleLogoChange(imageData: string | null) {
    updateDraft({ logo: imageData as string });
  }

  function handleSubjectChange(val: string) {
    updateDraft({ newsletterSubject: val });
  }

  function handleNameChange(val: string) {
    updateDraft({ senderName: val });
  }

  function handleTitleChange(val: string) {
    updateDraft({ newsletterTitle: val });
  }

</script>

<div class="interactive-editor">
  <!-- Email Header Section -->
  <div class="email-header">
    <div class="input-group">
      <label>{$t['placeholders.newsletterSubject']}</label>
      <input 
        type="text" 
        value={$draftConfig.newsletterSubject || ''} 
        on:input={(e) => handleSubjectChange(e.currentTarget.value)}
        placeholder="Subject line..."
      />
    </div>
  </div>

  <!-- Signature WYSIWYG Section -->
  <div class="signature-wysiwyg">
    <div class="layout-container">
      <!-- Logo Column -->
      <div class="logo-column">
        <Image {canReveal} selectedImage={$draftConfig.logo} onChange={handleLogoChange} />
      </div>
      
      <!-- Info Column -->
      <div class="info-column">
        <!-- Name -->
        <input 
          class="inline-input name-input"
          type="text" 
          value={$draftConfig.senderName || ''} 
          on:input={(e) => handleNameChange(e.currentTarget.value)}
          placeholder="Your Name"
        />

        <!-- Title -->
        <input 
          class="inline-input title-input"
          type="text" 
          value={$draftConfig.newsletterTitle || ''} 
          on:input={(e) => handleTitleChange(e.currentTarget.value)}
          placeholder="Your Title"
          style="color: {$brandColor};"
        />

        <!-- Body Editor -->
        <div class="body-editor-wrapper">
          <div bind:this={editor} />
        </div>

        <!-- Socials & Color -->
        <div class="socials-config">
          <div class="links">
             <Link
                placeholder={$t['placeholders.facebookProfile']}
                bind:value={$facebookLink}
              />
              <Link
                placeholder={$t['placeholders.instagramProfile']}
                bind:value={$instagramLink}
              />
          </div>
          <div class="color">
             <ColorPicker bind:selectedColor={$brandColor} />
          </div>
        </div>

      </div>
    </div>
  </div>

</div>

<style lang="scss">
  @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

  .interactive-editor {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .email-header {
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      label {
        font-size: 0.8rem;
        opacity: 0.7;
      }

      input {
        background: transparent;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        color: inherit;
        font-size: 1.1rem;
        padding: 0.5rem 0;
        &:focus {
          outline: none;
          border-bottom-color: var(--color-primary);
        }
      }
    }
  }

  .signature-wysiwyg {
    background: #101010; /* Match signature bg */
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #333;
    color: #fff;
  }

  .layout-container {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  .logo-column {
    width: 150px;
    flex-shrink: 0;
  }

  .info-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .inline-input {
    background: transparent;
    border: 1px dashed rgba(255, 255, 255, 0.2);
    color: #fff;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover, &:focus {
      border-color: rgba(255, 255, 255, 0.5);
      background: rgba(255, 255, 255, 0.05);
      outline: none;
    }
  }

  .name-input {
    font-size: 19px;
    font-weight: 700;
  }

  .title-input {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  .body-editor-wrapper {
    background: rgba(255,255,255,0.05);
    border-radius: 4px;
    margin: 10px 0;
    
    :global(.ql-toolbar) {
      border-color: rgba(255,255,255,0.1) !important;
    }
    :global(.ql-container) {
      border-color: rgba(255,255,255,0.1) !important;
      min-height: 100px;
    }
    :global(.ql-editor) {
      color: #fff;
    }
  }

  .socials-config {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-top: 1rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 1rem;

    .links {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>

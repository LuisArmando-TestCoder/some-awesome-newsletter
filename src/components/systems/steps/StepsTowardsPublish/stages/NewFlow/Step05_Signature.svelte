<script lang="ts">
  import { onMount } from "svelte";
  import { writable, get } from "svelte/store";
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Centered from "../../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import store, { saveToStore } from "../../../../../store";
  
  // Import input components
  import Image from "../../../../inputs/Image/Image.svelte";
  import Link from "../../../../inputs/Link/Link.svelte";
  import ColorPicker from "../../../../inputs/ColorPicker/ColorPicker.svelte";

  export let canReveal = false;

  // Local state for fields not in global config or requiring local persistence
  const brandColor = writable("#000000");
  const facebookLink = writable("");
  const instagramLink = writable("");
  const signatureBody = writable("");
  const fontFamily = writable("Arial, Helvetica, sans-serif");

  let editor: HTMLDivElement;
  let quill: any;
  let generatedSignature = "";
  
  // Manual Edit Mode State
  let isManualMode = false;
  let manualSignature = "";
  let activeTab = 'visual'; // 'visual' | 'code'

  const fonts = [
    { name: "Arial", value: "Arial, Helvetica, sans-serif" },
    { name: "Helvetica", value: "Helvetica, Arial, sans-serif" },
    { name: "Verdana", value: "Verdana, Geneva, sans-serif" },
    { name: "Georgia", value: "Georgia, 'Times New Roman', Times, serif" },
    { name: "Times New Roman", value: "'Times New Roman', Times, serif" },
    { name: "Courier New", value: "'Courier New', Courier, monospace" }
  ];

  onMount(async () => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      brandColor.set(localStorage.getItem("brandColor") || "#000000");
      facebookLink.set(localStorage.getItem("facebookLink") || "");
      instagramLink.set(localStorage.getItem("instagramLink") || "");
      signatureBody.set(localStorage.getItem("signatureBody") || "");
      fontFamily.set(localStorage.getItem("fontFamily") || "Arial, Helvetica, sans-serif");
    }

    // Sync to localStorage
    brandColor.subscribe(v => typeof window !== 'undefined' && localStorage.setItem("brandColor", v));
    facebookLink.subscribe(v => typeof window !== 'undefined' && localStorage.setItem("facebookLink", v));
    instagramLink.subscribe(v => typeof window !== 'undefined' && localStorage.setItem("instagramLink", v));
    signatureBody.subscribe(v => typeof window !== 'undefined' && localStorage.setItem("signatureBody", v));
    fontFamily.subscribe(v => typeof window !== 'undefined' && localStorage.setItem("fontFamily", v));

    // Initialize Quill
    const { default: Quill } = await import("quill");
    if (editor) {
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
    }
  });

  // Reactive generation of signature HTML
  $: {
    const _logo = $store.config?.logo;
    const _name = $store.config?.senderName;
    const _title = $store.config?.newsletterTitle;
    const _body = $signatureBody;
    const _color = $brandColor;
    const _fb = $facebookLink;
    const _insta = $instagramLink;
    const _email = $store.configuratorEmail;
    const _font = $fontFamily;

    // Only regenerate if not in manual mode (or we're syncing the "base" to manual initially)
    const newGenerated = `
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;background:#101010;font-family:${_font}">
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
                <td style="padding:0 0 4px 0;font-size:19px;line-height:22px;font-weight:700;color:#ffffff;letter-spacing:.2px;font-family:${_font}">
                  ${_name || 'Your Name'}
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0 0 0;border-top:1px solid rgba(255,255,255,.35);font-size:12px;line-height:16px;color:${_color || '#00c2a8'};text-transform:uppercase;letter-spacing:.6px;font-family:${_font}">
                  ${_title || 'Your Title'}
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0 0 0;font-size:13px;line-height:18px;color:#ffffff;font-family:${_font}">
                  <a href="mailto:${_email}" style="color:#ffffff;text-decoration:none" target="_blank">${_email}</a>
                </td>
              </tr>
              ${_body ? `
              <tr>
                <td style="padding:8px 0 0 0;color:#ffffff;font-size:14px;line-height:1.5;font-family:${_font}">
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
    
    generatedSignature = newGenerated;
    if (!isManualMode) {
      manualSignature = newGenerated; // Keep manual synced while in visual mode
    }
  }

  function handleLogoChange(imageData: string | null) {
    saveToStore({ config: { ...$store.config, logo: imageData } });
  }

  function handleNameChange(val: string) {
    saveToStore({ config: { ...$store.config, senderName: val } });
  }

  function handleTitleChange(val: string) {
    saveToStore({ config: { ...$store.config, newsletterTitle: val } });
  }

  function toggleMode(mode: string) {
    activeTab = mode;
    if (mode === 'code') {
      isManualMode = true;
      // manualSignature is already up to date from the reactive block if we were in visual
    } else {
      // Switch back to visual
      // Warn user? For now we just reset manual mode flag, forcing next edit to be visual
      // Ideally we might keep manual changes until a visual input changes, but simpliest is:
      isManualMode = false;
    }
  }

  function handleNext() {
    saveToStore({
      // Use manualSignature if we are in code mode or have made manual edits
      config: { ...$store.config, emailSignature: isManualMode ? manualSignature : generatedSignature },
      stepsIndex: $store.stepsIndex + 1
    });
  }

  function stripScripts(html: string) {
    if (!html) return "";
    // Remove script tags and their content
    return html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
               .replace(/<script\b[^>]*\/>/gim, "")
               // Optionally remove on* events
               .replace(/ on\w+="[^"]*"/gim, "")
               .replace(/ on\w+='[^']*'/gim, "");
  }
</script>

<Centered>
  <div class="step-container">
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="impact-statement">
          Customize Your Signature
        </h1>
      </div>

      <div class="input-group" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        <p class="subtitle">
          Design visually or edit the code directly
        </p>

        <!-- Mode Toggle -->
        <div class="tabs">
          <button class:active={activeTab === 'visual'} on:click={() => toggleMode('visual')}>Visual Editor</button>
          <button class:active={activeTab === 'code'} on:click={() => toggleMode('code')}>HTML Source</button>
        </div>
        
        <div class="signature-wysiwyg">
          <!-- Live Preview Section -->
          <div class="preview-section">
             <p class="preview-label">Live Preview</p>
             <div class="signature-preview">
                {@html stripScripts(isManualMode ? manualSignature : generatedSignature)}
             </div>
          </div>

          <div class="divider"></div>

          {#if activeTab === 'visual'}
            <div class="layout-container">
              <!-- Logo Column -->
              <div class="logo-column">
                <Image {canReveal} selectedImage={$store.config.logo} onChange={handleLogoChange} />
              </div>
              
              <!-- Info Column -->
              <div class="info-column">
                <!-- Name -->
                <input 
                  class="inline-input name-input"
                  type="text" 
                  value={$store.config.senderName || ''} 
                  on:input={(e) => handleNameChange(e.currentTarget.value)}
                  placeholder="Your Name"
                />

                <!-- Title -->
                <input 
                  class="inline-input title-input"
                  type="text" 
                  value={$store.config.newsletterTitle || ''} 
                  on:input={(e) => handleTitleChange(e.currentTarget.value)}
                  placeholder="Your Title"
                  style="color: {$brandColor};"
                />

                <!-- Font Selector -->
                <div class="control-row">
                  <select bind:value={$fontFamily} class="font-select">
                     {#each fonts as font}
                       <option value={font.value}>{font.name}</option>
                     {/each}
                  </select>
                </div>

                <!-- Body Editor -->
                <div class="body-editor-wrapper">
                  <div bind:this={editor} />
                </div>

                <!-- Socials & Color -->
                <div class="socials-config">
                  <div class="links">
                     <Link
                        placeholder="Facebook Profile"
                        bind:value={$facebookLink}
                      />
                      <Link
                        placeholder="Instagram Profile"
                        bind:value={$instagramLink}
                      />
                  </div>
                  <div class="color">
                     <ColorPicker bind:selectedColor={$brandColor} />
                  </div>
                </div>

              </div>
            </div>
          {:else}
            <!-- Code Editor -->
            <div class="code-editor-wrapper">
              <textarea 
                bind:value={manualSignature}
                placeholder="Edit HTML directly..."
                rows="20"
                class="code-textarea"
              ></textarea>
              <p class="warning-text">
                ⚠️ Edits made here will be overwritten if you switch back to Visual Editor and make changes.
              </p>
            </div>
          {/if}
        </div>
      </div>

      <div class="submit-wrapper" in:fly={{ y: 10, duration: 800, delay: 300, easing: quadOut }}>
        <SubmitButton callback={handleNext} />
      </div>
    {/if}
  </div>
</Centered>

<style lang="scss">
  @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

  .step-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem 0;
    gap: 2rem;
  }

  .header-group { text-align: center; }

  .impact-statement {
    /* Responsive sizing: slightly larger/bolder than the previous subtitle */
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: 800;
    line-height: 1.2;
    margin: 0;
    text-align: center; /* Default center */
    letter-spacing: -0.03em;
    text-wrap: balance;

    /* Infinite Shimmer Effect: 
       Creates a living, "forever" feel using a moving gradient background.
    */
    background: linear-gradient(
      120deg, 
      var(--c-primary, #2563eb) 0%, 
      var(--c-primary-light, #60a5fa) 50%, 
      var(--c-primary, #2563eb) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    animation: shine 4s linear infinite;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .subtitle {
    font-size: 0.9rem;
    color: #666;
    margin: 0 0 0.5rem 0;
    font-style: italic;
    text-align: center;
  }

  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    
    button {
      background: transparent;
      border: none;
      color: #666;
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      font-weight: 600;
      transition: all 0.2s;
      
      &.active {
        color: #007aff;
        border-bottom-color: #007aff;
      }
      
      &:hover:not(.active) {
        color: #333;
      }
    }
  }

  .signature-wysiwyg {
    background: #101010;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #333;
    color: #fff;
  }

  .preview-section {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 20px;
    color: #000; /* Signatures are usually designed for light mode */
    overflow-x: auto;
  }

  .preview-label {
    margin: 0 0 10px 0;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #666;
    letter-spacing: 1px;
  }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.1);
    margin: 20px 0;
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
    width: 100%;

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

  .control-row {
    margin: 0.5rem 0;
  }

  .font-select {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    width: 100%;
    
    option {
      background: #333;
      color: #fff;
    }
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

  .code-editor-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .code-textarea {
    width: 100%;
    background: #1e1e1e;
    color: #d4d4d4;
    border: 1px solid #333;
    padding: 1rem;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
    border-radius: 4px;
    resize: vertical;
    
    &:focus {
      outline: none;
      border-color: #007aff;
    }
  }

  .warning-text {
    font-size: 0.8rem;
    color: #ff9800;
    margin: 0;
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }
  
  @media (max-width: 600px) {
    .layout-container {
      flex-direction: column;
    }
    .logo-column {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
</style>
/**
 * Email HTML template — SODIUM LAMP direction.
 *
 * Full dark-mode card matching the site exactly: deep slate-navy `#0c1419`
 * surface, bone cream text, client brand accent colors, slate hairlines.
 * Reads as a postcard from the lit-bay-at-midnight.
 *
 * Font stack tuned for fidelity even when the email client refuses to load
 * remote web fonts (most do): Helvetica Neue / Arial Black for the display
 * headline (heavy enough to hint at Bricolage's brutalist weight), then a
 * clean neutral sans for body. Web fonts loaded via `<style>@import` in
 * <head> rather than `<link>` because some clients (Apple Mail, web Gmail)
 * respect @import while stripping <link>.
 *
 * `color-scheme: only light` prevents Gmail / Outlook auto-dark-mode from
 * double-inverting our intentionally-dark surface.
 *
 * Cross-client compatibility:
 *  - All styles inline (Gmail strips <head><style> for everything except
 *    @media and @import rules)
 *  - Layout uses tables (Outlook ignores flexbox)
 *  - Max-width 600px, centered with margin: 0 auto
 *  - Outlook MSO fallback forces system sans
 */

import { parseColors } from "./parseColors";
const BRAND = parseColors("{{LOGO_COLORS}}");
// BRAND.primary, BRAND.secondary, BRAND.accent are hex strings

const BRAND_FONT_LOGO: string = "{{FONT_LOGO}}";

const GF_HREF: string = "{{GOOGLE_FONTS_HREF}}";
const gfImport = GF_HREF.startsWith("http") ? `@import url("${GF_HREF}");` : "";

const TOKENS = {
  // Site palette — kept identical to tailwind.config.ts so the email reads
  // as a continuation of the website. Mood neutrals (night surfaces, slate,
  // bone) are locked. Only the amber/amberDeep brand accent slots bend to
  // the client's logo colors.
  night: "#0c1419",
  nightDeep: "#080d12",
  surface1: "#141c23",
  surface2: "#1e2830",
  slateLine: "#2a3540",
  chrome: "#a8b3bf",
  // Brand accent — driven by client logo colors at build time.
  amber: BRAND.primary,
  amberDeep: BRAND.secondary,
  haze: "#f4d8a3",
  bone: "#f0e9d8",
  boneSoft: "#c9c4b8",
  mute: "#7d7868",
};

// Font stacks tuned for clients that won't load web fonts.
// Display: Bricolage Grotesque is brutalist + heavy. Helvetica Neue Black
// or Arial Black are the closest system equivalents in weight.
const EXISTING_DISPLAY_FALLBACK =
  "'Bricolage Grotesque', 'Helvetica Neue', 'Arial Black', Arial, sans-serif";
// DISPLAY_FONT prefers the client's logo font when available, falling back
// to the template's brutalist display stack.
const DISPLAY_FONT =
  BRAND_FONT_LOGO && !BRAND_FONT_LOGO.startsWith("{{")
    ? `'${BRAND_FONT_LOGO.split(",")[0].trim()}', ` + EXISTING_DISPLAY_FALLBACK
    : EXISTING_DISPLAY_FALLBACK;
const FONT_BODY =
  "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif";

type EmailField = {
  label: string;
  value: string;
  multiline?: boolean;
};

type EmailAttachmentMeta = { filename: string; sizeBytes: number };

type EmailTemplateInput = {
  kicker: string;
  headline: string;
  intro: string;
  sender: { name: string; email: string; phone?: string };
  sections: { title: string; fields: EmailField[] }[];
  /** Optional photo attachments metadata — listed in the email body. */
  attachments?: EmailAttachmentMeta[];
  businessName: string;
  businessAddress: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fieldRow(field: EmailField): string {
  const label = escapeHtml(field.label);
  const value = field.multiline
    ? escapeHtml(field.value).replace(/\n/g, "<br />")
    : escapeHtml(field.value);

  return `
    <tr>
      <td style="padding: 0 0 18px 0;">
        <div style="
          font-family: ${FONT_BODY};
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${TOKENS.boneSoft};
          margin: 0 0 4px 0;
        ">${label}</div>
        <div style="
          font-family: ${FONT_BODY};
          font-size: 15px;
          line-height: 1.55;
          color: ${TOKENS.bone};
          margin: 0;
        ">${value}</div>
      </td>
    </tr>
  `;
}

function sectionBlock(section: { title: string; fields: EmailField[] }): string {
  const fields = section.fields.map(fieldRow).join("");
  return `
    <tr>
      <td style="padding: 22px 0 8px 0;">
        <div style="
          font-family: ${DISPLAY_FONT};
          font-size: 13px;
          font-weight: 700;
          color: ${TOKENS.amber};
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin: 0 0 14px 0;
          padding: 0 0 10px 0;
          border-bottom: 1px solid ${TOKENS.slateLine};
        ">${escapeHtml(section.title)}</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          ${fields}
        </table>
      </td>
    </tr>
  `;
}

function attachmentsBlock(items: EmailAttachmentMeta[]): string {
  const totalBytes = items.reduce((sum, i) => sum + i.sizeBytes, 0);
  const totalLabel =
    totalBytes < 1_000_000
      ? `${(totalBytes / 1024).toFixed(0)} KB`
      : `${(totalBytes / 1_000_000).toFixed(2)} MB`;
  const rows = items
    .map(
      (item) => `
        <tr>
          <td style="
            padding: 6px 0;
            font-family: ${FONT_BODY};
            font-size: 13px;
            color: ${TOKENS.bone};
          ">
            <span style="display:inline-block;width:6px;height:6px;background:${TOKENS.amber};margin-right:10px;vertical-align:middle;"></span>${escapeHtml(item.filename)}
          </td>
          <td align="right" style="
            padding: 6px 0;
            font-family: ${FONT_BODY};
            font-size: 11px;
            color: ${TOKENS.boneSoft};
          ">${formatSize(item.sizeBytes)}</td>
        </tr>`,
    )
    .join("");

  return `
    <tr>
      <td style="padding: 22px 0 8px 0;">
        <div style="
          font-family: ${DISPLAY_FONT};
          font-size: 13px;
          font-weight: 700;
          color: ${TOKENS.amber};
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin: 0 0 14px 0;
          padding: 0 0 10px 0;
          border-bottom: 1px solid ${TOKENS.slateLine};
        ">Photos attached (${items.length}) · ${totalLabel}</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
          background-color: ${TOKENS.night};
          border: 1px solid ${TOKENS.slateLine};
          padding: 12px 16px;
        ">
          ${rows}
        </table>
        <p style="
          margin: 10px 0 0 0;
          font-family: ${FONT_BODY};
          font-size: 12px;
          color: ${TOKENS.boneSoft};
        ">Files are attached to this email — open them in your mail client to view.</p>
      </td>
    </tr>
  `;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_000_000) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1_000_000).toFixed(2)} MB`;
}

export function renderEmailHtml(input: EmailTemplateInput): string {
  const senderFields: EmailField[] = [
    { label: "From", value: input.sender.name },
    { label: "Email", value: input.sender.email },
  ];
  if (input.sender.phone) {
    senderFields.push({ label: "Phone", value: input.sender.phone });
  }

  const senderSection = sectionBlock({
    title: "Customer details",
    fields: senderFields,
  });

  const otherSections = input.sections.map(sectionBlock).join("");

  const attachmentsSection =
    input.attachments && input.attachments.length > 0
      ? attachmentsBlock(input.attachments)
      : "";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="only light" />
  <meta name="supported-color-schemes" content="only light" />
  <title>${escapeHtml(input.headline)}</title>
  <style>
    /* Web fonts via @import — more reliable than <link> in some clients
       (Apple Mail honors @import, Gmail web is hit-or-miss but doesn't break). */
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Geist:wght@400;500;600&display=swap');
    ${gfImport}

    /* Prevent client auto-dark-inversion of an intentionally-dark email. */
    :root { color-scheme: only light; }
    body, table, td, p, a, h1, h2, h3 { color-scheme: only light; }

    /* Pin links to brand accent so Gmail's auto-blue-link rule doesn't override. */
    a, a:link, a:visited, a:hover {
      color: ${TOKENS.amber};
      text-decoration: underline;
    }
  </style>
  <!--[if mso]>
  <style>
    * { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: ${TOKENS.night};
  font-family: ${FONT_BODY};
  color: ${TOKENS.bone};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
">

  <!-- Outer wrapper. Forces center alignment on Outlook + Gmail mobile. -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="
    background-color: ${TOKENS.night};
    padding: 32px 16px;
  ">
    <tr>
      <td align="center">

        <!-- Inner card. 600px max width, centered, dark slate-navy with
             a subtle gradient that mirrors the site's AmbientCard. -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="
          width: 100%;
          max-width: 600px;
          background-color: ${TOKENS.surface1};
          background-image: linear-gradient(165deg, ${TOKENS.surface2} 0%, ${TOKENS.surface1} 100%);
          border: 1px solid ${TOKENS.slateLine};
        ">

          <!-- Night-deep header band with brand accent kicker badge -->
          <tr>
            <td style="
              background-color: ${TOKENS.nightDeep};
              padding: 18px 32px;
              border-bottom: 1px solid ${TOKENS.slateLine};
            ">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    background-color: ${TOKENS.amber};
                    padding: 5px 11px;
                  ">
                    <span style="
                      font-family: ${FONT_BODY};
                      font-size: 11px;
                      font-weight: 600;
                      letter-spacing: 0.2em;
                      text-transform: uppercase;
                      color: ${TOKENS.night};
                    ">${escapeHtml(input.kicker)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Headline + intro -->
          <tr>
            <td style="padding: 38px 32px 8px 32px;">
              <h1 style="
                font-family: ${DISPLAY_FONT};
                font-size: 30px;
                font-weight: 700;
                line-height: 1.1;
                color: ${TOKENS.bone};
                margin: 0 0 14px 0;
                letter-spacing: -0.02em;
              ">${escapeHtml(input.headline)}</h1>
              <p style="
                font-family: ${FONT_BODY};
                font-size: 15px;
                line-height: 1.6;
                color: ${TOKENS.boneSoft};
                margin: 0;
              ">${escapeHtml(input.intro)}</p>
            </td>
          </tr>

          <!-- Body sections (sender + custom sections) -->
          <tr>
            <td style="padding: 14px 32px 8px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${senderSection}
                ${otherSections}
                ${attachmentsSection}
              </table>
            </td>
          </tr>

          <!-- Reply CTA hint — subtle slate panel with brand accent left-bar -->
          <tr>
            <td style="padding: 8px 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
                background-color: ${TOKENS.night};
                border: 1px solid ${TOKENS.slateLine};
                border-left: 4px solid ${TOKENS.amber};
              ">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p style="
                      font-family: ${FONT_BODY};
                      font-size: 13px;
                      line-height: 1.55;
                      color: ${TOKENS.boneSoft};
                      margin: 0;
                    ">
                      <strong style="color: ${TOKENS.bone};">Reply directly</strong> to this email to reach
                      <a href="mailto:${escapeHtml(input.sender.email)}" style="color: ${TOKENS.amber}; text-decoration: underline;">${escapeHtml(input.sender.name)}</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer band — deepest night, brand accent business name, mute address -->
          <tr>
            <td style="
              background-color: ${TOKENS.nightDeep};
              padding: 22px 32px 24px 32px;
              border-top: 1px solid ${TOKENS.slateLine};
            ">
              <p style="
                font-family: ${DISPLAY_FONT};
                font-size: 14px;
                font-weight: 700;
                color: ${TOKENS.amber};
                margin: 0 0 4px 0;
                letter-spacing: 0.02em;
              ">${escapeHtml(input.businessName)}</p>
              <p style="
                font-family: ${FONT_BODY};
                font-size: 12px;
                color: ${TOKENS.boneSoft};
                margin: 0;
              ">${escapeHtml(input.businessAddress)}</p>
            </td>
          </tr>

        </table>

        <!-- Tiny footer note below the card, mute on the night background -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="
          width: 100%;
          max-width: 600px;
          margin-top: 16px;
        ">
          <tr>
            <td align="center" style="padding: 0 32px;">
              <p style="
                font-family: ${FONT_BODY};
                font-size: 11px;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: ${TOKENS.mute};
                margin: 0;
                text-align: center;
              ">
                Sent from your website contact form
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

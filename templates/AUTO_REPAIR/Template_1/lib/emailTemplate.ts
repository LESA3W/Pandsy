/**
 * Email HTML template — BAY 04 / GARAGE FLOOR direction.
 *
 * Full dark-mode card matching the site exactly: matte black `#0a0a0a` body,
 * panel `#171717`, client brand accent colors, JetBrains Mono labels in
 * work-order register, Bebas Neue display headlines, Inter body. Includes a
 * thin hazard-tape divider strip (repeating-linear-gradient) as the section
 * break — T1's signature atom.
 *
 * `color-scheme: only light` prevents Gmail / Outlook auto-dark-mode from
 * double-inverting the intentionally dark surface.
 *
 * Cross-client compatibility:
 *  - All styles inline (Gmail strips <head><style> for everything except
 *    @media and @import rules)
 *  - Layout uses tables (Outlook ignores flexbox)
 *  - Max-width 600px, centered with margin: 0 auto
 *  - Outlook MSO fallback forces Impact + Arial
 *  - Hazard-tape uses repeating-linear-gradient — supported in Gmail web,
 *    Apple Mail, modern Outlook. Falls back to a solid brand-accent rule
 *    in older clients.
 */

import { parseColors } from "./parseColors";
const BRAND = parseColors("{{LOGO_COLORS}}");
// BRAND.primary, BRAND.secondary, BRAND.accent are hex strings

const BRAND_FONT_LOGO: string = "{{FONT_LOGO}}";

const GF_HREF: string = "{{GOOGLE_FONTS_HREF}}";
const gfImport = GF_HREF.startsWith("http") ? `@import url("${GF_HREF}");` : "";

const TOKENS = {
  // Site palette — kept identical to tailwind.config.ts so the email reads
  // as a continuation of the website. Mood neutrals are locked — only BRAND
  // accents (hazard slot) bend to the client's logo colors.
  ink: "#0a0a0a",
  inkPanel: "#171717",
  inkBorder: "#262626",
  inkRule: "#404040",
  inkMute: "#a3a3a3",
  cream: "#fafafa",
  bone: "#e5e5e5",
  // Brand accent — driven by client logo colors at build time.
  hazard: BRAND.primary,
};

// Font stacks tuned for clients that won't load remote web fonts.
// Display: Bebas Neue is condensed industrial signage. Impact + Arial
// Narrow Bold are the closest system equivalents (condensed, heavy).
const EXISTING_DISPLAY_FALLBACK =
  "'Bebas Neue', Impact, 'Arial Narrow Bold', 'Helvetica Neue', sans-serif";
// DISPLAY_FONT prefers the client's logo font when available, falling back
// to the template's display stack.
const DISPLAY_FONT =
  BRAND_FONT_LOGO && !BRAND_FONT_LOGO.startsWith("{{")
    ? `'${BRAND_FONT_LOGO.split(",")[0].trim()}', ` + EXISTING_DISPLAY_FALLBACK
    : EXISTING_DISPLAY_FALLBACK;
// Mono: JetBrains Mono. Consolas / Menlo are excellent fallbacks.
const FONT_MONO =
  "'JetBrains Mono', Consolas, Menlo, 'Courier New', ui-monospace, monospace";
// Body: Inter. Standard system-ui chain.
const FONT_BODY =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif";

type EmailField = {
  label: string;
  value: string;
  multiline?: boolean;
};

type EmailAttachmentMeta = { filename: string; sizeBytes: number };

type EmailTemplateInput = {
  /** Hero badge text (e.g. "WORK ORDER · NEW QUOTE") */
  kicker: string;
  /** Main headline of the email body */
  headline: string;
  /** One-line preamble shown above the data fields */
  intro: string;
  /** Sender block (always present): name, email, optional phone */
  sender: { name: string; email: string; phone?: string };
  /** Optional sections of fields, each with a title */
  sections: { title: string; fields: EmailField[] }[];
  /** Optional photo attachments metadata — listed in the email body. */
  attachments?: EmailAttachmentMeta[];
  /** Business name for footer */
  businessName: string;
  /** Address for footer */
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
      <td style="padding: 0 0 16px 0;">
        <div style="
          font-family: ${FONT_MONO};
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: ${TOKENS.inkMute};
          margin: 0 0 5px 0;
        ">${label}</div>
        <div style="
          font-family: ${FONT_BODY};
          font-size: 15px;
          line-height: 1.55;
          color: ${TOKENS.cream};
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
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 0 16px 0;">
          <tr>
            <td style="
              font-family: ${DISPLAY_FONT};
              font-size: 18px;
              font-weight: 400;
              color: ${TOKENS.hazard};
              letter-spacing: 0.06em;
              text-transform: uppercase;
              padding: 0 0 10px 0;
              border-bottom: 1px solid ${TOKENS.inkBorder};
            ">${escapeHtml(section.title)}</td>
          </tr>
        </table>
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
            font-family: ${FONT_MONO};
            font-size: 12px;
            color: ${TOKENS.cream};
          ">
            <span style="display:inline-block;width:6px;height:6px;background:${TOKENS.hazard};margin-right:10px;vertical-align:middle;"></span>${escapeHtml(item.filename)}
          </td>
          <td align="right" style="
            padding: 6px 0;
            font-family: ${FONT_MONO};
            font-size: 11px;
            color: ${TOKENS.inkMute};
          ">${formatSize(item.sizeBytes)}</td>
        </tr>`,
    )
    .join("");

  return `
    <tr>
      <td style="padding: 22px 0 8px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 0 16px 0;">
          <tr>
            <td style="
              font-family: ${DISPLAY_FONT};
              font-size: 18px;
              font-weight: 400;
              color: ${TOKENS.hazard};
              letter-spacing: 0.06em;
              text-transform: uppercase;
              padding: 0 0 10px 0;
              border-bottom: 1px solid ${TOKENS.inkBorder};
            ">Photos attached (${items.length}) · ${totalLabel}</td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
          background-color: ${TOKENS.ink};
          border: 1px solid ${TOKENS.inkBorder};
          padding: 12px 16px;
        ">
          ${rows}
        </table>
        <p style="
          margin: 10px 0 0 0;
          font-family: ${FONT_BODY};
          font-size: 12px;
          color: ${TOKENS.inkMute};
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
    /* Web fonts via @import (more reliable than <link> in Apple Mail and
       Gmail web than <link> for some clients). */
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');
    ${gfImport}

    /* Prevent client auto-dark-inversion of an intentionally-dark email. */
    :root { color-scheme: only light; }
    body, table, td, p, a, h1, h2, h3 { color-scheme: only light; }

    /* Pin links to brand accent so Gmail's auto-blue-link rule doesn't override. */
    a, a:link, a:visited, a:hover {
      color: ${TOKENS.hazard};
      text-decoration: underline;
    }
  </style>
  <!--[if mso]>
  <style>
    .mso-display { font-family: Impact, Arial, sans-serif !important; }
    .mso-body { font-family: Arial, Helvetica, sans-serif !important; }
    .mso-mono { font-family: 'Courier New', monospace !important; }
  </style>
  <![endif]-->
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: ${TOKENS.ink};
  font-family: ${FONT_BODY};
  color: ${TOKENS.cream};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
">

  <!-- Outer wrapper. Forces center alignment on Outlook + Gmail mobile. -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="
    background-color: ${TOKENS.ink};
    padding: 32px 16px;
  ">
    <tr>
      <td align="center">

        <!-- Inner card. 600px max width, centered, ink panel surface. -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="
          width: 100%;
          max-width: 600px;
          background-color: ${TOKENS.inkPanel};
          border: 1px solid ${TOKENS.inkBorder};
        ">

          <!-- Ink-deep header band with brand kicker badge -->
          <tr>
            <td style="
              background-color: ${TOKENS.ink};
              padding: 18px 32px;
              border-bottom: 1px solid ${TOKENS.inkBorder};
            ">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    background-color: ${TOKENS.hazard};
                    padding: 6px 12px;
                  ">
                    <span class="mso-mono" style="
                      font-family: ${FONT_MONO};
                      font-size: 11px;
                      font-weight: 500;
                      letter-spacing: 0.2em;
                      text-transform: uppercase;
                      color: ${TOKENS.ink};
                    ">${escapeHtml(input.kicker)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Brand tape divider strip (T1 signature). Falls back to a
               solid brand-accent line in clients that ignore the gradient. -->
          <tr>
            <td style="
              height: 6px;
              background-color: ${TOKENS.hazard};
              background-image: repeating-linear-gradient(45deg, ${TOKENS.hazard} 0 6px, ${TOKENS.ink} 6px 12px);
              line-height: 6px;
              font-size: 0;
            ">&nbsp;</td>
          </tr>

          <!-- Headline + intro -->
          <tr>
            <td style="padding: 36px 32px 8px 32px;">
              <h1 class="mso-display" style="
                font-family: ${DISPLAY_FONT};
                font-size: 36px;
                font-weight: 400;
                line-height: 1.0;
                color: ${TOKENS.cream};
                margin: 0 0 16px 0;
                letter-spacing: 0.01em;
                text-transform: uppercase;
              ">${escapeHtml(input.headline)}</h1>
              <p class="mso-body" style="
                font-family: ${FONT_BODY};
                font-size: 15px;
                line-height: 1.6;
                color: ${TOKENS.bone};
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

          <!-- Reply CTA hint — ink panel with brand accent left bar -->
          <tr>
            <td style="padding: 8px 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
                background-color: ${TOKENS.ink};
                border: 1px solid ${TOKENS.inkBorder};
                border-left: 4px solid ${TOKENS.hazard};
              ">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p class="mso-body" style="
                      font-family: ${FONT_BODY};
                      font-size: 13px;
                      line-height: 1.55;
                      color: ${TOKENS.bone};
                      margin: 0;
                    ">
                      <strong style="color: ${TOKENS.cream};">Reply directly</strong> to this email to reach
                      <a href="mailto:${escapeHtml(input.sender.email)}" style="color: ${TOKENS.hazard}; text-decoration: underline;">${escapeHtml(input.sender.name)}</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer band — ink, brand business name, mute address -->
          <tr>
            <td style="
              background-color: ${TOKENS.ink};
              padding: 22px 32px 24px 32px;
              border-top: 1px solid ${TOKENS.inkBorder};
            ">
              <p class="mso-display" style="
                font-family: ${DISPLAY_FONT};
                font-size: 18px;
                font-weight: 400;
                color: ${TOKENS.hazard};
                margin: 0 0 5px 0;
                letter-spacing: 0.04em;
                text-transform: uppercase;
              ">${escapeHtml(input.businessName)}</p>
              <p class="mso-mono" style="
                font-family: ${FONT_MONO};
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: ${TOKENS.inkMute};
                margin: 0;
              ">${escapeHtml(input.businessAddress)}</p>
            </td>
          </tr>

        </table>

        <!-- Tiny mono note below the card, work-order register -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="
          width: 100%;
          max-width: 600px;
          margin-top: 16px;
        ">
          <tr>
            <td align="center" style="padding: 0 32px;">
              <p class="mso-mono" style="
                font-family: ${FONT_MONO};
                font-size: 11px;
                letter-spacing: 0.16em;
                text-transform: uppercase;
                color: ${TOKENS.inkMute};
                margin: 0;
                text-align: center;
              ">
                Work-order intake · ${escapeHtml(input.businessName)}
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

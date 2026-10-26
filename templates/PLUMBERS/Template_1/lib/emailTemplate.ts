/**
 * Email HTML template — TIDEWATER / SLATE & COPPER direction.
 *
 * Full dark-mode card matching the site: deep black body `#0a0a0a`,
 * panel `#111111`, primary-color accents from {{LOGO_COLORS}},
 * Fraunces display headlines, Inter Tight body, JetBrains Mono labels.
 * Includes a primary-color gradient divider as the section break.
 *
 * `color-scheme: only light` prevents Gmail / Outlook auto-dark-mode from
 * double-inverting the intentionally dark surface.
 *
 * Cross-client compatibility:
 *  - All styles inline (Gmail strips <head><style> for everything except
 *    @media and @import rules)
 *  - Layout uses tables (Outlook ignores flexbox)
 *  - Max-width 600px, centered with margin: 0 auto
 *  - Outlook MSO fallback forces Georgia (display) + Arial (body)
 *  - Gradient divider uses linear-gradient — supported in Gmail web, Apple Mail,
 *    modern Outlook. Falls back to a solid primary line in older clients.
 */

import { parseColors } from "./parseColors";
const BRAND = parseColors("{{LOGO_COLORS}}");

const BRAND_FONT_LOGO: string = "{{FONT_LOGO}}";
const GF_HREF: string = "{{GOOGLE_FONTS_HREF}}";
const gfImport = GF_HREF.startsWith("http") ? `@import url("${GF_HREF}");` : "";

const TOKENS = {
  // Dark surface palette — pure black-based so no tidewater colors bleed in.
  body: "#0a0a0a",
  panel: "#111111",
  panelDeep: "#080808",
  border: "#222222",
  rule: "#2a2a2a",
  mute: "#888888",
  cream: "#e8e8e8",
  nearWhite: "#cccccc",
  // Brand accents — driven by client logo colors at build time.
  primary: BRAND.primary,
  primaryText: BRAND.primaryText,
  secondary: BRAND.secondary,
  accent: BRAND.accent,
};

// Display: Fraunces is a modern serif with architectural character. Georgia
// and Cambria are the closest system equivalents (warm serif with weight).
const DISPLAY_FALLBACK = "Georgia, Cambria, 'Times New Roman', Times, serif";
const FONT_DISPLAY =
  (BRAND_FONT_LOGO && !BRAND_FONT_LOGO.startsWith("{{"))
    ? `'${BRAND_FONT_LOGO.split(",")[0].trim()}', 'Fraunces', ${DISPLAY_FALLBACK}`
    : `'Fraunces', ${DISPLAY_FALLBACK}`;
// Body: Inter Tight. Standard system-ui chain.
const FONT_BODY =
  "'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif";
// Mono: JetBrains Mono. Consolas / Menlo are excellent fallbacks.
const FONT_MONO =
  "'JetBrains Mono', Consolas, Menlo, 'Courier New', ui-monospace, monospace";

type EmailField = {
  label: string;
  value: string;
  multiline?: boolean;
};

type EmailAttachmentMeta = { filename: string; sizeBytes: number };

type EmailTemplateInput = {
  /** Hero badge text (e.g. "QUOTE REQUEST · NEW LEAD") */
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
          color: ${TOKENS.mute};
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
              font-family: ${FONT_DISPLAY};
              font-size: 20px;
              font-weight: 500;
              color: ${TOKENS.primary};
              letter-spacing: 0.01em;
              padding: 0 0 10px 0;
              border-bottom: 1px solid ${TOKENS.border};
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
            color: ${TOKENS.nearWhite};
          ">
            <span style="display:inline-block;width:6px;height:6px;background:${TOKENS.primary};border-radius:50%;vertical-align:middle;margin-right:10px;"></span>${escapeHtml(item.filename)}
          </td>
          <td align="right" style="
            padding: 6px 0;
            font-family: ${FONT_MONO};
            font-size: 11px;
            color: ${TOKENS.mute};
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
              font-family: ${FONT_DISPLAY};
              font-size: 20px;
              font-weight: 500;
              color: ${TOKENS.primary};
              letter-spacing: 0.01em;
              padding: 0 0 10px 0;
              border-bottom: 1px solid ${TOKENS.border};
            ">Photos attached (${items.length}) · ${totalLabel}</td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
          background-color: ${TOKENS.panelDeep};
          border: 1px solid ${TOKENS.border};
          padding: 12px 16px;
        ">
          ${rows}
        </table>
        <p style="
          margin: 10px 0 0 0;
          font-family: ${FONT_BODY};
          font-size: 12px;
          color: ${TOKENS.mute};
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
    ${gfImport}
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    /* Prevent client auto-dark-inversion of an intentionally-dark email. */
    :root { color-scheme: only light; }
    body, table, td, p, a, h1, h2, h3 { color-scheme: only light; }

    /* Pin links to brand-primary so Gmail's auto-blue-link rule doesn't override. */
    a, a:link, a:visited, a:hover {
      color: ${TOKENS.primary};
      text-decoration: underline;
    }
  </style>
  <!--[if mso]>
  <style>
    .mso-display { font-family: Georgia, 'Times New Roman', serif !important; }
    .mso-body { font-family: Arial, Helvetica, sans-serif !important; }
    .mso-mono { font-family: 'Courier New', monospace !important; }
  </style>
  <![endif]-->
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: ${TOKENS.body};
  font-family: ${FONT_BODY};
  color: ${TOKENS.cream};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="
    background-color: ${TOKENS.body};
    padding: 32px 16px;
  ">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="
          width: 100%;
          max-width: 600px;
          background-color: ${TOKENS.panel};
          border: 1px solid ${TOKENS.border};
        ">

          <!-- Dark header band with primary kicker -->
          <tr>
            <td style="
              background-color: ${TOKENS.panelDeep};
              padding: 20px 32px;
              border-bottom: 1px solid ${TOKENS.border};
            ">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    background-color: ${TOKENS.primary};
                    padding: 6px 14px;
                  ">
                    <span class="mso-mono" style="
                      font-family: ${FONT_MONO};
                      font-size: 11px;
                      font-weight: 500;
                      letter-spacing: 0.2em;
                      text-transform: uppercase;
                      color: ${TOKENS.primaryText};
                    ">${escapeHtml(input.kicker)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary gradient divider strip — T1 signature. Falls back to a
               solid primary line in clients that ignore the gradient. -->
          <tr>
            <td style="
              height: 3px;
              background-color: ${TOKENS.primary};
              background-image: linear-gradient(90deg, ${TOKENS.rule} 0%, ${TOKENS.primary} 50%, ${TOKENS.rule} 100%);
              line-height: 3px;
              font-size: 0;
            ">&nbsp;</td>
          </tr>

          <!-- Headline + intro -->
          <tr>
            <td style="padding: 36px 32px 8px 32px;">
              <h1 class="mso-display" style="
                font-family: ${FONT_DISPLAY};
                font-size: 32px;
                font-weight: 500;
                line-height: 1.1;
                color: ${TOKENS.cream};
                margin: 0 0 16px 0;
                letter-spacing: -0.01em;
              ">${escapeHtml(input.headline)}</h1>
              <p class="mso-body" style="
                font-family: ${FONT_BODY};
                font-size: 15px;
                line-height: 1.65;
                color: ${TOKENS.nearWhite};
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

          <!-- Reply CTA hint — dark panel with primary left bar -->
          <tr>
            <td style="padding: 8px 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
                background-color: ${TOKENS.panelDeep};
                border: 1px solid ${TOKENS.border};
                border-left: 4px solid ${TOKENS.primary};
              ">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p class="mso-body" style="
                      font-family: ${FONT_BODY};
                      font-size: 13px;
                      line-height: 1.55;
                      color: ${TOKENS.nearWhite};
                      margin: 0;
                    ">
                      <strong style="color: ${TOKENS.cream};">Reply directly</strong> to this email to reach
                      <a href="mailto:${escapeHtml(input.sender.email)}" style="color: ${TOKENS.primary}; text-decoration: underline;">${escapeHtml(input.sender.name)}</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer band — dark, primary business name, mute address -->
          <tr>
            <td style="
              background-color: ${TOKENS.panelDeep};
              padding: 22px 32px 24px 32px;
              border-top: 1px solid ${TOKENS.border};
            ">
              <p class="mso-display" style="
                font-family: ${FONT_DISPLAY};
                font-size: 20px;
                font-weight: 600;
                color: ${TOKENS.primary};
                margin: 0 0 5px 0;
                letter-spacing: 0.01em;
              ">${escapeHtml(input.businessName)}</p>
              <p class="mso-mono" style="
                font-family: ${FONT_MONO};
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: ${TOKENS.mute};
                margin: 0;
              ">${escapeHtml(input.businessAddress)}</p>
            </td>
          </tr>

        </table>

        <!-- Tiny mono note below the card -->
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
                color: ${TOKENS.mute};
                margin: 0;
                text-align: center;
              ">
                Service intake · ${escapeHtml(input.businessName)}
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

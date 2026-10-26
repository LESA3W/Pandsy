/**
 * Email HTML template — VOLTAGE / LIVE WIRE direction.
 *
 * Full dark-mode card matching the site exactly: deep voltage navy `#0a1929`
 * body, panel `#11243a`, voltage amber `#fbbf24` accents, Archivo Black
 * display, Inter body, JetBrains Mono labels. Includes a voltage-gradient
 * divider as the section break — T1 ELECTRICIANS' signature atom.
 *
 * `color-scheme: only light` prevents Gmail / Outlook auto-dark-mode from
 * double-inverting the intentionally dark surface.
 *
 * Cross-client compatibility:
 *  - All styles inline (Gmail strips <head><style> for everything except
 *    @media and @import rules)
 *  - Layout uses tables (Outlook ignores flexbox)
 *  - Max-width 600px, centered with margin: 0 auto
 *  - Outlook MSO fallback forces Helvetica / Arial Black (display) + Arial (body)
 *  - Voltage gradient uses linear-gradient — supported in Gmail web, Apple Mail,
 *    modern Outlook. Falls back to a solid amber line in older clients.
 */

import { parseColors } from "./parseColors";
const BRAND = parseColors("{{LOGO_COLORS}}");
const BRAND_FONT_LOGO: string = "{{FONT_LOGO}}";

const GF_HREF: string = "{{GOOGLE_FONTS_HREF}}";
const gfImport = GF_HREF.startsWith("http") ? `@import url("${GF_HREF}");` : "";

const TOKENS = {
  // Site palette — kept identical to tailwind.config.ts so the email reads
  // as a continuation of the website.
  volt: "#0a1929",
  voltDeep: "#050d17",
  voltPanel: "#11243a",
  voltBorder: "#1f3a52",
  voltRule: "#2c4a66",
  voltMute: "#7891a8",
  voltCream: "#e2e8f0",
  // Brand accent — driven by client logo colors at build time.
  amber: BRAND.primary,
  amberBright: BRAND.secondary,
  amberDeep: BRAND.accent,
  amberGlow: BRAND.secondary,
  arc: "#22d3ee",
  cream: "#e8eef0",
};

// Display: Archivo Black is a heavy industrial geometric. Helvetica Neue Black
// and Arial Black are the closest system equivalents (heavy weight grotesque).
const EXISTING_DISPLAY_FALLBACK =
  "'Archivo Black', 'Helvetica Neue', 'Arial Black', Arial, sans-serif";
const FONT_DISPLAY =
  BRAND_FONT_LOGO && !BRAND_FONT_LOGO.startsWith("{{")
    ? `'${BRAND_FONT_LOGO.split(",")[0].trim()}', ` + EXISTING_DISPLAY_FALLBACK
    : EXISTING_DISPLAY_FALLBACK;
// Body: Inter. Standard system-ui chain.
const FONT_BODY =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif";
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
  /** Hero badge text (e.g. "SERVICE CALL · NEW LEAD") */
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
          color: ${TOKENS.voltMute};
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
              font-size: 18px;
              font-weight: 400;
              color: ${TOKENS.amber};
              letter-spacing: 0.02em;
              text-transform: uppercase;
              padding: 0 0 10px 0;
              border-bottom: 1px solid ${TOKENS.voltBorder};
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
            color: ${TOKENS.voltCream};
          ">
            <span style="display:inline-block;width:6px;height:6px;background:${TOKENS.amber};border-radius:50%;vertical-align:middle;margin-right:10px;"></span>${escapeHtml(item.filename)}
          </td>
          <td align="right" style="
            padding: 6px 0;
            font-family: ${FONT_MONO};
            font-size: 11px;
            color: ${TOKENS.voltMute};
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
              font-size: 18px;
              font-weight: 400;
              color: ${TOKENS.amber};
              letter-spacing: 0.02em;
              text-transform: uppercase;
              padding: 0 0 10px 0;
              border-bottom: 1px solid ${TOKENS.voltBorder};
            ">Photos attached (${items.length}) · ${totalLabel}</td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
          background-color: ${TOKENS.voltDeep};
          border: 1px solid ${TOKENS.voltBorder};
          padding: 12px 16px;
        ">
          ${rows}
        </table>
        <p style="
          margin: 10px 0 0 0;
          font-family: ${FONT_BODY};
          font-size: 12px;
          color: ${TOKENS.voltMute};
        ">Files are attached to this email. Open them in your mail client to view.</p>
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
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    /* Prevent client auto-dark-inversion of an intentionally-dark email. */
    :root { color-scheme: only light; }
    body, table, td, p, a, h1, h2, h3 { color-scheme: only light; }

    /* Pin links to amber-bright so Gmail's auto-blue-link rule doesn't override. */
    a, a:link, a:visited, a:hover {
      color: ${TOKENS.amberBright};
      text-decoration: underline;
    }
  </style>
  <!--[if mso]>
  <style>
    .mso-display { font-family: 'Arial Black', Helvetica, sans-serif !important; }
    .mso-body { font-family: Arial, Helvetica, sans-serif !important; }
    .mso-mono { font-family: 'Courier New', monospace !important; }
  </style>
  <![endif]-->
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: ${TOKENS.volt};
  font-family: ${FONT_BODY};
  color: ${TOKENS.cream};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="
    background-color: ${TOKENS.volt};
    padding: 32px 16px;
  ">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="
          width: 100%;
          max-width: 600px;
          background-color: ${TOKENS.voltPanel};
          border: 1px solid ${TOKENS.voltBorder};
        ">

          <!-- Volt-deep header band with amber kicker badge -->
          <tr>
            <td style="
              background-color: ${TOKENS.voltDeep};
              padding: 20px 32px;
              border-bottom: 1px solid ${TOKENS.voltBorder};
            ">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    background-color: ${TOKENS.amber};
                    padding: 6px 14px;
                  ">
                    <span class="mso-mono" style="
                      font-family: ${FONT_MONO};
                      font-size: 11px;
                      font-weight: 500;
                      letter-spacing: 0.2em;
                      text-transform: uppercase;
                      color: ${TOKENS.voltDeep};
                    ">${escapeHtml(input.kicker)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Voltage gradient divider strip — T1 ELECTRICIANS signature.
               Falls back to a solid amber rule in clients that ignore the gradient. -->
          <tr>
            <td style="
              height: 3px;
              background-color: ${TOKENS.amber};
              background-image: linear-gradient(90deg, ${TOKENS.voltRule} 0%, ${TOKENS.amber} 50%, ${TOKENS.voltRule} 100%);
              line-height: 3px;
              font-size: 0;
            ">&nbsp;</td>
          </tr>

          <!-- Headline + intro -->
          <tr>
            <td style="padding: 36px 32px 8px 32px;">
              <h1 class="mso-display" style="
                font-family: ${FONT_DISPLAY};
                font-size: 28px;
                font-weight: 400;
                line-height: 1.1;
                color: ${TOKENS.cream};
                margin: 0 0 16px 0;
                letter-spacing: -0.01em;
                text-transform: uppercase;
              ">${escapeHtml(input.headline)}</h1>
              <p class="mso-body" style="
                font-family: ${FONT_BODY};
                font-size: 15px;
                line-height: 1.65;
                color: ${TOKENS.voltCream};
                margin: 0;
              ">${escapeHtml(input.intro)}</p>
            </td>
          </tr>

          <!-- Body sections (sender + custom sections + attachments) -->
          <tr>
            <td style="padding: 14px 32px 8px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${senderSection}
                ${otherSections}
                ${attachmentsSection}
              </table>
            </td>
          </tr>

          <!-- Reply CTA hint — volt-deep panel with amber left bar -->
          <tr>
            <td style="padding: 8px 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
                background-color: ${TOKENS.voltDeep};
                border: 1px solid ${TOKENS.voltBorder};
                border-left: 4px solid ${TOKENS.amber};
              ">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p class="mso-body" style="
                      font-family: ${FONT_BODY};
                      font-size: 13px;
                      line-height: 1.55;
                      color: ${TOKENS.voltCream};
                      margin: 0;
                    ">
                      <strong style="color: ${TOKENS.cream};">Reply directly</strong> to this email to reach
                      <a href="mailto:${escapeHtml(input.sender.email)}" style="color: ${TOKENS.amberBright}; text-decoration: underline;">${escapeHtml(input.sender.name)}</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer band — volt-deep, amber business name, mute address -->
          <tr>
            <td style="
              background-color: ${TOKENS.voltDeep};
              padding: 22px 32px 24px 32px;
              border-top: 1px solid ${TOKENS.voltBorder};
            ">
              <p class="mso-display" style="
                font-family: ${FONT_DISPLAY};
                font-size: 18px;
                font-weight: 400;
                color: ${TOKENS.amber};
                margin: 0 0 5px 0;
                letter-spacing: 0.02em;
                text-transform: uppercase;
              ">${escapeHtml(input.businessName)}</p>
              <p class="mso-mono" style="
                font-family: ${FONT_MONO};
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: ${TOKENS.voltMute};
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
                color: ${TOKENS.voltMute};
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

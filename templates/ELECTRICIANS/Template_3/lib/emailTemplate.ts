/**
 * Email HTML template — HOT WIRE / LIVE EDITORIAL direction.
 *
 * Light-mode editorial email card matching the site exactly: warm cream surface
 * `#f7f1e8`, cream-deep raised panel `#ede5d6`, deep crimson live-wire accent
 * `#b8252b`, copper bus-bar hairlines, matte ink ink black headlines. Fraunces
 * display serif (heavy fallback), Mona Sans body, Geist Mono for spec labels.
 *
 * Cross-client compatibility:
 *  - All styles inline (Gmail strips <head><style> for everything except
 *    @media and @import rules)
 *  - Layout uses tables (Outlook ignores flexbox)
 *  - Max-width 600px, centered with margin: 0 auto
 *  - Outlook MSO fallback forces Georgia (display) + Arial (body)
 *  - Anti-double-inversion meta tags pin the email to light mode so Gmail's
 *    auto-dark-mode does not invert the crimson stamp atoms into illegible mud.
 *  - Pinned link colors so Gmail's default-blue rule cannot override crimson.
 */

import { parseColors } from "./parseColors";
const BRAND = parseColors("{{LOGO_COLORS}}");
const BRAND_FONT_LOGO: string = "{{FONT_LOGO}}";

const GF_HREF: string = "{{GOOGLE_FONTS_HREF}}";
const gfImport = GF_HREF.startsWith("http") ? `@import url("${GF_HREF}");` : "";

const TOKENS = {
  // Site palette — kept identical to tailwind.config.ts so the email reads as
  // a continuation of the website.
  cream: "#f7f1e8",
  creamDeep: "#ede5d6",
  creamRule: "#dcd1bd",
  creamTint: "#fbf6ee",
  ink: "#0d0d0e",
  inkPanel: "#1a1a1c",
  inkMute: "#6b6661",
  ash: "#5a5550",
  ashDeep: "#3d3935",
  // Brand accent — driven by client logo colors at build time.
  crimson: BRAND.primary,
  crimsonDeep: BRAND.secondary,
  crimsonGlow: BRAND.accent,
  // Atmospheric neutrals — define T3's editorial copper-patina identity.
  ember: "#d94c1f",
  copper: "#c87f3f",
  copperDeep: "#945a26",
  copperGlow: "#e3a268",
};

// Display: Fraunces is a slab-soft variable serif. Georgia and Times New Roman
// share editorial-serif proportions — heavy fallback for clients that strip @import.
const EXISTING_DISPLAY_FALLBACK =
  "'Fraunces', Georgia, 'Times New Roman', 'Hoefler Text', serif";
const FONT_DISPLAY =
  BRAND_FONT_LOGO && !BRAND_FONT_LOGO.startsWith("{{")
    ? `'${BRAND_FONT_LOGO.split(",")[0].trim()}', ` + EXISTING_DISPLAY_FALLBACK
    : EXISTING_DISPLAY_FALLBACK;
// Body: Mona Sans. Confident humanist sans.
const FONT_BODY =
  "'Mona Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif";
// Mono: Geist Mono. Clean modern monospace.
const FONT_MONO =
  "'Geist Mono', Menlo, Consolas, 'Courier New', ui-monospace, monospace";

type EmailField = {
  label: string;
  value: string;
  multiline?: boolean;
};

type EmailAttachmentMeta = { filename: string; sizeBytes: number };

type EmailTemplateInput = {
  /** Hero badge text (e.g. "TICKET / NEW LEAD") */
  kicker: string;
  /** Main headline of the email body */
  headline: string;
  /** One-line preamble shown above the data fields */
  intro: string;
  /** Sender block (always present) */
  sender: { name: string; email: string; phone?: string };
  /** Optional sections of fields, each with a title */
  sections: { title: string; fields: EmailField[] }[];
  /** Optional photo attachments metadata */
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
      <td style="padding: 0 0 14px 0;">
        <div style="
          font-family: ${FONT_MONO};
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${TOKENS.copperDeep};
          margin: 0 0 4px 0;
        ">${label}</div>
        <div style="
          font-family: ${FONT_BODY};
          font-size: 15px;
          line-height: 1.55;
          color: ${TOKENS.ink};
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
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 0 14px 0;">
          <tr>
            <td style="
              font-family: ${FONT_DISPLAY};
              font-size: 15px;
              font-weight: 700;
              color: ${TOKENS.crimson};
              letter-spacing: -0.01em;
              padding: 0 0 8px 0;
              border-bottom: 1px solid ${TOKENS.copper};
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
            color: ${TOKENS.ink};
          ">
            <span style="display:inline-block;width:6px;height:6px;background:${TOKENS.crimson};border-radius:50%;vertical-align:middle;margin-right:10px;"></span>${escapeHtml(item.filename)}
          </td>
          <td align="right" style="
            padding: 6px 0;
            font-family: ${FONT_MONO};
            font-size: 11px;
            color: ${TOKENS.ash};
          ">${formatSize(item.sizeBytes)}</td>
        </tr>`,
    )
    .join("");

  return `
    <tr>
      <td style="padding: 22px 0 8px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 0 14px 0;">
          <tr>
            <td style="
              font-family: ${FONT_DISPLAY};
              font-size: 15px;
              font-weight: 700;
              color: ${TOKENS.crimson};
              letter-spacing: -0.01em;
              padding: 0 0 8px 0;
              border-bottom: 1px solid ${TOKENS.copper};
            ">Photos attached (${items.length}) / ${totalLabel}</td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
          background-color: ${TOKENS.creamDeep};
          border: 1px solid ${TOKENS.creamRule};
          padding: 12px 16px;
        ">
          ${rows}
        </table>
        <p style="
          margin: 10px 0 0 0;
          font-family: ${FONT_BODY};
          font-size: 12px;
          color: ${TOKENS.ash};
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
    :root { color-scheme: only light; }
    ${gfImport}
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Mona+Sans:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');

    /* Pin links to crimson so Gmail's auto-blue-link rule produces the right color. */
    a, a:link, a:visited, a:hover {
      color: ${TOKENS.crimson};
      text-decoration: underline;
    }
  </style>
  <!--[if mso]>
  <style>
    .mso-display { font-family: Georgia, 'Times New Roman', serif !important; font-weight: bold !important; }
    .mso-body { font-family: Arial, Helvetica, sans-serif !important; }
    .mso-mono { font-family: 'Courier New', monospace !important; }
  </style>
  <![endif]-->
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: ${TOKENS.creamDeep};
  font-family: ${FONT_BODY};
  color: ${TOKENS.ink};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="
    background-color: ${TOKENS.creamDeep};
    padding: 32px 16px;
  ">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="
          width: 100%;
          max-width: 600px;
          background-color: ${TOKENS.cream};
          border: 1px solid ${TOKENS.creamRule};
        ">

          <!-- Crimson stripe band as the top header strip — HOT WIRE signature.
               Solid crimson ribbon. Different from T1 amber-line and T2 hazard-tape. -->
          <tr>
            <td style="
              height: 6px;
              background-color: ${TOKENS.crimson};
              line-height: 6px;
              font-size: 0;
            ">&nbsp;</td>
          </tr>

          <!-- Cream-deep header band with kicker stamp in crimson -->
          <tr>
            <td style="
              background-color: ${TOKENS.creamDeep};
              padding: 24px 32px 22px 32px;
              border-bottom: 1px solid ${TOKENS.copper};
            ">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    background-color: ${TOKENS.crimson};
                    padding: 6px 14px;
                  ">
                    <span class="mso-mono" style="
                      font-family: ${FONT_MONO};
                      font-size: 11px;
                      font-weight: 500;
                      letter-spacing: 0.22em;
                      text-transform: uppercase;
                      color: ${TOKENS.cream};
                    ">${escapeHtml(input.kicker)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Headline + intro -->
          <tr>
            <td style="padding: 32px 32px 6px 32px;">
              <h1 class="mso-display" style="
                font-family: ${FONT_DISPLAY};
                font-size: 30px;
                font-weight: 700;
                line-height: 1.1;
                color: ${TOKENS.ink};
                margin: 0 0 14px 0;
                letter-spacing: -0.022em;
              ">${escapeHtml(input.headline)}</h1>
              <p class="mso-body" style="
                font-family: ${FONT_BODY};
                font-size: 15px;
                line-height: 1.65;
                color: ${TOKENS.ash};
                margin: 0;
              ">${escapeHtml(input.intro)}</p>
            </td>
          </tr>

          <!-- Body sections -->
          <tr>
            <td style="padding: 14px 32px 8px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${senderSection}
                ${otherSections}
                ${attachmentsSection}
              </table>
            </td>
          </tr>

          <!-- Reply CTA hint — cream-deep panel with crimson left bar -->
          <tr>
            <td style="padding: 8px 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
                background-color: ${TOKENS.creamDeep};
                border: 1px solid ${TOKENS.creamRule};
                border-left: 4px solid ${TOKENS.crimson};
              ">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p class="mso-body" style="
                      font-family: ${FONT_BODY};
                      font-size: 13px;
                      line-height: 1.55;
                      color: ${TOKENS.ash};
                      margin: 0;
                    ">
                      <strong style="color: ${TOKENS.ink};">Reply directly</strong> to this email to reach
                      <a href="mailto:${escapeHtml(input.sender.email)}" style="color: ${TOKENS.crimson}; text-decoration: underline;">${escapeHtml(input.sender.name)}</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer band — ink-panel dark, crimson business name, mono address -->
          <tr>
            <td style="
              background-color: ${TOKENS.inkPanel};
              padding: 22px 32px 24px 32px;
              border-top: 1px solid ${TOKENS.copper};
            ">
              <p class="mso-display" style="
                font-family: ${FONT_DISPLAY};
                font-size: 20px;
                font-weight: 700;
                color: ${TOKENS.crimsonGlow};
                margin: 0 0 5px 0;
                letter-spacing: -0.018em;
              ">${escapeHtml(input.businessName)}</p>
              <p class="mso-mono" style="
                font-family: ${FONT_MONO};
                font-size: 11px;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: ${TOKENS.copperGlow};
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
                letter-spacing: 0.18em;
                text-transform: uppercase;
                color: ${TOKENS.ashDeep};
                margin: 0;
                text-align: center;
              ">
                Hand-stamped ticket / ${escapeHtml(input.businessName)}
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

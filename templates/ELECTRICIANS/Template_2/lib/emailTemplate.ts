/**
 * Email HTML template — BLUEPRINT / GRID direction.
 *
 * Light-mode email card matching the site exactly: paper-white surface
 * `#fafbfc`, paper-deep raised panel `#f1f4f7`, voltage-yellow accent
 * (driven by --color-primary at runtime), hazard-yellow stripe for the
 * kicker tape, alert red for emergency notes. Space Grotesk display,
 * Inter Tight body, IBM Plex Mono for spec labels.
 *
 * Light-mode emails do NOT need anti-double-inversion meta tags as
 * aggressively (Gmail/Outlook auto-dark-mode tries to invert them but the
 * outcome is generally readable). We still pin links to the brand primary
 * and force MSO fallbacks for the heavy display weight.
 *
 * Cross-client compatibility:
 *  - All styles inline (Gmail strips <head><style> for everything except
 *    @media and @import rules)
 *  - Layout uses tables (Outlook ignores flexbox)
 *  - Max-width 600px, centered with margin: 0 auto
 *  - Outlook MSO fallback forces Helvetica (display) + Arial (body)
 *  - Hazard tape band uses repeating-linear-gradient (modern clients) with
 *    a flat hazard-yellow background-color fallback for older clients.
 */

import { parseColors } from "./parseColors";
const BRAND = parseColors("{{LOGO_COLORS}}");
const BRAND_FONT_LOGO: string = "{{FONT_LOGO}}";

const GF_HREF: string = "{{GOOGLE_FONTS_HREF}}";
const gfImport = GF_HREF.startsWith("http") ? `@import url("${GF_HREF}");` : "";

const TOKENS = {
  // Site palette — kept identical to tailwind.config.ts so the email reads
  // as a continuation of the website.
  paper: "#fafbfc",
  paperDeep: "#f1f4f7",
  paperTint: "#e4ebf2",
  paperRule: "#cbd5e0",
  steel: "#475569",
  steelDeep: "#1e293b",
  steelInk: "#0f172a",
  steelMute: "#64748b",
  steelRule: "#94a3b8",
  steelPanel: "#334155",
  // Brand accent — driven by client logo colors at build time.
  sapphire: BRAND.primary,
  sapphireBright: BRAND.secondary,
  sapphireDeep: BRAND.accent,
  sapphireTint: "#fef9c3",
  // Structural signature — keep fixed (defines T2's hazard-tape identity).
  hazard: "#eab308",
  hazardDeep: "#a16207",
  alert: "#dc2626",
  alertDeep: "#991b1b",
  alertTint: "#fee2e2",
};

// Display: Space Grotesk is a technical-neutral grotesque. Helvetica Neue and
// Helvetica are clean fallbacks for the same proportions.
const EXISTING_DISPLAY_FALLBACK =
  "'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const FONT_DISPLAY =
  BRAND_FONT_LOGO && !BRAND_FONT_LOGO.startsWith("{{")
    ? `'${BRAND_FONT_LOGO.split(",")[0].trim()}', ` + EXISTING_DISPLAY_FALLBACK
    : EXISTING_DISPLAY_FALLBACK;
// Body: Inter Tight. Tighter horizontal width than regular Inter.
const FONT_BODY =
  "'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif";
// Mono: IBM Plex Mono. Humanist monospace.
const FONT_MONO =
  "'IBM Plex Mono', Menlo, Consolas, 'Courier New', ui-monospace, monospace";

type EmailField = {
  label: string;
  value: string;
  multiline?: boolean;
};

type EmailAttachmentMeta = { filename: string; sizeBytes: number };

type EmailTemplateInput = {
  /** Hero badge text (e.g. "SERVICE TICKET / NEW LEAD") */
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
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${TOKENS.steelMute};
          margin: 0 0 4px 0;
        ">${label}</div>
        <div style="
          font-family: ${FONT_BODY};
          font-size: 15px;
          line-height: 1.55;
          color: ${TOKENS.steelDeep};
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
              font-size: 13px;
              font-weight: 600;
              color: ${TOKENS.sapphire};
              letter-spacing: 0.14em;
              text-transform: uppercase;
              padding: 0 0 8px 0;
              border-bottom: 1px solid ${TOKENS.paperRule};
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
            color: ${TOKENS.steelDeep};
          ">
            <span style="display:inline-block;width:6px;height:6px;background:${TOKENS.sapphire};border-radius:50%;vertical-align:middle;margin-right:10px;"></span>${escapeHtml(item.filename)}
          </td>
          <td align="right" style="
            padding: 6px 0;
            font-family: ${FONT_MONO};
            font-size: 11px;
            color: ${TOKENS.steelMute};
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
              font-size: 13px;
              font-weight: 600;
              color: ${TOKENS.sapphire};
              letter-spacing: 0.14em;
              text-transform: uppercase;
              padding: 0 0 8px 0;
              border-bottom: 1px solid ${TOKENS.paperRule};
            ">Photos attached (${items.length}) / ${totalLabel}</td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
          background-color: ${TOKENS.paperTint};
          border: 1px solid ${TOKENS.paperRule};
          padding: 12px 16px;
        ">
          ${rows}
        </table>
        <p style="
          margin: 10px 0 0 0;
          font-family: ${FONT_BODY};
          font-size: 12px;
          color: ${TOKENS.steelMute};
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
  <title>${escapeHtml(input.headline)}</title>
  <style>
    ${gfImport}
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter+Tight:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

    /* Pin links to primary brand color so Gmail's auto-blue-link rule is overridden. */
    a, a:link, a:visited, a:hover {
      color: ${TOKENS.sapphire};
      text-decoration: underline;
    }
  </style>
  <!--[if mso]>
  <style>
    .mso-display { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important; font-weight: bold !important; }
    .mso-body { font-family: Arial, Helvetica, sans-serif !important; }
    .mso-mono { font-family: 'Courier New', monospace !important; }
  </style>
  <![endif]-->
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: ${TOKENS.paperTint};
  font-family: ${FONT_BODY};
  color: ${TOKENS.steelDeep};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="
    background-color: ${TOKENS.paperTint};
    padding: 32px 16px;
  ">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="
          width: 100%;
          max-width: 600px;
          background-color: ${TOKENS.paper};
          border: 1px solid ${TOKENS.paperRule};
        ">

          <!-- Hazard-tape band as the top header strip — T2 BLUEPRINT signature.
               Diagonal yellow-on-steel-deep stripes. Falls back to flat hazard
               in clients that ignore repeating-linear-gradient. -->
          <tr>
            <td style="
              height: 8px;
              background-color: ${TOKENS.hazard};
              background-image: repeating-linear-gradient(135deg, ${TOKENS.hazard} 0 12px, ${TOKENS.steelDeep} 12px 24px);
              line-height: 8px;
              font-size: 0;
            ">&nbsp;</td>
          </tr>

          <!-- Header band with kicker tag in brand primary -->
          <tr>
            <td style="
              background-color: ${TOKENS.paperDeep};
              padding: 22px 32px;
              border-bottom: 1px solid ${TOKENS.paperRule};
            ">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    background-color: ${TOKENS.sapphire};
                    padding: 5px 12px;
                  ">
                    <span class="mso-mono" style="
                      font-family: ${FONT_MONO};
                      font-size: 11px;
                      font-weight: 500;
                      letter-spacing: 0.18em;
                      text-transform: uppercase;
                      color: ${TOKENS.paper};
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
                font-size: 28px;
                font-weight: 600;
                line-height: 1.15;
                color: ${TOKENS.steelInk};
                margin: 0 0 14px 0;
                letter-spacing: -0.02em;
              ">${escapeHtml(input.headline)}</h1>
              <p class="mso-body" style="
                font-family: ${FONT_BODY};
                font-size: 15px;
                line-height: 1.65;
                color: ${TOKENS.steel};
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

          <!-- Reply CTA hint — paper-tint panel with brand-primary left bar -->
          <tr>
            <td style="padding: 8px 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
                background-color: ${TOKENS.paperDeep};
                border: 1px solid ${TOKENS.paperRule};
                border-left: 4px solid ${TOKENS.sapphire};
              ">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p class="mso-body" style="
                      font-family: ${FONT_BODY};
                      font-size: 13px;
                      line-height: 1.55;
                      color: ${TOKENS.steel};
                      margin: 0;
                    ">
                      <strong style="color: ${TOKENS.steelInk};">Reply directly</strong> to this email to reach
                      <a href="mailto:${escapeHtml(input.sender.email)}" style="color: ${TOKENS.sapphire}; text-decoration: underline;">${escapeHtml(input.sender.name)}</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer band — steel-deep surface, brand-primary business name, mono address -->
          <tr>
            <td style="
              background-color: ${TOKENS.steelDeep};
              padding: 22px 32px 24px 32px;
              border-top: 1px solid ${TOKENS.paperRule};
            ">
              <p class="mso-display" style="
                font-family: ${FONT_DISPLAY};
                font-size: 18px;
                font-weight: 700;
                color: ${TOKENS.paper};
                margin: 0 0 5px 0;
                letter-spacing: -0.01em;
              ">${escapeHtml(input.businessName)}</p>
              <p class="mso-mono" style="
                font-family: ${FONT_MONO};
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: ${TOKENS.steelRule};
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
                color: ${TOKENS.steelMute};
                margin: 0;
                text-align: center;
              ">
                Service ticket / ${escapeHtml(input.businessName)}
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

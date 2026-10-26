/**
 * Email HTML template — Heritage Workshop direction.
 *
 * Matches the visual identity of Template_2 (cream + forest + client brand
 * clay accent + stone, Zilla Slab display + Inter body) so that the email a
 * client receives feels like an extension of their website, not a generic
 * system notification.
 *
 * Rendering constraints respected for cross-client compatibility:
 *  - All styles inline (Gmail strips <head><style>)
 *  - Layout uses tables (Outlook ignores flexbox)
 *  - Web fonts loaded via Google Fonts <link>, with serif/sans fallbacks for
 *    Outlook (which never loads remote fonts)
 *  - Max-width 600px, centered with margin: 0 auto
 *  - Light mode background (cream) — never relies on user dark-mode override
 */

import { parseColors } from "./parseColors";
const BRAND = parseColors("{{LOGO_COLORS}}");
// BRAND.primary, BRAND.secondary, BRAND.accent are hex strings

const BRAND_FONT_LOGO: string = "{{FONT_LOGO}}";

const GF_HREF: string = "{{GOOGLE_FONTS_HREF}}";
const gfImport = GF_HREF.startsWith("http") ? `@import url("${GF_HREF}");` : "";

// Token values mirror tailwind.config.ts so the email matches the site exactly.
// Mood neutrals (cream, paper, stone, forest, ink) are locked to the template's
// workshop atmosphere. Only the clay/clayDeep brand accent slots bend to the
// client's logo colors.
const TOKENS = {
  cream: "#f4ecd8",
  paper: "#fbf6e9",
  stone: "#d9d0bb",
  stoneSoft: "#ece4cf",
  forest: "#1f3d2b",
  forestDeep: "#152a1d",
  // Brand accent — driven by client logo colors at build time.
  clay: BRAND.primary,
  clayDeep: BRAND.secondary,
  ink: "#2a2520",
  inkSoft: "#4a423b",
  inkMute: "#7a6f64",
};

const EXISTING_DISPLAY_FALLBACK = "'Zilla Slab', Georgia, 'Times New Roman', serif";
// DISPLAY_FONT prefers the client's logo font when available, falling back
// to the template's slab-serif display stack.
const DISPLAY_FONT =
  BRAND_FONT_LOGO && !BRAND_FONT_LOGO.startsWith("{{")
    ? `'${BRAND_FONT_LOGO.split(",")[0].trim()}', ` + EXISTING_DISPLAY_FALLBACK
    : EXISTING_DISPLAY_FALLBACK;
const FONT_BODY =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

type EmailField = {
  /** Label shown in small-caps above the value */
  label: string;
  /** The value itself (will be escaped before injection) */
  value: string;
  /** If true, value is rendered as a paragraph block (multiline preserved) */
  multiline?: boolean;
};

type EmailAttachmentMeta = { filename: string; sizeBytes: number };

type EmailTemplateInput = {
  /** Hero badge text (e.g. "New quote request" or "New contact message") */
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
      <td style="padding: 0 0 18px 0;">
        <div style="
          font-family: ${FONT_BODY};
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${TOKENS.inkMute};
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
      <td style="padding: 24px 0 8px 0;">
        <div style="
          font-family: ${DISPLAY_FONT};
          font-size: 14px;
          font-weight: 600;
          color: ${TOKENS.forest};
          letter-spacing: 0.04em;
          margin: 0 0 16px 0;
          padding: 0 0 10px 0;
          border-bottom: 1px solid ${TOKENS.stone};
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
            color: ${TOKENS.ink};
          ">
            <span style="display:inline-block;width:6px;height:6px;background:${TOKENS.clay};border-radius:50%;vertical-align:middle;margin-right:10px;"></span>${escapeHtml(item.filename)}
          </td>
          <td align="right" style="
            padding: 6px 0;
            font-family: ${FONT_BODY};
            font-size: 11px;
            color: ${TOKENS.inkMute};
          ">${formatSize(item.sizeBytes)}</td>
        </tr>`,
    )
    .join("");

  return `
    <tr>
      <td style="padding: 24px 0 8px 0;">
        <div style="
          font-family: ${DISPLAY_FONT};
          font-size: 14px;
          font-weight: 600;
          color: ${TOKENS.forest};
          letter-spacing: 0.04em;
          margin: 0 0 16px 0;
          padding: 0 0 10px 0;
          border-bottom: 1px solid ${TOKENS.stone};
        ">Photos attached (${items.length}) · ${totalLabel}</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
          background-color: ${TOKENS.stoneSoft};
          border: 1px solid ${TOKENS.stone};
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
  <title>${escapeHtml(input.headline)}</title>
  <style>
    /* Web fonts via @import (more reliable than <link> in Apple Mail and
       Gmail web than <link> for some clients). */
    @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
    ${gfImport}
  </style>
  <!--[if mso]>
  <style>
    * { font-family: Georgia, 'Times New Roman', serif !important; }
  </style>
  <![endif]-->
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: ${TOKENS.cream};
  font-family: ${FONT_BODY};
  color: ${TOKENS.ink};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
">

  <!-- Outer wrapper. Forces center alignment on Outlook + Gmail mobile. -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="
    background-color: ${TOKENS.cream};
    padding: 32px 16px;
  ">
    <tr>
      <td align="center">

        <!-- Inner card. 600px max width, centered. -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="
          width: 100%;
          max-width: 600px;
          background-color: ${TOKENS.paper};
          border: 1px solid ${TOKENS.stone};
          border-radius: 4px;
        ">

          <!-- Forest header band with kicker -->
          <tr>
            <td style="
              background-color: ${TOKENS.forest};
              padding: 14px 32px;
              border-radius: 4px 4px 0 0;
            ">
              <div style="
                font-family: ${FONT_BODY};
                font-size: 11px;
                letter-spacing: 0.18em;
                text-transform: uppercase;
                color: ${TOKENS.cream};
                margin: 0;
              ">
                <span style="color: ${TOKENS.clay}; margin-right: 10px;">▸</span>
                ${escapeHtml(input.kicker)}
              </div>
            </td>
          </tr>

          <!-- Headline + intro -->
          <tr>
            <td style="padding: 36px 32px 8px 32px;">
              <h1 style="
                font-family: ${DISPLAY_FONT};
                font-size: 28px;
                font-weight: 700;
                line-height: 1.1;
                color: ${TOKENS.ink};
                margin: 0 0 14px 0;
                letter-spacing: -0.01em;
              ">${escapeHtml(input.headline)}</h1>
              <p style="
                font-family: ${FONT_BODY};
                font-size: 15px;
                line-height: 1.55;
                color: ${TOKENS.inkSoft};
                margin: 0;
              ">${escapeHtml(input.intro)}</p>
            </td>
          </tr>

          <!-- Body sections (sender + custom sections) -->
          <tr>
            <td style="padding: 16px 32px 8px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${senderSection}
                ${otherSections}
                ${attachmentsSection}
              </table>
            </td>
          </tr>

          <!-- Reply CTA hint -->
          <tr>
            <td style="padding: 8px 32px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="
                background-color: ${TOKENS.stoneSoft};
                border-left: 3px solid ${TOKENS.clay};
              ">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p style="
                      font-family: ${FONT_BODY};
                      font-size: 13px;
                      line-height: 1.5;
                      color: ${TOKENS.inkSoft};
                      margin: 0;
                    ">
                      <strong style="color: ${TOKENS.ink};">Reply directly</strong> to this email to reach
                      <a href="mailto:${escapeHtml(input.sender.email)}" style="color: ${TOKENS.clay}; text-decoration: underline;">${escapeHtml(input.sender.name)}</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer with business name -->
          <tr>
            <td style="
              padding: 20px 32px 24px 32px;
              border-top: 1px solid ${TOKENS.stone};
              background-color: ${TOKENS.cream};
              border-radius: 0 0 4px 4px;
            ">
              <p style="
                font-family: ${DISPLAY_FONT};
                font-size: 14px;
                font-weight: 600;
                color: ${TOKENS.forest};
                margin: 0 0 4px 0;
              ">${escapeHtml(input.businessName)}</p>
              <p style="
                font-family: ${FONT_BODY};
                font-size: 12px;
                color: ${TOKENS.inkMute};
                margin: 0;
              ">${escapeHtml(input.businessAddress)}</p>
            </td>
          </tr>

        </table>

        <!-- Tiny footer note below the card -->
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
                color: ${TOKENS.inkMute};
                margin: 0;
                text-align: center;
              ">
                Sent from your website contact form.
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

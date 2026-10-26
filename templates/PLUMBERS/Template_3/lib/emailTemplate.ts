// Email HTML renderer for /api/quote and /api/contact (CLAUDE.md rule #9b).
//
// CLEARLINE / CLEAN WATER SERVICE — light cloud email:
//  - Cloud surface (#fafcfd), aqua-deep header band, aqua kicker accents,
//    vermillion reply stripe, Mona Sans Black display + Inter body + Geist Mono utility.
//  - Inline styles + table layout (Outlook-safe).
//  - Outlook MSO conditional fallback to Helvetica/Arial Black for the heavy display.
//  - Pinned link colors so Gmail does not force blue.
//  - NO anti-double-inversion meta tags (light email — Gmail/Outlook auto-dark
//    inverts to a sane light-on-dark, only required for already-dark emails).

import { parseColors } from "./parseColors";
const BRAND = parseColors("{{LOGO_COLORS}}");

const BRAND_FONT_LOGO: string = "{{FONT_LOGO}}";
const GF_HREF: string = "{{GOOGLE_FONTS_HREF}}";
const gfImport = GF_HREF.startsWith("http") ? `@import url("${GF_HREF}");` : "";

// Template-mood neutrals — LOCKED. These define the cloud/clean atmosphere.
const CLOUD = "#fafcfd";
const PEARL = "#f1f7fa";
const SKY_SOFT = "#e0f2fe";
const CHROME = "#cdd5db";
const CHROME_MUTE = "#94a3b8";
const INK = "#0f1d28";
const INK_MUTE = "#475569";

// Brand accents — driven by client logo colors at build time.
const AQUA = BRAND.primary;
const AQUA_DEEP = BRAND.secondary;
const VERMILLION = BRAND.accent;

const DISPLAY_FALLBACK = "'Helvetica Neue', 'Arial Black', Arial, sans-serif";
const FONT_DISPLAY =
  (BRAND_FONT_LOGO && !BRAND_FONT_LOGO.startsWith("{{"))
    ? `'${BRAND_FONT_LOGO.split(",")[0].trim()}', 'Mona Sans', ${DISPLAY_FALLBACK}`
    : `'Mona Sans', ${DISPLAY_FALLBACK}`;
const FONT_SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO =
  "'Geist Mono', Menlo, Consolas, monospace";

export type EmailField = { label: string; value: string };
export type EmailAttachmentMeta = { filename: string; sizeBytes: number };

export type EmailPayload = {
  kind: "quote" | "contact";
  businessName: string;
  businessAddress: string;
  kicker: string;
  headline: string;
  intro: string;
  sender: { name: string; email: string; phone?: string };
  customerSections?: Array<{ title: string; fields: EmailField[] }>;
  attachments?: EmailAttachmentMeta[];
};

export function renderEmailHtml(p: EmailPayload): string {
  const customerDetails: EmailField[] = [
    { label: "Name", value: p.sender.name },
    { label: "Email", value: p.sender.email },
  ];
  if (p.sender.phone) customerDetails.push({ label: "Phone", value: p.sender.phone });

  const sections = [
    { title: "Customer details", fields: customerDetails },
    ...(p.customerSections ?? []),
  ];

  const attachmentsBlock =
    p.attachments && p.attachments.length > 0
      ? attachmentsListBlock(p.attachments)
      : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escape(p.businessName)} — ${escape(p.headline)}</title>
<style>
${gfImport}
@import url('https://fonts.googleapis.com/css2?family=Mona+Sans:wght@700;800;900&family=Inter:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');
body { margin: 0; padding: 0; background: ${PEARL}; }
a, a:link, a:visited, a:hover, a:active { color: ${AQUA_DEEP}; text-decoration: none; }
.aqua-link { color: ${AQUA_DEEP} !important; }
</style>
<!--[if mso]>
<style>
* { font-family: Arial, Helvetica, sans-serif !important; }
.mso-display { font-family: 'Arial Black', Arial, Helvetica, sans-serif !important; font-weight: 900 !important; }
</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background:${PEARL};font-family:${FONT_SANS};color:${INK};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PEARL};padding:32px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;margin:0 auto;background:${CLOUD};border:1px solid ${CHROME};border-radius:8px;overflow:hidden;">
        ${headerBand(p.kicker)}
        ${headlineBlock(p.headline, p.intro)}
        ${sectionsBlock(sections)}
        ${attachmentsBlock}
        ${replyHint(p.sender.name)}
        ${footerBand(p.businessName, p.businessAddress)}
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function headerBand(kicker: string): string {
  return `
<tr>
  <td style="padding:0;background:${AQUA_DEEP};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:20px 36px;background:${AQUA_DEEP};">
          <p style="margin:0;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#ffffff;">
            <span style="display:inline-block;width:7px;height:7px;background:#ffffff;border-radius:50%;vertical-align:middle;margin-right:10px;"></span>${escape(kicker)}
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>
<tr><td style="height:3px;background:${AQUA};line-height:3px;font-size:0;">&nbsp;</td></tr>`;
}

function headlineBlock(headline: string, intro: string): string {
  return `
<tr>
  <td style="padding:32px 36px 24px 36px;background:${CLOUD};">
    <h1 class="mso-display" style="margin:0 0 14px 0;font-family:${FONT_DISPLAY};font-size:30px;line-height:1.12;font-weight:900;color:${INK};letter-spacing:-0.025em;">
      ${escape(headline)}
    </h1>
    <p style="margin:0;font-family:${FONT_SANS};font-size:15px;line-height:1.55;color:${INK_MUTE};">
      ${escape(intro)}
    </p>
  </td>
</tr>
<tr>
  <td style="padding:0 36px;background:${CLOUD};">
    <div style="height:1px;background:${CHROME};line-height:1px;font-size:0;">&nbsp;</div>
  </td>
</tr>`;
}

function sectionsBlock(sections: Array<{ title: string; fields: EmailField[] }>): string {
  return sections
    .map(
      (s) => `
<tr>
  <td style="padding:24px 36px 8px 36px;background:${CLOUD};">
    <p style="margin:0 0 14px 0;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${AQUA_DEEP};">
      <span style="display:inline-block;width:3px;height:11px;background:${AQUA};vertical-align:middle;margin-right:10px;"></span>${escape(s.title)}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${s.fields.map((f) => fieldRow(f)).join("")}
    </table>
  </td>
</tr>`,
    )
    .join("");
}

function fieldRow(f: EmailField): string {
  return `
<tr>
  <td width="35%" style="padding:6px 12px 6px 0;vertical-align:top;font-family:${FONT_MONO};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${CHROME_MUTE};">
    ${escape(f.label)}
  </td>
  <td style="padding:6px 0;vertical-align:top;font-family:${FONT_SANS};font-size:14px;line-height:1.55;color:${INK};">
    ${escapeMultiline(f.value)}
  </td>
</tr>`;
}

function attachmentsListBlock(items: EmailAttachmentMeta[]): string {
  const totalKb = items.reduce((sum, i) => sum + i.sizeBytes, 0) / 1024;
  const totalLabel =
    totalKb < 1024 ? `${totalKb.toFixed(0)} KB` : `${(totalKb / 1024).toFixed(2)} MB`;
  const rows = items
    .map(
      (item) => `
<tr>
  <td style="padding:5px 0;font-family:${FONT_MONO};font-size:12px;color:${INK};">
    <span style="display:inline-block;width:6px;height:6px;background:${AQUA};border-radius:50%;vertical-align:middle;margin-right:8px;"></span>${escape(item.filename)}
  </td>
  <td align="right" style="padding:5px 0;font-family:${FONT_MONO};font-size:11px;color:${CHROME_MUTE};">
    ${formatKb(item.sizeBytes)}
  </td>
</tr>`,
    )
    .join("");
  return `
<tr>
  <td style="padding:24px 36px 8px 36px;background:${CLOUD};">
    <p style="margin:0 0 14px 0;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${AQUA_DEEP};">
      <span style="display:inline-block;width:3px;height:11px;background:${AQUA};vertical-align:middle;margin-right:10px;"></span>Photos attached (${items.length}) · ${totalLabel}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SKY_SOFT};padding:14px 18px;border:1px solid ${CHROME};border-radius:6px;">
      ${rows}
    </table>
    <p style="margin:10px 0 0 0;font-family:${FONT_SANS};font-size:12px;color:${INK_MUTE};">
      Files are attached to this email — open them in your mail client to view.
    </p>
  </td>
</tr>`;
}

function formatKb(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_000_000) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1_000_000).toFixed(2)} MB`;
}

function replyHint(senderName: string): string {
  return `
<tr>
  <td style="padding:18px 36px 8px 36px;background:${CLOUD};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PEARL};border-left:4px solid ${VERMILLION};border-radius:0 4px 4px 0;">
      <tr>
        <td style="padding:14px 18px;font-family:${FONT_SANS};font-size:13px;line-height:1.55;color:${INK};">
          Reply directly to this email to reach <strong>${escape(senderName)}</strong>. Their address is set as the reply-to.
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function footerBand(businessName: string, businessAddress: string): string {
  return `
<tr>
  <td style="padding:24px 36px 30px 36px;background:${CLOUD};">
    <div style="height:1px;background:${CHROME};margin-bottom:20px;line-height:1px;font-size:0;">&nbsp;</div>
    <p class="mso-display" style="margin:0 0 4px 0;font-family:${FONT_DISPLAY};font-size:15px;font-weight:800;color:${AQUA_DEEP};letter-spacing:-0.015em;">
      ${escape(businessName)}
    </p>
    <p style="margin:0;font-family:${FONT_SANS};font-size:12px;color:${INK_MUTE};">
      ${escape(businessAddress)}
    </p>
  </td>
</tr>
<tr><td style="height:4px;background:${AQUA_DEEP};line-height:4px;font-size:0;">&nbsp;</td></tr>`;
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeMultiline(s: string): string {
  return escape(s).replace(/\r?\n/g, "<br />");
}

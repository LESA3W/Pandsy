// Email HTML renderer for /api/quote and /api/contact (CLAUDE.md rule #9b).
//
// BRASS LINE / SHOP DRAWINGS — light cream email:
//  - Bone surface, brass accents, IBM Plex Serif headlines, Work Sans body.
//  - Inline styles + table layout (Outlook-safe).
//  - Outlook MSO conditional fallback to Georgia + Arial.
//  - Pinned link colors so Gmail does not force blue.
//  - NO anti-double-inversion meta tags (light email, only required for dark).

import { parseColors } from "./parseColors";
const BRAND = parseColors("{{LOGO_COLORS}}");

const BRAND_FONT_LOGO: string = "{{FONT_LOGO}}";
const GF_HREF: string = "{{GOOGLE_FONTS_HREF}}";
const gfImport = GF_HREF.startsWith("http") ? `@import url("${GF_HREF}");` : "";

// Template-mood neutrals — LOCKED. These define the cream/paper atmosphere.
const BONE = "#f4ede2";
const BONE_DEEP = "#e9dfcf";
const BONE_RULE = "#d8cab4";
const PAPER_INK = "#1b1f26";
const PAPER_MUTE = "#5b6168";
// HARBOR is a DARK NEUTRAL SURFACE (#1f3a5c) used for the footer band — LOCKED.
const HARBOR = "#1f3a5c";

// Brand accents — driven by client logo colors at build time.
const BRASS = BRAND.primary;
const BRASS_DEEP = BRAND.secondary;

const DISPLAY_FALLBACK = "Georgia, 'Times New Roman', serif";
const FONT_DISPLAY =
  (BRAND_FONT_LOGO && !BRAND_FONT_LOGO.startsWith("{{"))
    ? `'${BRAND_FONT_LOGO.split(",")[0].trim()}', 'IBM Plex Serif', ${DISPLAY_FALLBACK}`
    : `'IBM Plex Serif', ${DISPLAY_FALLBACK}`;
const FONT_SANS =
  "'Work Sans', 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO =
  "'Space Mono', 'IBM Plex Mono', Consolas, monospace";

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
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@500;600;700&family=Work+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
body { margin: 0; padding: 0; background: ${BONE_DEEP}; }
a, a:link, a:visited, a:hover, a:active { color: ${BRASS}; text-decoration: none; }
.brass-link { color: ${BRASS} !important; }
</style>
<!--[if mso]>
<style>
* { font-family: Georgia, 'Times New Roman', serif !important; }
.mso-sans { font-family: Arial, Helvetica, sans-serif !important; }
</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background:${BONE_DEEP};font-family:${FONT_SANS};color:${PAPER_INK};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BONE_DEEP};padding:32px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;margin:0 auto;background:${BONE};border:1px solid ${BONE_RULE};">
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
  <td style="padding:0;background:${BONE};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="height:6px;background:${BRASS};line-height:6px;font-size:0;">&nbsp;</td></tr>
      <tr>
        <td style="padding:28px 36px 8px 36px;background:${BONE};">
          <p class="mso-sans" style="margin:0;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${BRASS_DEEP};">
            <span style="display:inline-block;width:8px;height:8px;background:${BRASS};border-radius:50%;vertical-align:middle;margin-right:10px;"></span>${escape(kicker)}
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function headlineBlock(headline: string, intro: string): string {
  return `
<tr>
  <td style="padding:8px 36px 24px 36px;background:${BONE};">
    <h1 style="margin:0 0 14px 0;font-family:${FONT_DISPLAY};font-size:28px;line-height:1.18;font-weight:600;color:${PAPER_INK};letter-spacing:-0.01em;">
      ${escape(headline)}
    </h1>
    <p class="mso-sans" style="margin:0;font-family:${FONT_SANS};font-size:15px;line-height:1.55;color:${PAPER_MUTE};">
      ${escape(intro)}
    </p>
  </td>
</tr>
<tr>
  <td style="padding:0 36px;background:${BONE};">
    <div style="height:1px;background:${BONE_RULE};line-height:1px;font-size:0;">&nbsp;</div>
  </td>
</tr>`;
}

function sectionsBlock(sections: Array<{ title: string; fields: EmailField[] }>): string {
  return sections
    .map(
      (s) => `
<tr>
  <td style="padding:24px 36px 8px 36px;background:${BONE};">
    <p class="mso-sans" style="margin:0 0 14px 0;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${BRASS_DEEP};">
      ${escape(s.title)}
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
  <td width="35%" style="padding:6px 12px 6px 0;vertical-align:top;font-family:${FONT_MONO};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${PAPER_MUTE};">
    ${escape(f.label)}
  </td>
  <td class="mso-sans" style="padding:6px 0;vertical-align:top;font-family:${FONT_SANS};font-size:14px;line-height:1.55;color:${PAPER_INK};">
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
  <td style="padding:5px 0;font-family:${FONT_MONO};font-size:12px;color:${PAPER_INK};">
    <span style="display:inline-block;width:6px;height:6px;background:${BRASS};border-radius:50%;vertical-align:middle;margin-right:8px;"></span>${escape(item.filename)}
  </td>
  <td align="right" style="padding:5px 0;font-family:${FONT_MONO};font-size:11px;color:${PAPER_MUTE};">
    ${formatKb(item.sizeBytes)}
  </td>
</tr>`,
    )
    .join("");
  return `
<tr>
  <td style="padding:24px 36px 8px 36px;background:${BONE};">
    <p class="mso-sans" style="margin:0 0 14px 0;font-family:${FONT_MONO};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${BRASS_DEEP};">
      Photos attached (${items.length}) · ${totalLabel}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BONE_DEEP};padding:12px 16px;border:1px solid ${BONE_RULE};">
      ${rows}
    </table>
    <p class="mso-sans" style="margin:10px 0 0 0;font-family:${FONT_SANS};font-size:12px;color:${PAPER_MUTE};">
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
  <td style="padding:18px 36px 8px 36px;background:${BONE};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BONE_DEEP};border-left:3px solid ${BRASS};">
      <tr>
        <td class="mso-sans" style="padding:14px 18px;font-family:${FONT_SANS};font-size:13px;line-height:1.5;color:${PAPER_INK};">
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
  <td style="padding:24px 36px 30px 36px;background:${BONE};">
    <div style="height:1px;background:${BONE_RULE};margin-bottom:20px;line-height:1px;font-size:0;">&nbsp;</div>
    <p style="margin:0 0 4px 0;font-family:${FONT_DISPLAY};font-size:15px;font-weight:600;color:${BRASS};">
      ${escape(businessName)}
    </p>
    <p class="mso-sans" style="margin:0;font-family:${FONT_SANS};font-size:12px;color:${PAPER_MUTE};">
      ${escape(businessAddress)}
    </p>
  </td>
</tr>
<tr><td style="height:6px;background:${HARBOR};line-height:6px;font-size:0;">&nbsp;</td></tr>`;
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

// HARBOR is used in footerBand — no suppression needed.

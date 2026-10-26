// TODO: Set RESEND_API_KEY in .env.local before production.
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { renderEmailHtml } from "@/lib/emailTemplate";

// Schema MIRRORS QuoteForm field-for-field per CLAUDE.md rule #14b.
const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).regex(/^[+()0-9 -]+$/u),
  address: z.string().min(4),
  propertyType: z.string().min(1),
  urgency: z.string().min(1),
  service: z.string().min(1),
  message: z.string().min(10),
});

// Server-side photo limits — re-validated even after client compression.
// Vercel Hobby request body cap = 4.5 MB; we allow 3.5 MB total of photos +
// 1 MB headroom for the JSON payload + multipart overhead.
const MAX_PHOTOS = 5;
const MAX_BYTES_PER_FILE = 1_000_000;
const MAX_BYTES_TOTAL = 3_500_000;
const ACCEPTED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

export async function POST(req: Request) {
  // Multipart form data — quote form sends JSON payload + photo files together.
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  // Parse the JSON payload field
  const payloadRaw = formData.get("payload");
  if (typeof payloadRaw !== "string") {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }
  let payload: unknown;
  try {
    payload = JSON.parse(payloadRaw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
  const parsed = Schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const v = parsed.data;

  // Parse + validate photo files
  const photoEntries = formData.getAll("photos");
  if (photoEntries.length > MAX_PHOTOS) {
    return NextResponse.json(
      { error: `Too many photos (max ${MAX_PHOTOS})` },
      { status: 413 },
    );
  }

  const attachments: Array<{ filename: string; content: Buffer }> = [];
  let totalBytes = 0;
  for (const entry of photoEntries) {
    if (!(entry instanceof File)) continue;
    if (!ACCEPTED_MIME.has(entry.type)) {
      return NextResponse.json(
        { error: `Unsupported photo type: ${entry.type || "unknown"}` },
        { status: 415 },
      );
    }
    if (entry.size > MAX_BYTES_PER_FILE) {
      return NextResponse.json(
        { error: `Photo too large (max ${MAX_BYTES_PER_FILE / 1_000_000} MB per file)` },
        { status: 413 },
      );
    }
    totalBytes += entry.size;
    if (totalBytes > MAX_BYTES_TOTAL) {
      return NextResponse.json(
        { error: `Photos exceed total cap (${MAX_BYTES_TOTAL / 1_000_000} MB)` },
        { status: 413 },
      );
    }
    const buf = Buffer.from(await entry.arrayBuffer());
    attachments.push({
      filename: sanitizeFilename(entry.name),
      content: buf,
    });
  }

  // Resend client instantiated INSIDE handler (CLAUDE.md rule #9).
  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = renderEmailHtml({
    kind: "quote",
    businessName: "{{BUSINESS_NAME}}",
    businessAddress: "{{FULL_ADDRESS}}",
    kicker: "Quote ticket / new",
    headline: `New quote request from ${v.name}`,
    intro: `${v.name} filed a quote ticket through the {{BUSINESS_NAME}} website. Reply directly to this email to reach them. Their address is set as the reply-to.`,
    sender: { name: v.name, email: v.email, phone: v.phone },
    customerSections: [
      {
        title: "Job details",
        fields: [
          { label: "Service address", value: v.address },
          { label: "Property type", value: v.propertyType },
          { label: "Urgency", value: v.urgency },
          { label: "Service requested", value: v.service },
          { label: "What's wrong", value: v.message },
        ],
      },
    ],
    attachments: attachments.map((a) => ({
      filename: a.filename,
      sizeBytes: a.content.length,
    })),
  });

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    // PREVIEW_FORWARD_TO is set in the shared `.env.preview` during dev (Resend
    // test mode restricts recipients to the account owner). In production this
    // var is unset and we fall back to the real client's {{EMAIL}}.
    to: process.env.PREVIEW_FORWARD_TO || "{{EMAIL}}",
    subject: `Quote request from ${v.name} for ${v.service}${attachments.length ? ` (${attachments.length} photo${attachments.length > 1 ? "s" : ""})` : ""}`,
    html,
    replyTo: v.email,
    attachments,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

function sanitizeFilename(name: string): string {
  // Strip path components, control chars, and absurd lengths
  const base = name.split(/[\\/]/).pop() ?? "photo.jpg";
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  return cleaned.length > 0 ? cleaned : "photo.jpg";
}

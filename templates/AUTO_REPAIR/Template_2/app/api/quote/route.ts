// TODO: Set RESEND_API_KEY in .env.local before production
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { renderEmailHtml } from "@/lib/emailTemplate";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  vehicleMake: z.string().min(1),
  vehicleModel: z.string().min(1),
  vehicleYear: z.string().regex(/^\d{4}$/u),
  service: z.string().min(1),
  message: z.string().min(5),
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
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const payloadRaw = formData.get("payload");
  if (typeof payloadRaw !== "string") {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }
  let body: unknown;
  try {
    body = JSON.parse(payloadRaw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const v = parsed.data;

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
    attachments.push({
      filename: sanitizeFilename(entry.name),
      content: Buffer.from(await entry.arrayBuffer()),
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = renderEmailHtml({
    kicker: "New quote request",
    headline: `Quote request from ${v.name}`,
    intro: `A visitor on your website just requested a free quote. Details below. Reply directly to this email to reach ${v.name}.`,
    sender: {
      name: v.name,
      email: v.email,
      phone: v.phone,
    },
    sections: [
      {
        title: "Vehicle",
        fields: [
          { label: "Make", value: v.vehicleMake },
          { label: "Model", value: v.vehicleModel },
          { label: "Year", value: v.vehicleYear },
          { label: "Service requested", value: v.service },
        ],
      },
      {
        title: "What they wrote",
        fields: [
          { label: "Message", value: v.message, multiline: true },
        ],
      },
    ],
    attachments: attachments.map((a) => ({
      filename: a.filename,
      sizeBytes: a.content.length,
    })),
    businessName: "{{BUSINESS_NAME}}",
    businessAddress: "{{FULL_ADDRESS}}",
  });

  const photoSuffix = attachments.length
    ? ` · ${attachments.length} photo${attachments.length > 1 ? "s" : ""}`
    : "";

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    // PREVIEW_FORWARD_TO is set in .env.preview during dev (Resend test mode
    // restricts recipients to the account owner). In production this var is
    // unset and we fall back to the real client's {{EMAIL}}.
    to: process.env.PREVIEW_FORWARD_TO || "{{EMAIL}}",
    replyTo: v.email,
    subject: `New quote request from ${v.name} (${v.vehicleYear} ${v.vehicleMake} ${v.vehicleModel})${photoSuffix} · {{BUSINESS_NAME}}`,
    html,
    attachments,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

function sanitizeFilename(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "photo.jpg";
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  return cleaned.length > 0 ? cleaned : "photo.jpg";
}

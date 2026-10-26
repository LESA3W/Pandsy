// TODO: Set RESEND_API_KEY in .env.local before production.
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { renderEmailHtml } from "@/lib/emailTemplate";

// Schema MIRRORS ContactForm field-for-field.
const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^[+()0-9 -]+$/u.test(v), "Bad phone format"),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const v = parsed.data;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = renderEmailHtml({
    kind: "contact",
    businessName: "{{BUSINESS_NAME}}",
    businessAddress: "{{FULL_ADDRESS}}",
    kicker: "Contact form / new",
    headline: `New message from ${v.name}`,
    intro: `${v.name} sent a message through the {{BUSINESS_NAME}} contact form. Reply directly to this email to reach them.`,
    sender: { name: v.name, email: v.email, phone: v.phone },
    customerSections: [
      {
        title: "Message",
        fields: [{ label: "Note", value: v.message }],
      },
    ],
  });

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    // PREVIEW_FORWARD_TO is set in the shared `.env.preview` during dev (Resend
    // test mode restricts recipients to the account owner). In production this
    // var is unset and we fall back to the real client's {{EMAIL}}.
    to: process.env.PREVIEW_FORWARD_TO || "{{EMAIL}}",
    subject: `New contact form message from ${v.name}`,
    html,
    replyTo: v.email,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

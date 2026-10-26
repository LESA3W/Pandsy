// TODO: Set RESEND_API_KEY in .env.local (or root .env.preview during dev) before production
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { renderEmailHtml } from "@/lib/emailTemplate";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().max(20).optional().or(z.literal("")),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const v = parsed.data;
  const phone = v.phone && v.phone.length > 0 ? v.phone : undefined;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = renderEmailHtml({
    kicker: "New message · contact form",
    headline: `Message from ${v.name}`,
    intro: `A new message just came in through the {{BUSINESS_NAME}} contact form. Reply directly to this email to reach ${v.name}.`,
    sender: { name: v.name, email: v.email, phone },
    sections: [
      {
        title: "Message",
        fields: [{ label: "Message", value: v.message, multiline: true }],
      },
    ],
    businessName: "{{BUSINESS_NAME}}",
    businessAddress: "{{FULL_ADDRESS}}",
  });

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.PREVIEW_FORWARD_TO || "{{EMAIL}}",
    subject: `New message · ${v.name}`,
    html,
    replyTo: v.email,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

// TODO: Set RESEND_API_KEY in .env.local before production
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { renderEmailHtml } from "@/lib/emailTemplate";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const v = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = renderEmailHtml({
    kicker: "New contact message",
    headline: `Message from ${v.name}`,
    intro: `A visitor on your website just sent a message through the contact form. Reply directly to this email to reach them.`,
    sender: {
      name: v.name,
      email: v.email,
      phone: v.phone,
    },
    sections: [
      {
        title: "What they wrote",
        fields: [{ label: "Message", value: v.message, multiline: true }],
      },
    ],
    businessName: "{{BUSINESS_NAME}}",
    businessAddress: "{{FULL_ADDRESS}}",
  });

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    // PREVIEW_FORWARD_TO is set in .env.preview during dev (Resend test mode
    // restricts recipients to the account owner). In production this var is
    // unset and we fall back to the real client's {{EMAIL}}.
    to: process.env.PREVIEW_FORWARD_TO || "{{EMAIL}}",
    replyTo: v.email,
    subject: `New contact message from ${v.name} ({{BUSINESS_NAME}})`,
    html,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

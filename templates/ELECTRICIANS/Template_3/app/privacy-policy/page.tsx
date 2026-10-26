import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CopperRule } from "@/components/ui/CopperRule";
import { StampMark } from "@/components/ui/StampMark";

export const metadata = {
  title: "Privacy policy / {{BUSINESS_NAME}}",
  description:
    "How {{BUSINESS_NAME}} collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary hover:text-primary mb-10"
        >
          <ArrowLeft size={14} strokeWidth={2} /> Back to site
        </Link>

        <StampMark label="Doc 01" meta="Privacy" rotate={-2} />

        <h1 className="mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tighter text-black leading-[1.05]">
          Privacy policy.
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black/60">
          Last updated · January 2026
        </p>

        <CopperRule className="my-10" />

        <div className="space-y-10 font-sans text-[15px] leading-relaxed text-black/60">
          <Section title="Who we are">
            <p>
              {"{{BUSINESS_NAME}}"} ({`"we"`}, {`"us"`}) is a licensed
              electrical contractor located at {"{{FULL_ADDRESS}}"}. This page
              explains what information we collect when you use our website,
              why we collect it, and what we do with it.
            </p>
          </Section>

          <Section title="What we collect">
            <p>When you submit our quote form or contact form, we collect:</p>
            <ul className="ml-5 mt-3 list-disc space-y-1.5">
              <li>Your name, email, and phone number</li>
              <li>The service address you provide</li>
              <li>Property type, urgency, and the service you need</li>
              <li>Any photos you choose to attach to your quote request</li>
              <li>Anything else you write in the message field</li>
            </ul>
            <p className="mt-3">
              When you browse the site, we may collect anonymous usage data
              (page views, time on page, browser type) only if you opt in via
              the cookie banner.
            </p>
          </Section>

          <Section title="How we use it">
            <p>We use what you give us only to:</p>
            <ul className="ml-5 mt-3 list-disc space-y-1.5">
              <li>Reply to your inquiry and quote your job</li>
              <li>Schedule the service if you book us</li>
              <li>Improve the site (only if you opt in to analytics cookies)</li>
            </ul>
            <p className="mt-3">
              We do not sell your information. We do not share it with third
              parties for their own marketing.
            </p>
          </Section>

          <Section title="Email + photo handling">
            <p>
              Form submissions are routed via Resend, our email infrastructure
              partner, to our team mailbox. Photos you attach are sent as
              standard email attachments and stored only inside that mailbox
              for the time it takes to scope, quote, and (if booked) complete
              your job.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              See our{" "}
              <Link
                href="/cookie-policy"
                className="text-primary underline hover:text-primary font-medium"
              >
                cookie policy
              </Link>{" "}
              for details on what cookies we set and how to manage them.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can ask us to show you what we have on file, correct
              anything that is wrong, or delete it. Email us at{" "}
              <a
                href="mailto:{{EMAIL}}"
                className="text-primary underline hover:text-primary font-medium"
              >
                {"{{EMAIL}}"}
              </a>
              .
            </p>
          </Section>

          <Section title="Updates">
            <p>
              We update this page when our practices change. The date at the
              top reflects the most recent update.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}

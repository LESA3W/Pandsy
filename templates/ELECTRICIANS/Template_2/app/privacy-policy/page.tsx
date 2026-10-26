import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MeasureRule } from "@/components/ui/MeasureRule";
import { BlueprintCell } from "@/components/ui/BlueprintCell";

export const metadata = {
  title: "Privacy policy · {{BUSINESS_NAME}}",
  description:
    "How {{BUSINESS_NAME}} collects, uses, and protects your information when you visit our website or request electrical services.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.7} />
          Back to home
        </Link>

        <BlueprintCell
          n="LEGAL-01"
          title="Privacy policy"
          spec="DOC-PP / rev. 2026-05"
          variant="dark"
          className="mb-7"
        />
        <h1 className="font-display text-5xl sm:text-6xl text-black leading-tight tracking-tight mb-6 font-bold">
          Privacy policy
        </h1>
        <MeasureRule width="short" tone="sapphire" className="mb-10" />

        <div className="space-y-7 font-sans text-[16px] text-black leading-relaxed">
          <p className="text-black/50 font-mono text-[12px] uppercase tracking-widest">
            Last updated: May 2026
          </p>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 font-semibold tracking-tight">
              Who we are
            </h2>
            <p>
              {"{{BUSINESS_NAME}}"} (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) operates the
              website at this domain and provides electrical services from{" "}
              {"{{FULL_ADDRESS}}"}. This policy describes how we handle the
              information you share with us through this site or by contacting
              us about our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 font-semibold tracking-tight">
              What we collect
            </h2>
            <p className="mb-3">
              We collect only the information you give us, plus basic technical
              data needed to keep the site running:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Form submissions:</strong> name, email, phone, service
                address, property type, urgency, service needed, message, and
                any optional photos you upload when you submit a ticket or
                send us a contact-form message.
              </li>
              <li>
                <strong>Site analytics:</strong> anonymous traffic and
                navigation data (pages visited, approximate location, device
                type, referring source). Only if you accept analytics cookies.
              </li>
              <li>
                <strong>Marketing data:</strong> ad-conversion signals, only
                if you accept marketing cookies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 font-semibold tracking-tight">
              How we use it
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to service tickets and contact-form messages.</li>
              <li>To schedule service visits and send service-related communications.</li>
              <li>To improve the quality and clarity of our website.</li>
              <li>To comply with applicable law (e.g. retaining service records).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 font-semibold tracking-tight">
              Who we share it with
            </h2>
            <p>
              We do not sell your information. We share it only with the
              service providers we rely on to operate the site (email
              delivery, hosting, analytics when enabled) and only to the
              extent they need it to do their job. We never share it with
              third-party advertisers without your explicit marketing-cookie
              consent.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 font-semibold tracking-tight">
              Photos you upload
            </h2>
            <p>
              When you attach photos to a service ticket, they are sent to us
              by email and stored alongside the ticket record. We use them only
              to scope and price your job. We will never publish your photos
              without your written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 font-semibold tracking-tight">
              How long we keep it
            </h2>
            <p>
              Service tickets and contact submissions are kept as long as
              needed to provide service and meet legal obligations, then
              deleted. You can ask us to delete your records at any time by
              emailing{" "}
              <a
                href="mailto:{{EMAIL}}"
                className="text-primary hover:text-primary underline"
              >
                {"{{EMAIL}}"}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 font-semibold tracking-tight">
              Your rights
            </h2>
            <p>
              You can request access to, correction of, or deletion of any
              personal information we hold about you. You can also withdraw
              cookie consent at any time using the cookie button at the
              bottom-left corner of any page, or via the{" "}
              <Link
                href="/cookie-policy"
                className="text-primary hover:text-primary underline"
              >
                cookie policy
              </Link>{" "}
              page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 font-semibold tracking-tight">
              Children&apos;s privacy
            </h2>
            <p>
              This site is not directed at children. We do not knowingly
              collect personal information from anyone under 13.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 font-semibold tracking-tight">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. The &quot;Last
              updated&quot; date at the top reflects the most recent revision.
              Material changes will be highlighted at the top of the page for
              30 days.
            </p>
          </section>

          <MeasureRule width="full" tone="sapphire" className="my-3" />

          <section>
            <h2 className="font-display text-2xl text-black mb-3 font-semibold tracking-tight">
              Contact us about privacy
            </h2>
            <p>
              Questions, corrections, or deletion requests:
              <br />
              <a
                href="mailto:{{EMAIL}}"
                className="text-primary hover:text-primary underline"
              >
                {"{{EMAIL}}"}
              </a>
              <br />
              {"{{BUSINESS_NAME}}"}
              <br />
              {"{{FULL_ADDRESS}}"}
              <br />
              {"{{PHONE}}"}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

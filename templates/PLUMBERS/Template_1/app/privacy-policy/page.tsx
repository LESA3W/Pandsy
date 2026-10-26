import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CopperRule } from "@/components/ui/CopperRule";
import { TideLine } from "@/components/ui/TideLine";

export const metadata = {
  title: "Privacy policy · {{BUSINESS_NAME}}",
  description:
    "How {{BUSINESS_NAME}} collects, uses, and protects your information when you visit our website or request plumbing services.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary hover:opacity-70 transition-opacity mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.7} />
          Back to home
        </Link>

        <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
          Legal · Privacy
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-black leading-tight tracking-tighter mb-6">
          Privacy policy
        </h1>
        <CopperRule width="short" className="mb-10" />

        <div className="space-y-7 font-sans text-[16px] text-black leading-relaxed">
          <p className="text-black/50 font-mono text-[12px] uppercase tracking-widest">
            Last updated: January 2026
          </p>

          <section>
            <h2 className="font-display text-2xl text-black mb-3">
              Who we are
            </h2>
            <p>
              {"{{BUSINESS_NAME}}"} (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) operates the
              website at this domain and provides plumbing services from{" "}
              {"{{FULL_ADDRESS}}"}. This policy describes how we handle the
              information you share with us through this site or by contacting
              us about our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3">
              What we collect
            </h2>
            <p className="mb-3">
              We collect only the information you give us, plus basic technical
              data needed to keep the site running and to understand how it is
              used:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Form submissions:</strong> name, email, phone, service
                address, property type, urgency, service needed, and any
                message you include when you request a quote or send us a
                contact-form message.
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
            <h2 className="font-display text-2xl text-black mb-3">
              How we use it
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to quote requests and contact-form messages.</li>
              <li>To schedule service visits and send service-related communications.</li>
              <li>To improve the quality and clarity of our website.</li>
              <li>To comply with applicable law (e.g. retaining service records).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3">
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
            <h2 className="font-display text-2xl text-black mb-3">
              How long we keep it
            </h2>
            <p>
              Quote and contact submissions are kept as long as needed to
              provide service and meet legal obligations, then deleted. You
              can ask us to delete your records at any time by emailing{" "}
              <a
                href="mailto:{{EMAIL}}"
                className="text-primary hover:opacity-70 underline"
              >
                {"{{EMAIL}}"}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3">
              Your rights
            </h2>
            <p>
              You can request access to, correction of, or deletion of any
              personal information we hold about you. You can also withdraw
              cookie consent at any time using the cookie button at the
              bottom-left corner of any page, or via the{" "}
              <Link
                href="/cookie-policy"
                className="text-primary hover:opacity-70 underline"
              >
                cookie policy
              </Link>{" "}
              page.
            </p>
          </section>

          <TideLine className="my-3" />

          <section>
            <h2 className="font-display text-2xl text-black mb-3">
              Contact us about privacy
            </h2>
            <p>
              Questions, corrections, or deletion requests:
              <br />
              <a
                href="mailto:{{EMAIL}}"
                className="text-primary hover:opacity-70 underline"
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

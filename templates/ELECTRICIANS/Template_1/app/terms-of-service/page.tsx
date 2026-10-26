import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VoltageRule } from "@/components/ui/VoltageRule";
import { PanelLabel } from "@/components/ui/PanelLabel";

export const metadata = {
  title: "Terms of service · {{BUSINESS_NAME}}",
  description:
    "Terms of service governing the use of {{BUSINESS_NAME}}'s website and the electrical services we provide.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary hover:text-black transition-colors mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.7} />
          Back to home
        </Link>

        <PanelLabel
          n="LEGAL-02"
          title="TERMS OF SERVICE"
          meta="DOC-TOS · REV. 2026-05"
          variant="dark"
          className="mb-7"
        />
        <h1 className="font-display text-5xl sm:text-6xl text-black leading-tight tracking-tighter mb-6 uppercase">
          Terms of service
        </h1>
        <VoltageRule width="short" tone="amber" className="mb-10" />

        <div className="space-y-7 font-sans text-[16px] text-black leading-relaxed">
          <p className="text-black/50 font-mono text-[12px] uppercase tracking-widest">
            Last updated: May 2026
          </p>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Acceptance of these terms
            </h2>
            <p>
              By using the {"{{BUSINESS_NAME}}"} website or by requesting a
              quote, scheduling service, or otherwise engaging us through this
              site, you agree to these terms. If you don&apos;t agree, please
              don&apos;t use the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Services and quotes
            </h2>
            <p>
              Quotes provided through this site or over the phone are good-faith
              estimates based on the information you share. Final pricing may
              be adjusted on-site if conditions differ from what was described.
              We will always tell you about any change before doing the work.
              You can decline at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Permits and code compliance
            </h2>
            <p>
              All work is performed to current National Electrical Code (NEC)
              and local jurisdiction standards. Where permits are required, we
              pull them. We do not perform work that would render your home
              non-compliant or unsafe, even if requested.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Scheduling and cancellation
            </h2>
            <p>
              Service visits are scheduled by appointment. Cancellations more
              than 24 hours in advance carry no fee. Same-day cancellations may
              be subject to a small dispatch fee that we will disclose at the
              time of booking. Emergency-call work begins as soon as practical;
              terms for emergency work are confirmed verbally before dispatch.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Workmanship and warranties
            </h2>
            <p>
              All workmanship is warranted as required by state law and as
              specifically described on your invoice. Replacement parts and
              fixtures carry the warranty offered by their manufacturer. We
              honor warranty claims promptly when notified.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Liability
            </h2>
            <p>
              {"{{BUSINESS_NAME}}"} is licensed, bonded, and insured in our
              service area. Liability for any single claim is limited to the
              amount paid for the service performed, except where state law
              requires a higher floor. We are not liable for damage caused by
              pre-existing conditions disclosed in our service report or for
              consequential losses outside our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Site content
            </h2>
            <p>
              The text, images, and design of this site are property of{" "}
              {"{{BUSINESS_NAME}}"} or used under license. Reviews quoted on
              this site are real reviews left by real customers; names may be
              shortened for privacy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Termination
            </h2>
            <p>
              We may suspend or terminate access to this site at any time for
              any reason, including misuse or violation of these terms. Your
              obligations under these terms (including any payment due for
              completed services) survive termination.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of the state in which our
              business is licensed. Disputes will be resolved in the courts of
              that state, except as required otherwise by consumer-protection
              law.
            </p>
          </section>

          <VoltageRule width="full" tone="amber" className="my-3" />

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Contact us
            </h2>
            <p>
              Questions about these terms:
              <br />
              <a
                href="mailto:{{EMAIL}}"
                className="text-primary hover:text-black underline"
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

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CopperRule } from "@/components/ui/CopperRule";
import { StampMark } from "@/components/ui/StampMark";

export const metadata = {
  title: "Terms of service / {{BUSINESS_NAME}}",
  description:
    "The terms that apply when you use the {{BUSINESS_NAME}} website or hire us for electrical work.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary hover:text-primary mb-10"
        >
          <ArrowLeft size={14} strokeWidth={2} /> Back to site
        </Link>

        <StampMark label="Doc 02" meta="Terms" rotate={-2} />

        <h1 className="mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tighter text-black leading-[1.05]">
          Terms of service.
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black/60">
          Last updated · January 2026
        </p>

        <CopperRule className="my-10" />

        <div className="space-y-10 font-sans text-[15px] leading-relaxed text-black/60">
          <Section title="The agreement">
            <p>
              By using this website ({"{{BUSINESS_NAME}}"}, located at{" "}
              {"{{FULL_ADDRESS}}"}) you agree to these terms. If you do not
              agree, please stop using the site.
            </p>
          </Section>

          <Section title="What this website is">
            <p>
              This site is informational. Quotes are quotes, not contracts.
              Hiring us for electrical work creates a separate written work
              agreement at the time you book the job.
            </p>
          </Section>

          <Section title="Licensing + insurance">
            <p>
              We are a licensed and insured electrical contractor. License
              numbers and proof of insurance are available on request and at
              the time of every estimate.
            </p>
          </Section>

          <Section title="Use of the site">
            <p>
              You agree not to use this site to attempt to break into our
              systems, scrape it for redistribution, or submit false
              information through the forms. We reserve the right to refuse
              service for misuse.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              We try to keep the information on this site accurate and up to
              date, but it is provided as-is. Pricing examples, response
              times, and capability descriptions can change. The terms of any
              actual electrical work are governed by the written agreement we
              sign when you hire us.
            </p>
          </Section>

          <Section title="Third-party links">
            <p>
              We may link to third-party sites (Google Business listing,
              social media). We are not responsible for the content or
              practices of those sites.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              We may update these terms. Material changes will be flagged on
              this page with a new {"\"last updated\""} date.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms? Email{" "}
              <a
                href="mailto:{{EMAIL}}"
                className="text-primary underline hover:text-primary font-medium"
              >
                {"{{EMAIL}}"}
              </a>{" "}
              or call{" "}
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="text-primary underline hover:text-primary font-medium"
              >
                {"{{PHONE}}"}
              </a>
              .
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

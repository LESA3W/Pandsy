import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import PipeTick from "@/components/ui/PipeTick";

export const metadata = {
  title: "Terms of Service · {{BUSINESS_NAME}}",
};

export default function TermsOfService() {
  return (
    <>
      <TopBar />
      <main className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
            <PipeTick />
            Terms of service
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.4vw,3.6rem)] font-black leading-[1.04] tracking-tight-display text-black">
            Terms of service
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-black/60">
            {"{{BUSINESS_NAME}}"} · {"{{FULL_ADDRESS}}"}
          </p>

          <div className="prose prose-sm mt-10 max-w-none space-y-7 text-black">
            <Section title="1. Use of this website">
              <p>
                By using this website you agree to the terms below. The site is
                operated by {"{{BUSINESS_NAME}}"} (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;) and information here is provided for general
                guidance about our plumbing services in {"{{CITY}}, {{STATE}}"}.
              </p>
            </Section>

            <Section title="2. Quotes and estimates">
              <p>
                Any pricing or scope figures shown on this site are general
                examples only and are not a binding quote. A binding quote is
                only delivered after we review your specific job in writing.
                Final pricing depends on the actual conditions at your property.
              </p>
            </Section>

            <Section title="3. Service appointments">
              <p>
                When we agree on a service appointment, we will give you a real
                arrival window and the licensed plumber assigned to the job.
                If we need to reschedule, we will reach out as soon as possible
                with options.
              </p>
            </Section>

            <Section title="4. Warranty">
              <p>
                Workmanship is warrantied per the agreement we put in writing
                when we deliver your quote. Manufacturer warranties on parts
                and fixtures pass through directly from the manufacturer to you.
              </p>
            </Section>

            <Section title="5. Liability">
              <p>
                We carry liability insurance and proof of coverage is available
                on request. We are not liable for indirect or consequential
                damages outside of the scope of work we performed.
              </p>
            </Section>

            <Section title="6. Intellectual property">
              <p>
                Logos, photographs, and copy on this site are owned by{" "}
                {"{{BUSINESS_NAME}}"} or used with permission. Do not copy or
                redistribute without written consent.
              </p>
            </Section>

            <Section title="7. Contact">
              <p>
                Questions about these terms? Reach us at {"{{PHONE}}"} or{" "}
                <a
                  href="mailto:{{EMAIL}}"
                  className="text-primary underline underline-offset-4 hover:opacity-70"
                >
                  {"{{EMAIL}}"}
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-2xl font-black tracking-tight-display text-black">
        {title}
      </h2>
      <div className="leading-relaxed text-black">{children}</div>
    </section>
  );
}

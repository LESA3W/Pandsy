import { MastHeader } from "@/components/MastHeader";
import { Footer } from "@/components/Footer";
import { BrassMedallion } from "@/components/ui/BrassMedallion";
import { PlateLine } from "@/components/ui/PlateLine";

export const metadata = {
  title: "Terms of Service · {{BUSINESS_NAME}}",
};

export default function TermsOfService() {
  return (
    <>
      <MastHeader />
      <main className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary">
            <BrassMedallion size={9} />
            Plate / Terms
          </p>
          <PlateLine tone="primary" className="mt-5 max-w-[180px]" />
          <h1 className="mt-7 font-display text-4xl sm:text-5xl font-semibold text-black leading-tight">
            Terms of service
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-black/40">
            {"{{BUSINESS_NAME}}"} · {"{{FULL_ADDRESS}}"}
          </p>

          <div className="mt-10 space-y-7 text-black/80 leading-relaxed">
            <Section title="1. Use of this site">
              <p>
                By using this website you agree to these terms. {"{{BUSINESS_NAME}}"}
                provides this site to share information about our plumbing
                services and to receive contact and quote requests from
                prospective clients.
              </p>
            </Section>

            <Section title="2. Quote requests">
              <p>
                A quote request is not a binding contract. Final pricing is
                provided in writing after we evaluate the job in person. The
                price and scope of any work are governed by the written quote
                we send you, which you must approve before work begins.
              </p>
            </Section>

            <Section title="3. Service limitations">
              <p>
                We service the {"{{CITY}}, {{STATE}}"} area. Service availability
                outside our standard area is at our discretion and may incur
                travel charges disclosed up-front in the written quote.
              </p>
            </Section>

            <Section title="4. Emergency service">
              <p>
                Our 24/7 emergency line is for genuine plumbing emergencies
                (active leaks, no water, sewer backups). Emergency service is
                billed at a published emergency rate, disclosed to you on the
                call before dispatch.
              </p>
            </Section>

            <Section title="5. Warranty">
              <p>
                Workmanship on most jobs is warranted for 12 months from the
                date of completion. Specific warranty terms are listed on the
                final invoice. Manufacturer warranties on parts pass through to
                the homeowner.
              </p>
            </Section>

            <Section title="6. Limitation of liability">
              <p>
                {"{{BUSINESS_NAME}}"} is not liable for indirect, incidental, or
                consequential damages arising from your use of this site or our
                services, beyond what is required by law.
              </p>
            </Section>

            <Section title="7. Changes">
              <p>
                We may update these terms periodically. Continued use of this
                site after a change constitutes acceptance of the updated terms.
              </p>
            </Section>

            <Section title="8. Contact">
              <p>
                Questions about these terms? Reach us at {"{{PHONE}}"} or{" "}
                <a href="mailto:{{EMAIL}}" className="text-primary underline underline-offset-4 hover:opacity-70">
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
      <h2 className="font-display text-2xl font-semibold text-black mb-3">{title}</h2>
      <div className="text-black/80 leading-relaxed">{children}</div>
    </section>
  );
}

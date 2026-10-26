import type { Metadata } from "next";
import Link from "next/link";
import { BayLabel } from "@/components/ui/BayLabel";
import { HazardDivider } from "@/components/ui/HazardDivider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service · {{BUSINESS_NAME}}",
  description:
    "The terms governing your use of the {{BUSINESS_NAME}} website and services.",
};

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="bg-black pt-20 sm:pt-24 md:pt-28">
        <header className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 sm:pb-10">
          <BayLabel
            n="LEGAL-02"
            title="TERMS OF SERVICE"
            meta="DOC-TOS · REV. 2026-01"
          />
          <h1 className="mt-5 font-display text-[36px] uppercase leading-[0.95] tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-white/60 sm:text-xs">
            Please read carefully before requesting service.
          </p>
        </header>

        <HazardDivider thin />

        <article className="mx-auto max-w-3xl space-y-6 px-4 py-8 text-sm leading-relaxed text-white/80 sm:space-y-8 sm:px-6 sm:py-12 sm:text-base">
          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              1. Acceptance of Terms
            </h2>
            <p className="mt-3">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
              and use of the website, online forms, and services provided by{" "}
              {"{{BUSINESS_NAME}}"} located at {"{{FULL_ADDRESS}}"}. By using
              our website or requesting service, you agree to be bound by these
              Terms. If you do not agree, please do not use our website or
              request our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              2. Description of Services
            </h2>
            <p className="mt-3">
              {"{{BUSINESS_NAME}}"} provides automotive diagnosis, repair, and
              maintenance services. Online quote and contact requests are an
              initial inquiry only; no service or pricing is final until
              confirmed in writing or in person. We reserve the right to
              decline work that is unsafe, outside our expertise, or
              incompatible with available parts.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              3. Estimates &amp; Authorization
            </h2>
            <p className="mt-3">
              Estimates provided online or over the phone are non-binding and
              subject to a physical inspection of the vehicle. A written or
              electronic estimate will be provided before authorized work
              begins. Additional charges may apply if the inspection reveals
              issues that were not visible at the time of the original
              estimate; we will obtain your authorization before proceeding
              with such work.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              4. Payment
            </h2>
            <p className="mt-3">
              Payment is due upon completion of services unless other
              arrangements have been made in writing. We accept the payment
              methods listed at our location. Vehicles will not be released
              until payment has been received in full. Storage fees may apply
              to vehicles left on premises beyond a reasonable period after
              completion of service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              5. Warranty
            </h2>
            <p className="mt-3">
              We stand behind our workmanship. Specific warranty terms vary by
              service and part and will be provided in writing on your final
              invoice. Warranty coverage typically excludes damage caused by
              accidents, misuse, neglect, modifications by third parties, or
              continued operation of a vehicle after a defect has been
              identified.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              6. Limitation of Liability
            </h2>
            <p className="mt-3">
              To the fullest extent permitted by law, {"{{BUSINESS_NAME}}"}{" "}
              and its owners, employees, and agents shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages
              arising out of or related to your use of our website or services,
              even if we have been advised of the possibility of such damages.
              Our aggregate liability for any claim related to a particular
              service shall not exceed the amount you paid for that service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              7. Vehicle Storage &amp; Personal Items
            </h2>
            <p className="mt-3">
              Customers are responsible for removing personal items from their
              vehicles prior to drop-off. {"{{BUSINESS_NAME}}"} is not
              responsible for personal property left in vehicles, nor for any
              loss or damage to such property.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              8. Intellectual Property
            </h2>
            <p className="mt-3">
              All content on this website (including text, graphics, logos,
              images, and software) is the property of {"{{BUSINESS_NAME}}"}{" "}
              or its licensors and is protected by applicable intellectual
              property laws. You may not reproduce, distribute, or create
              derivative works without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              9. Governing Law
            </h2>
            <p className="mt-3">
              These Terms are governed by the laws of the jurisdiction in which{" "}
              {"{{BUSINESS_NAME}}"} operates, without regard to conflict of
              laws principles. Any dispute arising under these Terms shall be
              brought in the courts of that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              10. Changes &amp; Contact
            </h2>
            <p className="mt-3">
              We may update these Terms from time to time; continued use of the
              site after changes are posted constitutes acceptance. Questions
              about these Terms may be directed to {"{{BUSINESS_NAME}}"} at{" "}
              {"{{FULL_ADDRESS}}"}, by phone at{" "}
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="text-primary underline-offset-4 hover:underline"
              >
                {"{{PHONE}}"}
              </a>
              , or by email at{" "}
              <a
                href="mailto:{{EMAIL}}"
                className="text-primary underline-offset-4 hover:underline"
              >
                {"{{EMAIL}}"}
              </a>
              .
            </p>
          </section>

          <div className="pt-6">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-primary"
            >
              ← Return to garage
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

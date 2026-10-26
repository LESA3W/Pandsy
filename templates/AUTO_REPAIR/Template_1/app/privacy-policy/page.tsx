import type { Metadata } from "next";
import Link from "next/link";
import { BayLabel } from "@/components/ui/BayLabel";
import { HazardDivider } from "@/components/ui/HazardDivider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy · {{BUSINESS_NAME}}",
  description:
    "How {{BUSINESS_NAME}} collects, uses, and safeguards your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="bg-black pt-20 sm:pt-24 md:pt-28">
        <header className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 sm:pb-10">
          <BayLabel
            n="LEGAL-01"
            title="PRIVACY POLICY"
            meta="DOC-PP · REV. 2026-01"
          />
          <h1 className="mt-5 font-display text-[36px] uppercase leading-[0.95] tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-white/60 sm:text-xs">
            Effective immediately. Last updated on the date above.
          </p>
        </header>

        <HazardDivider thin />

        <article className="mx-auto max-w-3xl space-y-6 px-4 py-8 text-sm leading-relaxed text-white/80 sm:space-y-8 sm:px-6 sm:py-12 sm:text-base">
          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              1. Introduction
            </h2>
            <p className="mt-3">
              {"{{BUSINESS_NAME}}"} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) operates as an automotive repair business at{" "}
              {"{{FULL_ADDRESS}}"}. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your personal information when you
              visit our website, request a quote, contact us, or otherwise
              engage with our services. By using our website, you agree to the
              practices described here.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              2. Information We Collect
            </h2>
            <p className="mt-3">
              We collect information you voluntarily submit through our quote
              and contact forms, including your name, email address, phone
              number, vehicle make/model/year, the service you are requesting,
              and any details you choose to share about your vehicle or
              concern. We may also automatically collect non-identifying
              information such as browser type, device type, referring URL, and
              pages visited, which helps us maintain and improve the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              3. How We Use Information
            </h2>
            <p className="mt-3">
              We use the information you provide to respond to your inquiry,
              prepare a quote, schedule service, perform the requested repair
              work, communicate about your appointment or vehicle, send invoices
              and receipts, and follow up after service. We do not sell or rent
              your personal information to third parties for marketing
              purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              4. Sharing With Third Parties
            </h2>
            <p className="mt-3">
              We may share information with trusted service providers who help
              us run our business. For example, email delivery, parts
              suppliers, payment processors, or scheduling tools. These
              providers are only authorized to use your information as needed
              to perform services for {"{{BUSINESS_NAME}}"} and are obligated
              to keep it confidential. We may also disclose information when
              required by law, court order, or to protect our rights, property,
              or the safety of others.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              5. Cookies and Analytics
            </h2>
            <p className="mt-3">
              Our website may use cookies and similar technologies to remember
              preferences, measure traffic, and improve performance. You can
              configure your browser to refuse cookies, though some parts of
              the site may not function as intended without them.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              6. Data Retention &amp; Security
            </h2>
            <p className="mt-3">
              We retain personal information only as long as necessary to
              fulfill the purposes described in this policy, comply with our
              legal obligations, resolve disputes, and enforce our agreements.
              We use commercially reasonable administrative, technical, and
              physical safeguards to protect the information we hold. No method
              of electronic transmission or storage is 100% secure, however,
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              7. Your Choices
            </h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of your
              personal information by contacting us at the address below.
              Depending on where you live, you may have additional rights under
              applicable privacy laws.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              8. Children&rsquo;s Privacy
            </h2>
            <p className="mt-3">
              Our services are not directed to children under 13, and we do not
              knowingly collect personal information from children. If you
              believe a child has provided us with information, please contact
              us so we can delete it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              9. Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. When we do,
              we will revise the &ldquo;last updated&rdquo; date at the top of
              this page. Continued use of our website after changes are posted
              constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              10. Contact
            </h2>
            <p className="mt-3">
              Questions about this policy or your information may be directed
              to {"{{BUSINESS_NAME}}"} at {"{{FULL_ADDRESS}}"}, by phone at{" "}
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

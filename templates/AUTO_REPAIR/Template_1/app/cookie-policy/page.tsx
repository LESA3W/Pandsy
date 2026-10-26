"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { BayLabel } from "@/components/ui/BayLabel";
import { HazardDivider } from "@/components/ui/HazardDivider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { openCookiePreferences } from "@/lib/cookieConsent";

export default function CookiePolicy() {
  return (
    <>
      <Header />
      <main className="bg-black pt-20 sm:pt-24 md:pt-28">
        <header className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 sm:pb-10">
          <BayLabel
            n="LEGAL-03"
            title="COOKIE POLICY"
            meta="DOC-CP · REV. 2026-01"
          />
          <h1 className="mt-5 font-display text-[36px] uppercase leading-[0.95] tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl">
            Cookie Policy
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-white/60 sm:text-xs">
            Effective immediately. Last updated on the date above.
          </p>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              onClick={() => openCookiePreferences()}
              className="bg-primary px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-primary-text transition hover:bg-white sm:px-5 sm:py-3 sm:text-[11px]"
            >
              Manage cookie preferences
            </button>
          </div>
        </header>

        <HazardDivider thin />

        <article className="mx-auto max-w-3xl space-y-6 px-4 py-8 text-sm leading-relaxed text-white/80 sm:space-y-8 sm:px-6 sm:py-12 sm:text-base">
          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              1. What are cookies?
            </h2>
            <p className="mt-3">
              Cookies are small text files that websites place on your device
              to remember your preferences, recognize you on return visits, and
              help operators understand how their site is used. Some cookies
              are essential to the website&rsquo;s core functions; others
              support analytics or marketing.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              2. How {"{{BUSINESS_NAME}}"} uses cookies
            </h2>
            <p className="mt-3">
              We organize cookies into three categories. You can change your
              choice at any time by clicking the cookie icon in the bottom-left
              corner of any page or by using the button at the top of this
              policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              3. Necessary cookies
            </h2>
            <p className="mt-3">
              These cookies are required for the website to function. They
              enable basic features such as page navigation, secure areas of
              the site, and form submission. The site cannot function properly
              without these cookies, and they do not store any personally
              identifiable information beyond what is needed for the session.
              These cookies cannot be disabled.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              4. Analytics cookies
            </h2>
            <p className="mt-3">
              These cookies help us understand how visitors interact with the
              site by collecting and reporting information anonymously. We use
              this data to improve site performance, identify popular content,
              and fix issues. Analytics cookies only run after you opt in.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              5. Marketing cookies
            </h2>
            <p className="mt-3">
              These cookies track visitors across websites. The intention is to
              display ads that are relevant and engaging for the individual
              user, and that may help us measure the effectiveness of any
              advertising campaigns. Marketing cookies only run after you opt
              in.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              6. Third parties
            </h2>
            <p className="mt-3">
              When you opt into analytics or marketing cookies, your data may
              be processed by third-party services such as Google Analytics or
              ad networks. Each provider has its own privacy practices. We
              recommend reviewing their policies if you wish to learn more.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              7. Managing cookies in your browser
            </h2>
            <p className="mt-3">
              Most browsers let you delete or block cookies through their
              settings. However, blocking necessary cookies may prevent parts
              of this site from working as intended. Refer to your browser
              documentation for detailed instructions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              8. Changes to this policy
            </h2>
            <p className="mt-3">
              We may update this Cookie Policy from time to time to reflect
              changes in the cookies we use or for legal reasons. When we do,
              we will revise the &ldquo;last updated&rdquo; date at the top of
              this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-white sm:text-2xl">
              9. Contact
            </h2>
            <p className="mt-3">
              Questions about this policy may be directed to{" "}
              {"{{BUSINESS_NAME}}"} at {"{{FULL_ADDRESS}}"}, by phone at{" "}
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

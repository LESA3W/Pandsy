"use client";

import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";
import { VoltageRule } from "@/components/ui/VoltageRule";
import { PanelLabel } from "@/components/ui/PanelLabel";
import { openCookiePreferences } from "@/lib/cookieConsent";

export default function CookiePolicy() {
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
          n="LEGAL-03"
          title="COOKIE POLICY"
          meta="DOC-CP · REV. 2026-05"
          variant="dark"
          className="mb-7"
        />
        <h1 className="font-display text-5xl sm:text-6xl text-black leading-tight tracking-tighter mb-6 uppercase">
          Cookie policy
        </h1>
        <VoltageRule width="short" tone="amber" className="mb-10" />

        <div className="space-y-7 font-sans text-[16px] text-black leading-relaxed">
          <p className="text-black/50 font-mono text-[12px] uppercase tracking-widest">
            Last updated: May 2026
          </p>

          {/* Manage preferences CTA */}
          <div className="border border-primary-deep bg-white p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Cookie
                size={22}
                strokeWidth={1.7}
                className="text-primary mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="font-display text-lg text-black leading-tight mb-1 uppercase tracking-tight">
                  Manage your preferences
                </p>
                <p className="font-sans text-[14px] text-black/85 leading-relaxed">
                  Update your analytics and marketing cookie choices any time.
                </p>
              </div>
            </div>
            <button
              onClick={openCookiePreferences}
              className="bg-primary hover:bg-primary text-black px-5 py-2.5 font-mono text-[12px] uppercase tracking-widest transition-colors whitespace-nowrap"
            >
              Open preferences
            </button>
          </div>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              What are cookies?
            </h2>
            <p>
              Cookies are small text files placed on your device when you visit
              a website. They help the site remember things like your language,
              whether you&apos;re logged in, or which pages you visited.{" "}
              {"{{BUSINESS_NAME}}"} uses cookies to keep the site working
              properly and, if you allow it, to understand traffic and
              measure ads.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              The cookies we use
            </h2>

            <h3 className="font-display text-lg text-black mt-5 mb-2 uppercase tracking-tight">
              Strictly necessary
            </h3>
            <p>
              These keep the site running. Form submissions, security, and
              your cookie preferences. They cannot be disabled because the site
              would not work without them.
            </p>

            <h3 className="font-display text-lg text-black mt-5 mb-2 uppercase tracking-tight">
              Analytics (optional)
            </h3>
            <p>
              These let us see anonymous traffic patterns. Which pages help
              homeowners, and which ones we should rewrite. We don&apos;t tie
              this data to your name or email.
            </p>

            <h3 className="font-display text-lg text-black mt-5 mb-2 uppercase tracking-tight">
              Marketing (optional)
            </h3>
            <p>
              These help us measure whether ads are reaching the right
              homeowners and let us re-share relevant content with people in
              similar situations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              How to change your choice
            </h2>
            <p>
              Use the <strong>Open preferences</strong> button above, or click
              the small cookie button at the bottom-left corner of any page.
              Browsers also let you block or delete cookies through their
              settings. See your browser&apos;s help pages for details.
            </p>
          </section>

          <VoltageRule width="full" tone="amber" className="my-3" />

          <section>
            <h2 className="font-display text-2xl text-black mb-3 uppercase tracking-tight">
              Questions?
            </h2>
            <p>
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
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";
import { CopperRule } from "@/components/ui/CopperRule";
import { StampMark } from "@/components/ui/StampMark";
import { openCookiePreferences } from "@/lib/cookieConsent";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary hover:text-primary mb-10"
        >
          <ArrowLeft size={14} strokeWidth={2} /> Back to site
        </Link>

        <StampMark label="Doc 03" meta="Cookies" rotate={-2} />

        <h1 className="mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tighter text-black leading-[1.05]">
          Cookie policy.
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black/60">
          Last updated · January 2026
        </p>

        <CopperRule className="my-10" />

        <button
          type="button"
          onClick={openCookiePreferences}
          className="mb-10 inline-flex items-center gap-2 bg-primary hover:bg-primary text-primary-text px-5 py-3 font-mono text-[12px] uppercase tracking-[0.22em] transition-colors"
        >
          <Cookie size={15} strokeWidth={1.8} />
          Manage cookie preferences
        </button>

        <div className="space-y-10 font-sans text-[15px] leading-relaxed text-black/60">
          <Section title="What cookies are">
            <p>
              Cookies are small files your browser stores when you visit a
              site. They let the site remember things about your visit (your
              language, your preferences, whether you have agreed to
              analytics).
            </p>
          </Section>

          <Section title="Cookies we set">
            <ul className="ml-5 mt-3 list-disc space-y-2">
              <li>
                <strong className="text-black">Strictly necessary.</strong> Always
                on. These keep the site working: form submissions, error
                handling, your cookie consent state itself.
              </li>
              <li>
                <strong className="text-black">Analytics.</strong> Off by
                default. If you opt in, we set anonymous traffic cookies so we
                can see which pages help and which ones flop.
              </li>
              <li>
                <strong className="text-black">Marketing.</strong> Off by
                default. If you opt in, we set cookies that help us measure
                ads and re-share helpful posts with people in similar
                situations.
              </li>
            </ul>
          </Section>

          <Section title="Changing your mind">
            <p>
              Use the {"\"Manage cookie preferences\""} button at the top of
              this page (or the floating cookie icon at the bottom-left of
              every page) to change what you have agreed to at any time.
            </p>
          </Section>

          <Section title="Third-party cookies">
            <p>
              Analytics and marketing categories rely on third-party services
              (such as Google Analytics or Meta Pixel) when enabled. Those
              services have their own privacy policies linked from their
              websites.
            </p>
          </Section>

          <Section title="Storage">
            <p>
              Your consent choice is stored in your browser&apos;s local
              storage so we do not have to ask again on every page load. It
              never leaves your browser.
            </p>
          </Section>

          <Section title="Questions">
            <p>
              Reach out at{" "}
              <a
                href="mailto:{{EMAIL}}"
                className="text-primary underline hover:text-primary font-medium"
              >
                {"{{EMAIL}}"}
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

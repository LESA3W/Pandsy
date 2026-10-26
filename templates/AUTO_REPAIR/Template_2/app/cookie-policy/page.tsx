"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import SignTitle from "@/components/ui/SignTitle";
import { openCookiePreferences } from "@/lib/cookieConsent";
import { cn } from "@/lib/cn";

export default function CookiePolicy() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <article className="container-tight pb-20 pt-32 md:pb-28 md:pt-40">
          <SectionLabel>Cookies</SectionLabel>
          <SignTitle as="h1" size="display" className="mt-4">
            Cookie Policy
          </SignTitle>
          <p className="mt-4 font-sans text-sm text-black/50">
            Effective date: January 1, 2025
          </p>

          <div className="mt-12 flex max-w-3xl flex-col gap-6 font-sans text-base text-black/60">
            <p>
              This page explains the cookies used on the{" "}
              {"{{BUSINESS_NAME}}"} website, what they do, and how you can
              control them.
            </p>

            <H2>What is a cookie?</H2>
            <p>
              A cookie is a small file stored by your browser when you visit
              a website. Cookies help the site remember your preferences,
              keep you signed in, and measure how the site is used.
            </p>

            <H2>Categories we use</H2>
            <p>
              <strong>Necessary.</strong> Required for the site to function.
              These are always on.
            </p>
            <p>
              <strong>Analytics.</strong> Anonymous traffic data that tells
              us which pages are working and which need attention.
            </p>
            <p>
              <strong>Marketing.</strong> Used for retargeting and measuring
              ad performance, only if you opt in.
            </p>

            <H2>Manage your preferences</H2>
            <p>
              You can update your choices at any time. Click the button below
              to reopen the cookie preferences modal.
            </p>
            <button
              type="button"
              onClick={openCookiePreferences}
              className={cn(
                "mt-3 inline-flex w-fit items-center bg-secondary px-5 py-3",
                "font-display text-sm font-semibold uppercase tracking-wider text-secondary-text",
                "transition-colors hover:bg-secondary/80",
              )}
            >
              Manage cookie preferences
            </button>

            <H2>Browser controls</H2>
            <p>
              You can also manage cookies directly in your browser settings.
              Note that blocking necessary cookies may stop parts of the
              site from working.
            </p>

            <H2>Contact</H2>
            <p>
              Questions about cookies? Email{" "}
              <a href="mailto:{{EMAIL}}" className="text-secondary underline">
                {"{{EMAIL}}"}
              </a>
              .
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-6 font-display text-2xl font-bold text-black">
      {children}
    </h2>
  );
}

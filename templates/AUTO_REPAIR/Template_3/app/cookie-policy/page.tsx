"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";
import SodiumButton from "@/components/ui/SodiumButton";
import { openCookiePreferences } from "@/lib/cookieConsent";

export default function CookiePolicy() {
  return (
    <>
      <Header />
      <main className="bg-black">
        <article className="container-tight pb-20 pt-32 md:pb-28 md:pt-40">
          <NightTag>Cookies</NightTag>
          <NightTitle as="h1" size="lg" className="mt-4">
            Cookie Policy
          </NightTitle>
          <p className="mt-4 font-sans text-sm text-white/50">
            Effective date: January 1, 2025
          </p>

          <div className="mt-12 flex max-w-3xl flex-col gap-6 font-sans text-base leading-relaxed text-white/60">
            <p>
              This page explains the cookies used on the {"{{BUSINESS_NAME}}"}{" "}
              website, what they do, and how you can control them.
            </p>

            <H2>What is a cookie?</H2>
            <p>
              A cookie is a small file stored by your browser when you visit a
              website. Cookies help the site remember your preferences, keep
              you signed in, and measure how the site is used.
            </p>

            <H2>Categories we use</H2>
            <p>
              <strong className="text-white/90">Necessary.</strong> Required for
              the site to function. These are always on.
            </p>
            <p>
              <strong className="text-white/90">Analytics.</strong> Anonymous
              traffic data that tells us which pages are working and which need
              attention.
            </p>
            <p>
              <strong className="text-white/90">Marketing.</strong> Used for
              retargeting and measuring ad performance, only if you opt in.
            </p>

            <H2>Manage your preferences</H2>
            <p>
              You can update your choices at any time. Click the button below
              to reopen the cookie preferences modal.
            </p>
            <SodiumButton
              onClick={openCookiePreferences}
              size="md"
              className="mt-3 self-start"
            >
              Manage cookie preferences
            </SodiumButton>

            <H2>Browser controls</H2>
            <p>
              You can also manage cookies directly in your browser settings.
              Note that blocking necessary cookies may stop parts of the site
              from working.
            </p>

            <H2>Contact</H2>
            <p>
              Questions about cookies? Email{" "}
              <a href="mailto:{{EMAIL}}" className="text-primary underline">
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
    <h2 className="mt-6 font-display text-2xl font-bold text-white/90">
      {children}
    </h2>
  );
}

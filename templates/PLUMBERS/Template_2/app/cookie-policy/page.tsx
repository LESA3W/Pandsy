"use client";

import { MastHeader } from "@/components/MastHeader";
import { Footer } from "@/components/Footer";
import { BrassMedallion } from "@/components/ui/BrassMedallion";
import { PlateLine } from "@/components/ui/PlateLine";
import { openCookiePreferences } from "@/lib/cookieConsent";

export default function CookiePolicy() {
  return (
    <>
      <MastHeader />
      <main className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary">
            <BrassMedallion size={9} />
            Plate / Cookies
          </p>
          <PlateLine tone="primary" className="mt-5 max-w-[180px]" />
          <h1 className="mt-7 font-display text-4xl sm:text-5xl font-semibold text-black leading-tight">
            Cookie policy
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-black/40">
            {"{{BUSINESS_NAME}}"} · {"{{FULL_ADDRESS}}"}
          </p>

          <div className="mt-10 space-y-7 text-black/80 leading-relaxed">
            <Section title="1. What cookies are">
              <p>
                Cookies are small text files that websites store on your device
                to remember things between visits. We use them sparingly and
                only with your permission for non-essential categories.
              </p>
            </Section>

            <Section title="2. Categories we use">
              <ul className="space-y-3 mt-2">
                <li>
                  <strong className="font-display text-base text-black">Necessary.</strong>{" "}
                  Required for the site to work, like remembering your
                  cookie choices. These are always on.
                </li>
                <li>
                  <strong className="font-display text-base text-black">Analytics.</strong>{" "}
                  Help us understand which pages people use. Anonymized.
                  Off by default.
                </li>
                <li>
                  <strong className="font-display text-base text-black">Marketing.</strong>{" "}
                  Used to measure the performance of any ad campaigns we run.
                  Off by default.
                </li>
              </ul>
            </Section>

            <Section title="3. Your choices">
              <p>
                On your first visit you see a banner with three options: accept
                all, reject all, or customize. After that, you can always
                re-open this panel from the cookie button on the bottom-left
                of any page, or with the button below.
              </p>
              <button
                type="button"
                onClick={() => openCookiePreferences()}
                className="mt-5 inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 font-mono text-xs uppercase tracking-widest text-primary-text hover:opacity-90 transition-opacity"
              >
                Manage cookie preferences
              </button>
            </Section>

            <Section title="4. Browser controls">
              <p>
                You can also manage cookies in your browser settings. Clear
                them, block them, or be warned before they are set. Doing so
                may affect how this and other sites work.
              </p>
            </Section>

            <Section title="5. Contact">
              <p>
                Questions about cookies on this site? Reach us at{" "}
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

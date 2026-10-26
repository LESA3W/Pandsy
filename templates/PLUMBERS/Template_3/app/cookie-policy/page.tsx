"use client";

import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import PipeTick from "@/components/ui/PipeTick";
import { openCookiePreferences } from "@/lib/cookieConsent";

export default function CookiePolicy() {
  return (
    <>
      <TopBar />
      <main className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
            <PipeTick />
            Cookie policy
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.4vw,3.6rem)] font-black leading-[1.04] tracking-tight-display text-black">
            Cookie policy
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-black/60">
            {"{{BUSINESS_NAME}}"} · {"{{FULL_ADDRESS}}"}
          </p>

          <div className="prose prose-sm mt-10 max-w-none space-y-7 text-black">
            <Section title="1. What cookies are">
              <p>
                Cookies are small text files saved by your browser when you
                visit a website. They help the site remember things across
                visits. We use them sparingly and only with your permission for
                anything that is not strictly necessary.
              </p>
            </Section>

            <Section title="2. Categories we use">
              <ul className="mt-2 space-y-3">
                <li>
                  <strong className="font-display text-base font-bold text-black">
                    Necessary
                  </strong>{" "}
                  · required for the site to work. Always on.
                </li>
                <li>
                  <strong className="font-display text-base font-bold text-black">
                    Analytics
                  </strong>{" "}
                  · anonymized data about which pages are useful. Optional.
                </li>
                <li>
                  <strong className="font-display text-base font-bold text-black">
                    Marketing
                  </strong>{" "}
                  · used to measure ad campaign performance. Optional.
                </li>
              </ul>
            </Section>

            <Section title="3. Manage your preferences">
              <p>
                You can change your choices any time. The cookie button at
                the bottom-left of every page reopens this panel. Click below
                to open it now:
              </p>
              <button
                type="button"
                onClick={() => openCookiePreferences()}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-mono text-xs uppercase tracking-widest text-primary-text shadow-lift-soft transition-all duration-150 ease-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lift"
              >
                Manage cookie preferences
              </button>
            </Section>

            <Section title="4. Browser controls">
              <p>
                You can also clear cookies through your browser settings. If
                you do, your preferences here will reset and the cookie banner
                will reappear on your next visit.
              </p>
            </Section>

            <Section title="5. Contact">
              <p>
                Questions about cookies? Reach us at {"{{PHONE}}"} or{" "}
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

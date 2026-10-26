import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import PipeTick from "@/components/ui/PipeTick";

export const metadata = {
  title: "Privacy Policy · {{BUSINESS_NAME}}",
};

export default function PrivacyPolicy() {
  return (
    <>
      <TopBar />
      <main className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
            <PipeTick />
            Privacy policy
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.4vw,3.6rem)] font-black leading-[1.04] tracking-tight-display text-black">
            Privacy policy
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-black/60">
            {"{{BUSINESS_NAME}}"} · {"{{FULL_ADDRESS}}"}
          </p>

          <div className="prose prose-sm mt-10 max-w-none space-y-7 text-black">
            <Section title="1. Who this policy is from">
              <p>
                This privacy policy is from {"{{BUSINESS_NAME}}"} (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;), located at {"{{FULL_ADDRESS}}"}. We operate the
                website you are reading. If you contact us through this site we
                receive the information you choose to send.
              </p>
            </Section>

            <Section title="2. What we collect">
              <p>When you submit a quote request or contact form, we receive:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Your name</li>
                <li>Your email address</li>
                <li>Your phone number</li>
                <li>Your service address (quote form only)</li>
                <li>The job details you describe</li>
                <li>Any photos you choose to attach (quote form only)</li>
              </ul>
              <p className="mt-3">
                We also receive standard server logs (IP address, browser, time)
                and, if you accept analytics cookies, anonymized site usage data.
              </p>
            </Section>

            <Section title="3. How we use it">
              <p>
                We use what you send to respond to your job request, prepare a
                written quote, and follow up about scheduled work. We do not
                sell your data and do not share it with third parties for
                marketing purposes.
              </p>
            </Section>

            <Section title="4. How long we keep it">
              <p>
                Quote and contact submissions are retained for as long as needed
                to complete the job and meet our legal record-keeping obligations.
                You may request deletion at any time by emailing us.
              </p>
            </Section>

            <Section title="5. Cookies">
              <p>
                See our{" "}
                <a
                  href="/cookie-policy"
                  className="text-primary underline underline-offset-4 hover:opacity-70"
                >
                  cookie policy
                </a>{" "}
                for the full breakdown. You can change your preferences any time
                from the cookie button on the bottom-left of any page.
              </p>
            </Section>

            <Section title="6. Your rights">
              <p>
                You may request a copy of the data we hold about you, request
                corrections, or request deletion. Email us at{" "}
                <a
                  href="mailto:{{EMAIL}}"
                  className="text-primary underline underline-offset-4 hover:opacity-70"
                >
                  {"{{EMAIL}}"}
                </a>{" "}
                with your request.
              </p>
            </Section>

            <Section title="7. Contact">
              <p>
                Questions about this policy? Reach us at {"{{PHONE}}"} or{" "}
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

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import SignTitle from "@/components/ui/SignTitle";

export const metadata = {
  title: "Terms of Service | {{BUSINESS_NAME}}",
};

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <article className="container-tight pb-20 pt-32 md:pb-28 md:pt-40">
          <SectionLabel>Terms</SectionLabel>
          <SignTitle as="h1" size="display" className="mt-4">
            Terms of Service
          </SignTitle>
          <p className="mt-4 font-sans text-sm text-black/50">
            Effective date: January 1, 2025
          </p>

          <div className="mt-12 flex max-w-3xl flex-col gap-6 font-sans text-base text-black/60">
            <p>
              These terms govern your use of the {"{{BUSINESS_NAME}}"} website.
              By using the site, you agree to them. If you do not agree,
              please do not use the site.
            </p>

            <H2>About this site</H2>
            <p>
              This site is provided as a way to learn about our services,
              request a quote, and contact us. We do our best to keep the
              information accurate and current, but some details (pricing,
              hours, availability) can change without notice.
            </p>

            <H2>Quotes and estimates</H2>
            <p>
              Any quote you receive through the site is a preliminary
              estimate based on the information you provide. The final price
              for any service is confirmed in writing once we have inspected
              the vehicle. No work begins until you have approved that
              written estimate.
            </p>

            <H2>Warranty</H2>
            <p>
              Repairs performed by {"{{BUSINESS_NAME}}"} are covered by a
              twelve-month warranty on parts and labor under normal use.
              The warranty does not cover damage from accident, abuse, or
              modifications made elsewhere after the work was completed.
              Full warranty terms are provided with every repair invoice.
            </p>

            <H2>Acceptable use</H2>
            <p>
              You agree not to use this site to send spam, harass our team,
              attempt unauthorized access, or otherwise misuse the site. We
              reserve the right to block access if we believe the site is
              being misused.
            </p>

            <H2>Liability</H2>
            <p>
              The site and its contents are provided on an as-is basis. To
              the maximum extent permitted by law, {"{{BUSINESS_NAME}}"} is
              not liable for any indirect, incidental, or consequential
              damages arising from your use of the site.
            </p>

            <H2>Changes</H2>
            <p>
              We may update these terms from time to time. If we make a
              material change, we will note it on this page along with the
              new effective date.
            </p>

            <H2>Contact</H2>
            <p>
              Questions about these terms? Email{" "}
              <a href="mailto:{{EMAIL}}" className="text-secondary underline">
                {"{{EMAIL}}"}
              </a>{" "}
              or call {"{{PHONE}}"}.
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

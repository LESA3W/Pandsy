import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";

export const metadata = {
  title: "Terms of Service | {{BUSINESS_NAME}}",
};

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="bg-black">
        <article className="container-tight pb-20 pt-32 md:pb-28 md:pt-40">
          <NightTag>Terms</NightTag>
          <NightTitle as="h1" size="lg" className="mt-4">
            Terms of Service
          </NightTitle>
          <p className="mt-4 font-sans text-sm text-white/50">
            Effective date: January 1, 2025
          </p>

          <div className="mt-12 flex max-w-3xl flex-col gap-6 font-sans text-base leading-relaxed text-white/60">
            <p>
              These terms govern your use of the {"{{BUSINESS_NAME}}"} website.
              By using the site, you agree to these terms. If you do not agree,
              please do not use the site.
            </p>

            <H2>Use of the site</H2>
            <p>
              You may use this site to learn about our services, request a
              quote, or contact us. You agree not to use the site to harm us or
              other visitors, copy our content for your own commercial use, or
              attempt to access parts of the site you are not authorized to
              access.
            </p>

            <H2>Accuracy of content</H2>
            <p>
              We do our best to keep prices, hours, and service descriptions
              accurate, but we cannot guarantee the site is error-free at every
              moment. Anything quoted on a form is an estimate until confirmed
              in writing or in person at the shop.
            </p>

            <H2>No warranty implied by the site</H2>
            <p>
              The information on this site is provided as-is. Repair work
              performed by {"{{BUSINESS_NAME}}"} is covered by our written
              workmanship warranty, which is given to you with your invoice
              and applies to the work itself, not to anything written on this
              website.
            </p>

            <H2>Third-party links</H2>
            <p>
              This site may link to third parties (Google reviews, social media,
              maps). We are not responsible for the content or practices of
              those sites.
            </p>

            <H2>Changes</H2>
            <p>
              We may update these terms from time to time. The effective date
              above will reflect the most recent change.
            </p>

            <H2>Contact</H2>
            <p>
              Questions? Email{" "}
              <a href="mailto:{{EMAIL}}" className="text-primary underline">
                {"{{EMAIL}}"}
              </a>{" "}
              or call{" "}
              <a href="tel:{{PHONE_DIGITS}}" className="text-primary underline">
                {"{{PHONE}}"}
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

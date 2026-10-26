import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import SignTitle from "@/components/ui/SignTitle";

export const metadata = {
  title: "Privacy Policy | {{BUSINESS_NAME}}",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <article className="container-tight pb-20 pt-32 md:pb-28 md:pt-40">
          <SectionLabel>Privacy</SectionLabel>
          <SignTitle as="h1" size="display" className="mt-4">
            Privacy Policy
          </SignTitle>
          <p className="mt-4 font-sans text-sm text-black/50">
            Effective date: January 1, 2025
          </p>

          <div className="prose-style mt-12 flex max-w-3xl flex-col gap-6 font-sans text-base text-black/60">
            <p>
              {"{{BUSINESS_NAME}}"} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this
              website. This page tells you what information we collect when
              you use the site, why we collect it, and what we do with it.
            </p>

            <H2>Information we collect</H2>
            <p>
              When you submit a form on this site (quote request or contact
              message), we collect the information you provide. That includes
              your name, email address, phone number, and any details you give
              about your vehicle or your inquiry. We use this only to respond
              to you and schedule any service you request.
            </p>
            <p>
              We also collect basic technical information automatically
              (browser type, pages visited, approximate location based on IP)
              so we can keep the site running and understand how it is used.
            </p>

            <H2>How we use it</H2>
            <ul className="list-disc pl-6">
              <li>To reply to your quote or contact request.</li>
              <li>To schedule service or follow up on prior service.</li>
              <li>To improve the site and the customer experience.</li>
              <li>To meet legal and accounting requirements.</li>
            </ul>

            <H2>What we do not do</H2>
            <p>
              We do not sell your information. We do not share it with
              advertisers. We do not send marketing emails unless you have
              specifically asked us to.
            </p>

            <H2>Cookies</H2>
            <p>
              We use a small number of cookies to keep the site functional
              and to understand how it is used. You control which categories
              are active through the cookie banner or the cookie button in
              the bottom-left corner. See the{" "}
              <a href="/cookie-policy" className="text-secondary underline">
                Cookie Policy
              </a>{" "}
              for details.
            </p>

            <H2>Your rights</H2>
            <p>
              You can ask us what information we hold about you, ask us to
              correct it, or ask us to delete it. Email us at{" "}
              <a href="mailto:{{EMAIL}}" className="text-secondary underline">
                {"{{EMAIL}}"}
              </a>{" "}
              and we will respond within 30 days.
            </p>

            <H2>Contact</H2>
            <p>
              {"{{BUSINESS_NAME}}"}
              <br />
              {"{{FULL_ADDRESS}}"}
              <br />
              {"{{PHONE}}"}
              <br />
              <a href="mailto:{{EMAIL}}" className="text-secondary underline">
                {"{{EMAIL}}"}
              </a>
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

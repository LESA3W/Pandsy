/**
 * Homepage — orchestrates the 12 required sections in order
 * (claude.md hard rule #4):
 *   Header → Hero → TrustBar → Services → About → WhyChooseUs
 *   → Gallery → Reviews → QuoteSection → CtaSection → ContactSection → Footer
 */
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BadgeMarquee } from "@/components/BadgeMarquee";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { ServiceAreas } from "@/components/ServiceAreas";
import { QuoteSection } from "@/components/QuoteSection";
import { CtaSection } from "@/components/CtaSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BadgeMarquee />
        <Services />
        <About />
        <WhyChooseUs />
        <Gallery />
        <Reviews />
        <ServiceAreas />
        <QuoteSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

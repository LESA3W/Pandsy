import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { BadgeMarquee } from "@/components/BadgeMarquee";
import Services from "@/components/Services";
import AboutStory from "@/components/AboutStory";
import ShopValues from "@/components/ShopValues";
import Workmanship from "@/components/Workmanship";
import Reviews from "@/components/Reviews";
import QuoteSection from "@/components/QuoteSection";
import CtaSection from "@/components/CtaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BadgeMarquee />
        <Services />
        <AboutStory />
        <ShopValues />
        <Workmanship />
        <Reviews />
        <QuoteSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

import TopBar from "@/components/TopBar";
import LandingHero from "@/components/LandingHero";
import { BadgeMarquee } from "@/components/BadgeMarquee";
import ServiceMenu from "@/components/ServiceMenu";
import CompanyStory from "@/components/CompanyStory";
import Promise from "@/components/Promise";
import MomentGallery from "@/components/MomentGallery";
import Testimonials from "@/components/Testimonials";
import ServiceAreas from "@/components/ServiceAreas";
import RequestPanel from "@/components/RequestPanel";
import RescueBar from "@/components/RescueBar";
import ReachUs from "@/components/ReachUs";
import Footer from "@/components/Footer";

// 12 sections in the canonical order per CLAUDE.md hard rule #4.9.
// Header → Hero → Trust bar → Services → About → Why Choose Us → Gallery →
// Reviews → Quote section → CTA section → Contact → Footer.

export default function Page() {
  return (
    <>
      <TopBar />
      <main>
        <LandingHero />
        <BadgeMarquee />
        <ServiceMenu />
        <CompanyStory />
        <Promise />
        <MomentGallery />
        <Testimonials />
        <ServiceAreas />
        <RequestPanel />
        <RescueBar />
        <ReachUs />
      </main>
      <Footer />
    </>
  );
}

import { MastHeader } from "@/components/MastHeader";
import { OpeningPlate } from "@/components/OpeningPlate";
import { BadgeMarquee } from "@/components/BadgeMarquee";
import { ServiceSheet } from "@/components/ServiceSheet";
import { ShopBio } from "@/components/ShopBio";
import { Standards } from "@/components/Standards";
import { WorkshopPlate } from "@/components/WorkshopPlate";
import { ClientNotes } from "@/components/ClientNotes";
import { ServiceAreas } from "@/components/ServiceAreas";
import { QuoteTicket } from "@/components/QuoteTicket";
import { CallSheet } from "@/components/CallSheet";
import { ContactCard } from "@/components/ContactCard";
import { Footer } from "@/components/Footer";

// 12 sections in canonical order per CLAUDE.md rule #4 + #4b.
export default function Page() {
  return (
    <>
      <MastHeader />
      <main>
        <OpeningPlate />
        <BadgeMarquee />
        <ServiceSheet />
        <ShopBio />
        <Standards />
        <WorkshopPlate />
        <ClientNotes />
        <ServiceAreas />
        <QuoteTicket />
        <CallSheet />
        <ContactCard />
      </main>
      <Footer />
    </>
  );
}

"use client";

import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SignTitle from "@/components/ui/SignTitle";
import PaperCard from "@/components/ui/PaperCard";
import ContactForm from "@/components/forms/ContactForm";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// ContactSection. Left col: copy + clickable shop photo + contact rows.
// Right col: ContactForm in a paper card.
export default function ContactSection() {
  return (
    <section id="contact" className="bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
        >
          <SectionLabel>Get in touch</SectionLabel>
        </motion.div>
        <div className="mt-4 grid gap-8 sm:gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
          >
            <SignTitle as="h2" size="xl" className="mt-0">
              Stop by, give us a ring, or send a note.
            </SignTitle>
            <p className="mt-4 sm:mt-5 max-w-md font-sans text-[14px] sm:text-base text-black/60">
              The fastest way to get on the schedule is a phone call during
              shop hours. For everything else, the form works great.
            </p>

            {/* Find-us photo card. Clickable, opens Google Maps. Doubles as
                the shop's first visual impression for visitors. */}
            <a
              href="{{GOOGLE_MAPS_URL}}"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 sm:mt-8 block"
            >
              <div className="relative aspect-[16/10] max-h-[220px] sm:max-h-none overflow-hidden bg-black/10 sm:aspect-[3/2]">
                {/* Reuses {{HERO}} so visitors see the shop exterior / hero
                    shot when looking up the location. Image-rotation balanced
                    across the page (HERO appears in Hero + here only). */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="{{HERO}}"
                  alt="Find {{BUSINESS_NAME}}"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Bottom shop placard with map link CTA */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between bg-white/95 px-4 py-2.5 backdrop-blur-sm transition-colors group-hover:bg-white">
                  <div className="flex items-center gap-2.5">
                    <MapPin size={14} strokeWidth={2} className="text-primary" />
                    <span className="small-caps text-[10px] text-black/60">
                      Find us in {"{{CITY}}"}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-secondary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </a>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.2)}
              className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4"
            >
              <ContactRow
                icon={<MapPin size={16} strokeWidth={2} className="text-secondary" />}
                label="Address"
                content="{{FULL_ADDRESS}}"
                href="{{GOOGLE_MAPS_URL}}"
                external
              />
              <ContactRow
                icon={<Phone size={16} strokeWidth={2} className="text-secondary" />}
                label="Phone"
                content="{{PHONE}}"
                href="tel:{{PHONE_DIGITS}}"
                borderColor="secondary"
              />
              <ContactRow
                icon={<Mail size={16} strokeWidth={2} className="text-secondary" />}
                label="Email"
                content="{{EMAIL}}"
                href="mailto:{{EMAIL}}"
              />
              {/* Hours row hidden on mobile — hours live only in the Footer
                  on small screens per /frontend-design pass 2026-05-16. */}
              <div className="hidden md:contents">
                <ContactRow
                  icon={<Clock size={16} strokeWidth={2} className="text-secondary" />}
                  label="Hours"
                  content="{{HOURS}}"
                />
              </div>
            </motion.ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
          >
            <PaperCard className="p-4 sm:p-6 md:p-8" elevation="lift">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-black">
                Send a message
              </h3>
              <p className="mt-1 font-sans text-[13px] sm:text-sm text-black/60">
                We reply during shop hours, usually same day.
              </p>
              <div className="mt-5 sm:mt-6">
                <ContactForm />
              </div>
            </PaperCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  content,
  href,
  external,
  borderColor = "clay",
}: {
  icon: React.ReactNode;
  label: string;
  content: string;
  href?: string;
  external?: boolean;
  borderColor?: "clay" | "secondary";
}) {
  const inner = (
    <>
      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center">
        {icon}
      </span>
      <div>
        <span className="small-caps text-[11px] text-black/50">{label}</span>
        <p className="mt-0.5 font-sans text-base text-black">{content}</p>
      </div>
    </>
  );

  return (
    <motion.li variants={staggerItem} className={`flex border-l-2 ${borderColor === "secondary" ? "border-secondary" : "border-primary"} pl-4`}>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="flex flex-1 gap-3 transition-colors hover:text-secondary"
        >
          {inner}
        </a>
      ) : (
        <div className="flex flex-1 gap-3">{inner}</div>
      )}
    </motion.li>
  );
}

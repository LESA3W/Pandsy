"use client";

import { Phone, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";
import HazeOverlay from "@/components/ui/HazeOverlay";
import SodiumButton from "@/components/ui/SodiumButton";
import GhostButton from "@/components/ui/GhostButton";

// Strong ease-out (emil-design-eng): starts fast, settles soft. Feels intentional.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Stagger the hero BLOCKS (not individual words). Per-word kinetic reveals read
// as "AI template" and collapsed the headline spacing. A single clean fade-up
// per block keeps real word spaces (SEO + a11y) and feels composed.
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

/**
 * Hero — full-bleed dark photo with vignette + sodium halation.
 *
 * Copy is business-age agnostic and works for any shop, in any city. Reads as
 * photographic editorial automotive. Headline uses real word spacing (no
 * per-word span split) so it stays legible to crawlers and screen readers.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex items-start sm:items-end overflow-hidden bg-black min-h-[759px] sm:min-h-[260px] md:min-h-[640px] lg:min-h-[100svh] pt-28 pb-4 sm:pt-32 sm:pb-8 md:pt-36 md:pb-16 lg:pb-24 -mb-[90px] md:mb-0">
      {/* Background photo — native <img> (Drive blocks next/image optimizer) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="{{HERO}}"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: EASE_OUT }}
      />
      <div className="absolute inset-0 -z-10">
        <HazeOverlay dim />
      </div>
      {/* Bottom scrim — grounds the lower content band on desktop (additive to HazeOverlay dim per rule 2b) */}
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-2/3 bg-gradient-to-t from-black via-black/65 to-transparent md:block" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-10 lg:max-w-none lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-10 max-w-2xl md:mt-0 md:max-w-none"
        >
          {/* SLOT:HERO_KICKER */}
          <motion.div variants={item}>
            <NightTag tone="secondary" className="!hidden mb-5 sm:!inline-flex sm:mb-7 sm:!text-[18px] md:!text-[13px]" data-slot="HERO_KICKER">
              OPEN · ON CALL · UNDER THE HOOD
            </NightTag>
          </motion.div>

          {/* SLOT:HERO_HEADLINE — desktop: "Car trouble? We'll get you" / "back on the road quickly." */}
          <motion.div variants={item}>
            <NightTitle as="h1" size="xl" className="text-balance !text-[38px] sm:!text-[59px] md:!text-[52px] lg:!text-[64px] xl:!text-[90px]" data-slot="HERO_HEADLINE">
              <span className="lg:whitespace-nowrap">Car trouble?<br className="lg:hidden" /> We&rsquo;ll get you</span><br className="hidden lg:block" /> back on the road quickly.
            </NightTitle>
          </motion.div>

          {/* SLOT:HERO_SUBLINE */}
          <motion.p
            variants={item}
            className="mt-[20px] max-w-xl text-pretty font-sans text-[18px] leading-relaxed text-white/70 sm:mt-[20px] sm:text-[21px] md:text-[17px] lg:text-[21px] lg:max-w-2xl"
            data-slot="HERO_SUBLINE"
          >
            {"{{BUSINESS_NAME}}"} runs in <span className="text-primary">{"{{CITY}}"}</span> on honest work,
            ASE-certified hands, and a 12-month warranty on what we fix. Bring
            it in and we will tell you, plainly, what is wrong.
          </motion.p>

          {/* CTAs (left) + meta hours/address (right) — one full-width row on desktop */}
          <motion.div
            variants={item}
            className="lg:flex lg:items-end lg:justify-between lg:gap-12"
          >
            {/* CTAs */}
            <div className="mt-[35px] flex flex-col items-stretch gap-4 sm:mt-[35px] sm:flex-row sm:flex-wrap sm:items-center lg:mt-8">
              <SodiumButton href="#quote" size="md" className="!text-[18px] !px-5 !py-4 !w-full sm:!px-7 sm:!w-auto md:!text-[16px] md:!py-3.5 lg:!text-[18px] lg:!py-4">
                Get a Free Quote
              </SodiumButton>
              <GhostButton href="tel:{{PHONE_DIGITS}}" size="md" variant="filled" className="!text-[18px] !px-5 !py-4 !w-full whitespace-nowrap !border-2 !border-primary sm:!px-7 sm:!w-auto md:!text-[16px] md:!py-3.5 lg:!text-[18px] lg:!py-4">
                <Phone size={21} strokeWidth={1.75} aria-hidden />
                Call {"{{PHONE}}"}
              </GhostButton>
            </div>

            {/* Meta — hours + address */}
            <div className="mt-8 hidden border-t border-white/10 pt-5 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-11 sm:gap-y-4 lg:mt-0 lg:shrink-0 lg:flex-col lg:items-start lg:gap-3 lg:border-t-0 lg:border-l lg:border-white/15 lg:pt-1 lg:pb-1 lg:pl-8">
              <span className="inline-flex items-center gap-3 font-sans text-[22px] text-white/70 sm:text-[23px] md:text-[12px] lg:text-[14px]">
                <Clock size={16} strokeWidth={1.75} className="shrink-0 text-primary" aria-hidden />
                <span className="whitespace-pre-line">{"{{HOURS}}"}</span>
              </span>
              <span className="hidden h-5 w-px bg-white/15 sm:inline-block lg:hidden" aria-hidden />
              <span className="inline-flex items-center gap-3 font-sans text-[22px] text-white/70 sm:text-[23px] md:text-[12px] lg:text-[14px]">
                <MapPin size={16} strokeWidth={1.75} className="shrink-0 text-primary" aria-hidden />
                <span>{"{{FULL_ADDRESS}}"}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

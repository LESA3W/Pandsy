"use client";

import { ChevronRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import PipeTick from "@/components/ui/PipeTick";
import WaterDot from "@/components/ui/WaterDot";
import RescuePill from "@/components/ui/RescuePill";
import AquaScrim from "@/components/ui/AquaScrim";
import WaveWash from "@/components/ui/WaveWash";
import {
  fadeUp,
  hoverLift,
  kineticContainer,
  kineticWord,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

// LandingHero — split layout with photographic image right + foreground stack left.
// AquaScrim dim layer + WaveWash atmospheric (CLAUDE.md rule #2b).
// Hero RescuePill row keeps emergency phone visible above the fold (rule #5b).

const TRUST_STRIP = [
  "Licensed & Insured",
  "Master Plumber",
  "24/7 Emergency",
  "Up-Front Pricing",
];

export default function LandingHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white pt-[6px] pb-7 sm:pt-10 sm:pb-10 md:pt-16 md:pb-14 lg:pt-20 lg:pb-16"
    >
      {/* Background atmospheric wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-wave-wash" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center lg:items-stretch gap-7 px-4 sm:gap-10 sm:px-6 md:px-10 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* LEFT — copy stack */}
        <div className="lg:col-span-7">
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary"
          >
            <PipeTick />
            {/* SLOT:HERO_KICKER */}
            <span data-slot="HERO_KICKER"><span className="text-black/45">CLEAN-WATER PLUMBING /</span> {"{{CITY}}, {{STATE}}"}</span>
          </motion.p>

          {/* SLOT:HERO_HEADLINE */}
          <motion.h1
            data-slot="HERO_HEADLINE"
            initial="hidden"
            animate="show"
            variants={kineticContainer}
            className="mt-4 font-display text-[31px] font-black leading-[1.04] tracking-tight-display text-black sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            <motion.span variants={kineticWord} className="inline-block whitespace-nowrap sm:whitespace-normal">We test the line.</motion.span>
            <br />
            <motion.span variants={kineticWord} className="inline-block whitespace-nowrap sm:whitespace-normal">We tarp the floor.</motion.span>
            <br />
            <motion.span variants={kineticWord} className="inline-block whitespace-nowrap sm:whitespace-normal text-primary">
              We close the work order.
            </motion.span>
          </motion.h1>

          {/* SLOT:HERO_SUBHEAD */}
          <motion.p
            data-slot="HERO_SUBHEAD"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.6 }}
            className="mt-3 max-w-xl text-[15px] leading-relaxed text-black/60 sm:mt-4 sm:text-base lg:text-lg"
          >
            Licensed plumbers serving {"{{CITY}}"}. Up-front pricing, written quotes,
            every joint pressure-tested before we leave.
          </motion.p>

          {/* Emergency RescuePill row — visible above the fold per rule #5b */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.7 }}
            className="hidden sm:block mt-4 max-w-xl sm:mt-6"
          >
            <RescuePill variant="hero-row" href="tel:{{PHONE_DIGITS}}">
              <span className="flex flex-col leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/85">
                  24/7 Emergency line
                </span>
                <span className="font-display text-lg font-black tracking-tight-display">
                  {"{{PHONE}}"} · Tap to call
                </span>
              </span>
            </RescuePill>
          </motion.div>

          {/* Two CTAs — primary + secondary per rule #4.3 */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.1, 0.8)}
            className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:gap-3"
          >
            <motion.a
              href="#quote"
              variants={staggerItem}
              {...hoverLift}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-primary px-5 py-4 font-mono text-[13px] uppercase tracking-widest text-primary-text shadow-lift-soft transition-colors duration-200 hover:bg-primary-text hover:text-primary hover:shadow-lift sm:px-6 sm:py-3.5 sm:text-xs"
            >
              Get a free quote
              <ChevronRight size={14} strokeWidth={2.4} />
            </motion.a>
            <motion.a
              href="tel:{{PHONE_DIGITS}}"
              variants={staggerItem}
              {...hoverLift}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary/70 px-5 py-4 font-mono text-[13px] uppercase tracking-widest text-secondary transition-colors duration-150 hover:bg-secondary hover:text-secondary-text hover:border-secondary sm:px-6 sm:py-3.5 sm:text-xs"
            >
              <Phone size={14} strokeWidth={2.4} />
              Call {"{{PHONE}}"}
            </motion.a>
          </motion.div>

          {/* Mono trust strip with WaterDot separators */}
          <motion.ul
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.06, 1.1)}
            className="mt-5 hidden flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-black/60 sm:mt-7 sm:flex"
          >
            {TRUST_STRIP.map((item, i) => (
              <motion.li key={item} variants={staggerItem} className="inline-flex items-center gap-3">
                {i > 0 && <WaterDot size={10} />}
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* RIGHT — framed photographic image */}
        <div className="lg:col-span-5">
          <figure className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 shadow-lift-strong">
            <div className="relative aspect-[3/2] w-full md:aspect-[4/5] lg:aspect-auto lg:min-h-0 lg:flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="{{HERO}}"
                alt="{{BUSINESS_NAME}} plumbing service in {{CITY}}"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* CLAUDE.md rule #2b: AquaScrim dim layer + WaveWash atmospheric */}
              <AquaScrim opacity="soft" tone="ink" />
              <WaveWash variant="soft" />
            </div>
            <figcaption className="flex items-center justify-between border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                On-site · {"{{CITY}}, {{STATE}}"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-black/60">
                Licensed plumber
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

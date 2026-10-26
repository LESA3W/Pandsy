"use client";

import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BrassMedallion } from "./ui/BrassMedallion";
import { PlateLine } from "./ui/PlateLine";
import { SchemaScrim } from "./ui/SchemaScrim";
import { PaperGrain } from "./ui/PaperGrain";
import {
  fadeUp,
  hoverLift,
  kineticContainer,
  kineticWord,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

// OpeningPlate (Hero) — white surface dominant, HERO image as a framed
// plate on the RIGHT (50% on desktop, full-width below). Foreground text
// lives on white (NOT on the image), so rule #2b "text on image" doesn't
// apply directly — but we still SchemaScrim the framed image with
// mix-blend-multiply to harmonize any client photo with the surface.
export function OpeningPlate() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <PaperGrain />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-center py-10 sm:py-14 md:py-20 lg:py-24 pt-2 sm:pt-4 md:pt-6 lg:pt-8">
          {/* LEFT — copy block */}
          <div className="lg:col-span-7">
            {/* SLOT:HERO_KICKER */}
            <motion.p
              data-slot="HERO_KICKER"
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-[10px] sm:mt-0 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary"
            >
              <BrassMedallion size={9} />
              <span className="text-black/45">PLUMBING SHOP /</span> {"{{CITY}}"}, {"{{STATE}}"}
            </motion.p>

            <PlateLine tone="primary" className="mt-5 max-w-[260px]" />

            {/* SLOT:HERO_HEADLINE */}
            <motion.h1
              data-slot="HERO_HEADLINE"
              initial="hidden"
              animate="show"
              variants={kineticContainer}
              className="mt-5 font-display text-3xl leading-[1.05] sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-black"
            >
              {"Open the line. Test the seal. Sign it off.".split(" ").map((w, i) => (
                <motion.span key={`hw-${i}`} variants={kineticWord} className="inline-block mr-[0.25em]">
                  {w}
                </motion.span>
              ))}
            </motion.h1>

            {/* SLOT:HERO_SUBHEAD */}
            <motion.p
              data-slot="HERO_SUBHEAD"
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.6 }}
              className="mt-4 sm:mt-6 max-w-xl text-[14px] sm:text-lg leading-relaxed text-black/60"
            >
              Licensed plumbers serving {"{{CITY}}"}. Up-front pricing, written quotes,
              every joint pressure-tested before we leave.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer(0.1, 0.8)}
              className="mt-6 sm:mt-9 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3"
            >
              <motion.a
                href="#quote"
                variants={staggerItem}
                {...hoverLift}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-primary bg-primary px-5 sm:px-6 py-3 sm:py-3.5 font-mono text-[13px] sm:text-xs uppercase tracking-widest text-primary-text transition-colors duration-200 hover:bg-primary-text hover:text-primary text-center"
              >
                <span className="leading-none">Get a free quote</span>
                <ArrowRight size={14} strokeWidth={2.25} className="shrink-0" />
              </motion.a>
              <motion.a
                href="tel:{{PHONE_DIGITS}}"
                variants={staggerItem}
                {...hoverLift}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-secondary px-5 sm:px-6 py-3 sm:py-3.5 font-mono text-[13px] sm:text-xs uppercase tracking-widest text-secondary hover:bg-secondary hover:text-secondary-text transition-colors text-center"
              >
                <Phone size={14} strokeWidth={2.25} className="shrink-0" />
                <span className="leading-none">24/7 <span className="hidden sm:inline">Emergency: </span>{"{{PHONE}}"}</span>
              </motion.a>
            </motion.div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={staggerContainer(0.06, 1.2)}
              className="mt-7 sm:mt-10 hidden sm:flex sm:flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-black/40"
            >
              {[
                "Licensed & insured",
                "Master plumber",
                "Up-front pricing",
                "Tested before sign-off",
              ].map((item) => (
                <motion.li key={item} variants={staggerItem} className="flex items-center gap-2">
                  <BrassMedallion size={6} />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT — framed image plate */}
          <div className="lg:col-span-5">
            <div className="relative">
              <PlateLine tone="primary" className="mb-2" />
              <div className="relative overflow-hidden border border-primary/60">
                <motion.img
                  src="{{HERO}}"
                  alt="{{BUSINESS_NAME}} crew on the job in {{CITY}}"
                  className="w-full h-[220px] sm:h-[380px] md:h-[440px] lg:h-[520px] object-cover"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Harmonization scrim — multiply blend, light, NOT a dim layer */}
                <SchemaScrim tone="white" opacity="soft" blend="multiply" />
                {/* Plate caption strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-black/10 px-4 py-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-primary">Plate 01 / On the job</span>
                  <span className="text-black/40">{"{{CITY}}, {{STATE}}"}</span>
                </div>
              </div>
              <PlateLine tone="primary" className="mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

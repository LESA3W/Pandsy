"use client";

/**
 * Hero — full-bleed image with WaterScrim dim layer (claude.md rule #2b)
 * + FlowWash atmospheric overlay + foreground content.
 *
 * Foreground:
 *   - kicker tag (mono, primary)
 *   - Fraunces display headline (SLOT marker)
 *   - Inter Tight subhead
 *   - Two CTAs: primary "Get a Free Quote" + secondary "Call Emergency Line"
 *   - mono trust strip below
 */
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { WaterScrim } from "./ui/WaterScrim";
import { FlowWash } from "./ui/FlowWash";
import { DropSeal } from "./ui/DropSeal";
import {
  fadeUp,
  hoverLift,
  kineticContainer,
  kineticWord,
  labelDrop,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-end overflow-hidden bg-black min-h-[100svh] md:min-h-[60vh]"

    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="{{HERO}}"
        alt=""
        className="absolute inset-x-0 top-[40px] h-full w-full object-cover object-top"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Dim layer — REQUIRED per claude.md rule #2b */}
      <WaterScrim dim="strong" />
      {/* Atmospheric overlay (additive) */}
      <FlowWash />
      {/* Subtle bottom-gradient to anchor content */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-28 sm:pt-24 md:pt-32 pb-12 sm:pb-10 md:pb-14 translate-y-0 sm:translate-y-10">
        <div className="max-w-3xl md:max-w-none">
          {/* Kicker */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={labelDrop}
            className="hidden md:flex items-center gap-3 mb-5 sm:mb-7 font-mono text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-widest text-white"
          >
            <DropSeal size={12} tone="white" />
            <span>Licensed &amp; insured · Master plumber on staff</span>
          </motion.div>

          {/* Display headline — SLOT */}
          {/* SLOT:HERO_HEADLINE */}
          <motion.h1
            data-slot="HERO_HEADLINE"
            initial="hidden"
            animate="show"
            variants={kineticContainer}
            className="font-display text-[42px] sm:text-4xl md:text-[3.6rem] lg:text-[4.5rem] xl:text-[4.5rem] text-white leading-[1.03] sm:leading-[1.02] tracking-tighter mb-5 sm:mb-5"
          >
            <motion.span variants={kineticWord} className="inline-block md:mr-[0.3em]">Steady hands.</motion.span>
            {/* Desktop: "Honest work." sits to the RIGHT of "Steady hands." (break hidden); mobile stays stacked */}
            <br className="md:hidden" />
            <motion.span variants={kineticWord} className="inline-block text-primary">Honest work.</motion.span>
            <br />
            <motion.span variants={kineticWord} className="inline-block">
              {/* Desktop: "The plumbing service {{CITY}}" stays on one line, break AFTER the city */}
              <span className="md:whitespace-nowrap">The plumbing service <span className="text-secondary">{"{{CITY}}"}</span></span>
              <br className="hidden md:block" />
              {" "}actually trusts.
            </motion.span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.6 }}
            className="font-sans text-[17px] sm:text-lg md:text-[1.5rem] text-white/85 leading-relaxed max-w-2xl mb-7 sm:mb-10"
          >
            From a slow drain to a midnight burst pipe, we show up clean, work
            fast, and leave it better than we found it. Up-front pricing.
            Same-day service. No surprise fees.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.1, 0.8)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-7 sm:mb-10"
          >
            <motion.a
              href="#quote"
              variants={staggerItem}
              {...hoverLift}
              className="group inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-primary-text hover:text-primary text-primary-text px-6 py-4 sm:px-7 sm:py-4 md:px-[2.1rem] md:py-[1.2rem] font-display text-[19px] sm:text-lg md:text-[1.35rem] tracking-wide transition-colors duration-200"
            >
              Get a free quote
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-1 sm:[&]:[width:18px] sm:[&]:[height:18px] md:[&]:[width:22px] md:[&]:[height:22px]"
              />
            </motion.a>
            <motion.a
              href="tel:{{PHONE_DIGITS}}"
              variants={staggerItem}
              {...hoverLift}
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 border border-secondary bg-secondary hover:bg-secondary-text hover:text-secondary text-secondary-text px-6 py-4 sm:px-7 sm:py-4 md:px-[2.1rem] md:py-[1.2rem] font-display text-[19px] sm:text-lg md:text-[1.35rem] tracking-wide transition-colors duration-200"
            >
              <Phone size={16} strokeWidth={2} className="sm:[&]:[width:18px] sm:[&]:[height:18px] md:[&]:[width:22px] md:[&]:[height:22px]" />
              <span className="flex items-baseline gap-2">
                <span>24/7 emergency</span>
                <span className="hidden sm:inline font-sans text-base md:text-[1.2rem] opacity-90">
                  {"{{PHONE}}"}
                </span>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

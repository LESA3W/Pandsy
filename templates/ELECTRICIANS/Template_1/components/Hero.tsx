"use client";

/**
 * Hero — full-bleed image with ArcScrim dim layer (claude.md rule #2b)
 * + FilamentGlow atmospheric overlay + foreground content.
 *
 * Foreground:
 *   - kicker tag (mono, amber-bright)
 *   - Archivo Black display headline (SLOT marker)
 *   - Inter subhead
 *   - Two CTAs: amber "Get a Free Quote" + emergency-red "24/7 Emergency"
 *   - mono trust strip below
 */
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ArcScrim } from "./ui/ArcScrim";
import { FilamentGlow } from "./ui/FilamentGlow";
import { VoltageMeter } from "./ui/VoltageMeter";
import {
  fadeUp,
  hoverLift,
  kineticContainer,
  kineticWord,
  labelDrop,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

const HEADLINE_WORDS_1 = ["Lights", "on."];
const HEADLINE_WORDS_3 = ["The", "licensed", "crew"];
const HEADLINE_WORDS_5 = ["calls", "when", "it", "matters."];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-center sm:items-end overflow-hidden bg-black min-h-[100svh] sm:min-h-[260px] md:min-h-[300px]"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="{{HERO}}"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Dim layer — REQUIRED per claude.md rule #2b */}
      <ArcScrim dim="strong" />
      {/* Atmospheric overlay (additive) */}
      <FilamentGlow breath />
      {/* Subtle bottom-gradient to anchor content */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-28 sm:pt-32 md:pt-36 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
        <div className="max-w-3xl md:max-w-none">
          {/* Kicker */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={labelDrop}
            className="flex items-center gap-3 mb-4 sm:mb-7 md:mb-[2.1rem] font-mono text-[11px] sm:text-[11px] md:text-[13px] uppercase tracking-widest text-primary"
          >
            <VoltageMeter size={14} tone="amber" />
            <span>Licensed master electrician · Code-compliant · 24/7</span>
          </motion.div>

          {/* Display headline — SLOT */}
          {/* SLOT:HERO_HEADLINE */}
          {/* xl capped at 5xl so line 3 (the long sentence) stays on ONE line on desktop per request */}
          <motion.h1
            data-slot="HERO_HEADLINE"
            initial="hidden"
            animate="show"
            variants={kineticContainer}
            className="font-display text-4xl sm:text-3xl md:text-[3.83rem] lg:text-[5.1rem] xl:text-[5.1rem] text-white leading-[1.05] sm:leading-[1.0] tracking-tighter mb-5 sm:mb-4 uppercase"
          >
            {HEADLINE_WORDS_1.map((w, i) => (
              <motion.span key={`w1-${i}`} variants={kineticWord} className="inline-block mr-[0.25em]">
                {w}
              </motion.span>
            ))}
            <br />
            <motion.span variants={kineticWord} className="inline-block text-primary">
              Power steady.
            </motion.span>
            <br />
            {HEADLINE_WORDS_3.map((w, i) => (
              <motion.span key={`w3-${i}`} variants={kineticWord} className="inline-block mr-[0.25em]">
                {w}
              </motion.span>
            ))}
            <motion.span variants={kineticWord} className="inline-block mr-[0.25em] text-secondary">
              {"{{CITY}}"}
            </motion.span>
            {/* Line break AFTER the city (desktop) */}
            <br className="hidden md:block" />
            {HEADLINE_WORDS_5.map((w, i) => (
              <motion.span key={`w5-${i}`} variants={kineticWord} className="inline-block mr-[0.25em]">
                {w}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.6 }}
            className="font-sans text-base sm:text-base md:text-[1.35rem] text-white/85 leading-relaxed max-w-2xl mb-6 sm:mb-6"
          >
            Sparking outlet, dead breaker, half the house out, EV charger you
            need wired clean. Master electrician on staff. Permits pulled.
            Up-front pricing. No surprise fees.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.1, 0.8)}
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-3 sm:mb-6"
          >
            <motion.a
              href="#quote"
              variants={staggerItem}
              {...hoverLift}
              className="group inline-flex items-center justify-center gap-2 border border-primary bg-primary text-black px-5 py-4 sm:px-6 sm:py-3.5 md:px-[2.1rem] md:py-[1.2rem] font-display text-base sm:text-sm md:text-[1.2rem] lg:text-[1.35rem] tracking-wide uppercase transition-colors duration-200 hover:bg-primary-text hover:text-primary"
            >
              Get a free quote
              <ArrowRight
                size={18}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-1 md:[&]:[width:22px] md:[&]:[height:22px]"
              />
            </motion.a>
            <motion.a
              href="tel:{{PHONE_DIGITS}}"
              variants={staggerItem}
              {...hoverLift}
              className="group inline-flex items-center justify-center gap-3 border border-secondary/70 text-white px-5 py-4 sm:px-6 sm:py-3.5 md:px-[2.1rem] md:py-[1.2rem] font-display text-base sm:text-sm md:text-[1.2rem] lg:text-[1.35rem] tracking-wide uppercase transition-colors hover:bg-secondary hover:text-secondary-text hover:border-secondary"
            >
              <Phone size={18} strokeWidth={2} className="md:[&]:[width:22px] md:[&]:[height:22px]" />
              <span className="flex items-baseline gap-2">
                <span>24/7 emergency</span>
                <span className="hidden sm:inline font-sans text-base md:text-[1.2rem] normal-case opacity-90">
                  {"{{PHONE}}"}
                </span>
              </span>
            </motion.a>
          </motion.div>

          {/* Mono trust strip — hidden on mobile to avoid duplicate with TrustBar section below */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.06, 1.2)}
            className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] sm:text-[11px] md:text-[13px] uppercase tracking-widest text-white/60"
          >
            <motion.span variants={staggerItem}>Bonded &amp; insured</motion.span>
            <VoltageMeter size={9} tone="amber" />
            <motion.span variants={staggerItem}>NEC certified</motion.span>
            <VoltageMeter size={9} tone="amber" />
            <motion.span variants={staggerItem}>BBB A+ rated</motion.span>
            <VoltageMeter size={9} tone="amber" />
            <motion.span variants={staggerItem}>{"{{CITY}}"}, {"{{STATE}}"}</motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

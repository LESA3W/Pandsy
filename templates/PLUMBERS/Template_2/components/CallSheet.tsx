"use client";

import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BrassMedallion } from "./ui/BrassMedallion";
import { PlateLine } from "./ui/PlateLine";
import { SchemaScrim } from "./ui/SchemaScrim";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// CallSheet (CtaSection) — full-bleed {{CTA}} + SchemaScrim dim layer
// + centered IBM Plex Serif SLOT headline + secondary primary CTA + primary ghost secondary.
// CLAUDE.md rule #2b strict — image is the section bg, text overlays it, dim layer required.
export function CallSheet() {
  return (
    <section className="relative isolate overflow-hidden">
      <motion.img
        src="{{CTA}}"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Required dim layer per CLAUDE.md rule #2b */}
      <SchemaScrim tone="harbor" opacity="max" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-10 lg:px-8 py-10 sm:py-14 md:py-20 lg:py-24 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
        >
          <p className="hidden sm:inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary">
            <BrassMedallion size={9} />
            On call
          </p>
          <PlateLine tone="primary" className="hidden sm:block mt-5 mx-auto max-w-[220px]" />

          {/* SLOT:CTA_HEADLINE */}
          <h2
            data-slot="CTA_HEADLINE"
            className="mt-5 sm:mt-8 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.06] tracking-tight text-white max-w-3xl mx-auto"
          >
            Pipe burst. Drain backed up. Don&apos;t wait. Don&apos;t guess.
          </h2>

          <p className="mt-4 sm:mt-6 max-w-xl mx-auto text-[14px] sm:text-lg leading-relaxed text-white/70">
            Our 24/7 line goes to a licensed plumber. Same-day service for
            most jobs in {"{{CITY}}"}.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.2)}
          className="mt-7 sm:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2.5 sm:gap-3"
        >
          <motion.a
            href="tel:{{PHONE_DIGITS}}"
            variants={staggerItem}
            {...hoverLift}
            className="inline-flex items-center justify-center gap-2 bg-secondary px-5 sm:px-7 py-3 sm:py-4 font-mono text-[13px] sm:text-xs uppercase tracking-widest text-secondary-text hover:opacity-90 transition-opacity"
          >
            <Phone size={14} strokeWidth={2.25} />
            Call now: {"{{PHONE}}"}
          </motion.a>
          <motion.a
            href="#quote"
            variants={staggerItem}
            {...hoverLift}
            className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-5 sm:px-7 py-3 sm:py-4 font-mono text-[13px] sm:text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-text transition-colors"
          >
            Get a quote
            <ArrowRight size={14} strokeWidth={2.25} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

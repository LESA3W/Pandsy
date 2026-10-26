"use client";

/**
 * CtaSection — full-bleed {{CTA}} image with GridScrim dim layer
 * (claude.md rule #2b) + GridGlow atmospheric. SafetyTape strips top + bottom
 * as T2 ELECTRICIANS signature (replaces T1's CircuitDivider).
 */
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GridScrim } from "./ui/GridScrim";
import { GridGlow } from "./ui/GridGlow";
import { SafetyTape } from "./ui/SafetyTape";
import { SchematicMark } from "./ui/SchematicMark";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Top hazard tape — T2 signature */}
      <SafetyTape thickness="thick" />

      <div className="relative py-12 sm:py-16 md:py-24 lg:py-28">
        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="{{CTA}}"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Dim layer — REQUIRED per claude.md rule #2b.
            Bumped to "max" so the white headline stays legible across the
            full range of client CTA photos (bright daylit trucks, sunlit
            workshops, etc.) at mobile viewport widths. */}
        <GridScrim dim="max" />
        {/* Atmospheric overlay */}
        <GridGlow variant="dark" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeUp}
          >
            <div className="hidden sm:flex items-center justify-center gap-3 mb-5 sm:mb-7 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary font-medium">
              <SchematicMark size={14} tone="sapphire" />
              <span>When the lights keep flickering</span>
              <SchematicMark size={14} tone="sapphire" />
            </div>

            {/* SLOT:CTA_HEADLINE */}
            <h2
              data-slot="CTA_HEADLINE"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[88px] text-white leading-[1.0] tracking-tight mb-5 sm:mb-7 max-w-5xl mx-auto font-bold"
            >
              After hours?
              <br />
              <span className="text-primary">You still call us.</span>
            </h2>

            <p className="font-sans text-base sm:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12">
              We answer the phone. Master electrician on call. Trucks loaded for
              after-hours response across {"{{CITY}}"} and the surrounding area.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.1, 0.2)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <motion.a
              href="tel:{{PHONE_DIGITS}}"
              variants={staggerItem}
              {...hoverLift}
              className="group inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent text-accent-text px-5 py-3 sm:px-7 sm:py-4 font-display text-[15px] sm:text-xl font-semibold tracking-tight transition-colors"
            >
              <Phone size={20} strokeWidth={2} />
              <span className="flex flex-col items-start sm:items-center sm:flex-row sm:gap-3 leading-tight">
                <span className="text-sm font-mono uppercase tracking-widest sm:hidden">
                  After-hours line
                </span>
                <span>{"{{PHONE}}"}</span>
              </span>
            </motion.a>
            <motion.a
              href="#quote"
              variants={staggerItem}
              {...hoverLift}
              className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary text-primary-text px-5 py-3 sm:px-7 sm:py-4 font-display text-[15px] sm:text-xl font-semibold tracking-tight transition-colors"
            >
              Submit a ticket
              <ArrowRight
                size={20}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>

          <p className="hidden sm:block mt-7 sm:mt-10 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-white/60 relative z-10">
            Licensed master electrician / Bonded &amp; insured / After-hours response
          </p>
        </div>
      </div>

      {/* Bottom hazard tape */}
      <SafetyTape thickness="thick" />
    </section>
  );
}

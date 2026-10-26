"use client";

/**
 * CtaSection — full-bleed {{CTA}} image background with ArcScrim dim layer
 * (claude.md rule #2b) + FilamentGlow atmospheric. Foreground: emergency
 * framing. CircuitDivider top + bottom as T1 ELECTRICIANS signature.
 */
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ArcScrim } from "./ui/ArcScrim";
import { FilamentGlow } from "./ui/FilamentGlow";
import { CircuitDivider } from "./ui/CircuitDivider";
import { VoltageMeter } from "./ui/VoltageMeter";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-black py-7 sm:py-12 md:py-20 lg:py-24">
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
      {/* Dim layer — REQUIRED per claude.md rule #2b */}
      <ArcScrim dim="strong" />
      {/* Atmospheric overlay */}
      <FilamentGlow />

      {/* Top circuit divider */}
      <div className="absolute top-0 inset-x-0 z-10">
        <CircuitDivider tone="amber" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
        >
          <div className="hidden sm:flex items-center justify-center gap-3 mb-4 sm:mb-7 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary">
            <VoltageMeter size={14} tone="amber" />
            <span>When the lights go out</span>
            <VoltageMeter size={14} tone="amber" />
          </div>

          {/* SLOT:CTA_HEADLINE */}
          <h2
            data-slot="CTA_HEADLINE"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl text-white leading-[1.0] tracking-tighter mb-5 sm:mb-7 max-w-5xl mx-auto uppercase"
          >
            Sparking outlet? Half the house out?
            <br />
            <span className="text-primary">Don&apos;t wait. Don&apos;t guess.</span>
          </h2>

          <p className="font-sans text-[14px] sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-7 sm:mb-10 md:mb-12">
            We answer the phone any hour. Master electrician on call. Trucks
            loaded for emergency response across {"{{CITY}}"} and the surrounding
            area.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.2)}
          className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center"
        >
          <motion.a
            href="tel:{{PHONE_DIGITS}}"
            variants={staggerItem}
            {...hoverLift}
            className="group inline-flex items-center justify-center gap-3 border border-secondary/70 bg-black/40 text-white px-5 py-3 sm:px-6 sm:py-3.5 md:px-7 md:py-4 font-display text-[13px] sm:text-base md:text-lg tracking-wide uppercase transition-colors backdrop-blur-sm hover:bg-secondary hover:text-secondary-text hover:border-secondary"
          >
            <Phone size={20} strokeWidth={2} />
            <span className="flex flex-col items-start sm:items-center sm:flex-row sm:gap-3 leading-tight">
              <span className="text-sm font-mono uppercase tracking-widest sm:hidden">
                Emergency line
              </span>
              <span>{"{{PHONE}}"}</span>
            </span>
          </motion.a>
          <motion.a
            href="#quote"
            variants={staggerItem}
            {...hoverLift}
            className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary text-black px-5 py-3 sm:px-6 sm:py-3.5 md:px-7 md:py-4 font-display text-[13px] sm:text-base md:text-lg tracking-wide uppercase transition-colors"
          >
            Get a free quote
            <ArrowRight
              size={20}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-1"
            />
          </motion.a>
        </motion.div>

        <p className="mt-7 sm:mt-10 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-white/60">
          Licensed master electrician · Bonded &amp; insured · 24/7 emergency
        </p>
      </div>

      {/* Bottom circuit divider */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <CircuitDivider tone="amber" />
      </div>
    </section>
  );
}

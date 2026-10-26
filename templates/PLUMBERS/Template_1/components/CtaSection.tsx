"use client";

/**
 * CtaSection — full-bleed {{CTA}} image background with WaterScrim dim layer
 * (claude.md rule #2b) + FlowWash atmospheric. Foreground: emergency framing.
 */
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { WaterScrim } from "./ui/WaterScrim";
import { FlowWash } from "./ui/FlowWash";
import { DropSeal } from "./ui/DropSeal";
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
      <WaterScrim dim="strong" />
      {/* Atmospheric overlay */}
      <FlowWash />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
        >
          <div className="hidden md:flex items-center justify-center gap-3 mb-5 sm:mb-7 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary">
            <DropSeal size={12} tone="primary" />
            <span>When the water won&apos;t wait</span>
            <DropSeal size={12} tone="primary" />
          </div>

          {/* SLOT:CTA_HEADLINE */}
          <h2
            data-slot="CTA_HEADLINE"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] sm:leading-[1.0] tracking-tighter mb-5 sm:mb-7 max-w-5xl mx-auto"
          >
            Pipe burst? Drain backed up?
            <br />
            <span className="text-primary">Don&apos;t wait. Don&apos;t guess.</span>
          </h2>

          <p className="font-sans text-[14px] sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-7 sm:mb-12">
            We answer the phone any hour. Master plumber on call.
            Trucks loaded for emergency response across {"{{CITY}}"} and the
            surrounding area.
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
            className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-secondary hover:opacity-90 text-secondary-text px-5 py-3 sm:px-7 sm:py-4 font-display text-[13px] sm:text-xl tracking-wide transition-opacity"
          >
            <Phone size={16} strokeWidth={2} className="sm:[&]:[width:20px] sm:[&]:[height:20px]" />
            <span className="flex flex-col items-start sm:items-center sm:flex-row sm:gap-3 leading-tight">
              <span className="text-[10px] font-mono uppercase tracking-widest sm:hidden">
                Emergency line
              </span>
              <span>{"{{PHONE}}"}</span>
            </span>
          </motion.a>
          <motion.a
            href="#quote"
            variants={staggerItem}
            {...hoverLift}
            className="group inline-flex items-center justify-center gap-2 bg-primary hover:opacity-90 text-primary-text px-5 py-3 sm:px-7 sm:py-4 font-display text-[13px] sm:text-xl tracking-wide transition-opacity"
          >
            Get a free quote
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-1 sm:[&]:[width:20px] sm:[&]:[height:20px]"
            />
          </motion.a>
        </motion.div>

        <p className="hidden md:block mt-6 sm:mt-10 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-white/60">
          Licensed &amp; insured · Master plumber on staff · 24/7 emergency
        </p>
      </div>
    </section>
  );
}

"use client";

/**
 * Hero — split layout: foreground content left, technical-spec sidebar right.
 * Image lives in a SchematicFrame card on the right (NOT full-bleed
 * background — that was T1's pattern). The hero copy reads spec-sheet,
 * not panel-cover.
 *
 * The Hero contains an image-bg secondary moment in the spec card overlay,
 * and the GridScrim dim layer is applied there per claude.md rule #2b.
 */
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SchematicMark } from "./ui/SchematicMark";
import { SchematicFrame } from "./ui/SchematicFrame";
import { MeasureRule } from "./ui/MeasureRule";
import {
  fadeUp,
  hoverLift,
  kineticContainer,
  kineticWord,
  labelDrop,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

const SPEC_ROWS = [
  { label: "License", value: "Master · Bonded" },
  { label: "Coverage", value: "{{CITY}}, {{STATE}}" },
  { label: "Hours", value: "Mon-Sat" },
  { label: "After-hours", value: "On call" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative bg-white overflow-hidden"
    >
      {/* Subtle blueprint grid background tint */}
      <div className="absolute inset-0 bg-blueprint-grid bg-[length:24px_24px,24px_24px,96px_96px,96px_96px] opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-12 sm:pt-32 pb-10 sm:pb-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            {/* Kicker */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={labelDrop}
              className="hidden sm:flex items-center gap-3 mb-4 sm:mb-6 font-mono text-[11px] uppercase tracking-widest text-primary font-medium"
            >
              <SchematicMark size={12} tone="sapphire" />
              <span>Licensed master electrician / NEC standards / Permits pulled</span>
            </motion.div>

            {/* Display headline — SLOT */}
            {/* SLOT:HERO_HEADLINE */}
            <motion.h1
              data-slot="HERO_HEADLINE"
              initial="hidden"
              animate="show"
              variants={kineticContainer}
              className="font-display text-[28px] sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-black leading-[1.05] tracking-tight mb-5 sm:mb-7 font-bold text-balance"
            >
              <motion.span variants={kineticWord} className="inline-block mr-[0.25em]">Power</motion.span>
              <motion.span variants={kineticWord} className="inline-block mr-[0.25em]">up.</motion.span><br />
              <motion.span variants={kineticWord} className="inline-block mr-[0.25em]">Wired</motion.span>
              <motion.span variants={kineticWord} className="inline-block mr-[0.25em]">right.</motion.span><br />
              <motion.span variants={kineticWord} className="inline-block text-primary">From outlet to grid.</motion.span>
            </motion.h1>

            <MeasureRule width="center" tone="sapphire" className="mb-5 sm:mb-7" />

            {/* Subhead */}
            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.6 }}
              className="font-sans text-base sm:text-xl text-black leading-relaxed max-w-2xl mb-6 sm:mb-10"
            >
              Residential, commercial, and industrial electrical work in <span className="text-primary">{"{{CITY}}"}</span>.
              Tested. Tagged. Trusted. We file the drawings, we pull the permits,
              and we sign the work. Up-front pricing, no exceptions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer(0.1, 0.8)}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10"
            >
              <motion.a
                href="#quote"
                variants={staggerItem}
                {...hoverLift}
                className="group inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-primary-text hover:text-primary text-primary-text px-5 py-3 sm:px-7 sm:py-4 font-display text-[15px] sm:text-lg font-semibold tracking-tight transition-colors duration-200"
              >
                Request a quote
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.a>
              <motion.a
                href="tel:{{PHONE_DIGITS}}"
                variants={staggerItem}
                {...hoverLift}
                className="group inline-flex items-center justify-center gap-3 border-2 border-secondary/70 text-black px-5 py-3 sm:px-7 sm:py-4 font-display text-[15px] sm:text-lg font-semibold tracking-tight transition-colors hover:bg-secondary hover:text-secondary-text hover:border-secondary"
              >
                <Phone size={18} strokeWidth={2} />
                <span>{"{{PHONE}}"}</span>
              </motion.a>
            </motion.div>

            {/* Mono trust strip */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer(0.06, 1.2)}
              className="hidden sm:flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-black/50"
            >
              <motion.span variants={staggerItem}>Bonded &amp; insured</motion.span>
              <SchematicMark size={9} tone="sapphire" />
              <motion.span variants={staggerItem}>NEC certified</motion.span>
              <SchematicMark size={9} tone="sapphire" />
              <motion.span variants={staggerItem}>BBB A+ rated</motion.span>
              <SchematicMark size={9} tone="sapphire" />
              <motion.span variants={staggerItem}>{"{{CITY}}"}, {"{{STATE}}"}</motion.span>
            </motion.div>
          </div>

          {/* Right: image inside SchematicFrame + spec sidebar */}
          <div className="lg:col-span-5">
            {/* Image container shifted 30px left so the image bleeds slightly
                into the gutter, creating a cropped-spec-card look. The
                container is widened by 30px (calc) to avoid a gap on the right. */}
            <div className="sm:-ml-[30px] sm:w-[calc(100%_+_30px)]">
            <SchematicFrame surface="dark" padding="none" className="bg-black">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src="{{HERO}}"
                  alt=""
                  className="block w-full h-[220px] sm:h-[360px] md:h-[460px] lg:h-[520px] object-cover"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* No GridScrim/GridGlow over the image — those were obscuring
                    the photo. Hero text sits on the section background (LEFT
                    column), not on the image. The only text on the image is
                    the spec strip below, which has its own dedicated gradient
                    overlay for readability per claude.md rule #2b. */}
                {/* Spec strip overlay at bottom */}
                <div className="hidden sm:block absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                  <div className="px-5 sm:px-6 py-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2 font-medium">
                      Sheet 01 / Hero
                    </p>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {SPEC_ROWS.map((row) => (
                        <div key={row.label} className="flex items-baseline gap-2">
                          <dt className="font-mono text-[9px] uppercase tracking-widest text-white/60 leading-snug">
                            {row.label}
                          </dt>
                          <dd className="font-sans text-[12px] text-white font-medium leading-snug truncate">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </SchematicFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

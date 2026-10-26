"use client";

/**
 * CtaSection — HOT WIRE / LIVE EDITORIAL
 *
 * Full-bleed {{CTA}} image with InkScrim dim layer (claude.md hard rule #2b
 * MANDATORY when text overlays an image), RibbonDivider crimson stripe at
 * the top, Fraunces serif headline + 2 CTAs. EmberHalo atmospheric warmth.
 */
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { InkScrim } from "@/components/ui/InkScrim";
import { EmberHalo } from "@/components/ui/EmberHalo";
import { StampMark } from "@/components/ui/StampMark";
import { RibbonDivider } from "@/components/ui/RibbonDivider";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function CtaSection() {
  return (
    <>
      <RibbonDivider quote="Hand-stamped tickets. Wires labeled. Phone answered." meta="Ticket open" />
      <section className="relative isolate overflow-hidden">
        {/* Full-bleed CTA image */}
        <div className="absolute inset-0 -z-10">
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
          {/* MANDATORY dim layer per claude.md #2b — boosted for button/text readability */}
          <InkScrim opacity={75} tone="ink" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" aria-hidden="true" />
          <EmberHalo origin="top-right" className="-z-0 opacity-60 mix-blend-screen" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-20 lg:py-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeUp}
          >
            <StampMark label="24/7 Crew on call" meta="Ticket open" rotate={-1.5} className="mx-auto" />

            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.02] tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Ready when{" "}
              <span className="italic text-primary">your wires aren&apos;t.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl font-sans text-[15px] leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
              Licensed master electrician on staff. Permits in hand. Up-front
              pricing. Hand-stamped before we leave.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.1, 0.2)}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-10"
          >
            <motion.a
              href="#quote"
              variants={staggerItem}
              {...hoverLift}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-primary-text px-5 py-3 sm:px-7 sm:py-4 font-display text-[13px] sm:text-lg font-bold tracking-tight transition-colors"
            >
              Get a free quote
            </motion.a>
            <motion.a
              href="tel:{{PHONE_DIGITS}}"
              variants={staggerItem}
              {...hoverLift}
              className="inline-flex items-center gap-2 border-2 border-secondary/70 hover:bg-secondary hover:text-secondary-text hover:border-secondary text-white px-5 py-3 sm:px-7 sm:py-4 font-display text-[13px] sm:text-lg font-bold tracking-tight transition-colors"
            >
              <Phone size={16} strokeWidth={2} /> Call {"{{PHONE}}"}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

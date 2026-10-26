"use client";

import { Phone, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import AquaScrim from "@/components/ui/AquaScrim";
import WaveWash from "@/components/ui/WaveWash";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// RescueBar (CtaSection) — full-bleed CTA image + AquaScrim strong + dark
// gradient + accent CTA. The dark interlude that gives visual closure weight.

export default function RescueBar() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background image */}
      <div aria-hidden className="absolute inset-0">
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
      </div>
      {/* CLAUDE.md rule #2b: AquaScrim strong + WaveWash atmospheric */}
      <AquaScrim opacity="strong" tone="black" />
      <WaveWash variant="harbor" className="opacity-70" />
      <WaveWash variant="deep" className="opacity-30" />

      <div className="relative mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Emergency response
          </p>
          {/* SLOT:CTA_HEADLINE */}
          <h2
            data-slot="CTA_HEADLINE"
            className="mx-auto mt-4 max-w-3xl font-display text-3xl font-black leading-[1.04] tracking-tight-display text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Pipe burst. Drain backed up.
            <br />
            <span className="text-primary">Don&apos;t wait. Don&apos;t guess.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:mt-5 sm:text-base lg:text-lg">
            A licensed plumber answers the 24/7 line. Real dispatch, real arrival
            window, written quote before we touch anything.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.2)}
          className="mt-8 flex flex-col items-stretch justify-center gap-2.5 sm:mt-10 sm:flex-row sm:items-center sm:gap-3"
        >
          <motion.a
            href="tel:{{PHONE_DIGITS}}"
            variants={staggerItem}
            {...hoverLift}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-rescue-pill px-5 py-3 font-mono text-[13px] uppercase tracking-widest text-white shadow-rescue sm:px-7 sm:py-4 sm:text-xs"
          >
            <Phone size={16} strokeWidth={2.4} />
            Call now: {"{{PHONE}}"}
          </motion.a>
          <motion.a
            href="#quote"
            variants={staggerItem}
            {...hoverLift}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-3 font-mono text-[13px] uppercase tracking-widest text-white transition-colors duration-150 hover:bg-white/10 sm:px-7 sm:py-4 sm:text-xs"
          >
            Get a quote
            <ChevronRight size={14} strokeWidth={2.4} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

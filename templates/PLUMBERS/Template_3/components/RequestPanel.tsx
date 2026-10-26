"use client";

import { motion } from "framer-motion";
import PipeTick from "@/components/ui/PipeTick";
import WaterDot from "@/components/ui/WaterDot";
import MeterPanel from "@/components/ui/MeterPanel";
import RescuePill from "@/components/ui/RescuePill";
import { QuoteForm } from "@/components/forms/QuoteForm";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// RequestPanel (QuoteSection) — split: pitch left + MeterPanel-framed QuoteForm right.
// Background: full-section sky gradient wash (T1 owns inset-image-on-quote-section).

const PROMISES = [
  "Written quote in your inbox before any work starts",
  "Real arrival windows, not vague half-day blocks",
  "Pressure tested before we close the work order",
  "Floors protected. Boots bagged. Cleanup included.",
];

export default function RequestPanel() {
  return (
    <section id="quote" className="relative overflow-hidden bg-sky-wash py-8 sm:py-14 md:py-20 lg:py-24">
      {/* Atmospheric wash already on bg via tailwind utility — add subtle overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-wave-wash" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 sm:gap-10 sm:px-6 md:px-10 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* LEFT — pitch */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeLeft}
          className="lg:col-span-5"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
            <PipeTick />
            Request a quote
          </p>
          {/* SLOT:QUOTE_HEADLINE */}
          <h2
            data-slot="QUOTE_HEADLINE"
            className="mt-3 font-display text-3xl font-black leading-[1.04] tracking-tight-display text-black sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Tell us what&apos;s wrong.
            <br />
            <span className="text-primary">We&apos;ll tell you what it costs.</span>
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-black/60 sm:mt-4 sm:text-base lg:text-lg">
            Drop us a line with the details. Add a photo if you&apos;ve got one.
            A licensed plumber will be in touch shortly with a written quote.
          </p>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.07, 0.25)}
            className="mt-5 space-y-2.5 sm:mt-8 sm:space-y-4"
          >
            {PROMISES.map((p) => (
              <motion.li
                key={p}
                variants={staggerItem}
                className="flex items-start gap-3 text-[15px] text-black lg:text-base"
              >
                <WaterDot size={16} className="mt-1 shrink-0" />
                <span>{p}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Emergency callout */}
          <div className="mt-5 max-w-md sm:mt-8">
            <RescuePill variant="callout">
              <span className="flex flex-col leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Pipe burst right now?
                </span>
                <span className="font-display text-base font-black tracking-tight-display text-accent">
                  Call {"{{PHONE}}"} · 24/7 line
                </span>
              </span>
            </RescuePill>
          </div>
        </motion.div>

        {/* RIGHT — framed form */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeRight}
          className="lg:col-span-7"
        >
          <MeterPanel meterLabel="Quote request" tone="cloud" className="p-3 sm:p-6 md:p-8 lg:p-10">
            <QuoteForm />
          </MeterPanel>
        </motion.div>
      </div>
    </section>
  );
}

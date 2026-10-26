"use client";

import { Phone, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { BrassMedallion } from "./ui/BrassMedallion";
import { PlateLine } from "./ui/PlateLine";
import { QuoteForm } from "./forms/QuoteForm";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// QuoteTicket (QuoteSection) — split: pitch (kicker, IBM Plex Serif SLOT
// headline, promises list with BrassMedallion bullets, emergency callout
// box with secondary left-bar) + framed QuoteForm card (PlateLine top + primary
// corner ticks). White surface.
export function QuoteTicket() {
  return (
    <section id="quote" className="relative bg-white py-7 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12">
          {/* LEFT — pitch */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-5"
          >
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary">
              <BrassMedallion size={9} />
              Quote ticket
            </p>
            <PlateLine tone="primary" className="mt-5 max-w-[200px]" />
            {/* SLOT:QUOTE_HEADLINE */}
            <h2
              data-slot="QUOTE_HEADLINE"
              className="mt-5 sm:mt-7 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-black"
            >
              Tell us what&apos;s wrong. We&apos;ll tell you what it costs.
            </h2>
            <p className="mt-2.5 sm:mt-5 text-[13px] sm:text-base text-black/60 max-w-md">
              Fill in the ticket and a licensed plumber will follow up with a
              written quote on business days.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.07, 0.25)}
              className="mt-4 sm:mt-8 space-y-2 sm:space-y-4 max-w-md"
            >
              {[
                "Written quote before tools come out",
                "Licensed master plumber on every ticket",
                "Pressure tested before we leave",
                "Same-day service available",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={staggerItem}
                  className="flex items-start gap-3 text-black"
                >
                  <BrassMedallion size={8} className="mt-1.5" />
                  <span className="text-sm">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Emergency callout */}
            <div className="mt-5 sm:mt-10 max-w-md bg-white border-l-4 border-secondary px-3.5 sm:px-5 py-2.5 sm:py-4 shadow-sm">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-secondary">
                <AlertTriangle size={13} strokeWidth={2.25} />
                Real emergency?
              </p>
              <p className="mt-2 text-sm text-black">
                Don&apos;t wait on the form. Call our 24/7 line.
              </p>
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="mt-3 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-secondary hover:opacity-70 transition-opacity"
              >
                <Phone size={14} strokeWidth={2.25} />
                {"{{PHONE}}"}
              </a>
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
            <div className="relative bg-white border border-black/10 p-2.5 sm:p-6 md:p-8 lg:p-10">
              <PlateLine tone="primary" className="absolute top-0 left-0 right-0" />
              <CornerTick className="top-0 left-0" rotate={0} />
              <CornerTick className="top-0 right-0" rotate={90} />
              <CornerTick className="bottom-0 right-0" rotate={180} />
              <CornerTick className="bottom-0 left-0" rotate={270} />

              <div className="pt-1.5 sm:pt-4">
                <p className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-primary">
                  Form / Quote ticket
                </p>
                <h3 className="mt-0 sm:mt-2 font-display text-base sm:text-2xl font-semibold text-black">
                  File the details below.
                </h3>
              </div>

              <div className="mt-2.5 sm:mt-7">
                <QuoteForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CornerTick({ className, rotate }: { className?: string; rotate: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-3 h-3 z-10 ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute top-0 left-0 w-3 h-px bg-primary" />
      <span className="absolute top-0 left-0 w-px h-3 bg-primary" />
    </span>
  );
}

"use client";

import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { HazardDivider } from "@/components/ui/HazardDivider";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <motion.img
        src="{{CTA}}"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"
        aria-hidden="true"
      />

      <HazardDivider />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-7 px-4 py-10 sm:gap-8 sm:px-6 sm:py-14 md:gap-10 md:px-10 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
        >
          <div className="hidden font-mono text-[10px] uppercase tracking-widest text-white/60 md:block">
            <span className="inline-flex items-center gap-2 border border-primary/50 px-2 py-1 text-primary">
              <span className="block h-1.5 w-1.5 bg-primary" aria-hidden="true" />
              BAY 10
            </span>
            <span className="ml-3 text-primary">FINAL CALL · KEYS READY</span>
          </div>
          <h2
            data-slot="CTA_HEADLINE"
            className="font-display text-4xl uppercase leading-[0.88] tracking-tight text-white sm:text-5xl md:mt-6 md:text-7xl lg:text-8xl xl:text-9xl"
          >
            Ready when <span className="text-primary">you are.</span>
          </h2>
          <p
            data-slot="CTA_BODY"
            className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/70 sm:mt-7 sm:text-base md:text-lg"
          >
            Drop the keys off, schedule a slot, or just call and ask. We&rsquo;ll
            give you a real answer the first time.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.2)}
          className="flex flex-col gap-3 sm:gap-4"
        >
          <motion.a
            href="#quote"
            variants={staggerItem}
            {...hoverLift}
            aria-label="Request a free quote"
            className="group inline-flex items-center justify-center gap-3 bg-primary px-5 py-3 font-display text-sm uppercase tracking-wider text-primary-text transition-colors hover:bg-white sm:px-6 sm:py-4 sm:text-lg md:px-8 md:py-5 md:text-2xl"
          >
            Get a Free Quote
            <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1 sm:[&]:size-5" />
          </motion.a>
          <motion.a
            href="tel:{{PHONE_DIGITS}}"
            variants={staggerItem}
            {...hoverLift}
            aria-label="Call {{PHONE}}"
            className="group inline-flex items-center justify-center gap-3 border border-secondary/70 bg-black/40 px-5 py-3 font-display text-sm uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-secondary hover:text-secondary-text hover:border-secondary sm:px-6 sm:py-4 sm:text-lg md:px-8 md:py-5 md:text-2xl"
          >
            <Phone size={18} aria-hidden="true" className="sm:[&]:size-5" />
            Call {"{{PHONE}}"}
          </motion.a>
        </motion.div>
      </div>

      <HazardDivider />
    </section>
  );
}

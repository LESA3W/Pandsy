"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BayLabel } from "@/components/ui/BayLabel";
import { QuoteForm } from "@/components/forms/QuoteForm";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="relative isolate overflow-hidden border-y border-white/15 py-7 sm:py-12 md:py-20 lg:py-28"
    >
      <img
        src="{{SERVICES_IMAGE}}"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-black/85" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left — pitch */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
          >
            <BayLabel n="09" title="REQUEST A QUOTE" meta="INTAKE OPEN" hideOnMobile />
            <h2 className="mt-5 font-display text-3xl uppercase leading-none tracking-tight text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
              <span data-slot="QUOTE_HEADLINE">
                Tell us what&rsquo;s wrong. We&rsquo;ll tell you what it costs.
              </span>
            </h2>
            <p
              data-slot="QUOTE_BODY"
              className="mt-5 max-w-md font-sans text-sm leading-relaxed text-white/70 sm:mt-7 sm:text-base"
            >
              Fill out the work-order form and we&rsquo;ll send you a clear,
              honest estimate within one business day. No hidden fees, no
              pressure, no commitment to bring the car in.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.07, 0.25)}
              className="mt-8 space-y-3 font-mono text-xs uppercase tracking-widest text-white/60 sm:mt-10 sm:space-y-4"
            >
              <motion.li variants={staggerItem} className="flex items-center gap-3">
                <ArrowRight size={14} className="text-primary" /> Free, no-obligation quote
              </motion.li>
              <motion.li variants={staggerItem} className="flex items-center gap-3">
                <ArrowRight size={14} className="text-secondary" /> Response within 1 business day
              </motion.li>
              <motion.li variants={staggerItem} className="flex items-center gap-3">
                <ArrowRight size={14} className="text-primary" /> Transparent breakdown of parts and labor
              </motion.li>
              <motion.li variants={staggerItem} className="flex items-center gap-3">
                <ArrowRight size={14} className="text-secondary" /> 12-month warranty on every job
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
          >
            <QuoteForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { HazardDivider } from "@/components/ui/HazardDivider";
import {
  fadeUp,
  fadeUpDeep,
  hoverLift,
  kineticContainer,
  kineticWord,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

const HEADLINE_WORDS_PRE = ["Expert"];
const HEADLINE_WORDS_POST_TYPE = ["in"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-black md:min-h-[100svh]">
      {/* Bay-floor image with deep matte overlay — native <img> for Drive URLs */}
      <motion.img
        src="{{HERO}}"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[60%_center] opacity-90 md:object-center md:opacity-60"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent md:via-black/80 md:to-black/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col justify-start md:justify-end px-4 pb-10 pt-32 sm:px-6 sm:pb-16 sm:pt-36 md:min-h-[100svh] md:px-10 md:pt-44 md:pb-28">
        {/* SLOT:HERO_HEADLINE */}
        <motion.h1
          data-slot="HERO_HEADLINE"
          initial="hidden"
          animate="show"
          variants={kineticContainer}
          className="max-w-5xl font-display text-[53px] uppercase leading-[0.92] tracking-tight text-white sm:text-[64px] sm:leading-[0.9] md:text-[96px] md:leading-[0.88] lg:text-[120px] xl:text-[148px]"
        >
          {HEADLINE_WORDS_PRE.map((w, i) => (
            <motion.span key={`pre-${i}`} variants={kineticWord} className="inline-block mr-[0.25em]">
              {w}
            </motion.span>
          ))}
          <motion.span variants={kineticWord} className="inline-block mr-[0.25em] whitespace-nowrap text-primary">
            {"{{BUSINESS_TYPE}}"}
          </motion.span>
          {HEADLINE_WORDS_POST_TYPE.map((w, i) => (
            <motion.span key={`post-${i}`} variants={kineticWord} className="inline-block mr-[0.25em]">
              {w}
            </motion.span>
          ))}
          <motion.span variants={kineticWord} className="inline-block text-secondary">
            {"{{CITY}}"}
          </motion.span>
        </motion.h1>

        {/* SLOT:HERO_SUBLINE */}
        <motion.p
          data-slot="HERO_SUBLINE"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.6 }}
          className="mt-5 max-w-xl font-mono text-[17px] leading-relaxed text-white/70 sm:mt-7 sm:text-sm md:text-base"
        >
          Honest diagnostics. Warranty-backed work. Done right the first time
          for {"{{TARGET_DESCRIPTION}}"}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1, 0.8)}
          className="mt-6 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <motion.a
            href="#quote"
            variants={staggerItem}
            {...hoverLift}
            className="group inline-flex w-full justify-center sm:w-auto items-center gap-3 border border-primary bg-primary px-5 py-[17px] font-display text-[19px] uppercase tracking-wider text-primary-text transition-colors duration-200 hover:bg-primary-text hover:text-primary sm:px-6 sm:py-4 sm:text-lg md:px-8 md:py-5 md:text-2xl"
          >
            Get a Free Quote
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </motion.a>
          <motion.a
            href="tel:{{PHONE_DIGITS}}"
            variants={staggerItem}
            {...hoverLift}
            aria-label="Call {{PHONE}}"
            className="group inline-flex w-full justify-center sm:w-auto items-center gap-3 border border-secondary/70 px-5 py-[17px] font-display text-[19px] uppercase tracking-wider text-white transition-colors hover:bg-secondary hover:text-secondary-text hover:border-secondary sm:px-6 sm:py-4 sm:text-lg md:px-8 md:py-5 md:text-2xl"
          >
            <Phone size={20} aria-hidden="true" />
            Call {"{{PHONE}}"}
          </motion.a>
        </motion.div>

        {/* Bottom strip — work-order metadata */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.06, 1.2)}
          className="mt-7 hidden grid-cols-2 gap-x-5 gap-y-3 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-widest text-white/50 sm:mt-10 sm:gap-x-8 sm:pt-6 md:mt-16 md:grid md:grid-cols-4"
        >
          <motion.div variants={staggerItem}>
            <div className="text-white/30">Hours</div>
            <div className="mt-1 text-white/80">{"{{HOURS}}"}</div>
          </motion.div>
          <motion.div variants={staggerItem}>
            <div className="text-white/30">Address</div>
            <div className="mt-1 text-white/80">{"{{FULL_ADDRESS}}"}</div>
          </motion.div>
          <motion.div variants={staggerItem}>
            <div className="text-white/30">Phone</div>
            <div className="mt-1 text-white/80">{"{{PHONE}}"}</div>
          </motion.div>
          <motion.div variants={staggerItem}>
            <div className="text-white/30">Bay</div>
            <div className="mt-1 text-primary">01 / 12</div>
          </motion.div>
        </motion.div>
      </div>

      <HazardDivider thin className="absolute bottom-0 left-0 right-0 z-10" />
    </section>
  );
}

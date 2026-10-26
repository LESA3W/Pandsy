"use client";

/**
 * Hero — HOT WIRE / LIVE EDITORIAL
 *
 * Asymmetric editorial layout: full-bleed {{HERO}} image positioned right
 * with InkScrim dim layer (claude.md hard rule #2b — MANDATORY when text
 * overlays an image), EmberHalo atmospheric warm halation behind the
 * headline, Fraunces serif headline at 6xl/8xl, two CTAs (crimson primary
 * + bordered secondary tel link).
 *
 * Inline HotlinePlate for mobile users (HotlineRail is hidden <md).
 */
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { InkScrim } from "@/components/ui/InkScrim";
import { EmberHalo } from "@/components/ui/EmberHalo";
import { StampMark } from "@/components/ui/StampMark";
import { CopperRule } from "@/components/ui/CopperRule";
import { SparkMark } from "@/components/ui/SparkMark";
import { HotlinePlate } from "@/components/ui/HotlinePlate";
import {
  fadeUp,
  hoverLift,
  kineticContainer,
  kineticWord,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-24 lg:pt-[112px]">
      {/* Background image — DESKTOP only: half-bleed asymmetric editorial.
          On mobile, the image renders as a separate framed block below
          the text content (see <lg image block below the grid).
          Container shifted 40px left so the image bleeds further into the
          editorial column and no raw right gap appears. The right overflow is
          clipped by the section's overflow-hidden. */}
      <div className="absolute inset-0 -z-10 hidden lg:block lg:left-[calc(50%-40px)] w-[calc(50%+40px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="{{HERO}}"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[-40px_center]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* MANDATORY dim layer per claude.md #2b — readable text on any client photo */}
        <InkScrim opacity={50} tone="ink" />
        {/* Crimson tint warm overlay on the image side */}
        <div className="absolute inset-0 bg-gradient-to-l from-primary/30 via-transparent to-transparent" aria-hidden="true" />
      </div>

      {/* Cream wash on the left half (desktop) for editorial paper effect */}
      <div className="absolute inset-y-0 left-0 -z-10 hidden bg-white lg:block lg:right-[calc(50%+40px)]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:px-10 pb-6 pt-2 sm:pb-8 sm:pt-6 md:pb-12 md:pt-8 lg:grid-cols-2 lg:pb-16 lg:pt-10">
        {/* LEFT — editorial typography */}
        <div className="relative max-w-xl">
          <EmberHalo origin="bottom-left" className="-z-10 opacity-50" />

          {/* Kicker stamp — desktop/tablet only on mobile rework */}
          <div className="hidden md:block">
            <StampMark label="Live · 24/7" meta="Hand-stamped tickets" rotate={-1.5} />
          </div>

          {/* SLOT:HERO_HEADLINE */}
          <motion.h1
            data-slot="HERO_HEADLINE"
            initial="hidden"
            animate="show"
            variants={kineticContainer}
            className="mt-[18px] sm:mt-2 font-display text-[2.5rem] font-bold leading-[0.95] tracking-tighter text-black sm:text-4xl md:text-5xl lg:mt-4 lg:text-5xl xl:text-6xl lg:leading-[0.95]"
          >
            <motion.span variants={kineticWord} className="inline-block">Live wire.</motion.span>
            <br />
            <motion.span variants={kineticWord} className="inline-block italic text-primary">Hand-stamped.</motion.span>
            <br />
            <motion.span variants={kineticWord} className="inline-block">The crew <span className="text-primary">{"{{CITY}}"}</span></motion.span>
            <br />
            <motion.span variants={kineticWord} className="inline-block">keeps on call.</motion.span>
          </motion.h1>

          {/* SLOT:HERO_SUBHEAD */}
          <motion.p
            data-slot="HERO_SUBHEAD"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.6 }}
            className="mt-4 max-w-md font-sans text-[17px] leading-relaxed text-black/60 sm:mt-7 sm:text-lg"
          >
            Licensed master electrician on staff. Permits in hand, code-stamped
            work, up-front pricing. Your wires get our name on them.
          </motion.p>

          <CopperRule className="mt-6 max-w-[260px] sm:mt-8 sm:max-w-[280px]" dotSide="left" />

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.1, 0.8)}
            className="mt-5 flex flex-col items-stretch gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <motion.a
              href="#quote"
              variants={staggerItem}
              {...hoverLift}
              className="inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-primary-text hover:text-primary text-primary-text px-5 py-4 sm:px-6 sm:py-4 font-display text-[15px] sm:text-base font-bold tracking-tight transition-colors duration-200"
            >
              Get a free quote
            </motion.a>
            <motion.a
              href="tel:{{PHONE_DIGITS}}"
              variants={staggerItem}
              {...hoverLift}
              className="inline-flex items-center justify-center gap-2 border-2 border-secondary/70 hover:bg-secondary hover:text-secondary-text hover:border-secondary text-black px-5 py-4 sm:px-6 sm:py-4 font-display text-[15px] sm:text-base font-bold tracking-tight transition-colors"
            >
              <Phone size={16} strokeWidth={2} /> Call {"{{PHONE}}"}
            </motion.a>
          </motion.div>

          {/* Quick trust line — hidden on mobile per rework */}
          <ul className="mt-7 hidden md:flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-black/60 sm:mt-10">
            <li className="flex items-center gap-1.5"><SparkMark size={10} /> Licensed master electrician</li>
            <li className="flex items-center gap-1.5"><SparkMark size={10} /> Bonded &amp; insured</li>
            <li className="flex items-center gap-1.5"><SparkMark size={10} /> Up-front pricing</li>
          </ul>

          {/* Inline HotlinePlate removed on mobile — header phone square + Call CTA cover it */}
          <div className="hidden">
            <HotlinePlate />
          </div>

          {/* MOBILE/TABLET hero image — separate framed block below the text.
              Desktop keeps the asymmetric half-bleed image (see top of section). */}
          <div className="relative mt-6 sm:-mx-6 sm:mt-8 md:-mx-10 lg:hidden">
            <div className="relative aspect-[10/7] w-full overflow-hidden border border-primary sm:aspect-[16/8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="{{HERO}}"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Layered veil — dim base + bottom-to-top dark gradient + warm crimson tint */}
              <InkScrim opacity={45} tone="ink" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/35 via-transparent to-transparent" aria-hidden="true" />

              {/* Small banal caption — bottom-left, low-key kicker */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/90">
                  Live · Crew on call
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — editorial caption card overlaying the image */}
        <div className="relative hidden lg:flex items-end justify-end">
          <div className="max-w-[18rem] bg-white border-l-4 border-primary p-5 shadow-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-2">
              Ticket / 04
            </p>
            <p className="font-display text-xl font-medium italic leading-snug text-black">
              {"\"Half our house lost power on a Saturday night. Master electrician at our door before 10.\""}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-black/60">
              Lauren H. · {"{{CITY}}"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

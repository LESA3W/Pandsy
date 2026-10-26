"use client";

/**
 * Services — BAY 04 redesign.
 *
 * Two-column feature: a landscape "on the bench" flat-lay (SERVICES_IMAGE)
 * on the left, a hairline-divided service ledger on the right.
 *
 * Image framing: the photo is a 16:9 flat-lay with the yellow multimeter
 * sitting in the left-center and the hand tools (drivers, pliers) fanned to
 * its right. We render it in a 4:3 panel (taller than the source ratio, so
 * object-cover crops the SIDES and keeps the FULL height) and pan to
 * object-[30%_center] — that lands the whole multimeter in the left third
 * with the tools to its right still in frame. No container margin hacks.
 *
 * Motion (emil-design-eng): one clean entrance per block with the house
 * EASE_OUT_SNAP curve; hover states move transform + color only, under 300ms;
 * nothing scales from zero.
 */
import { motion } from "framer-motion";
import { parseServices, describeService } from "@/lib/parseServices";
import { VoltageRule } from "./ui/VoltageRule";
import { VoltageMeter } from "./ui/VoltageMeter";
import { PanelLabel } from "./ui/PanelLabel";
import { ArrowUpRight } from "lucide-react";
import {
  fadeLeft,
  fadeUp,
  fadeRight,
  staggerContainer,
  staggerItem,
  EASE_OUT_SNAP,
  VP_ONCE,
} from "@/lib/animations";

const services = parseServices("{{SERVICES}}");

export function Services() {
  return (
    <section id="services" className="relative bg-black/5 py-10 sm:py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeLeft}
          className="mb-10 sm:mb-14"
        >
          <PanelLabel
            n="04"
            title="WHAT WE WIRE"
            meta="CIRCUIT 04 · LIVE"
            variant="dark"
            className="mb-5 sm:mb-7"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end">
            <h2 className="lg:col-span-7 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.02] tracking-tighter uppercase">
              Code-compliant work,
              <br />
              {/* Amber underline fill, not amber text (legible on light bg) */}
              <span className="relative inline-block">
                <span className="relative z-10 text-black">labeled clean.</span>
                <span className="absolute inset-x-0 bottom-0 h-[0.22em] bg-primary/60" aria-hidden="true" />
              </span>
            </h2>
            <p className="lg:col-span-5 font-sans text-sm sm:text-[15px] text-black/65 leading-relaxed max-w-md">
              From a single outlet to a 200-amp service upgrade, every job is
              permitted, inspected, and walked through with you before we power
              it on.
            </p>
          </div>
          <VoltageRule width="short" tone="amber" className="mt-7" />
        </motion.div>

        {/* Feature: bench photo + service ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* IMAGE PANEL — 4:3 crop panned to the multimeter */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeUp}
            className="lg:col-span-6"
          >
            <div className="group relative aspect-[4/3] overflow-hidden bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="{{SERVICES_IMAGE}}"
                alt="{{BUSINESS_NAME}} licensed electrician's bench: multimeter and hand tools"
                className="absolute inset-0 h-full w-full object-cover object-[30%_center]"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={VP_ONCE}
                transition={{ duration: 1.4, ease: EASE_OUT_SNAP }}
              />
              {/* Bottom dim for caption legibility (rule #2b territory) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
              {/* Industrial corner tick, top-left */}
              <div className="absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-primary" aria-hidden="true" />
              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                    On the bench
                  </p>
                  <p className="font-display text-lg sm:text-xl text-white leading-tight uppercase tracking-tight">
                    Master electrician on staff
                  </p>
                </div>
                <VoltageMeter size={14} tone="amber" />
              </div>
            </div>
          </motion.div>

          {/* SERVICE LEDGER — hairline rows, click-through to quote */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.07)}
            className="lg:col-span-6 border-y border-black/10"
          >
            {services.map((s, i) => {
              const Icon = s.icon;
              // Alternate the icon-chip accent primary / secondary so the
              // client's 2nd brand color shows across the service ledger.
              const isSecondary = i % 2 !== 0;
              return (
                <motion.li
                  key={s.name}
                  variants={staggerItem}
                  className="border-b border-black/10 last:border-b-0"
                >
                  <a
                    href="#quote"
                    className="group -mx-3 flex items-start gap-4 px-3 py-4 sm:py-5 transition-[transform,background-color] duration-200 ease-out hover:translate-x-1 hover:bg-primary/5 active:translate-x-0.5"
                  >
                    <span
                      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-black transition-colors duration-200 ${
                        isSecondary
                          ? "text-secondary group-hover:bg-secondary group-hover:text-secondary-text"
                          : "text-primary group-hover:bg-primary group-hover:text-black"
                      }`}
                    >
                      <Icon strokeWidth={1.6} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-base sm:text-lg text-black leading-tight uppercase tracking-tight">
                          {s.name}
                        </span>
                        <ArrowUpRight
                          strokeWidth={1.7}
                          className="h-4 w-4 shrink-0 text-black/30 transition-colors duration-200 group-hover:text-primary"
                        />
                      </span>
                      <span className="mt-1 block font-sans text-[13px] sm:text-sm text-black/60 leading-relaxed">
                        {describeService(s.name)}
                      </span>
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* Bottom note */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeRight}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="font-sans text-[15px] text-black/65 max-w-xl flex items-center gap-2">
            <VoltageMeter size={12} tone="amber" />
            Not seeing what you need? Tell us what&apos;s going on. We&apos;ll
            tell you straight.
          </p>
          <a
            href="#quote"
            className="font-mono text-[12px] uppercase tracking-widest text-black hover:text-accent transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            Get a free quote
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

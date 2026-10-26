"use client";

/**
 * Services — HOT WIRE / LIVE EDITORIAL
 *
 * 2-row editorial layout: full-bleed image card row 1 (cream-tinted with
 * StampMark overlay), 4-up service cards row 2 with editorial Fraunces
 * titles and Mona Sans body. NOT T1 5/7 asymmetric, NOT T2 3-col with
 * strip-above.
 *
 * Service icons resolved via parseServices() keyword rules.
 */
import { motion } from "framer-motion";
import { parseServices, describeService } from "@/lib/parseServices";
import { StampMark } from "@/components/ui/StampMark";
import { CopperRule } from "@/components/ui/CopperRule";
import { InkScrim } from "@/components/ui/InkScrim";
import { SparkMark } from "@/components/ui/SparkMark";
import {
  fadeLeft,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function Services() {
  const services = parseServices("{{SERVICES}}");

  return (
    <section id="services" className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        {/* Section header — StampMark + serif Fraunces headline */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeLeft}
          className="mb-8 flex flex-col items-start gap-4 sm:mb-12 sm:gap-5"
        >
          <StampMark label="Services" meta="What we wire" rotate={-2.5} />
          <h2
            data-slot="SERVICES_HEADLINE"
            className="max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tighter text-black sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Every job hand-stamped.{" "}
            <span className="italic text-primary">Permits handled.</span>{" "}
            Wires labeled before we leave.
          </h2>
          <CopperRule className="max-w-md" />
        </motion.div>

        {/* ROW 1: full-bleed image card with stamp overlay */}
        <div className="relative mb-8 overflow-hidden border border-accent sm:mb-10">
          <div className="relative aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="{{SERVICES_IMAGE}}"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={VP_ONCE}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <InkScrim opacity={65} tone="ink" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <div className="absolute left-6 top-6 sm:left-10 sm:top-10">
            <StampMark label="Live · 04" meta="Crew on call" rotate={-3} />
          </div>
          <div className="absolute right-4 bottom-4 left-16 sm:left-auto sm:right-10 sm:bottom-10 max-w-[14rem] sm:max-w-md">
            <p className="font-display text-base font-medium italic leading-snug text-white sm:text-3xl">
              From a sparking outlet to a 200-amp service. Same crew, same
              ticket book.
            </p>
          </div>
          <span aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-full bg-primary" />
        </div>

        {/* ROW 2: services grid */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.07)}
          className="grid grid-cols-2 gap-px bg-accent sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            // Alternate the icon-chip fill primary / secondary so the client's
            // 2nd brand color shows across the service grid.
            const isSecondary = i % 2 !== 0;
            return (
              <motion.li
                key={s.name}
                variants={staggerItem}
                {...hoverCardLift}
                className="group flex flex-col gap-2 bg-white p-3 transition-colors hover:bg-white sm:gap-4 sm:p-6 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex h-8 w-8 items-center justify-center sm:h-12 sm:w-12 ${isSecondary ? "bg-secondary text-secondary-text" : "bg-primary text-primary-text"}`}>
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" className="h-4 w-4 sm:h-6 sm:w-6" />
                  </span>
                  <SparkMark size={14} tone="copper" className="hidden sm:inline-block" />
                </div>
                <h3 className="font-display text-sm font-bold leading-tight tracking-tight text-black sm:text-xl">
                  {s.name}
                </h3>
                <p className="text-[11px] leading-snug text-black/60 sm:text-sm sm:leading-relaxed">
                  {describeService(s.name)}
                </p>
                <span
                  className="mt-auto hidden sm:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Get a quote →
                </span>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Footer note */}
        <p className="mt-8 max-w-2xl font-sans text-sm leading-relaxed text-black/60 sm:mt-10 sm:text-base">
          Don&apos;t see what you need? We pull permits for projects of every
          size. Call{" "}
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="inline-flex items-center py-2 text-primary underline hover:text-primary font-medium"
          >
            {"{{PHONE}}"}
          </a>{" "}
          or{" "}
          <a href="#quote" className="text-primary underline hover:text-primary font-medium">
            request a quote
          </a>
          .
        </p>
      </div>
    </section>
  );
}

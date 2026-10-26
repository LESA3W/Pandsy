"use client";

/**
 * Services — equal 3-column grid (NOT T1's 5/7 asymmetric image-card +
 * service-grid layout). Each service is a spec-sheet card with the icon, the
 * service name, and a technical-spec descriptor.
 *
 * The {{SERVICES_IMAGE}} is used in a separate hero strip ABOVE the grid as a
 * full-width inset card — different placement from T1.
 */
import { motion } from "framer-motion";
import { parseServices, describeService } from "@/lib/parseServices";
import { BlueprintCell } from "./ui/BlueprintCell";
import { SchematicMark } from "./ui/SchematicMark";
import { MeasureRule } from "./ui/MeasureRule";
import { SchematicFrame } from "./ui/SchematicFrame";
import { ArrowUpRight } from "lucide-react";
import {
  fadeLeft,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const services = parseServices("{{SERVICES}}");

export function Services() {
  return (
    <section id="services" className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeLeft}
          className="mb-8 sm:mb-12"
        >
          <BlueprintCell
            n="04"
            title="Services on file"
            spec="rev. 2026-05 / sheet 04 of 12"
            variant="dark"
            className="mb-5 sm:mb-7"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-end">
            <h2 className="lg:col-span-7 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] tracking-tight font-bold">
              What we sign off on,
              <br />
              <span className="text-primary">to spec, every time.</span>
            </h2>
            <p className="lg:col-span-5 font-sans text-[15px] text-black leading-relaxed max-w-md">
              From a single GFCI to a 400-amp commercial service, every job is
              permitted, drawn, and inspected. Not a side-hustle. A trade.
            </p>
          </div>
          <MeasureRule width="center" tone="sapphire" className="mt-5 sm:mt-7" />
        </motion.div>

        {/* Full-width inset SERVICES_IMAGE strip */}
        <SchematicFrame surface="dark" padding="none" className="bg-black mb-6 sm:mb-10">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="{{SERVICES_IMAGE}}"
              alt="{{BUSINESS_NAME}} licensed electrician at work"
              className="block w-full h-[220px] sm:h-[360px] md:h-[460px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 px-6 sm:px-10 flex flex-col justify-center max-w-md">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2 font-medium">
                On the bench
              </p>
              <p className="font-display text-2xl sm:text-3xl text-white leading-tight font-semibold tracking-tight">
                Master electrician on staff.
              </p>
              <p className="font-sans text-[14px] text-white/85 mt-2 leading-relaxed">
                Every job led by a licensed master. Every drawing signed.
                Every permit on file.
              </p>
            </div>
          </div>
        </SchematicFrame>

        {/* Service grid — flex-wrap + justify-center so any trailing incomplete
            row (e.g. 2 items in a 3-col layout) is automatically centered.
            Breakpoints: 1 col on xs, 2 col on sm/md, 3 col on lg+.
            The 1px hairline separator effect is achieved via the gap+wrapper bg. */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.07)}
          className="flex flex-wrap justify-center"
          style={{ gap: "1px" }}
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            // Alternate the service icon accent primary / secondary so the
            // client's 2nd brand color shows across the service grid.
            const isSecondary = i % 2 !== 0;
            return (
              <motion.article
                key={s.name}
                variants={staggerItem}
                {...hoverCardLift}
                className="group bg-white border border-black/10 p-3 sm:p-6 md:p-8 flex flex-col gap-1.5 sm:gap-2.5 hover:bg-white transition-colors relative w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"
              >
                {/* Sheet number top-left — spec-sheet register */}
                <span className="absolute top-2 right-2 sm:top-3 sm:right-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-black/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-start justify-between">
                  <Icon
                    strokeWidth={1.5}
                    className={`size-5 sm:size-7 transition-colors ${isSecondary ? "text-secondary" : "text-primary"}`}
                  />
                  <ArrowUpRight
                    strokeWidth={1.7}
                    className="size-3.5 sm:size-4 text-black/40 group-hover:text-primary transition-colors"
                  />
                </div>
                <h3 className="font-display text-sm sm:text-xl text-black leading-tight font-semibold tracking-tight">
                  {s.name}
                </h3>
                <p className="font-sans text-[12px] sm:text-[14px] text-black leading-snug sm:leading-relaxed">
                  {describeService(s.name)}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <p className="font-sans text-[15px] text-black max-w-xl flex items-center gap-2">
            <SchematicMark size={12} tone="sapphire" />
            Not seeing what you need? Tell us what&apos;s on the drawing.
          </p>
          <a
            href="#quote"
            className="font-mono text-[12px] uppercase tracking-widest text-primary hover:text-primary transition-colors flex items-center gap-2 whitespace-nowrap py-2 -my-2"
          >
            Submit a ticket
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}

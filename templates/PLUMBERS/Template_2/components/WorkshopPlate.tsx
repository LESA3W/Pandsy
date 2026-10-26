"use client";

import { motion } from "framer-motion";
import { BrassMedallion } from "./ui/BrassMedallion";
import { PlateLine } from "./ui/PlateLine";
import { SchemaScrim } from "./ui/SchemaScrim";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// WorkshopPlate (Gallery) — single hero card per CLAUDE.md rule #14
// (PLUMBERS = no GALLERY_2). PlateLine top + primary corner ticks framing
// {{GALLERY_1}} + Space Mono caption strip "PLATE 03 / IN-PROGRESS WORK".
export function WorkshopPlate() {
  return (
    <section className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.12, 0.1)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-end"
        >
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary">
              <BrassMedallion size={9} />
              Workshop log
            </p>
            <PlateLine tone="primary" className="mt-5 max-w-[180px]" />
            <h2 className="mt-5 sm:mt-7 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-black">
              From the floor of the shop.
            </h2>
            <p className="mt-3 sm:mt-4 text-[14px] sm:text-base text-black/60">
              A look at the kind of work we do. Every job ends with a
              pressure test and a clean job site.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="lg:col-span-7">
            <PlateLine tone="primary" className="mb-2" />
            <figure className="relative overflow-hidden border border-primary/60 group">
              <CornerTick className="top-0 left-0" rotate={0} />
              <CornerTick className="top-0 right-0" rotate={90} />
              <CornerTick className="bottom-0 right-0" rotate={180} />
              <CornerTick className="bottom-0 left-0" rotate={270} />
              <img
                src="{{GALLERY_1}}"
                alt="A {{BUSINESS_NAME}} job in progress"
                className="w-full h-[220px] sm:h-[380px] md:h-[440px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <SchemaScrim tone="white" opacity="soft" blend="multiply" />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-black/10 px-5 py-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                <span className="text-primary">Plate 03 / In-progress work</span>
                <span className="text-black/40">{"{{CITY}}, {{STATE}}"}</span>
              </figcaption>
            </figure>
            <PlateLine tone="primary" className="mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CornerTick({ className, rotate }: { className?: string; rotate: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-3.5 h-3.5 z-10 ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute top-0 left-0 w-3.5 h-px bg-primary" />
      <span className="absolute top-0 left-0 w-px h-3.5 bg-primary" />
    </span>
  );
}

"use client";

import { motion } from "framer-motion";
import { BrassMedallion } from "./ui/BrassMedallion";
import { PlateLine } from "./ui/PlateLine";
import { PlumbingMark } from "./ui/PlumbingMark";
import { SchemaScrim } from "./ui/SchemaScrim";
import { parseServices } from "@/lib/parseServices";
import {
  fadeLeft,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// ServiceSheet (Services) — 3-col grid of plate-cards on white surface.
// Each card: PlateLine top + primary corner ticks + PlumbingMark icon
// + IBM Plex Serif name + Work Sans descriptor + "PLATE 0N" reference.
// Header includes a small framed {{SERVICES_IMAGE}} plate (right column).
const services = parseServices("{{SERVICES}}");

export function ServiceSheet() {
  return (
    <section id="services" className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-end">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-7"
          >
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary">
              <BrassMedallion size={9} />
              Services schedule
            </p>
            <PlateLine tone="primary" className="mt-5 max-w-[220px]" />
            {/* SLOT:SERVICES_HEADLINE */}
            <h2
              data-slot="SERVICES_HEADLINE"
              className="mt-5 sm:mt-7 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-black"
            >
              What we do, written down.
            </h2>
            <p className="mt-3 sm:mt-4 max-w-xl text-[15px] sm:text-base text-black/60">
              Every job we run starts with a written quote and ends with a
              pressure test. Pick the line that matches your problem.
            </p>
          </motion.div>

          <div className="lg:col-span-5">
            <PlateLine tone="primary" className="mb-2" />
            <div className="relative overflow-hidden border border-primary/60">
              <motion.img
                src="{{SERVICES_IMAGE}}"
                alt="A plumber from {{BUSINESS_NAME}} working a service call"
                className="w-full h-[220px] sm:h-[380px] md:h-[440px] object-cover"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={VP_ONCE}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <SchemaScrim tone="white" opacity="soft" blend="multiply" />
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-black/10 px-4 py-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                <span className="text-primary">Plate 04 / On a service call</span>
                <span className="text-black/40">{"{{CITY}}"}</span>
              </div>
            </div>
            <PlateLine tone="primary" className="mt-2" />
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.07)}
          className="mt-7 sm:mt-14 flex flex-wrap justify-center gap-2.5 sm:gap-6"
        >
          {services.map((s, i) => (
            <ServiceCard
              key={s.name}
              index={i + 1}
              mapIndex={i}
              name={s.name}
              descriptor={s.descriptor}
              icon={s.icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  index,
  mapIndex,
  name,
  descriptor,
  icon,
}: {
  index: number;
  mapIndex: number;
  name: string;
  descriptor: string;
  icon: ReturnType<typeof parseServices>[number]["icon"];
}) {
  const ref = `PLATE ${String(index).padStart(2, "0")}`;
  const tone = mapIndex % 2 !== 0 ? "secondary" : "primary";
  return (
    <motion.article
      variants={staggerItem}
      {...hoverCardLift}
      className="relative basis-[calc(50%-0.32rem)] sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)] bg-white p-3 sm:p-6 md:p-8 group hover:bg-black/5 transition-colors duration-300 border border-black/10"
    >
      <PlateLine tone="primary" className="absolute top-0 left-0 right-0" />
      {/* Corner ticks */}
      <CornerTick className="top-0 left-0" rotate={0} />
      <CornerTick className="top-0 right-0" rotate={90} />
      <CornerTick className="bottom-0 right-0" rotate={180} />
      <CornerTick className="bottom-0 left-0" rotate={270} />

      <div className="pt-2 sm:pt-4 flex items-center justify-between">
        <span className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-widest ${tone === "secondary" ? "text-secondary" : "text-primary"}`}>
          {ref}
        </span>
        <PlumbingMark icon={icon} tone={tone} className="h-[18px] w-[18px] sm:h-6 sm:w-6" />
      </div>
      <h3 className="mt-2.5 sm:mt-5 font-display text-[15px] sm:text-xl font-semibold text-black leading-tight">
        {name}
      </h3>
      <p className="mt-1 sm:mt-2.5 text-[12px] sm:text-sm leading-snug sm:leading-relaxed text-black/60">
        {descriptor}
      </p>
    </motion.article>
  );
}

function CornerTick({ className, rotate }: { className?: string; rotate: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-2.5 h-2.5 ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute top-0 left-0 w-2.5 h-px bg-primary" />
      <span className="absolute top-0 left-0 w-px h-2.5 bg-primary" />
    </span>
  );
}

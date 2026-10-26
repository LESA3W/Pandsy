"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import PipeTick from "@/components/ui/PipeTick";
import ServicePill from "@/components/ui/ServicePill";
import MeterPanel from "@/components/ui/MeterPanel";
import ServiceDot from "@/components/ui/ServiceDot";
import AquaScrim from "@/components/ui/AquaScrim";
import { parseServices } from "@/lib/parseServices";
import {
  fadeLeft,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// ServiceMenu (Services) — split header + 3-col mixed-rhythm grid.
// Rows alternate: ServicePill (rounded) for rows 1+3, MeterPanel (square stamp)
// for row 2. This breaks the all-pill SaaS rhythm.

const SERVICES = parseServices("{{SERVICES}}");

export default function ServiceMenu() {
  return (
    <section id="services" className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        {/* Split header */}
        <div className="grid grid-cols-1 items-end gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-7"
          >
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
              <PipeTick />
              {/* SLOT:SERVICES_KICKER */}
              <span data-slot="SERVICES_KICKER">What we do</span>
            </p>
            {/* SLOT:SERVICES_HEADLINE */}
            <h2
              data-slot="SERVICES_HEADLINE"
              className="mt-3 font-display text-3xl font-black leading-[1.06] tracking-tight-display text-black sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Plumbing you don&apos;t have to think about again.
            </h2>
            {/* SLOT:SERVICES_SUBHEAD */}
            <p
              data-slot="SERVICES_SUBHEAD"
              className="mt-3 max-w-2xl text-[15px] text-black/60 sm:text-base lg:text-lg"
            >
              Diagnosed cleanly. Quoted in writing. Tested before we close the
              job. Real arrival windows, never a runaround.
            </p>
          </motion.div>
          <div className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-3xl border border-black/10 shadow-lift">
              <div className="relative aspect-[3/2] w-full md:aspect-[5/4] lg:aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src="{{SERVICES_IMAGE}}"
                  alt="{{BUSINESS_NAME}} services"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ scale: 1.06 }}
                  whileInView={{ scale: 1 }}
                  viewport={VP_ONCE}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <AquaScrim opacity="soft" tone="primary" />
              </div>
            </figure>
          </div>
        </div>

        {/* Service grid — alternating ServicePill / MeterPanel rhythm */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.07)}
          className="mt-8 flex flex-wrap justify-center gap-2.5 sm:mt-12 sm:gap-5"
        >
          {SERVICES.map((s, i) => {
            const useMeter = Math.floor(i / 3) % 2 === 1; // row 2 / 5 / ... = MeterPanel
            return useMeter ? (
              <motion.li key={s.name} variants={staggerItem} {...hoverCardLift} className="basis-[calc(50%-0.32rem)] sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-0.84rem)]">
                <MeterPanel className="h-full p-3 sm:p-6 md:p-6">
                  <ServiceCardInner name={s.name} descriptor={s.descriptor} Icon={s.icon} tone="ghost" index={i} />
                </MeterPanel>
              </motion.li>
            ) : (
              <motion.li key={s.name} variants={staggerItem} {...hoverCardLift} className="basis-[calc(50%-0.32rem)] sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-0.84rem)]">
                <ServicePill interactive className="h-full p-3 sm:p-6 md:p-6">
                  <ServiceCardInner name={s.name} descriptor={s.descriptor} Icon={s.icon} tone="default" index={i} />
                </ServicePill>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

function ServiceCardInner({
  name,
  descriptor,
  Icon,
  tone,
  index,
}: {
  name: string;
  descriptor: string;
  Icon: ReturnType<typeof parseServices>[number]["icon"];
  tone: "default" | "ghost";
  index: number;
}) {
  const accentClass = index % 2 !== 0 ? "text-secondary" : "text-primary";
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <ServiceDot Icon={Icon} size="md" tone={tone} className="h-9 w-9 sm:h-12 sm:w-12" />
      <div>
        <h3 className="font-display text-sm font-black tracking-tight-display text-black sm:text-xl">
          {name}
        </h3>
        <p className="mt-1 text-xs text-black/60 sm:mt-1.5 sm:text-sm">{descriptor}</p>
      </div>
      <p className={`mt-auto inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest ${accentClass}`}>
        Request a quote <ChevronRight size={12} strokeWidth={2.4} />
      </p>
    </div>
  );
}

"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { parseServices } from "@/lib/parseServices";
import { getServiceDescription } from "@/lib/serviceDescriptions";
import { BayLabel } from "@/components/ui/BayLabel";
import {
  fadeLeft,
  fadeUp,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function Services() {
  const services = parseServices("{{SERVICES}}");

  return (
    <section id="services" className="relative bg-black py-7 sm:py-12 md:py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        <div className="grid gap-6 sm:gap-8 md:gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left column — heading + image */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
          >
            <BayLabel n="04" title="SERVICES" meta="ORDER #2847 · STATUS: OPEN" hideOnMobile />
            <h2 className="mt-5 font-display text-3xl uppercase leading-[0.95] tracking-tight text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
              Every job. Done right.
            </h2>
            <p
              data-slot="SERVICES_INTRO"
              className="mt-3 max-w-md font-mono text-sm leading-relaxed text-white/60 sm:mt-5"
            >
              From routine maintenance to complex diagnostics. Every service is
              performed by certified technicians using the right parts, the
              right tools, and the right amount of time. No upsells, no
              guesswork.
            </p>

            <div className="relative mt-5 aspect-[16/11] max-h-[220px] overflow-hidden border border-white/15 clip-corner sm:mt-8 sm:aspect-[4/3] sm:max-h-none">
              <motion.img
                src="{{SERVICES_IMAGE}}"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={VP_ONCE}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 hidden font-mono text-[10px] uppercase tracking-widest text-white/80 md:block">
                <span className="bg-secondary px-2 py-1 text-secondary-text">SHOP FLOOR</span>
                <span className="ml-3">CAPACITY · {services.length} SVCS</span>
              </div>
            </div>
          </motion.div>

          {/* Right column — services grid (inspection cards) */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.07)}
            className="grid grid-cols-2 gap-px bg-black-border"
          >
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={s.name}
                  variants={staggerItem}
                  {...hoverCardLift}
                  className="group relative bg-black/90 p-5 transition-colors hover:bg-black sm:p-6 md:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span className="hidden font-mono text-[10px] uppercase tracking-widest text-white/40 md:inline">
                      SVC.{String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="ml-auto text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary md:ml-0"
                    />
                  </div>
                  <Icon
                    size={26}
                    strokeWidth={1.25}
                    className={`mt-4 sm:mt-7 sm:[&]:size-9 ${i % 2 === 0 ? "text-secondary" : "text-primary"}`}
                  />
                  <h3 className="mt-3 font-display text-base uppercase leading-tight tracking-tight text-white sm:mt-5 sm:text-2xl">
                    {s.name}
                  </h3>
                  <p
                    data-slot={`SERVICE_BLURB_${i + 1}`}
                    className="mt-2 font-mono text-[11px] leading-relaxed text-white/65 sm:mt-3 sm:text-xs"
                  >
                    {getServiceDescription(s.name)}
                  </p>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

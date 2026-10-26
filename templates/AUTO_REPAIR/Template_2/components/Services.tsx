"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SignTitle from "@/components/ui/SignTitle";
import ServiceMark from "@/components/ui/ServiceMark";
import { parseServices } from "@/lib/parseServices";
import {
  fadeLeft,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// Services. Asymmetric grid: wide service image (with shop callout) +
// 8 service cards parsed from {{SERVICES}} CSV.
export default function Services() {
  const services = parseServices("{{SERVICES}}");

  return (
    <section id="services" className="bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeLeft}
          className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <SectionLabel className="hidden md:flex">Under the hood</SectionLabel>
            <SignTitle as="h2" size="xl" className="mt-0 md:mt-4 max-w-2xl">
              Real repairs, done by people who know the work.
            </SignTitle>
          </div>
          <p className="max-w-md font-sans text-sm text-black/60 md:text-base">
            From a quick oil change to a full engine rebuild, every job leaves
            our shop the same way. Documented, warrantied, and ready for the
            road.
          </p>
        </motion.div>

        <div className="mt-6 sm:mt-10 grid gap-5 sm:gap-8 lg:grid-cols-[1.05fr_2fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="relative aspect-[16/10] max-h-[220px] sm:max-h-none overflow-hidden bg-black/5 sm:aspect-[3/2] md:aspect-[4/5] lg:aspect-auto lg:min-h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="{{SERVICES_IMAGE}}"
              alt="Workshop services"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={VP_ONCE}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Bottom-left shop placard, like a hand-painted sign on the wall.
                Hidden on mobile per /frontend-design pass 2026-05-16 — the
                photo reads cleaner unobstructed on small screens. */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 px-4 py-3 backdrop-blur-sm hidden md:block">
              <div className="flex items-center justify-between gap-3">
                <span className="small-caps text-[10px] text-black/50">
                  Foreign · Domestic · Light truck
                </span>
                <span className="font-display text-xs font-semibold text-secondary">
                  ALL MAKES
                </span>
              </div>
            </div>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.07)}
            className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-6 sm:gap-y-7"
          >
            {services.map(({ name, icon }, i) => (
              <motion.li
                key={i}
                variants={staggerItem}
                {...hoverCardLift}
                className="flex items-start gap-2.5 sm:gap-4 border-t border-black/15 pt-2.5 sm:pt-5"
              >
                <ServiceMark
                  Icon={icon}
                  size="md"
                  color={i % 2 === 0 ? "clay" : "secondary"}
                />
                <div>
                  <p className="font-display text-[13px] sm:text-lg font-semibold leading-tight text-black">
                    {name}
                  </p>
                  <p className="mt-0.5 sm:mt-1 font-sans text-[11px] sm:text-sm leading-snug text-black/60">
                    Diagnosed properly, priced honestly, finished right the
                    first time.
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

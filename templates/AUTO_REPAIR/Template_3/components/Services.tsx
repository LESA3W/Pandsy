"use client";

import { motion } from "framer-motion";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";
import HazeOverlay from "@/components/ui/HazeOverlay";
import AmbientCard from "@/components/ui/AmbientCard";
import ChromeIcon from "@/components/ui/ChromeIcon";
import MetaCaption from "@/components/ui/MetaCaption";
import { parseServices } from "@/lib/parseServices";
import {
  fadeLeft,
  fadeRight,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

/**
 * Services — split layout. Dark photo on the left with a single sodium meta
 * caption, service cards on the right. AmbientCard panels with ChromeIcon
 * service marks. NO ServiceMark (T2), NO clip-corner inspection panels (T1).
 */
const SERVICES = parseServices("{{SERVICES}}");

export default function Services() {
  return (
    <section
      id="services"
      className="bg-black py-10 sm:py-14 md:py-20 lg:py-24"
      aria-label="Services"
    >
      <div className="container-tight">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* LEFT — services photo */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="relative isolate h-[200px] max-h-[240px] overflow-hidden sm:h-auto sm:min-h-[320px] md:min-h-[360px] lg:min-h-[560px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="{{SERVICES_IMAGE}}"
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={VP_ONCE}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <HazeOverlay />
            <div className="absolute bottom-5 left-5 right-5 hidden md:block">
              <MetaCaption tone="amber">
                WORKSHOP · {"{{CITY}}"}
              </MetaCaption>
            </div>
          </motion.div>

          {/* RIGHT — services grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="flex flex-col"
          >
            <NightTag>What we do here</NightTag>
            <NightTitle as="h2" size="lg" className="mt-4 text-balance sm:mt-5">
              All makes. All work that matters.
            </NightTitle>
            <p className="mt-4 hidden max-w-xl font-sans text-[15px] leading-relaxed text-white/60 sm:mt-5 sm:text-base md:block">
              {"{{TARGET_DESCRIPTION}}"}
            </p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.07)}
              className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4"
            >
              {SERVICES.map(({ name, icon }, idx) => {
                const isSecondary = idx % 2 === 1;
                return (
                  <motion.li
                    key={name}
                    variants={staggerItem}
                    {...hoverCardLift}
                  >
                    <AmbientCard
                      className={`group relative h-full overflow-hidden p-3.5 transition-all duration-300 sm:p-5 md:p-6 ${
                        isSecondary
                          ? "hover:border-secondary/60"
                          : "hover:border-primary/60"
                      }`}
                    >
                      {/* 1px top-border brand stripe — alternates amber / secondary */}
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-500 group-hover:opacity-100 opacity-0 ${
                          isSecondary ? "bg-secondary" : "bg-primary"
                        }`}
                      />

                      {/* Editorial counter — top-right */}
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute right-2.5 top-2.5 font-mono text-[9px] font-medium uppercase tracking-[0.2em] transition-colors sm:right-3 sm:top-3 sm:text-[10px] ${
                          isSecondary
                            ? "text-secondary/50 group-hover:text-secondary"
                            : "text-primary/50 group-hover:text-primary"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Icon with halo on hover — alternates amber / secondary */}
                      <div className="relative inline-block">
                        <span
                          aria-hidden
                          className={`pointer-events-none absolute inset-0 -m-3 rounded-full blur-2xl transition-all duration-500 ${
                            isSecondary
                              ? "bg-secondary/0 group-hover:bg-secondary/20"
                              : "bg-primary/0 group-hover:bg-primary/20"
                          }`}
                        />
                        <ChromeIcon
                          icon={icon}
                          size="md"
                          className={`relative transition-colors duration-300 ${
                            isSecondary
                              ? "group-hover:border-secondary/50 group-hover:text-secondary"
                              : "group-hover:border-primary/50 group-hover:text-primary"
                          }`}
                        />
                      </div>

                      {/* Service name */}
                      <p className="mt-3.5 font-display text-[13px] font-semibold leading-tight text-white/90 sm:mt-5 sm:text-[17px] md:text-lg">
                        {name}
                      </p>

                      {/* Bottom meta strip — dot color alternates */}
                      <div className="mt-3 flex items-center gap-2 border-t border-white/60 pt-2.5 sm:mt-5 sm:pt-3">
                        <span
                          className={`h-1 w-1 rounded-full ${
                            isSecondary ? "bg-secondary" : "bg-primary"
                          }`}
                        />
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/70 sm:text-[10px]">
                          12-mo warranty
                        </span>
                      </div>

                      {/* Hover-only underline accent (bottom-left) — alternates */}
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-12 ${
                          isSecondary ? "bg-secondary" : "bg-primary"
                        }`}
                      />
                    </AmbientCard>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

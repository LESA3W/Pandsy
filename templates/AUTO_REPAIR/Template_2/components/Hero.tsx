"use client";

import {
  Phone,
  ArrowRight,
  Wrench,
  Gauge,
  ShieldCheck,
  Car,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  fadeUp,
  hoverLift,
  kineticContainer,
  kineticWord,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

// Hero. Photo-led split with auto-shop signage cues.
// Left: service strip pre-title, slab statement, 2 CTAs, address row.
// Right: full-bleed HERO image with a service-callout card overlay
// reading like a small enamel sign nailed to a garage wall.
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white pt-28 sm:pt-32 md:pt-36 lg:pt-48"
    >
      <div className="container-tight">
        <div className="grid gap-5 pb-[52px] pt-4 sm:gap-10 sm:pb-16 sm:pt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pb-24 lg:pt-[10px]">
          <div className="flex flex-col justify-center lg:-mt-[45px]">
            {/* Service strip. Reads like the marquee on an old shop sign.
                Hidden on mobile per /frontend-design pass 2026-05-16. */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer(0.08, 0)}
              className="hidden md:flex flex-wrap items-center gap-x-3 gap-y-2 text-secondary"
            >
              <motion.span variants={staggerItem} className="inline-flex items-center gap-1.5">
                <Wrench size={13} strokeWidth={2} aria-hidden />
                <span className="small-caps text-[11px]">Service</span>
              </motion.span>
              <span className="text-secondary" aria-hidden>·</span>
              <motion.span variants={staggerItem} className="inline-flex items-center gap-1.5">
                <Gauge size={13} strokeWidth={2} aria-hidden />
                <span className="small-caps text-[11px]">Diagnostic</span>
              </motion.span>
              <span className="text-secondary" aria-hidden>·</span>
              <motion.span variants={staggerItem} className="inline-flex items-center gap-1.5">
                <ShieldCheck size={13} strokeWidth={2} aria-hidden />
                <span className="small-caps text-[11px]">Repair</span>
              </motion.span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={kineticContainer}
              className={cn(
                "mt-3 sm:mt-4 font-display font-bold leading-[0.98] tracking-tight",
                "text-[36px] text-black sm:text-5xl md:text-6xl lg:text-7xl",
              )}
            >
              <motion.span variants={kineticWord} className="inline-block mr-[0.25em]">The</motion.span>
              <motion.span
                variants={kineticWord}
                className="inline-block italic text-secondary mr-[0.25em]"
                style={{ fontStyle: "italic", fontWeight: 600 }}
              >
                {"{{BUSINESS_TYPE}}"}
              </motion.span>{" "}
              <motion.span variants={kineticWord} className="inline-block mr-[0.25em] text-primary">{"{{CITY}}"}</motion.span>
              <motion.span variants={kineticWord} className="inline-block mr-[0.25em]">actually</motion.span>
              <motion.span variants={kineticWord} className="inline-block">trusts.</motion.span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.6 }}
              className="mt-4 sm:mt-5 max-w-xl font-sans text-[17px] text-black/60 sm:text-base md:text-lg"
            >
              {"{{BUSINESS_NAME}}"} keeps {"{{CITY}}"} on the road. ASE
              certified mechanics, OEM parts, and a written 12-month warranty
              on every repair we put back on the lift.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer(0.1, 0.8)}
              className="mt-5 sm:mt-8 flex flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
            >
              <motion.a
                href="#quote"
                variants={staggerItem}
                {...hoverLift}
                className={cn(
                  "group inline-flex w-full justify-center sm:w-auto items-center gap-2 border border-secondary bg-secondary px-5 py-[15px] sm:px-6 sm:py-3.5",
                  "font-display text-[16px] sm:text-sm font-semibold uppercase tracking-wider text-secondary-text",
                  "transition-colors duration-200 hover:bg-secondary-text hover:text-secondary",
                )}
              >
                Get a Free Quote
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </motion.a>
              <motion.a
                href="tel:{{PHONE_DIGITS}}"
                variants={staggerItem}
                {...hoverLift}
                className={cn(
                  "inline-flex w-full justify-center sm:w-auto min-h-[52px] items-center gap-2 border-2 border-secondary/70 px-2 pb-3 pt-3 sm:min-h-0 sm:border-b-2 sm:border-x-0 sm:border-t-0",
                  "font-display text-[16px] sm:text-sm font-semibold uppercase tracking-wider text-secondary/80",
                  "transition-colors hover:border-secondary hover:text-secondary",
                )}
              >
                <Phone size={14} />
                Call {"{{PHONE}}"}
              </motion.a>
            </motion.div>

            {/* Address + hours row, formatted like a shop sign footer.
                Hidden on mobile per /frontend-design pass 2026-05-16
                (address surfaces in Contact/Footer, Hours lives only in Footer). */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer(0.08, 1.1)}
              className="mt-6 sm:mt-10 hidden md:grid grid-cols-1 gap-2.5 sm:gap-3 border-t border-black/15 pt-4 sm:pt-6 sm:grid-cols-2"
            >
              <motion.div variants={staggerItem} className="flex items-start gap-3">
                <Car
                  size={16}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <div>
                  <span className="small-caps text-[10px] text-black/50">
                    Shop address
                  </span>
                  <p className="font-sans text-sm text-black">
                    {"{{FULL_ADDRESS}}"}
                  </p>
                </div>
              </motion.div>
              <motion.div variants={staggerItem} className="flex items-start gap-3">
                <Clock
                  size={16}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <div>
                  <span className="small-caps text-[10px] text-black/50">
                    Hours
                  </span>
                  <p className="font-sans text-sm text-black">
                    {"{{HOURS}}"}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="relative aspect-[16/13] max-h-[360px] sm:max-h-none overflow-hidden border border-secondary bg-black/5 sm:aspect-[3/2] md:aspect-[4/5]">
              {/* Native img. Drive blocks next/image optimizer. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="{{HERO}}"
                alt="{{BUSINESS_NAME}} workshop"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Top-right shop placard. Reads like an enamel sign. */}
              <div className="absolute right-4 top-4 hidden bg-white/95 px-3 py-2 shadow-paper backdrop-blur-sm md:block">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                  <span className="small-caps text-[10px] text-black/60">
                    Open. Walk-ins welcome.
                  </span>
                </div>
              </div>
              {/* Mobile caption — bottom-left, names the shot */}
              <div className="pointer-events-none absolute bottom-2 left-2 z-10 flex items-center gap-1.5 bg-black/55 px-2 py-1 backdrop-blur-sm md:hidden">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden />
                <span className="small-caps text-[10px] text-white/90" data-slot="HERO_IMAGE_CAPTION">Inside the shop</span>
              </div>
            </div>

            {/* Bottom-left enamel callout. All Makes / All Models reads as
                a service guarantee, anchors the auto-shop universe. */}
            <div className="absolute -bottom-5 left-4 hidden bg-white px-5 py-3 shadow-paper-lg md:block">
              <div className="flex items-center gap-3">
                <Wrench size={16} strokeWidth={1.75} className="text-primary" />
                <div>
                  <span className="small-caps text-[10px] text-black/50">
                    ASE Certified
                  </span>
                  <p className="font-display text-sm font-semibold text-black">
                    All Makes · All Models
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";
import HazeOverlay from "@/components/ui/HazeOverlay";
import StatRow from "@/components/ui/StatRow";
import {
  fadeLeft,
  fadeRight,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

/**
 * About — sticky photo-essay layout. Sticky text column on the left, tall
 * vertical photo on the right. NO LocalBadge (T2). NO clip-corner image (T1).
 * Photo carries the atmosphere via vignette + halation.
 *
 * Copy is age-agnostic — no "decades", no "generations", no "since 19XX".
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative bg-black/70 py-10 sm:py-14 md:py-20 lg:py-24"
      aria-label="About"
    >
      <div className="container-tight">
        <div className="grid gap-6 sm:gap-10 md:gap-12 lg:grid-cols-[5fr_4fr] lg:gap-20">
          {/* LEFT — sticky text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <NightTag>Inside the shop</NightTag>
            <NightTitle as="h2" size="lg" className="mt-4 text-balance sm:mt-5">
              We work the way the work demands. Not the clock.
            </NightTitle>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.15)}
              className="mt-5 flex flex-col gap-3 font-sans text-[15px] leading-relaxed text-white/60 sm:mt-8 sm:gap-5 sm:text-base"
            >
              <motion.p variants={staggerItem}>
                The bay is lit when the car is in. We diagnose without guessing,
                we explain in plain words, and we tell you the price before we
                start. If a part doesn&rsquo;t need replacing, we say so.
              </motion.p>
              <motion.p variants={staggerItem}>
                We work on every make. Foreign, domestic, light truck. The tools
                are calibrated, the technicians are ASE-certified, and the parts
                we install carry our 12-month warranty. That is the deal,
                whether you found us today or your neighbor did last week.
              </motion.p>
              <motion.p variants={staggerItem}>
                Most jobs go out same day. The ones that don&rsquo;t, you hear
                from us by phone before sundown.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={stampIn}
              transition={{ delay: 0.4 }}
            >
              <StatRow className="mt-7 sm:mt-10" />
            </motion.div>
          </motion.div>

          {/* RIGHT — tall photo with parallax-ish slow reveal */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="relative isolate h-[220px] max-h-[240px] overflow-hidden sm:h-auto sm:min-h-[360px] md:min-h-[420px] lg:min-h-[680px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="{{ABOUT}}"
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={VP_ONCE}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <HazeOverlay />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

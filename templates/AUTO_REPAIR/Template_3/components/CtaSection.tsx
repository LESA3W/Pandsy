"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";
import HazeOverlay from "@/components/ui/HazeOverlay";
import SodiumButton from "@/components/ui/SodiumButton";
import GhostButton from "@/components/ui/GhostButton";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

/**
 * CTA section — full-bleed dramatic photo with a STRONG amber halation
 * overlay (more saturated than the standard HazeOverlay). Centered headline.
 *
 * Headline is age-agnostic photographic register: "When the lights are on,
 * we are working." Works for any shop, any city, any age.
 */
export default function CtaSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-black py-10 sm:py-14 md:py-20 lg:py-24"
      aria-label="Visit us"
    >
      {/* Background photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="{{CTA}}"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 -z-10">
        <HazeOverlay strong dim />
      </div>

      <div className="container-tight relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeUp}
          >
            <NightTag tone="amber" className="hidden justify-center md:flex">
              OPEN. ON THE BLOCK. ON THE PHONE.
            </NightTag>
            <NightTitle
              as="h2"
              size="xl"
              className="mt-5 text-balance sm:mt-6"
            >
              When the lights are on, we are working.
            </NightTitle>
            <p className="mx-auto mt-5 max-w-xl font-sans text-[15px] leading-relaxed text-white/60 sm:mt-6 sm:text-base md:text-lg">
              Walk in, tow in, or call ahead. Whichever gets your car looked at
              soonest is the right answer.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.1, 0.2)}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-10"
          >
            <motion.div variants={staggerItem}>
              <SodiumButton href="#quote" size="lg">
                Get a Free Quote
              </SodiumButton>
            </motion.div>
            <motion.div variants={staggerItem}>
              <GhostButton href="tel:{{PHONE_DIGITS}}" size="lg" variant="filled">
                <Phone size={16} strokeWidth={1.75} aria-hidden />
                Call {"{{PHONE}}"}
              </GhostButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

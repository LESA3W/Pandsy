"use client";

import {
  BadgeCheck,
  ShieldCheck,
  Wrench,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";
import GlowDot from "@/components/ui/GlowDot";
import ChromeIcon from "@/components/ui/ChromeIcon";
import {
  fadeUp,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

/**
 * Why Choose Us — 4-column typographic tiles on surface-1. Each tile starts
 * with a single GlowDot (the ONLY ordinal mark — no 01-04 like T1, no
 * Roman numerals like T2). ChromeIcon below, then headline + paragraph.
 */
type Tile = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const TILES: Tile[] = [
  {
    icon: BadgeCheck,
    title: "ASE-certified hands",
    body: "Every repair is performed by a technician who has passed and maintains the ASE certification standard.",
  },
  {
    icon: ShieldCheck,
    title: "12-month warranty",
    body: "Parts and labor on every covered repair. If something we fixed fails inside the year, we make it right.",
  },
  {
    icon: Wrench,
    title: "OEM-grade parts",
    body: "We use original-equipment or matched-spec parts. No bargain-bin substitutes that fail twice as fast.",
  },
  {
    icon: Clock,
    title: "Honest estimates",
    body: "You know the price before we start. If we find something else, we call you. No surprises on the invoice.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-black py-10 sm:py-14 md:py-20 lg:py-24" aria-label="Why choose us">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <NightTag>Why people stay</NightTag>
          <NightTitle as="h2" size="lg" className="mt-4 text-balance sm:mt-5">
            Four things we don&rsquo;t cut corners on.
          </NightTitle>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.15)}
          className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 sm:mt-12 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-8"
        >
          {TILES.map(({ icon, title, body }, i) => (
            <motion.li
              key={title}
              variants={staggerItem}
              {...hoverCardLift}
              className="flex flex-col"
            >
              {/* Dot tone alternates so both brand colors appear across the proof row. */}
              <GlowDot
                className="mb-4 hidden sm:mb-6 md:block"
                tone={i % 2 === 0 ? "amber" : "secondary"}
              />
              <ChromeIcon icon={icon} size="lg" />
              <p className="mt-4 font-display text-base font-bold leading-tight text-white/90 sm:mt-6 sm:text-lg lg:text-xl">
                {title}
              </p>
              <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/60 sm:mt-3 sm:text-sm">
                {body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

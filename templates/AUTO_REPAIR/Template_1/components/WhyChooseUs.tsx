"use client";

import { Award, BadgeCheck, Clock, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { BayLabel } from "@/components/ui/BayLabel";
import {
  fadeUp,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const TILES = [
  {
    icon: BadgeCheck,
    slot: "WHY_TILE_1",
    headline: "Transparent Pricing",
    body: "You see the estimate before we touch a wrench. No surprises, no upsells, no &ldquo;while we&rsquo;re in there.&rdquo;",
  },
  {
    icon: Award,
    slot: "WHY_TILE_2",
    headline: "Certified Technicians",
    body: "Every tech on our floor is ASE-certified and trained on modern diagnostic systems for any make or model.",
  },
  {
    icon: Wrench,
    slot: "WHY_TILE_3",
    headline: "Warranty-Backed",
    body: "12-month, 12,000-mile warranty on parts and labor. Written, not implied. We stand behind what we do.",
  },
  {
    icon: Clock,
    slot: "WHY_TILE_4",
    headline: "Fast Turnaround",
    body: "Most jobs done same-day. We respect your schedule and call before any change to scope or timeline.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative bg-black py-7 sm:py-12 md:py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <BayLabel n="06" title="WHY THIS SHOP" meta="INSPECTION CHECKLIST" hideOnMobile />
            <h2 className="mt-5 max-w-3xl font-display text-3xl uppercase leading-[0.95] tracking-tight text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
              The four reasons people stay.
            </h2>
          </div>
          <p className="max-w-sm font-mono text-xs uppercase tracking-widest text-white/50">
            Four standards we hold for every job that rolls in. No exceptions,
            no shortcuts.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.15)}
          className="mt-8 grid grid-cols-2 gap-px bg-black-border sm:mt-10 md:mt-12 md:grid-cols-2 lg:grid-cols-4"
        >
          {TILES.map((t, i) => {
            const Icon = t.icon;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.li
                key={t.slot}
                variants={staggerItem}
                {...hoverCardLift}
                className="group relative bg-black p-5 transition-colors hover:bg-black/90 sm:p-6 md:p-7"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl text-accent sm:text-4xl md:text-5xl lg:text-6xl">
                    {num}
                  </span>
                  <Icon size={20} className="text-white/40 transition-colors group-hover:text-accent sm:[&]:size-6" strokeWidth={1.5} />
                </div>
                <h3
                  data-slot={`${t.slot}_HEADLINE`}
                  className="mt-4 font-display text-base uppercase leading-tight tracking-tight text-white sm:mt-8 sm:text-xl md:text-2xl"
                >
                  {t.headline}
                </h3>
                <p
                  data-slot={`${t.slot}_BODY`}
                  className="mt-2 font-sans text-xs leading-relaxed text-white/60 sm:mt-4 sm:text-sm"
                  dangerouslySetInnerHTML={{ __html: t.body }}
                />
                <div className="mt-4 hidden h-px w-full bg-black-border sm:mt-6 md:block" aria-hidden="true" />
                <span className="mt-3 hidden font-mono text-[9px] uppercase tracking-widest text-white/30 sm:mt-4 sm:text-[10px] md:block">
                  STD-{num} · VERIFIED
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

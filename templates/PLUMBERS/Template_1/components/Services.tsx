"use client";

/**
 * Services — grid of services parsed from {{SERVICES}} CSV with Lucide icons.
 * Each card: icon, name, one-line descriptor. Dark surface.
 */
import { motion } from "framer-motion";
import { parseServices } from "@/lib/parseServices";
import { CopperRule } from "./ui/CopperRule";
import { DropSeal } from "./ui/DropSeal";
import { ArrowUpRight } from "lucide-react";
import {
  fadeLeft,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const services = parseServices("{{SERVICES}}");

// Light flavor descriptors keyed by service name fragments. Generic so they
// work for any client's service list. Falls back to a universal description.
function describe(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("emergency") || n.includes("burst") || n.includes("24/7"))
    return "Burst pipes, flooded basements, no hot water at midnight. We answer.";
  if (n.includes("water heater") || n.includes("tankless") || n.includes("boiler"))
    return "Repair, replacement, tankless conversions. All major brands serviced.";
  if (n.includes("leak"))
    return "Acoustic and thermal leak detection. Find it, fix it, document it.";
  if (n.includes("sewer") || n.includes("septic"))
    return "Camera scoping, hydro-jet cleaning, line repair without tearing up the yard.";
  if (n.includes("drain") || n.includes("clog") || n.includes("rooter"))
    return "Slow, gurgling, or fully blocked. Cleared cleanly with the right tool.";
  if (n.includes("repipe") || n.includes("piping"))
    return "Whole-home repipe in copper or PEX. Permitted, pressure-tested, done right.";
  if (n.includes("toilet") || n.includes("faucet") || n.includes("fixture"))
    return "Repair or replace. We carry the parts most homes actually need.";
  if (n.includes("remodel") || n.includes("bathroom") || n.includes("kitchen"))
    return "Plumbing rough-in and finish for renovations and additions.";
  return "Honest diagnosis. Up-front pricing. Clean install.";
}

export function Services() {
  return (
    <section id="services" className="relative bg-surface-tint py-7 sm:py-12 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeLeft}
          className="max-w-2xl mb-7 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-5 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary">
            <DropSeal size={12} tone="primary" />
            <span>What we do</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tighter mb-3 sm:mb-4">
            Plumbing you don&apos;t have
            <br />
            <span className="text-primary">to think about again.</span>
          </h2>
          <CopperRule width="short" />
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.07)}
          className="flex flex-wrap justify-center gap-2.5 sm:gap-4"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.name}
                variants={staggerItem}
                {...hoverCardLift}
                className="group basis-[calc(50%-0.32rem)] sm:basis-[calc(50%-0.5rem)] lg:basis-[calc(33.333%-0.667rem)] bg-white border border-slate-200 p-3 sm:p-6 md:p-8 flex flex-col gap-2 sm:gap-4 hover:bg-surface-tint transition-colors"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className={`${i % 2 !== 0 ? "text-secondary" : "text-primary"} group-hover:opacity-80 transition-opacity sm:[&]:[width:32px] sm:[&]:[height:32px]`}
                  />
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.7}
                    className="text-slate-500 group-hover:text-primary transition-colors sm:[&]:[width:18px] sm:[&]:[height:18px]"
                  />
                </div>
                <h3 className="font-display text-sm sm:text-2xl text-slate-900 leading-tight">
                  {s.name}
                </h3>
                <p className="font-sans text-[11px] sm:text-[15px] text-slate-600 leading-snug sm:leading-relaxed">
                  {describe(s.name)}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <p className="font-sans text-[13px] sm:text-[15px] text-slate-600 max-w-xl">
            Not seeing what you need? Tell us what&apos;s going on and we&apos;ll
            tell you straight whether it&apos;s ours to fix.
          </p>
          <a
            href="#quote"
            className="font-mono text-[12px] uppercase tracking-widest text-primary hover:opacity-70 transition-opacity flex items-center gap-2 whitespace-nowrap"
          >
            Get a free quote
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}

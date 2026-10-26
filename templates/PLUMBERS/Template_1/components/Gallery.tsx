"use client";

/**
 * Gallery — single hero card per claude.md rule #14 (PLUMBERS has GALLERY_1
 * only, NO GALLERY_2). Wider hero-style image inside FittingBracket frame
 * with a primary-rule bottom strip. White surface.
 */
import { motion } from "framer-motion";
import { FittingBracket } from "./ui/FittingBracket";
import { CopperRule } from "./ui/CopperRule";
import { DropSeal } from "./ui/DropSeal";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function Gallery() {
  return (
    <section className="relative bg-white py-7 sm:py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-3xl mb-7 sm:mb-12 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-5 font-mono text-[11px] uppercase tracking-widest text-primary">
            <DropSeal size={12} tone="primary" />
            <span>From our work</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tighter">
            Clean install. Square fittings.
            <br />
            <span className="text-primary">No mess left behind.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.12, 0.1)}
        >
        <motion.div variants={staggerItem}>
        <FittingBracket surface="light" padding="none" className="bg-white">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="{{GALLERY_1}}"
              alt="Plumbing installation by {{BUSINESS_NAME}}"
              className="block w-full h-[220px] sm:h-[400px] md:h-[460px] lg:h-[560px] object-cover"
            />
            {/* Caption strip overlaid at bottom */}
            <div className="hidden md:block absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <div className="px-4 sm:px-10 py-4 sm:py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-3">
                <div>
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary mb-1">
                    Recent install · {"{{CITY}}"}, {"{{STATE}}"}
                  </p>
                  <p className="font-display text-lg sm:text-3xl text-white leading-tight">
                    Tankless water heater + supply repipe
                  </p>
                </div>
                <p className="font-sans text-[12px] sm:text-[14px] text-white/80 sm:text-right max-w-sm">
                  Permitted, pressure-tested, walked through with the homeowner.
                </p>
              </div>
            </div>
          </div>
        </FittingBracket>
        </motion.div>

        <motion.div variants={staggerItem} className="mt-8 flex justify-center">
          <CopperRule width="center" />
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

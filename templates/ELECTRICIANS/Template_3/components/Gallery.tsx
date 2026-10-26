"use client";

/**
 * Gallery — HOT WIRE / LIVE EDITORIAL
 *
 * Single landscape {{GALLERY_1}} (NO GALLERY_2 — claude.md hard rule #14
 * ELECTRICIANS table). EditorialFrame with crimson stamp overlay top-right
 * and editorial caption strip. NOT T1 ConduitFrame brackets, NOT T2
 * SchematicFrame plus-corner-marks.
 */
import { motion } from "framer-motion";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { StampMark } from "@/components/ui/StampMark";
import { CopperRule } from "@/components/ui/CopperRule";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-end"
        >
          <div className="sm:col-span-7">
            <StampMark label="Live · 01" meta="Wired right" rotate={-2} />
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tighter text-black sm:text-4xl md:text-5xl lg:text-6xl">
              The work,{" "}
              <span className="italic text-primary">on the bench.</span>
            </h2>
          </div>
          <div className="sm:col-span-5">
            <p className="font-sans text-base leading-relaxed text-black/60 sm:text-right">
              Crisp panels. Clean conduit runs. Labels in pen. Every photo is a
              real ticket from the {"{{CITY}}"} crew.
            </p>
            <div className="mt-4 sm:flex sm:justify-end">
              <CopperRule className="max-w-[160px]" dotSide="right" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.12, 0.1)}
        >
          <motion.div variants={staggerItem}>
            <EditorialFrame
              src="{{GALLERY_1}}"
              alt="Recent work by {{BUSINESS_NAME}}"
              stamp="LIVE / 01 / WIRED RIGHT"
              caption="A signed-off panel, hand-stamped before we left."
              aspect="aspect-[3/2] md:aspect-[16/9]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

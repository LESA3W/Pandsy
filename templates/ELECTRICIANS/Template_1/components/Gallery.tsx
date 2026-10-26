"use client";

/**
 * Gallery — single hero card per claude.md rule #14 (ELECTRICIANS has GALLERY_1
 * only, NO GALLERY_2). Wider hero-style image inside ConduitFrame with
 * VoltageRule below. Bone surface.
 */
import { motion } from "framer-motion";
import { ConduitFrame } from "./ui/ConduitFrame";
import { VoltageRule } from "./ui/VoltageRule";
import { PanelLabel } from "./ui/PanelLabel";
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
          className="mb-7 sm:mb-12 md:mb-14"
        >
          <PanelLabel
            n="07"
            title="FROM THE FIELD"
            meta="RECENT INSTALL"
            variant="dark"
            className="mb-7"
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.02] tracking-tighter uppercase max-w-3xl">
            Clean conduit run.
            <br />
            {/* Yellow underline bar accent on white surface */}
            <span className="relative inline-block">
              <span className="relative z-10">Labels you can actually read.</span>
              <span className="absolute inset-x-0 bottom-0 h-[0.18em] bg-primary/60" aria-hidden="true" />
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.12, 0.1)}
        >
          <motion.figure variants={staggerItem}>
            <ConduitFrame surface="light" padding="none" className="bg-black">
              <div className="relative group overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="{{GALLERY_1}}"
                  alt="Recent electrical installation by {{BUSINESS_NAME}}"
                  className="block w-full h-[220px] sm:h-[400px] md:h-[520px] lg:h-[640px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Caption strip overlaid at bottom */}
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent">
                  <div className="px-4 sm:px-6 md:px-10 py-5 sm:py-6 md:py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-1">
                        Recent install · {"{{CITY}}"}, {"{{STATE}}"}
                      </p>
                      <p className="font-display text-xl sm:text-2xl md:text-3xl text-white leading-tight uppercase tracking-tight">
                        Service panel upgrade + EV charger
                      </p>
                    </div>
                    <p className="font-sans text-[13px] sm:text-[14px] text-white/80 sm:text-right max-w-sm">
                      Permitted, inspected, walked through with the homeowner.
                    </p>
                  </div>
                </figcaption>
              </div>
            </ConduitFrame>
          </motion.figure>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <VoltageRule width="center" tone="amber" />
        </div>
      </div>
    </section>
  );
}

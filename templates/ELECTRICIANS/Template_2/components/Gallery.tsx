"use client";

/**
 * Gallery — single hero card per claude.md rule #14 (ELECTRICIANS has GALLERY_1
 * only, no GALLERY_2). T2's frame is a SchematicFrame (crosshair corners) on
 * a paper surface with a SafetyTape diagonal hazard strip ABOVE the image
 * acting as a section header — different from T1's L-bracket ConduitFrame.
 */
import { motion } from "framer-motion";
import { SchematicFrame } from "./ui/SchematicFrame";
import { MeasureRule } from "./ui/MeasureRule";
import { BlueprintCell } from "./ui/BlueprintCell";
import { SafetyTape } from "./ui/SafetyTape";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function Gallery() {
  return (
    <section className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="mb-8 sm:mb-12 md:mb-14"
        >
          <BlueprintCell
            n="07"
            title="From the field"
            spec="recent install / photo log"
            variant="dark"
            className="mb-5 sm:mb-7"
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] tracking-tight font-bold max-w-3xl">
            Drawn up. Pulled clean.
            <br />
            <span className="text-primary">Inspected. Signed off.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.12, 0.1)}
        >
          {/* Hazard tape header strip — T2 signature use of SafetyTape */}
          <SafetyTape thickness="med" className="mb-0" />

          <motion.figure variants={staggerItem}>
            <SchematicFrame surface="dark" padding="none" className="bg-black">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="{{GALLERY_1}}"
                  alt="Recent electrical installation by {{BUSINESS_NAME}}"
                  className="block w-full h-[220px] sm:h-[360px] md:h-[460px] lg:h-[560px] object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent">
                  <div className="px-4 sm:px-10 py-4 sm:py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-1 font-medium">
                        Recent install / {"{{CITY}}"}, {"{{STATE}}"}
                      </p>
                      <p className="font-display text-2xl sm:text-3xl text-white leading-tight font-semibold tracking-tight">
                        Service upgrade + EV charger
                      </p>
                    </div>
                    <p className="font-sans text-[14px] text-white/80 sm:text-right max-w-sm">
                      Permitted, inspected, drawings on file with the city.
                    </p>
                  </div>
                </div>
              </div>
            </SchematicFrame>
          </motion.figure>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <MeasureRule width="center" tone="sapphire" />
        </div>
      </div>
    </section>
  );
}

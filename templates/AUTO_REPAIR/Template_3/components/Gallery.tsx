"use client";

import { motion } from "framer-motion";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";
import HazeOverlay from "@/components/ui/HazeOverlay";
import MetaCaption from "@/components/ui/MetaCaption";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

/**
 * Gallery — 2-cell asymmetric grid (AUTO_REPAIR has both GALLERY_1 and
 * GALLERY_2). Photographic register, sodium meta captions in mono.
 *
 * NO REC indicators (T1). NO clay enamel placards (T2). Just the photos
 * and a single tiny FRAME caption per cell.
 */
export default function Gallery() {
  return (
    <section
      id="work"
      className="bg-black/70 py-10 sm:py-14 md:py-20 lg:py-24"
      aria-label="Workshop gallery"
    >
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <NightTag>From the floor</NightTag>
          <NightTitle as="h2" size="lg" className="mt-5 text-balance">
            Frames from the bay.
          </NightTitle>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.12, 0.1)}
          className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 md:mt-14 md:grid-cols-5 md:gap-6 lg:gap-8"
        >
          {/* Cell 1 — wider, taller */}
          <motion.figure
            variants={staggerItem}
            className="relative isolate h-[220px] max-h-[240px] overflow-hidden sm:h-auto sm:min-h-[320px] md:col-span-3 md:min-h-[520px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="{{GALLERY_1}}"
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <HazeOverlay />
            <figcaption className="absolute bottom-5 left-5 hidden md:block">
              <MetaCaption tone="amber">FRAME 01 · {"{{CITY}}"}</MetaCaption>
            </figcaption>
          </motion.figure>

          {/* Cell 2 — narrower, shorter */}
          <motion.figure
            variants={staggerItem}
            className="relative isolate h-[200px] max-h-[240px] overflow-hidden sm:h-auto sm:min-h-[280px] md:col-span-2 md:min-h-[520px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="{{GALLERY_2}}"
              alt=""
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <HazeOverlay />
            <figcaption className="absolute bottom-5 left-5 hidden md:block">
              <MetaCaption tone="accent">FRAME 02 · {"{{CITY}}"}</MetaCaption>
            </figcaption>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
}

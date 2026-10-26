"use client";

import { motion } from "framer-motion";
import { BayLabel } from "@/components/ui/BayLabel";
import { HazardDivider } from "@/components/ui/HazardDivider";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative border-y border-white/15 bg-black/90 py-7 sm:py-12 md:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
        >
          <BayLabel n="07" title="ON THE FLOOR" meta="LIVE FEED · BAY 02 / BAY 03" hideOnMobile />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-5 sm:mt-6 sm:gap-6">
            <h2 className="max-w-3xl font-display text-3xl uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Inside the shop.
            </h2>
            <p
              data-slot="GALLERY_INTRO"
              className="max-w-sm font-mono text-xs uppercase tracking-widest text-white/50"
            >
              Real bays, real tools, real work. Not stock photos. The kind of
              shop you can trust because you can see what&rsquo;s happening.
            </p>
          </div>
        </motion.div>

        {/* Layout: 2 cells side-by-side on desktop, stacked on mobile */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.12, 0.1)}
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:mt-12 md:grid-cols-2 md:gap-6"
        >
          <motion.figure
            variants={staggerItem}
            className="group relative aspect-[16/11] max-h-[220px] overflow-hidden border border-white/15 clip-corner-sm sm:aspect-[4/3] sm:max-h-none"
          >
            <img
              src="{{GALLERY_1}}"
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 hidden items-center justify-between bg-gradient-to-t from-black to-transparent p-5 font-mono text-[10px] uppercase tracking-widest text-white md:flex">
              <span>FRAME 01 · {"{{CITY}}"} SHOP FLOOR</span>
              <span className="text-accent">REC</span>
            </figcaption>
          </motion.figure>

          <motion.figure
            variants={staggerItem}
            className="group relative aspect-[16/11] max-h-[220px] overflow-hidden border border-white/15 clip-corner-sm sm:aspect-[4/3] sm:max-h-none"
          >
            <img
              src="{{GALLERY_2}}"
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 hidden items-center justify-between bg-gradient-to-t from-black to-transparent p-5 font-mono text-[10px] uppercase tracking-widest text-white md:flex">
              <span>FRAME 02 · WORK IN PROGRESS</span>
              <span className="text-accent">REC</span>
            </figcaption>
          </motion.figure>
        </motion.div>

        <HazardDivider thin className="mt-8 sm:mt-10 md:mt-12" />
      </div>
    </section>
  );
}

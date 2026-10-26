"use client";

import { motion } from "framer-motion";
import PipeTick from "@/components/ui/PipeTick";
import RippleRule from "@/components/ui/RippleRule";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// MomentGallery (Gallery) — single hero card per CLAUDE.md rule #14.
// PLUMBERS = 5 images (no GALLERY_2). ServicePill-shaped frame around GALLERY_1
// with chrome caption strip overlay. White surface with RippleRule above/below.

export default function MomentGallery() {
  return (
    <section className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <RippleRule className="absolute -top-1 left-0 right-0" tone="default" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
            <PipeTick />
            On-site work
          </p>
          {/* SLOT:GALLERY_HEADLINE */}
          <h2
            data-slot="GALLERY_HEADLINE"
            className="mt-3 font-display text-3xl font-black leading-[1.05] tracking-tight-display text-black sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            What our work looks like.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-black/60 sm:text-base lg:text-lg">
            We protect your floors. We bag our boots. We leave the workspace
            cleaner than we found it.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.12, 0.1)}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <motion.figure
            variants={staggerItem}
            className="group relative overflow-hidden rounded-3xl border border-black/10 shadow-lift-strong"
          >
            <div className="relative aspect-[3/2] w-full md:aspect-[16/9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="{{GALLERY_1}}"
                alt="{{BUSINESS_NAME}} on-site work in {{CITY}}"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="absolute bottom-0 left-0 right-0 hidden items-center justify-between border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur-sm sm:flex sm:px-5 sm:py-3.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                On-site · {"{{CITY}}, {{STATE}}"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-black/60">
                Master plumber on staff
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      </div>

      <RippleRule className="absolute -bottom-1 left-0 right-0" tone="default" />
    </section>
  );
}

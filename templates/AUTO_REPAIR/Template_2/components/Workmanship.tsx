"use client";

import { Wrench, Cog } from "lucide-react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SignTitle from "@/components/ui/SignTitle";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// Workmanship. 2-cell asymmetric gallery on stone-soft surface.
// Captions read like service-ticket categories on a clipboard.
export default function Workmanship() {
  return (
    <section id="work" className="bg-black/5 py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <SectionLabel>Workmanship</SectionLabel>
            <SignTitle as="h2" size="xl" className="mt-4 max-w-2xl">
              The work, not the marketing.
            </SignTitle>
          </div>
          <p className="max-w-sm font-sans text-sm text-black/60 md:text-base">
            A look inside the shop. Real cars, real repairs, real customers.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.12, 0.1)}
          className="mt-6 sm:mt-10 grid gap-3 sm:gap-4 md:grid-cols-5 md:gap-6"
        >
          <motion.figure variants={staggerItem} className="md:col-span-3">
            <div className="relative aspect-[16/10] max-h-[220px] sm:max-h-none overflow-hidden bg-black/10 sm:aspect-[4/3] md:aspect-[5/4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="{{GALLERY_1}}"
                alt="On the lift"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3 hidden md:inline-flex items-center gap-2 bg-white/95 px-3 py-1.5 backdrop-blur-sm">
                <Wrench size={12} strokeWidth={2} className="text-primary" />
                <span className="small-caps text-[10px] text-black/60">
                  On the lift
                </span>
              </div>
            </div>
            <figcaption className="mt-3 hidden md:flex items-center gap-3">
              <span className="h-px w-6 bg-accent" aria-hidden />
              <span className="small-caps text-[11px] text-black/60">
                Service floor · {"{{CITY}}"}
              </span>
            </figcaption>
          </motion.figure>
          <motion.figure variants={staggerItem} className="md:col-span-2">
            <div className="relative aspect-[16/10] max-h-[220px] sm:max-h-none overflow-hidden bg-black/10 sm:aspect-[4/3] md:aspect-[3/4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="{{GALLERY_2}}"
                alt="In the workshop"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3 hidden md:inline-flex items-center gap-2 bg-white/95 px-3 py-1.5 backdrop-blur-sm">
                <Cog size={12} strokeWidth={2} className="text-primary" />
                <span className="small-caps text-[10px] text-black/60">
                  In the shop
                </span>
              </div>
            </div>
            <figcaption className="mt-3 hidden md:flex items-center gap-3">
              <span className="h-px w-6 bg-accent" aria-hidden />
              <span className="small-caps text-[11px] text-black/60">
                Workshop · {"{{CITY}}"}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
}

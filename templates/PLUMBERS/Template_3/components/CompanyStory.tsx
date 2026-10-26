"use client";

import { ChevronRight, ShieldCheck, FileText, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import PipeTick from "@/components/ui/PipeTick";
import WaterDot from "@/components/ui/WaterDot";
import AquaScrim from "@/components/ui/AquaScrim";
import WaveWash from "@/components/ui/WaveWash";
import {
  fadeLeft,
  fadeRight,
  hoverLift,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// CompanyStory (About) — split layout. Framed ABOUT image left (sticky on desktop)
// + copy stack right with promises grid.
// Anchored on service promises (CLAUDE.md rule #11): NO tenure-locked copy.

const PROMISES = [
  {
    Icon: ShieldCheck,
    label: "Licensed & Insured",
    body: "Master plumber on every crew. Permits pulled. Coverage in writing.",
  },
  {
    Icon: FileText,
    label: "Up-front pricing",
    body: "Written quotes before the wrench comes out. No surprise line-items.",
  },
  {
    Icon: Wrench,
    label: "Pressure tested",
    body: "Every joint we touch gets verified before we close the work order.",
  },
];

export default function CompanyStory() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      {/* Subtle corner atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-wave-wash" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 sm:gap-10 sm:px-6 md:px-10 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* LEFT — image */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeLeft}
          className="lg:col-span-5 lg:sticky lg:top-24 lg:-ml-[70px]"
        >
          <figure className="relative overflow-hidden rounded-3xl border border-black/10 shadow-lift-strong">
            <div className="relative aspect-[3/2] w-full md:aspect-[3/2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="{{ABOUT}}"
                alt="{{BUSINESS_NAME}} crew at work"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={VP_ONCE}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <AquaScrim opacity="soft" tone="ink" />
              <WaveWash variant="soft" />
            </div>
            <figcaption className="flex items-center justify-between border-t border-black/10 bg-white/95 px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {"{{CITY}}, {{STATE}}"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-black/60">
                On-site work
              </span>
            </figcaption>
          </figure>
        </motion.div>

        {/* RIGHT — copy + promises */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeRight}
          className="lg:col-span-7"
        >
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={stampIn}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary"
          >
            <PipeTick />
            {/* SLOT:ABOUT_KICKER */}
            <span data-slot="ABOUT_KICKER">About the team</span>
          </motion.p>

          {/* SLOT:ABOUT_HEADLINE */}
          <h2
            data-slot="ABOUT_HEADLINE"
            className="mt-3 font-display text-3xl font-black leading-[1.06] tracking-tight-display text-black sm:text-4xl md:text-5xl lg:text-6xl"
          >
            We answer the phone.
            <br />
            We tell you the price.
            <br />
            <span className="text-primary">Then we get to work.</span>
          </h2>

          {/* SLOT:ABOUT_BODY */}
          <div
            data-slot="ABOUT_BODY"
            className="mt-4 max-w-2xl space-y-3 text-[15px] leading-relaxed text-black/60 sm:space-y-4 sm:text-base lg:text-lg"
          >
            <p>
              {"{{TARGET_DESCRIPTION}}"} A licensed master plumber is on every
              crew. We pressure-test every joint we touch. We protect your
              floors, bag our boots, and clean up before we leave.
            </p>
            <p>
              You get a written quote up front. You get a real arrival window.
              You get the work done once, and you get a printed receipt with
              everything we did.
            </p>
          </div>

          {/* Promises grid */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.08, 0.2)}
            className="mt-7 grid grid-cols-1 gap-3.5 sm:mt-8 sm:grid-cols-3 sm:gap-4"
          >
            {PROMISES.map((p) => (
              <motion.li
                key={p.label}
                variants={staggerItem}
                className="rounded-2xl border border-black/10 bg-white p-4 shadow-lift-soft transition-shadow hover:shadow-lift sm:p-5 md:p-6"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30">
                  <p.Icon size={18} strokeWidth={1.8} />
                </span>
                <p className="mt-3 font-display text-base font-black tracking-tight-display text-black">
                  {p.label}
                </p>
                <p className="mt-1.5 text-sm text-black/60">{p.body}</p>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.08, 0.35)}
            className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3"
          >
            <motion.a
              href="#quote"
              variants={staggerItem}
              {...hoverLift}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-mono text-[13px] uppercase tracking-widest text-primary-text shadow-lift-soft transition-all duration-150 ease-out hover:opacity-90 hover:shadow-lift sm:px-6 sm:py-3.5 sm:text-xs"
            >
              Get a free quote
              <ChevronRight size={14} strokeWidth={2.4} />
            </motion.a>
            <motion.a
              href="#services"
              variants={staggerItem}
              {...hoverLift}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-5 py-3 font-mono text-[13px] uppercase tracking-widest text-primary transition-colors duration-150 hover:bg-primary hover:text-primary-text sm:px-6 sm:py-3.5 sm:text-xs"
            >
              <WaterDot size={14} tone="aqua" />
              See what we do
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

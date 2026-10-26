"use client";

/**
 * QuoteSection — primary lead conversion. Steel-deep dark band with
 * blueprint-grid texture. The form sits in a paper-white card on the right.
 *
 * Per claude.md rule #2b: any image-bg with foreground text needs a dim
 * layer. T2's QuoteSection uses GridScrim on a small SERVICES_IMAGE inset
 * card on the left side instead of as a full-bleed image-bg — but we still
 * apply GridScrim where the image is used as background.
 */
import { motion } from "framer-motion";
import { QuoteForm } from "./forms/QuoteForm";
import { GridScrim } from "./ui/GridScrim";
import { GridGlow } from "./ui/GridGlow";
import { MeasureRule } from "./ui/MeasureRule";
import { BlueprintCell } from "./ui/BlueprintCell";
import { CheckCircle2, Phone, Clock, Zap } from "lucide-react";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const PROMISES = [
  { icon: Clock, label: "Reply within the hour during business hours" },
  { icon: Zap, label: "Master electrician scopes every ticket" },
  { icon: CheckCircle2, label: "Up-front pricing. The quote is the bill" },
];

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="relative bg-black py-10 sm:py-14 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Image background — full bleed, dimmed strongly so form reads clean */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="{{SERVICES_IMAGE}}"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        {/* Dim layer — REQUIRED per claude.md rule #2b */}
        <GridScrim dim="max" />
        <GridGlow variant="dark" breath />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
          {/* Left: pitch */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-5"
          >
            <BlueprintCell
              n="09"
              title="Submit a ticket"
              spec="free quote / no obligation"
              variant="light"
              className="mb-5 sm:mb-7"
            />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-4 sm:mb-6 font-bold">
              Tell us what&apos;s on the drawing.
              <br />
              <span className="text-primary">We&apos;ll scope it straight.</span>
            </h2>
            <MeasureRule width="short" tone="sapphire" className="mb-5 sm:mb-7" />
            <p className="font-sans text-[15px] sm:text-[17px] text-white/85 leading-relaxed mb-6 sm:mb-9 max-w-md">
              File a ticket and the master electrician on duty will read it
              before we call you back. No call center. No bait pricing. Just a
              real conversation about what your home or business needs.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.07, 0.25)}
              className="space-y-3 sm:space-y-4 mb-6 sm:mb-9"
            >
              {PROMISES.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.li key={p.label} variants={staggerItem} className="flex items-start gap-3">
                    <Icon
                      size={18}
                      strokeWidth={1.7}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span className="font-sans text-[15px] text-white/90 leading-snug">
                      {p.label}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* After-hours callout — alert-bordered */}
            <div className="border-l-2 border-accent pl-4 py-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-1 font-medium">
                After hours / on-call
              </p>
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="font-display text-2xl text-white hover:text-primary transition-colors flex items-center gap-2 font-semibold tracking-tight"
              >
                <Phone size={18} strokeWidth={1.8} />
                {"{{PHONE}}"}
              </a>
            </div>
          </motion.div>

          {/* Right: form on paper card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-7"
          >
            <div className="bg-white p-3 sm:p-6 md:p-8 lg:p-10 border border-white-rule">
              <QuoteForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

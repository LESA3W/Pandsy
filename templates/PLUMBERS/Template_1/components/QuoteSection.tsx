"use client";

/**
 * QuoteSection — primary lead conversion. Uses {{SERVICES_IMAGE}} as a
 * supporting visual on the side.
 *
 * Per the plan: NO image background — sits on dark surface so the form
 * is the focus. CTA image is reserved for CtaSection.
 */
import { motion } from "framer-motion";
import { QuoteForm } from "./forms/QuoteForm";
import { FittingBracket } from "./ui/FittingBracket";
import { CopperRule } from "./ui/CopperRule";
import { DropSeal } from "./ui/DropSeal";
import { CheckCircle2, Phone, Clock, Wrench } from "lucide-react";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const PROMISES = [
  { icon: Clock, label: "Reply within the hour during business hours" },
  { icon: Wrench, label: "Master plumber reviews every quote" },
  { icon: CheckCircle2, label: "Up-front pricing. The quote is the bill" },
];

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="relative bg-surface-tint py-7 sm:py-12 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Subtle wash */}
      <div
        className="absolute inset-0 bg-flow-wash opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      {/* Inset SERVICES_IMAGE strip on top — large, atmospheric */}
      <div className="absolute inset-y-0 right-0 w-1/2 lg:w-2/5 hidden md:block opacity-30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="{{SERVICES_IMAGE}}"
          alt=""
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[color-mix(in_srgb,var(--color-primary)_6%,#fff)] via-[color-mix(in_srgb,var(--color-primary)_3%,#fff)] to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
          {/* Left: pitch */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-5 xl:col-span-5"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-5 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary">
              <DropSeal size={12} tone="primary" />
              <span>Free quote · no obligation</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tighter mb-4 sm:mb-6">
              Tell us what&apos;s going on.
              <br />
              <span className="text-primary">We&apos;ll tell you straight.</span>
            </h2>
            <CopperRule width="short" className="mb-5 sm:mb-7" />
            <p className="font-sans text-[14px] sm:text-[17px] text-slate-600 leading-relaxed mb-6 sm:mb-9 max-w-md">
              Fill in the form and the master plumber on duty will read it
              before we call you back. No call center. No bait pricing. Just a
              real conversation about what your home needs.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.07, 0.25)}
              className="space-y-3 sm:space-y-4 mb-7 sm:mb-9"
            >
              {PROMISES.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.li key={p.label} variants={staggerItem} className="flex items-start gap-3">
                    <Icon
                      size={16}
                      strokeWidth={1.7}
                      className="text-primary flex-shrink-0 mt-0.5 sm:[&]:[width:18px] sm:[&]:[height:18px]"
                    />
                    <span className="font-sans text-[13px] sm:text-[15px] text-slate-600 leading-snug">
                      {p.label}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Emergency callout */}
            <div className="border-l-2 border-secondary pl-4 py-1">
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary mb-1">
                Pipe burst? Don&apos;t wait.
              </p>
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="font-display text-xl sm:text-2xl text-slate-900 hover:text-primary transition-colors flex items-center gap-2"
              >
                <Phone size={16} strokeWidth={1.8} className="sm:[&]:[width:18px] sm:[&]:[height:18px]" />
                {"{{PHONE}}"}
              </a>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-7 xl:col-span-7"
          >
            <FittingBracket surface="light" padding="none" className="p-3 sm:p-8 md:p-12">
              <QuoteForm />
            </FittingBracket>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

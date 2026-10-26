"use client";

/**
 * QuoteSection — primary lead conversion. Image background with ArcScrim
 * dim layer (claude.md rule #2b) so the form sits clean over the photo.
 */
import { motion } from "framer-motion";
import { QuoteForm } from "./forms/QuoteForm";
import { ArcScrim } from "./ui/ArcScrim";
import { ConduitFrame } from "./ui/ConduitFrame";
import { VoltageRule } from "./ui/VoltageRule";
import { PanelLabel } from "./ui/PanelLabel";
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
  { icon: Zap, label: "Master electrician reviews every quote" },
  { icon: CheckCircle2, label: "Up-front pricing. The quote is the bill" },
];

export function QuoteSection() {
  return (
    <section
      id="quote"
      className="relative bg-black py-7 sm:py-12 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Background image — full bleed, dimmed strongly so form reads clean */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="{{SERVICES_IMAGE}}"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        {/* Dim layer — REQUIRED per claude.md rule #2b */}
        <ArcScrim dim="max" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-16 items-start">
          {/* Left: pitch */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-5"
          >
            <PanelLabel
              n="09"
              title="FREE QUOTE"
              meta="NO OBLIGATION"
              className="mb-5 sm:mb-7"
            />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tighter mb-5 sm:mb-6 uppercase">
              Tell us what&apos;s going on.
              <br />
              <span className="text-primary">We&apos;ll tell you straight.</span>
            </h2>
            <VoltageRule width="short" tone="amber" className="mb-5 sm:mb-7" />
            <p className="font-sans text-[14px] sm:text-[16px] md:text-[17px] text-white/80 leading-relaxed mb-6 sm:mb-9 max-w-md">
              Fill in the form and the master electrician on duty will read it
              before we call you back. No call center. No bait pricing. Just a
              real conversation about what your home or business needs.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.07, 0.25)}
              className="space-y-3 sm:space-y-3.5 mb-6 sm:mb-9"
            >
              {PROMISES.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.li
                    key={p.label}
                    variants={staggerItem}
                    className="flex items-start gap-3"
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.7}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span className="font-sans text-[14px] sm:text-[15px] text-white/90 leading-snug">
                      {p.label}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Emergency callout */}
            <div className="border-l-2 border-primary pl-4 py-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-1">
                Sparking outlet? Don&apos;t wait.
              </p>
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="font-display text-xl sm:text-2xl text-white hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-tight"
              >
                <Phone size={18} strokeWidth={1.8} />
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
            className="lg:col-span-7"
          >
            <ConduitFrame surface="dark" padding="lg" className="bg-black">
              <QuoteForm />
            </ConduitFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

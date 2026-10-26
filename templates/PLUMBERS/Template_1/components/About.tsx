"use client";

/**
 * About — split layout. Left: ABOUT image inside FittingBracket frame.
 * Right: kicker, Fraunces headline (SLOT), Inter Tight body, CTA.
 *
 * Copy is anchored on SERVICE PROMISES (claude.md rule #11), NOT tenure.
 */
import { motion } from "framer-motion";
import { ShieldCheck, Wrench, Phone, ArrowRight } from "lucide-react";
import { FittingBracket } from "./ui/FittingBracket";
import { CopperRule } from "./ui/CopperRule";
import { DropSeal } from "./ui/DropSeal";
import {
  fadeLeft,
  fadeRight,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const PROMISES = [
  { icon: ShieldCheck, title: "Licensed, bonded, insured", body: "Every visit. Every time. Permits pulled when required, no shortcuts." },
  { icon: Wrench, title: "Master plumber on staff", body: "The person who shows up has the experience to diagnose, not just guess." },
  { icon: Phone, title: "Same-day. Up-front pricing.", body: "We answer the phone. We tell you the price. Then we get to work." },
];

export function About() {
  return (
    <section id="about" className="relative bg-white py-7 sm:py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
          {/* Image, framed */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:-ml-20"
          >
            <FittingBracket surface="light" padding="none" className="bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="{{ABOUT}}"
                alt="{{BUSINESS_NAME}} crew at work"
                className="block w-full h-[220px] sm:h-[400px] md:h-[460px] lg:h-[520px] object-cover"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={VP_ONCE}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </FittingBracket>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={stampIn}
              transition={{ delay: 0.4 }}
              className="hidden md:block mt-4 font-mono text-[11px] uppercase tracking-widest text-slate-500 text-center"
            >
              {"{{BUSINESS_NAME}}"} · {"{{CITY}}"}, {"{{STATE}}"}
            </motion.p>
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-5 font-mono text-[11px] uppercase tracking-widest text-primary">
              <DropSeal size={12} tone="primary" />
              <span>The crew behind the calls</span>
            </div>

            {/* SLOT:ABOUT_HEADLINE */}
            <h2
              data-slot="ABOUT_HEADLINE"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tighter mb-4 sm:mb-6"
            >
              We answer the phone.
              <br />
              We tell you the price.
              <br />
              <span className="text-primary">Then we get to work.</span>
            </h2>

            <CopperRule width="short" className="mb-5 sm:mb-7" />

            <div className="space-y-3 sm:space-y-5 font-sans text-[14px] sm:text-[17px] text-slate-600 leading-relaxed max-w-xl">
              <p>
                {"{{BUSINESS_NAME}}"} is the plumbing service homeowners and
                property managers in {"{{CITY}}"} call when they want it done
                once, done right, and explained in plain English.
              </p>
              <p>
                Our master plumber leads every job. Our trucks carry the parts
                most homes actually need. Our quotes hold. And when a small
                drain turns out to be a bigger problem, we&apos;ll show you
                what we found before we touch anything.
              </p>
              <p className="text-slate-600">
                {"{{TARGET_DESCRIPTION}}"}
              </p>
            </div>

            {/* Promises */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.2)}
              className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 border border-slate-200"
            >
              {PROMISES.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} variants={staggerItem} className="bg-white p-4 sm:p-6 md:p-8">
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                      className="text-primary mb-2.5 sm:mb-3 sm:[&]:[width:22px] sm:[&]:[height:22px]"
                    />
                    <h3 className="font-display text-base sm:text-lg text-slate-900 leading-tight mb-1 sm:mb-1.5">
                      {p.title}
                    </h3>
                    <p className="font-sans text-[13px] text-slate-600 leading-relaxed">
                      {p.body}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA */}
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <a
                href="#quote"
                className="group inline-flex items-center gap-2 bg-primary hover:opacity-90 text-primary-text px-5 py-3 sm:px-6 sm:py-3.5 font-display text-[13px] sm:text-lg tracking-wide transition-opacity"
              >
                Get a free quote
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="font-mono text-[12px] uppercase tracking-widest text-primary hover:opacity-70 transition-opacity flex items-center gap-2"
              >
                <Phone size={14} strokeWidth={1.7} />
                Call {"{{PHONE}}"}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

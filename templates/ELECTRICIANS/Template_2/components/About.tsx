"use client";

/**
 * About — flipped split layout vs T1: text on the LEFT (sticky), image on the
 * RIGHT (smaller, framed by SchematicFrame). Bone-tinted relief surface
 * (paper-deep) to break the visual rhythm but stay light-mode.
 *
 * Copy is anchored on SERVICE PROMISES (claude.md rule #11), NOT tenure.
 */
import { ShieldCheck, Wrench, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SchematicFrame } from "./ui/SchematicFrame";
import { MeasureRule } from "./ui/MeasureRule";
import { BlueprintCell } from "./ui/BlueprintCell";
import {
  fadeLeft,
  fadeRight,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const PROMISES = [
  {
    icon: ShieldCheck,
    title: "Bonded, insured, signed",
    body: "Every visit, every drawing. Permits pulled where required, no exceptions.",
  },
  {
    icon: Wrench,
    title: "Master on staff",
    body: "The person who shows up has the license to scope it, not just guess.",
  },
  {
    icon: Phone,
    title: "Up-front. On time.",
    body: "We answer the phone. We tell you the price. Then we get on it.",
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-16 items-start">
          {/* Text — LEFT (T1 had this on the right) */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-7 lg:order-1"
          >
            <BlueprintCell
              n="05"
              title="The crew on call"
              spec="signed by master / on file"
              variant="dark"
              className="mb-5 sm:mb-7"
            />

            {/* SLOT:ABOUT_HEADLINE */}
            <h2
              data-slot="ABOUT_HEADLINE"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] tracking-tight mb-4 sm:mb-6 font-bold"
            >
              We sign the work.
              <br />
              We pull the permits.
              <br />
              <span className="text-primary">We answer the phone.</span>
            </h2>

            <MeasureRule width="short" tone="sapphire" className="mb-5 sm:mb-7" />

            <div className="space-y-3 sm:space-y-5 font-sans text-[15px] sm:text-[17px] text-black leading-relaxed max-w-xl">
              <p>
                {"{{BUSINESS_NAME}}"} is the licensed electrical service
                homeowners, builders, and property managers in {"{{CITY}}"}
                call when they want it done to spec, drawn up, signed off,
                and explained in plain English.
              </p>
              <p>
                Our master electrician leads every project. Our trucks roll
                with the parts most jobs actually need. Our quotes hold. And
                when we open a service and find something the previous crew
                left undone, we&apos;ll show you the photos before we touch
                a wire.
              </p>
              <p className="text-black/50">
                {"{{TARGET_DESCRIPTION}}"}
              </p>
            </div>

            {/* Promises */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.2)}
              className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white-rule border border-white-rule"
            >
              {PROMISES.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} variants={staggerItem} className="bg-white p-4 sm:p-6">
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className="text-primary mb-3"
                    />
                    <h3 className="font-display text-base text-black leading-tight mb-1.5 font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="font-sans text-[13px] text-black leading-relaxed">
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
                className="group inline-flex items-center gap-2 bg-black hover:bg-primary text-white hover:text-primary-text px-5 py-3 sm:px-6 sm:py-3.5 font-display text-[15px] sm:text-lg font-semibold tracking-tight transition-colors"
              >
                Request a quote
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="font-mono text-[12px] uppercase tracking-widest text-primary hover:text-primary transition-colors flex items-center gap-2 font-medium"
              >
                <Phone size={14} strokeWidth={1.7} />
                Call {"{{PHONE}}"}
              </a>
            </div>
          </motion.div>

          {/* Image — RIGHT, smaller, framed */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-5 lg:order-2 lg:sticky lg:top-28"
          >
            {/* Image panned to the right edge (object-right) so the frame shows
                the right side of the photo — reads as shifted left. */}
            <div>
            <SchematicFrame surface="dark" padding="none" className="bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="{{ABOUT}}"
                alt="{{BUSINESS_NAME}} crew at work"
                className="block w-full h-[220px] sm:h-[360px] md:h-[460px] lg:h-[520px] object-cover object-[-40px_center]"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={VP_ONCE}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </SchematicFrame>
            </div>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={stampIn}
              transition={{ delay: 0.4 }}
              className="mt-4 font-mono text-[11px] uppercase tracking-widest text-black/50 text-center"
            >
              {"{{BUSINESS_NAME}}"} / {"{{CITY}}"}, {"{{STATE}}"}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

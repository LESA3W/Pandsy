"use client";

/**
 * About — split layout. Left: ABOUT image inside ConduitFrame.
 * Right: PanelLabel header, Archivo headline (SLOT), Inter body, promises grid.
 *
 * Copy is anchored on SERVICE PROMISES (claude.md rule #11), NOT tenure.
 * Bone (light) surface to break up the volt-navy rhythm.
 */
import { ShieldCheck, Wrench, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ConduitFrame } from "./ui/ConduitFrame";
import { VoltageRule } from "./ui/VoltageRule";
import { PanelLabel } from "./ui/PanelLabel";
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
    title: "Licensed, bonded, insured",
    body: "Every visit. Every time. Permits pulled when required, no shortcuts.",
  },
  {
    icon: Wrench,
    title: "Master electrician on staff",
    body: "The person who shows up has the training to diagnose, not just guess.",
  },
  {
    icon: Phone,
    title: "Up-front pricing. Same day.",
    body: "We answer the phone. We tell you the price. Then we get to work.",
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-white py-7 sm:py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-16 items-start">
          {/* Image, framed */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <ConduitFrame surface="light" padding="none" className="bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {/* object-[18%_center] frames the LEFT of the photo where the
                  electrical outlet the electrician is manipulating sits */}
              <motion.img
                src="{{ABOUT}}"
                alt="{{BUSINESS_NAME}} crew at work"
                className="block w-full h-[200px] sm:h-[360px] md:h-[420px] lg:h-[520px] object-cover object-[18%_center]"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={VP_ONCE}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </ConduitFrame>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={stampIn}
              transition={{ delay: 0.4 }}
              className="mt-4 font-mono text-[11px] uppercase tracking-widest text-black/50 text-center"
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
            <PanelLabel
              n="05"
              title="WHO WIRES IT"
              meta="MASTER ELECTRICIAN · LICENSED"
              variant="dark"
              className="mb-5 sm:mb-7"
            />

            {/* SLOT:ABOUT_HEADLINE */}
            <h2
              data-slot="ABOUT_HEADLINE"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.02] tracking-tighter mb-4 sm:mb-6 uppercase"
            >
              We answer the phone.
              <br />
              We pull the panel cover.
              <br />
              {/* Yellow underline bar accent — legible emphasis on white surface */}
              <span className="relative inline-block">
                <span className="relative z-10">Then we tell you the price.</span>
                <span className="absolute inset-x-0 bottom-0 h-[0.18em] bg-primary/60" aria-hidden="true" />
              </span>
            </h2>

            <VoltageRule width="short" tone="amber" className="mb-5 sm:mb-7" />

            <div className="space-y-3 sm:space-y-5 font-sans text-[14px] sm:text-[16px] md:text-[17px] text-black leading-relaxed max-w-xl">
              <p>
                {"{{BUSINESS_NAME}}"} is the licensed electrical service
                homeowners and small business owners in {"{{CITY}}"} call when
                they want it done once, done to code, and explained in plain
                English.
              </p>
              <p>
                Our master electrician leads every job. Our trucks carry the
                breakers and outlets most homes actually need. Our quotes hold.
                And when we open up your panel and see something that needs to
                be fixed, we&apos;ll show you the photos before we touch
                anything.
              </p>
              <p className="text-black/80">
                {"{{TARGET_DESCRIPTION}}"}
              </p>
            </div>

            {/* Promises */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.2)}
              className="mt-7 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-black/10 border border-black/15"
            >
              {PROMISES.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} variants={staggerItem} className="bg-white p-3.5 sm:p-5">
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className="text-primary mb-3"
                    />
                    <h3 className="font-display text-sm sm:text-base text-black leading-tight mb-1.5 uppercase tracking-tight">
                      {p.title}
                    </h3>
                    <p className="font-sans text-[13px] text-black/85 leading-relaxed">
                      {p.body}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA */}
            <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <a
                href="#quote"
                className="group inline-flex items-center gap-2 bg-black hover:bg-black/85 text-white px-5 py-3 sm:px-6 sm:py-3.5 md:px-7 md:py-4 font-display text-[13px] sm:text-base md:text-lg tracking-wide uppercase transition-colors"
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
                className="font-mono text-[12px] uppercase tracking-widest text-black/60 hover:text-black transition-colors flex items-center gap-2"
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

"use client";

import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { BrassMedallion } from "./ui/BrassMedallion";
import { PlateLine } from "./ui/PlateLine";
import { SchemaScrim } from "./ui/SchemaScrim";
import {
  fadeLeft,
  fadeRight,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// ShopBio (About) — split layout: framed {{ABOUT}} image with PlateLine top
// + primary corner ticks (left, sticky on desktop) + (right) Space Mono kicker,
// IBM Plex Serif SLOT headline, body, 3-row promises grid each with
// BrassMedallion + line item, CTA pair. White surface.
export function ShopBio() {
  return (
    <section id="about" className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* LEFT — framed image plate */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:-ml-20"
          >
            <PlateLine tone="primary" className="mb-2" />
            <div className="relative overflow-hidden border border-primary/60">
              <motion.img
                src="{{ABOUT}}"
                alt="Inside the {{BUSINESS_NAME}} workshop"
                className="w-full h-[220px] sm:h-[380px] md:h-[440px] lg:h-[520px] object-cover"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={VP_ONCE}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <SchemaScrim tone="white" opacity="soft" blend="multiply" />
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-black/10 px-4 py-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                <span className="text-primary">Plate 02 / The shop</span>
                <span className="text-black/40">{"{{CITY}}, {{STATE}}"}</span>
              </div>
            </div>
            <PlateLine tone="primary" className="mt-2" />
            {/* Floating metadata stamp */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={stampIn}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-4 -right-4 hidden border border-black/10 bg-white p-5 font-mono text-[10px] uppercase tracking-widest text-black md:block"
            >
              <div className="text-black/40">Established</div>
              <div className="mt-1 font-display text-2xl text-primary">
                LOCAL
              </div>
              <div className="mt-1 text-black/40">{"{{CITY}}"}, {"{{STATE}}"}</div>
            </motion.div>
          </motion.div>

          {/* RIGHT — copy */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-7"
          >
            {/* SLOT:ABOUT_KICKER */}
            <p
              data-slot="ABOUT_KICKER"
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary"
            >
              <BrassMedallion size={9} />
              About the shop
            </p>
            <PlateLine tone="primary" className="mt-5 max-w-[200px]" />
            {/* SLOT:ABOUT_HEADLINE */}
            <h2
              data-slot="ABOUT_HEADLINE"
              className="mt-5 sm:mt-7 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-black"
            >
              We do the job once. We do it right.
            </h2>
            <div
              data-slot="ABOUT_BODY"
              className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-[15px] sm:text-base leading-relaxed text-black/60 max-w-xl"
            >
              <p>
                {"{{BUSINESS_NAME}}"} is a licensed and insured plumbing shop
                serving {"{{CITY}}, {{STATE}}"}. A master plumber signs every
                ticket. The work is tested before sign-off.
              </p>
              <p>
                We work on {"{{TARGET_DESCRIPTION}}"}. From a slow drain to a
                full repipe, the price is written down before tools come out
                and the job ends with a pressure test you can watch.
              </p>
            </div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.2)}
              className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 max-w-xl"
            >
              {[
                {
                  title: "Licensed & insured",
                  body: "Every plumber on the truck is bonded and current with the state.",
                },
                {
                  title: "Up-front written quote",
                  body: "You see the price before we lift a wrench. No surprise line items.",
                },
                {
                  title: "Tested before sign-off",
                  body: "Pressure test, leak check, log entry. We don't leave until it's clean.",
                },
              ].map((item) => (
                <motion.li
                  key={item.title}
                  variants={staggerItem}
                  className="flex items-start gap-3 sm:gap-4 border-t border-black/10 pt-3 sm:pt-4"
                >
                  <BrassMedallion size={10} className="mt-1.5" />
                  <div>
                    <p className="font-display text-base sm:text-lg font-semibold text-black leading-snug">
                      {item.title}
                    </p>
                    <p className="text-sm text-black/60 mt-1">{item.body}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 font-mono text-[13px] sm:text-xs uppercase tracking-widest text-primary-text hover:opacity-90 transition-opacity"
              >
                Get a written quote
                <ArrowRight size={14} strokeWidth={2.25} />
              </a>
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="inline-flex items-center justify-center gap-2 border border-primary px-5 py-3 font-mono text-[13px] sm:text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-text transition-colors"
              >
                <Phone size={14} strokeWidth={2.25} />
                {"{{PHONE}}"}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

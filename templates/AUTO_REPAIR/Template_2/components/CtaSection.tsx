"use client";

import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// CtaSection. The one dark moment in the site.
// Full-bleed CTA image under a forest-deep overlay. Cream slab statement
// with a clay primary button and a cream-bordered call link.
export default function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-secondary/80">
      <div className="absolute inset-0">
        {/* Native img. Drive blocks next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="{{CTA}}"
          alt=""
          className="h-full w-full object-cover opacity-70"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Two-layer overlay: a softer base wash for legibility + a stronger
            fade on the right for the copy column. The image now actually shows. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.25) 100%)",
          }}
        />
      </div>

      <div className="container-tight relative z-10 py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeUp}
          >
            <div className="hidden md:inline-flex items-center gap-3">
              <span className="h-px w-6 bg-accent" aria-hidden />
              <p className="small-caps text-xs text-accent">
                Walk-ins · Tow-ins · Same-day service
              </p>
            </div>
            <h2
              className={cn(
                "mt-3 sm:mt-4 font-display font-bold leading-[1.02] tracking-tight",
                "text-3xl sm:text-4xl text-white md:text-5xl lg:text-6xl",
              )}
            >
              Pull in. We will take it from there.
            </h2>
            <p className="mt-4 sm:mt-5 max-w-xl font-sans text-[14px] sm:text-base text-white/85">
              <span className="hidden md:inline">Hours: {"{{HOURS}}"}. </span>
              Most repairs finished same-day. If your car
              cannot make it to us, call and we will sort the tow.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.1, 0.2)}
            className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            <motion.a
              href="#quote"
              variants={staggerItem}
              {...hoverLift}
              className={cn(
                "group inline-flex items-center gap-2 bg-primary px-5 py-3 sm:px-6 sm:py-3.5",
                "font-display text-[13px] sm:text-sm font-semibold uppercase tracking-wider text-primary-text",
                "transition-colors hover:bg-primary/80",
              )}
            >
              Start your quote
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </motion.a>
            <motion.a
              href="tel:{{PHONE_DIGITS}}"
              variants={staggerItem}
              {...hoverLift}
              className={cn(
                "inline-flex items-center gap-2 border border-secondary/70 px-5 py-3 sm:px-6 sm:py-3.5",
                "font-display text-[13px] sm:text-sm font-semibold uppercase tracking-wider text-white",
                "transition-colors hover:bg-secondary hover:text-secondary-text hover:border-secondary",
              )}
            >
              <Phone size={14} />
              {"{{PHONE}}"}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

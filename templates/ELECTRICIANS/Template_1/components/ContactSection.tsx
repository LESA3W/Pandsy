"use client";

/**
 * ContactSection — 2-col grid. Left: address+phone+email+hours rows with
 * amber-bordered left edges. Right: ContactForm in a bone-card container.
 * Bone (light) surface to break the dark rhythm before the footer.
 */
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "./forms/ContactForm";
import { VoltageRule } from "./ui/VoltageRule";
import { PanelLabel } from "./ui/PanelLabel";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// Split {{HOURS}} into separate lines on commas. Per the placeholder spec,
// HOURS is a comma-separated string like "Mon-Fri 7am-7pm, Sat 8am-3pm, 24/7 emergency line".
const HOURS_LINES = "{{HOURS}}".split(",").map((s) => s.trim()).filter(Boolean);

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-white py-7 sm:py-12 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="mb-7 sm:mb-12 md:mb-14"
        >
          <PanelLabel
            n="11"
            title="REACH THE CREW"
            meta="ONE CALL"
            variant="dark"
            className="mb-7"
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.02] tracking-tighter uppercase max-w-2xl">
            One call gets a real
            <br />
            {/* Yellow underline bar instead of yellow text — legible on white */}
            <span className="relative inline-block">
              <span className="relative z-10">licensed electrician.</span>
              <span className="absolute inset-x-0 bottom-0 h-[0.2em] bg-primary/60" aria-hidden="true" />
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12">
          {/* Info columns */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-5"
          >
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.2)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-8"
            >
              {/* Address */}
              <motion.div variants={staggerItem} className="border-l-4 border-primary pl-5">
                <VoltageRule width="short" tone="amber" className="mb-5" />
                <MapPin size={22} strokeWidth={1.6} className="text-primary mb-3" />
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-black/50 mb-2">
                  Where we are
                </h3>
                <a
                  href="{{GOOGLE_MAPS_URL}}"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg sm:text-xl text-black hover:text-primary transition-colors leading-snug uppercase tracking-tight"
                >
                  {"{{FULL_ADDRESS}}"}
                </a>
              </motion.div>

              {/* Phone + email */}
              <motion.div variants={staggerItem} className="border-l-4 border-primary pl-5">
                <VoltageRule width="short" tone="amber" className="mb-5" />
                <Phone size={22} strokeWidth={1.6} className="text-primary mb-3" />
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-black/50 mb-2">
                  Reach us
                </h3>
                <a
                  href="tel:{{PHONE_DIGITS}}"
                  className="block font-display text-lg sm:text-xl text-black hover:text-primary transition-colors leading-snug uppercase tracking-tight"
                >
                  {"{{PHONE}}"}
                </a>
                <a
                  href="mailto:{{EMAIL}}"
                  className="inline-flex items-center gap-2 mt-2 font-sans text-[14px] text-black hover:text-primary transition-colors"
                >
                  <Mail size={14} strokeWidth={1.7} />
                  {"{{EMAIL}}"}
                </a>
              </motion.div>

              {/* Hours — hidden on mobile (footer carries the only mobile hours block) */}
              <motion.div variants={staggerItem} className="hidden sm:block sm:col-span-2 lg:col-span-1 border-l-4 border-primary pl-5">
                <VoltageRule width="short" tone="amber" className="mb-5" />
                <Clock size={22} strokeWidth={1.6} className="text-primary mb-3" />
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-black/50 mb-3">
                  When we&apos;re open
                </h3>
                <ul className="space-y-1.5 font-sans text-[15px] text-black">
                  {HOURS_LINES.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-7"
          >
            <div className="bg-white border border-black/15 p-3 sm:p-6 md:p-8 lg:p-10">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-black leading-tight mb-2 uppercase tracking-tight">
                Send us a message
              </h3>
              <p className="font-sans text-[14px] sm:text-[15px] text-black/85 mb-3 sm:mb-7">
                Not an emergency? We&apos;ll get back to you within one business day.
              </p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

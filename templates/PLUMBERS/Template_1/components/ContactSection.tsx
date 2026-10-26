"use client";

/**
 * ContactSection — 3-col on desktop. Address+map / Phone+email / ContactForm.
 * White surface. Hours parsed from {{HOURS}} into individual lines.
 */
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "./forms/ContactForm";
import { CopperRule } from "./ui/CopperRule";
import { DropSeal } from "./ui/DropSeal";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// Split {{HOURS}} into separate lines on commas. Per the placeholder spec,
// HOURS is a comma-separated string like "Mon-Fri 7am-7pm, Sat 8am-4pm, 24/7 emergency line".
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
          className="max-w-2xl mb-8 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-5 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary">
            <DropSeal size={12} tone="primary" />
            <span>Reach the crew</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tighter">
            One call gets a real plumber
            <br />
            <span className="text-primary">on the line.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
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
            <motion.div variants={staggerItem}>
              <CopperRule width="short" className="mb-4 sm:mb-5" />
              <MapPin size={20} strokeWidth={1.6} className="text-primary mb-2 sm:mb-3 sm:[&]:[width:22px] sm:[&]:[height:22px]" />
              <h3 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-500 mb-2">
                Where we are
              </h3>
              <a
                href="{{GOOGLE_MAPS_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lg sm:text-xl text-slate-900 hover:text-primary transition-colors leading-snug"
              >
                {"{{FULL_ADDRESS}}"}
              </a>
            </motion.div>

            {/* Phone + email */}
            <motion.div variants={staggerItem}>
              <CopperRule width="short" className="mb-4 sm:mb-5" />
              <Phone size={20} strokeWidth={1.6} className="text-primary mb-2 sm:mb-3 sm:[&]:[width:22px] sm:[&]:[height:22px]" />
              <h3 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-500 mb-2">
                Reach us
              </h3>
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="block font-display text-lg sm:text-xl text-slate-900 hover:text-primary transition-colors leading-snug"
              >
                {"{{PHONE}}"}
              </a>
              <a
                href="mailto:{{EMAIL}}"
                className="hidden md:inline-flex items-center gap-2 mt-2 font-sans text-[13px] sm:text-[14px] text-slate-600 hover:text-primary transition-colors"
              >
                <Mail size={13} strokeWidth={1.7} />
                {"{{EMAIL}}"}
              </a>
            </motion.div>

            {/* Hours */}
            <motion.div variants={staggerItem} className="hidden md:block sm:col-span-2 lg:col-span-1">
              <CopperRule width="short" className="mb-4 sm:mb-5" />
              <Clock size={20} strokeWidth={1.6} className="text-primary mb-2 sm:mb-3 sm:[&]:[width:22px] sm:[&]:[height:22px]" />
              <h3 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-500 mb-3">
                When we&apos;re open
              </h3>
              <ul className="space-y-1.5 font-sans text-[13px] sm:text-[15px] text-slate-900">
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
            <div className="bg-white border border-slate-200 p-3 sm:p-6 md:p-8 lg:p-10">
              <h3 className="font-display text-xl sm:text-3xl text-slate-900 leading-tight mb-2">
                Send us a message
              </h3>
              <p className="font-sans text-[13px] sm:text-[15px] text-slate-600 mb-3 sm:mb-7">
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

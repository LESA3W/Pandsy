"use client";

/**
 * ContactSection — paper-deep relief surface. Info columns LEFT (no left
 * border-bar, just MeasureRule above each block — different from T1's
 * amber-bordered left edges). Form RIGHT in a paper-white card.
 */
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "./forms/ContactForm";
import { MeasureRule } from "./ui/MeasureRule";
import { BlueprintCell } from "./ui/BlueprintCell";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const HOURS_LINES = "{{HOURS}}".split(",").map((s) => s.trim()).filter(Boolean);

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="mb-8 sm:mb-12 md:mb-14"
        >
          <BlueprintCell
            n="11"
            title="Get on the schedule"
            spec="reach the office"
            variant="dark"
            className="mb-5 sm:mb-7"
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] tracking-tight font-bold max-w-2xl">
            One call gets a real
            <br />
            <span className="text-primary">licensed electrician.</span>
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
                <MeasureRule width="short" tone="sapphire" className="mb-4" />
                <MapPin size={22} strokeWidth={1.6} className="text-primary mb-3" />
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-black/50 mb-2 font-medium">
                  Office
                </h3>
                <a
                  href="{{GOOGLE_MAPS_URL}}"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl text-black hover:text-primary transition-colors leading-snug font-semibold tracking-tight"
                >
                  {"{{FULL_ADDRESS}}"}
                </a>
              </motion.div>

              {/* Phone + email */}
              <motion.div variants={staggerItem}>
                <MeasureRule width="short" tone="sapphire" className="mb-4" />
                <Phone size={22} strokeWidth={1.6} className="text-primary mb-3" />
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-black/50 mb-2 font-medium">
                  Reach the desk
                </h3>
                <a
                  href="tel:{{PHONE_DIGITS}}"
                  className="block font-display text-xl text-black hover:text-primary transition-colors leading-snug font-semibold tracking-tight"
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

              {/* Hours */}
              <motion.div variants={staggerItem} className="hidden sm:block sm:col-span-2 lg:col-span-1">
                <MeasureRule width="short" tone="sapphire" className="mb-4" />
                <Clock size={22} strokeWidth={1.6} className="text-primary mb-3" />
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-black/50 mb-3 font-medium">
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
            <div className="bg-white border border-white-rule p-3 sm:p-6 md:p-8 lg:p-10">
              <h3 className="font-display text-lg sm:text-3xl text-black leading-tight mb-2 font-semibold tracking-tight">
                Send us a note
              </h3>
              <p className="font-sans text-[13px] sm:text-[15px] text-black mb-3 sm:mb-7">
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

"use client";

/**
 * ContactSection — HOT WIRE / LIVE EDITORIAL
 *
 * Editorial split: ContactForm + business info card.
 */
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/forms/ContactForm";
import { StampMark } from "@/components/ui/StampMark";
import { CopperRule } from "@/components/ui/CopperRule";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function ContactSection() {
  // Parse the {{HOURS}} placeholder into individual lines for cleaner display
  const hourLines = "{{HOURS}}".split(",").map((s) => s.trim());

  return (
    <section id="contact" className="relative bg-white py-8 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="mb-5 flex flex-col items-start gap-4 sm:mb-12 sm:gap-5"
        >
          <StampMark label="Contact" meta="Reach the bench" rotate={-2} />
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tighter text-black sm:text-4xl md:text-5xl lg:text-6xl">
            Got a question?{" "}
            <span className="italic text-primary">We&apos;re on the line.</span>
          </h2>
          <CopperRule className="hidden md:flex max-w-sm" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* INFO CARD — left */}
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
              className="space-y-6 sm:space-y-8"
            >
            <motion.div variants={staggerItem}>
              <InfoBlock icon={<MapPin size={18} strokeWidth={1.7} className="text-primary" />} label="Where we work">
                <a
                  href="{{GOOGLE_MAPS_URL}}"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-2 font-display text-xl font-bold leading-tight text-black hover:text-primary transition-colors"
                >
                  <span>{"{{FULL_ADDRESS}}"}</span>
                  <ArrowUpRight size={16} strokeWidth={1.8} className="opacity-50 group-hover:opacity-100" />
                </a>
              </InfoBlock>
            </motion.div>

            <motion.div variants={staggerItem}>
              <InfoBlock icon={<Phone size={18} strokeWidth={1.7} className="text-primary" />} label="Reach the bench">
                <a
                  href="tel:{{PHONE_DIGITS}}"
                  className="inline-flex items-center py-2 font-display text-xl font-bold leading-tight text-black hover:text-primary transition-colors"
                >
                  {"{{PHONE}}"}
                </a>
                <a
                  href="mailto:{{EMAIL}}"
                  className="flex items-center gap-1.5 py-1.5 mt-0.5 font-mono text-[13px] tracking-tight text-black/60 hover:text-primary transition-colors"
                >
                  <Mail size={13} strokeWidth={1.8} className="shrink-0" />
                  {"{{EMAIL}}"}
                </a>
              </InfoBlock>
            </motion.div>

            <motion.div variants={staggerItem} className="hidden md:block">
              <InfoBlock icon={<Clock size={18} strokeWidth={1.7} className="text-primary" />} label="Hours we work">
                <ul className="space-y-1 font-sans text-base text-black">
                  {hourLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </InfoBlock>
            </motion.div>
            </motion.div>
          </motion.div>

          {/* FORM — right */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-7"
          >
            <div className="border border-accent bg-white p-3 sm:p-6 md:p-8 lg:p-10">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-accent">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

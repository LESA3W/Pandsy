"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import PipeTick from "@/components/ui/PipeTick";
import MeterPanel from "@/components/ui/MeterPanel";
import ServicePill from "@/components/ui/ServicePill";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// ReachUs (ContactSection) — info cards (MeterPanels) + ContactForm (ServicePill frame).
// Hours parsed from {{HOURS}} on commas at module scope (constant after preview sub).

const HOURS_LINES = "{{HOURS}}".split(",").map((s) => s.trim()).filter(Boolean);

export default function ReachUs() {
  return (
    <section id="contact" className="bg-white py-8 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
            <PipeTick />
            Reach us
          </p>
          <h2 className="mt-3 font-display text-3xl font-black leading-[1.05] tracking-tight-display text-black sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Drop us a line. We answer.
          </h2>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — 3 info cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.08, 0.1)}
            className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1"
          >
            <motion.div variants={fadeLeft}>
              <MeterPanel meterLabel="Where we are" className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30">
                    <MapPin size={16} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-base font-black tracking-tight-display text-black">
                      {"{{FULL_ADDRESS}}"}
                    </p>
                    <a
                      href="{{GOOGLE_MAPS_URL}}"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 py-3 font-mono text-[11px] uppercase tracking-widest text-primary hover:opacity-70"
                    >
                      Open in maps
                    </a>
                  </div>
                </div>
              </MeterPanel>
            </motion.div>

            <motion.div variants={staggerItem} className="hidden sm:block">
              <MeterPanel meterLabel="Reach the team" className="p-4 sm:p-5 md:p-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30">
                      <Phone size={16} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        Phone · 24/7
                      </p>
                      <a
                        href="tel:{{PHONE_DIGITS}}"
                        className="font-display text-base font-black tracking-tight-display text-black hover:text-primary"
                      >
                        {"{{PHONE}}"}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30">
                      <Mail size={16} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        Email
                      </p>
                      <a
                        href="mailto:{{EMAIL}}"
                        className="break-all font-display text-base font-black tracking-tight-display text-black hover:text-primary"
                      >
                        {"{{EMAIL}}"}
                      </a>
                    </div>
                  </div>
                </div>
              </MeterPanel>
            </motion.div>

            <motion.div variants={staggerItem} className="hidden sm:block">
              <MeterPanel meterLabel="Open hours" className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30">
                    <Clock size={16} strokeWidth={1.8} />
                  </span>
                  <ul className="space-y-1 text-sm text-black">
                    {HOURS_LINES.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              </MeterPanel>
            </motion.div>
          </motion.div>

          {/* RIGHT — ContactForm in ServicePill */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-7"
          >
            <ServicePill className="p-3.5 sm:p-6 md:p-8 lg:p-10">
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
                <PipeTick />
                Send a message
              </p>
              <h3 className="mt-2 font-display text-2xl font-black tracking-tight-display text-black sm:mt-3">
                Not sure where to start? Drop a line.
              </h3>
              <div className="mt-4 sm:mt-6">
                <ContactForm />
              </div>
            </ServicePill>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

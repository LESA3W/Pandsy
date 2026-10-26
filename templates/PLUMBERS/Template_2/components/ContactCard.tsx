"use client";

import { MapPin, Phone, Mail, Clock4 } from "lucide-react";
import { motion } from "framer-motion";
import { BrassMedallion } from "./ui/BrassMedallion";
import { PlateLine } from "./ui/PlateLine";
import { ContactForm } from "./forms/ContactForm";
import {
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const HOURS_LINES = "{{HOURS}}".split(",").map((s) => s.trim()).filter(Boolean);

// ContactCard (ContactSection) — 4-col layout on desktop:
// 3 small info cards (address / phone+email / hours) on the left,
// ContactForm card spanning right. Each card has PlateLine top + corner ticks.
// White surface.
export function ContactCard() {
  return (
    <section id="contact" className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary">
            <BrassMedallion size={9} />
            Reach Us
          </p>
          <PlateLine tone="primary" className="mt-5 max-w-[180px]" />
          <h2 className="mt-5 sm:mt-7 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-black">
            Three ways to reach us.
          </h2>
        </motion.div>

        <div className="mt-9 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={staggerContainer(0.08, 0.2)}
            className="lg:col-span-5 space-y-4 sm:space-y-6"
          >
            <motion.div variants={staggerItem}>
              <InfoCard
                icon={MapPin}
                label="Where we're working"
                primary={"{{FULL_ADDRESS}}"}
                link={{ href: "{{GOOGLE_MAPS_URL}}", text: "Open in Google Maps" }}
                external
              />
            </motion.div>
            <motion.div variants={staggerItem} className="hidden sm:block">
              <InfoCard
                icon={Phone}
                label="Phone & email"
                primary={"{{PHONE}}"}
                link={{ href: "tel:{{PHONE_DIGITS}}", text: "Tap to call" }}
                extraIcon={Mail}
                extraLink={{ href: "mailto:{{EMAIL}}", text: "{{EMAIL}}" }}
              />
            </motion.div>
            <motion.div variants={staggerItem} className="hidden sm:block">
              <InfoCard
                icon={Clock4}
                label="Open hours"
                primaryList={HOURS_LINES}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-7"
          >
            <div className="relative bg-white border border-black/10 p-4 sm:p-6 md:p-8 lg:p-10">
              <PlateLine tone="primary" className="absolute top-0 left-0 right-0" />
              <CornerTick className="top-0 left-0" rotate={0} />
              <CornerTick className="top-0 right-0" rotate={90} />
              <CornerTick className="bottom-0 right-0" rotate={180} />
              <CornerTick className="bottom-0 left-0" rotate={270} />
              <div className="pt-3 sm:pt-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Form / Message
                </p>
                <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-black">
                  Ask us anything.
                </h3>
              </div>
              <div className="mt-5 sm:mt-7">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  label,
  primary,
  primaryList,
  secondary,
  link,
  external,
  extraIcon: ExtraIcon,
  extraLink,
}: {
  icon: typeof MapPin;
  label: string;
  primary?: string;
  primaryList?: string[];
  secondary?: string;
  link?: { href: string; text: string };
  external?: boolean;
  extraIcon?: typeof Mail;
  extraLink?: { href: string; text: string };
}) {
  return (
    <div className="relative bg-white border border-black/10 p-4 sm:p-6">
      <PlateLine tone="primary" className="absolute top-0 left-0 right-0" />
      <CornerTick className="top-0 left-0" rotate={0} />
      <CornerTick className="top-0 right-0" rotate={90} />
      <CornerTick className="bottom-0 right-0" rotate={180} />
      <CornerTick className="bottom-0 left-0" rotate={270} />
      <div className="pt-3 flex items-start gap-3 sm:gap-4">
        <Icon size={22} strokeWidth={1.5} className="text-primary mt-1" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
            {label}
          </p>
          {primary && (
            <p className="mt-2 font-display text-base font-semibold text-black leading-snug">
              {primary}
            </p>
          )}
          {primaryList && (
            <ul className="mt-2 space-y-1">
              {primaryList.map((line) => (
                <li key={line} className="text-sm text-black">
                  {line}
                </li>
              ))}
            </ul>
          )}
          {secondary && <p className="text-sm text-black/60">{secondary}</p>}
          {link && (
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="mt-2 inline-block font-mono text-[11px] uppercase tracking-widest text-primary hover:opacity-70 underline-offset-4 hover:underline"
            >
              {link.text}
            </a>
          )}
          {ExtraIcon && extraLink && (
            <a
              href={extraLink.href}
              className="mt-3 flex w-fit items-center gap-2 text-sm text-black hover:text-primary"
            >
              <ExtraIcon size={14} strokeWidth={1.75} />
              {extraLink.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function CornerTick({ className, rotate }: { className?: string; rotate: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-2.5 h-2.5 z-10 ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute top-0 left-0 w-2.5 h-px bg-primary" />
      <span className="absolute top-0 left-0 w-px h-2.5 bg-primary" />
    </span>
  );
}

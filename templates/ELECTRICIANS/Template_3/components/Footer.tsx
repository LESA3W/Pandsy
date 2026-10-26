"use client";

/**
 * Footer — HOT WIRE / LIVE EDITORIAL — RICH per claude.md hard rule #4b.
 *
 * Ink-panel dark surface (uses {{LOGO_URL_LIGHT}} variant per dual-logo rule).
 * Top: manifesto block beside logo + 4 social icons.
 * CopperRule divider.
 * 4-column info grid: Where we stamp, Reach the bench, Hours we work, Site map.
 * Atmospheric crimson EmberHalo corner element.
 * Bottom strip: copyright (year via useEffect — claude.md hydration safety #12)
 * + 3 legal links.
 */
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import { XIcon } from "@/components/ui/XIcon";
import { CopperRule } from "@/components/ui/CopperRule";
import { EmberHalo } from "@/components/ui/EmberHalo";
import { SparkMark } from "@/components/ui/SparkMark";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#quote", label: "Free quote" },
  { href: "#contact", label: "Contact" },
];

const PAYMENTS = [
  { file: "visa", name: "Visa" },
  { file: "mastercard", name: "Mastercard" },
  { file: "amex", name: "American Express" },
  { file: "discover", name: "Discover" },
  { file: "paypal", name: "PayPal" },
];

export function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Parse {{HOURS}} comma list into individual lines
  const hourLines = "{{HOURS}}".split(",").map((s) => s.trim());

  return (
    <footer className="relative isolate overflow-hidden bg-black text-white">
      {/* Atmospheric crimson halo — single element, not busy */}
      <EmberHalo origin="bottom-left" className="-z-0 opacity-30" />

      {/* TOP — manifesto block + logo + socials */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VP_ONCE}
        variants={staggerContainer(0.1, 0.05)}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 pt-10 pb-8 sm:pt-14 sm:pb-10"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          {/* Manifesto + logo */}
          <motion.div variants={fadeUp} className="lg:col-span-8">
            <Logo variant="light" width={170} height={48} className="mb-6" />
            <p className="font-display text-xl font-bold leading-[1.05] tracking-tighter text-white sm:text-3xl md:text-4xl">
              We stamp the work.{" "}
              <span className="italic text-primary">We pull the permits.</span>{" "}
              We pick up the phone.
            </p>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="lg:col-span-4 lg:text-right">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-accent mb-4">
              Follow the crew
            </p>
            <ul className="flex flex-wrap items-center gap-3 lg:justify-end">
              {[
                { href: "{{INSTAGRAM_URL}}", label: "Instagram", icon: <Instagram size={18} strokeWidth={1.7} /> },
                { href: "{{FACEBOOK_URL}}", label: "Facebook", icon: <Facebook size={18} strokeWidth={1.7} /> },
                { href: "{{TIKTOK_URL}}", label: "TikTok", icon: <TikTokIcon size={18} strokeWidth={1.7} /> },
                { href: "{{TWITTER_URL}}", label: "X", icon: <XIcon size={16} /> },
              ].map((s) => (
                <li key={s.label}>
                  <motion.a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    {...hoverLift}
                    className="inline-flex items-center justify-center h-10 w-10 border border-accent text-accent hover:bg-primary hover:border-primary hover:text-primary-text transition-colors"
                  >
                    {s.icon}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <CopperRule className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10" invert dotSide="both" />

      {/* MIDDLE — 4-col info grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VP_ONCE}
        variants={staggerContainer(0.1, 0.05)}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 py-8 sm:py-12"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {/* Where we stamp */}
          <motion.div variants={fadeUp}>
            <FooterCol icon={<MapPin size={16} strokeWidth={1.8} />} label="Where we stamp">
              <a
                href="{{GOOGLE_MAPS_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-1.5 font-display text-lg font-medium leading-snug text-white hover:text-primary transition-colors"
              >
                <span>{"{{FULL_ADDRESS}}"}</span>
                <ArrowUpRight size={14} strokeWidth={1.8} className="mt-1 opacity-60 group-hover:opacity-100 shrink-0" />
              </a>
            </FooterCol>
          </motion.div>

          {/* Reach the bench */}
          <motion.div variants={fadeUp}>
            <FooterCol icon={<Phone size={16} strokeWidth={1.8} />} label="Reach the bench">
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="block font-display text-xl font-bold leading-tight text-white hover:text-primary transition-colors"
              >
                {"{{PHONE}}"}
              </a>
              <a
                href="mailto:{{EMAIL}}"
                className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-tight text-accent hover:text-white transition-colors"
              >
                <Mail size={12} strokeWidth={1.8} />
                {"{{EMAIL}}"}
              </a>
            </FooterCol>
          </motion.div>

          {/* Hours — minimal table: DAY | HOURS. No border, no surface fill. */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 text-accent mb-3">
              <Clock size={16} strokeWidth={1.8} />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em]">
                Hours we work
              </span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent/70">Day</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent/70">Hours</span>
              {hourLines.map((line) => {
                const idx = line.indexOf(" ");
                const day = idx === -1 ? line : line.slice(0, idx);
                const time = idx === -1 ? "" : line.slice(idx + 1);
                return (
                  <Fragment key={line}>
                    <span className="font-sans text-[13px] font-medium text-primary">
                      {day}
                    </span>
                    <span className="font-sans text-[13px] text-white tracking-tight">
                      {time}
                    </span>
                  </Fragment>
                );
              })}
            </div>
          </motion.div>

          {/* Site map */}
          <motion.div variants={fadeUp}>
            <FooterCol icon={<SparkMark size={14} tone="cream" />} label="Site map">
              <ul className="space-y-1.5 font-sans text-sm">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="text-white hover:text-primary transition-colors"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterCol>
          </motion.div>
        </div>

        {/* PAYMENT METHODS — example set; the client configures their own */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 lg:mt-14 lg:pt-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Payment accepted</span>
            <ul className="flex flex-wrap items-center gap-2">
              {PAYMENTS.map((p) => (
                <li key={p.file}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/payments/${p.file}.png`} alt={p.name} width={140} height={111} className="h-8 w-auto" />
                </li>
              ))}
            </ul>
          </div>
          <p className="font-sans text-[11px] italic leading-relaxed text-white/45">
            Example shown — set the payment methods you actually accept here.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom strip — copyright + legal (no scroll-gate: must always render) */}
      <div className="relative border-t border-accent">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 sm:px-6 md:px-10 pt-6 pb-24 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            © {year ?? ""} {"{{BUSINESS_NAME}}"}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em]">
            <li>
              <Link href="/privacy-policy" className="inline-flex items-center py-4 text-accent hover:text-white transition-colors">
                Privacy policy
              </Link>
            </li>
            <li aria-hidden="true" className="text-accent">·</li>
            <li>
              <Link href="/terms-of-service" className="inline-flex items-center py-4 text-accent hover:text-white transition-colors">
                Terms of service
              </Link>
            </li>
            <li aria-hidden="true" className="text-accent">·</li>
            <li>
              <Link href="/cookie-policy" className="inline-flex items-center py-4 text-accent hover:text-white transition-colors">
                Cookie policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
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
      <div className="mb-3 flex items-center gap-2 text-accent">
        {icon}
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em]">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
